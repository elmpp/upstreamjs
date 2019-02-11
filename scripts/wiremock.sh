#!/usr/bin/env bash

_PACKAGEBASE=packages/upstreamjs
# shellcheck disable=SC2034
_SUBCOMMAND_PROGRAM_LIST='up down snapshot'
_VERSION=1.2.0

#
#
#  BASELINE PROGRAM WITH SOME SUBCOMMAND SWITCHING 
#   - https://goo.gl/yaETDq
#
#
# Bash Boilerplate: https://github.com/alphabetum/bash-boilerplate
#
# Copyright (c) 2015 William Melody • hi@williammelody.com


###############################################################################
# Strict Mode
###############################################################################

# Bash 'Strict Mode'
# http://redsymbol.net/articles/unofficial-bash-strict-mode
# https://github.com/alphabetum/bash-boilerplate#bash-strict-mode
set -o nounset
set -o errexit
set -o pipefail
IFS=$'\n\t'

###############################################################################
# Environment
###############################################################################

# $_ME
#
# Set to the program's basename.
_ME=$(basename "${0}")
_SHELLBASE="${_PACKAGEBASE}/node_modules/shell"

###############################################################################
# _bootstrap
###############################################################################
# _bootstrap()
#
# Usage:
#   _bootstrap
#
# Description:
#   Ensures current directory will be monorepo root and includes common functions
#
_bootstrap() {
	__FULLPROJECTPATH="$(
		cd "$(dirname "$0")"
		pwd -P | sed -e 's/\/packages\/.*//g'
	)"
  PATH=$PATH:"${__FULLPROJECTPATH}/${_PACKAGEBASE}/scripts:${__FULLPROJECTPATH}/${_PACKAGEBASE}/scripts/commands"
	cd "${__FULLPROJECTPATH}"
	# shellcheck disable=SC1090
	source "${_SHELLBASE}/includes/common-functions.sh"
	# shellcheck disable=SC1090
	source "${_SHELLBASE}/includes/useful-functions.sh"
	# shellcheck disable=SC1090
	source "${_SHELLBASE}/includes/boilerplate-functions.sh"
	# shellcheck disable=SC1090
	source "${_SHELLBASE}/includes/notification-functions.sh"
	# _load_config - uncomment to load env file from /config/${_APP_ENV}.env
}
_bootstrap
# shellcheck disable=SC1090
source "${_SHELLBASE}/includes/boilerplate-with-subcommands.sh"


###############################################################################
# Help
###############################################################################

# shellcheck disable=SC2034
read -r -d '' "_program_help" <<EOM || true
*********************************************
*** Wiremock related tasks. *** 
*********************************************
Version: ${_VERSION}
Usage:
  ${_ME} up <root-dir> <path-to-jar> <port>
  ${_ME} down
  ${_ME} snapshot
  ${_ME} logout [--force]
  ${_ME} -h | --help
  ${_ME} --version
Subcommands:
  up                     Brings up wiremock
  down                   Takes down (all) wiremock instances
  snapshot               Creates stub mappings after some requests - https://goo.gl/7mnHyo -> snapshotting
Options:
  -h --help  Display this help information.
  --version  Display version information.
  --force    Suppress confirmation prompt.
EOM


###############################################################################
# Program Functions
###############################################################################

_do_main() {
  _debug printf "_do_main() >> start\\n"

  local _DEFAULT_DATA_DIR="${_PACKAGEBASE}/../partridge-etc/wiremock-data"

  case "${_SUBCOMMAND}" in
    "up")
      local _DATA_DIR="${_ARGUMENTS[1]:-${_DEFAULT_DATA_DIR}}"
      local _JAR_PATH="${_ARGUMENTS[2]:-${__FULLPROJECTPATH}/${_PACKAGEBASE}/bin/wiremock.jar}"
      local _PORT="${_ARGUMENTS[3]:-9999}"
      local _PASSTHRU_OPTIONS
      _PASSTHRU_OPTIONS=$(_passthru_options '--verbose')

      # wiremock options - https://goo.gl/BycVB4
      # local _CMD="java -jar ${_JAR_PATH} --verbose --port=${_PORT} --root-dir=${_DATA_DIR} ${_PASSTHRU_OPTIONS} &"
      local _CMD="java -Xmx2048m -jar ${_JAR_PATH} --port=${_PORT} --verbose --root-dir=${_DATA_DIR} ${_PASSTHRU_OPTIONS} > /tmp/wiremock.log &"

      _down "${_PORT}"

      debug "${_CMD}"
      eval "${_CMD}"

      echo -e ''
		  show_success "Wiremock running."
		  show_success "Logs: /tmp/wiremock.log"
		  show_success "Admin: http://localhost:${_PORT}/__admin/docs"
      echo -e ''
      ;;
    "down")
      local _PORT="${_ARGUMENTS[1]:-9999}"
      _down "${_PORT}"
      
      echo -e ''
		  show_success "Process killed on port ${_PORT}"
      ;;
    "snapshot")

      # docs - https://goo.gl/8gt7Wy . Also see postman entries (look at request body)
      local _FEED_SUPPLIER
      _FEED_SUPPLIER=$(_require_argument "${_ARGUMENTS[1]:-}" "Feed Supplier (coral|etc)")
      local _STUB_FILENAMESUFFIX
      _STUB_FILENAMESUFFIX=$(_require_argument "${_ARGUMENTS[2]:-}" "FILENAME REQUIRED!. Filename by which the stub data will be saved to. Will be prefixed by feed supplier name and date. e.g. 'categories-full-run' -> DATA_DIR/__files/coral-07072017-categories-full-run.json")

      local _SNAPSHOT_REQUEST_BODY
      _SNAPSHOT_REQUEST_BODY=$(cat <<END_HEREDOC
{
  "filters" : {
      "method" : "ANY",
      "headers" : {
        "x-feed-supplier" : {
            "equalTo" : "${_FEED_SUPPLIER}"
        }
      }
  },
  "captureHeaders": {
    "x-feed-supplier": {
      "caseInsensitive": true
    },
    "Accept": {
      "caseInsensitive": true
    }
  },
  "repeatsAsScenarios": false,
	"outputFormat": "IDS"
}
END_HEREDOC
)

      local _STUBFILEIDSRAW
      local _STUBFILEIDS

      set -x
      _STUBFILEIDSRAW=$(curl -X POST \
        --data "${_SNAPSHOT_REQUEST_BODY}" \
        http://localhost:9999/__admin/recordings/snapshot \
        -H 'Accept: application/json' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        -H 'cache-control: no-cache'
      )
      set +x
      
      _STUBFILEIDS=$(echo "${_STUBFILEIDSRAW}" | jq --raw-output '.ids[]')

      for _STUBID in ${_STUBFILEIDS};
      do
      [ -z "${_STUBID}" ] && continue
        local _CMD="mv ${_DEFAULT_DATA_DIR}/mappings/*${_STUBID}.json ${_DEFAULT_DATA_DIR}/mappings/${_FEED_SUPPLIER}-$(date +%d%m%Y)-${_STUB_FILENAMESUFFIX}-${_STUBID}.json"
        debug "${_CMD}"
        eval "${_CMD}"
      done

      echo -e ''
		  show_success "Snapshot created and /mappings files renamed"
      ;;
    "help")
      _print_help
      ;;
  esac
}

_down() {
  local _PORT="${1:-9999}"
  local _CMD="lsof -PiTCP -sTCP:LISTEN | grep ${_PORT} | awk '{print \$2}' | xargs kill || true"
  
  debug "${_CMD}"
  eval "${_CMD}"
}

###############################################################################
# Main
###############################################################################

# _main()
#
# Usage:
#   _main [<options>] [<arguments>]
#
# Description:
#   Entry point for the program, handling basic option parsing and dispatching.
_main() {
  # Avoid complex option parsing when only one program option is expected.
  # if [[ "${1:-}" =~ ^-h|--help$  ]]
  if [[ "${_PRINT_HELP:-0}" == '1' ]]
  then
    _print_help
  elif [[ "${_PRINT_VERSION:-0}" == '1' ]]
  then
    _print_version
  else
    _do_main "$@"
  fi
}

# Call `_main` after everything has been defined.
_main "$@"