#!/bin/bash
# Start the local preview of the ASME site.
#
# Double-click this, wait for the browser to open, and leave the Terminal
# window running in the background. Edits appear in the browser within a
# second or two; there is nothing to rebuild by hand.
#
# To stop it: click this Terminal window and press Control-C, or just close
# the window.

cd "$(dirname "$0")" || exit 1

echo "======================================"
echo " ASME site — local preview"
echo "======================================"
echo

if [ ! -d node_modules ]; then
  echo "First run: installing dependencies. This takes a few minutes."
  npm install || { echo; echo "npm install failed. Leave this window open and say so."; exit 1; }
  echo
fi

# If a previous preview is still running, reuse it rather than failing on a
# busy port or quietly starting a second one on :3001.
if lsof -ti tcp:3000 >/dev/null 2>&1; then
  echo "A preview is already running. Opening it."
  open "http://localhost:3000"
  echo
  echo "If you want a fresh start, close the other Terminal window first."
  exit 0
fi

echo "Starting. The browser opens on its own in about ten seconds."
echo "Leave this window open while you work."
echo
( sleep 9; open "http://localhost:3000" ) &

npm run dev
