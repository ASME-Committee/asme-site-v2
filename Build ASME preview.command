#!/bin/bash
# Double-click this file to build the ASME preview site and package it for
# upload. It touches nothing outside ~/asme-site-v2 and does not affect the
# dev server you have running.

cd "$(dirname "$0")" || exit 1

# A double-clicked .command gets a login shell, but node managers vary. Pick up
# the usual suspects so `npm` is found however node was installed.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh" >/dev/null 2>&1

echo ""
echo "Building the ASME preview site."
echo "This takes about a minute. Leave this window open."
echo ""

if ! command -v npm >/dev/null 2>&1; then
  echo "PROBLEM: npm was not found on this Mac."
  echo "Tell Claude, and paste this line back:  which node npm"
  echo ""
  read -r -p "Press return to close this window. "
  exit 1
fi

rm -rf out asme-preview.zip

if ! npm run build; then
  echo ""
  echo "BUILD FAILED. Copy the red error text above and paste it to Claude."
  echo ""
  read -r -p "Press return to close this window. "
  exit 1
fi

cd out || { echo "No out folder was produced."; read -r; exit 1; }
zip -qr ../asme-preview.zip .
cd ..

echo ""
echo "=============================================="
echo " Done. Built $(find out -name '*.html' | wc -l | tr -d ' ') pages."
echo " Packaged as asme-preview.zip"
echo ""
echo " Now go back to Claude and say: build finished"
echo "=============================================="
echo ""
read -r -p "Press return to close this window. "
