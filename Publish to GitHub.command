#!/bin/bash
# Double-click to publish this site to a GitHub repository you have already
# created. It pushes ONLY to the repo you paste in below. The original
# ASME-Committee/asme-site repository is never contacted.
#
# What gets pushed is a snapshot of the site as it stands right now, as a
# single commit. Your local history stays here on this Mac and is not
# uploaded. That is deliberate: the signed Joint Statement PDF exists in
# earlier commits, and a public repository would let anyone recover it from
# the history even though the file is no longer in the site.

cd "$(dirname "$0")" || exit 1
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

echo ""
echo "=================================================="
echo " Publish the ASME site draft to GitHub"
echo "=================================================="
echo ""

if [ -n "$(git status --porcelain)" ]; then
  echo "There are uncommitted changes in this folder."
  echo "Tell Claude before running this, so nothing is lost."
  echo ""
  read -r -p "Press return to close. "
  exit 1
fi

url=$(git remote get-url preview 2>/dev/null)
if [ -n "$url" ]; then
  echo "Publishing to the repository you used last time:"
  echo "  $url"
else
  echo "Paste the URL of the EMPTY GitHub repository you just created."
  echo "It looks like:  https://github.com/YOUR-NAME/asme-site-v2.git"
  echo ""
  read -r -p "Repository URL: " url
  [ -z "$url" ] && { echo "Nothing entered. Closing."; read -r; exit 1; }

  case "$url" in
    *ASME-Committee/asme-site.git|*ASME-Committee/asme-site)
      echo ""
      echo "STOP. That is the original repository, which must not be touched."
      echo "Create a new, separate repository and run this again."
      echo ""
      read -r -p "Press return to close. "
      exit 1
      ;;
  esac
  git remote add preview "$url" || exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)

echo ""
echo "Packaging a clean snapshot..."
git checkout --orphan __preview_snapshot >/dev/null 2>&1 || {
  git branch -D __preview_snapshot >/dev/null 2>&1
  git checkout --orphan __preview_snapshot >/dev/null 2>&1
}
git add -A
git -c user.name="Paul Schwartz" -c user.email="paul@loopmarketing.com.au" \
    commit -q -m "ASME site draft $(date '+%d %B %Y, %H:%M')"

echo "Pushing. If a browser or password box appears, that is GitHub asking"
echo "you to sign in. Nothing is shared with anyone."
echo ""

if git push -f preview __preview_snapshot:main; then
  ok=1
else
  ok=0
fi

git checkout -q "$branch"
git branch -D __preview_snapshot >/dev/null 2>&1

if [ "$ok" != "1" ]; then
  echo ""
  echo "PUSH FAILED. Copy the message above and paste it to Claude."
  echo ""
  read -r -p "Press return to close. "
  exit 1
fi

repo=$(echo "$url" | sed -e 's#.*github.com[:/]##' -e 's#\.git$##')
owner=$(echo "$repo" | cut -d/ -f1 | tr '[:upper:]' '[:lower:]')
name=$(echo "$repo" | cut -d/ -f2)

echo ""
echo "=================================================="
echo " Pushed. Your local history is untouched."
echo ""
echo " FIRST TIME ONLY, in your browser:"
echo "   1. https://github.com/$repo/settings/pages"
echo "   2. Build and deployment -> Source -> GitHub Actions"
echo ""
echo " The site builds itself and is live about 2 minutes later at:"
echo ""
echo "   https://$owner.github.io/$name/"
echo ""
echo " After that, run this file again any time to publish changes."
echo " The link never changes."
echo "=================================================="
echo ""
read -r -p "Press return to close. "
