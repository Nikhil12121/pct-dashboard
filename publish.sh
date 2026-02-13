#!/bin/bash
# One-command publish: Push to GitHub

cd "$(dirname "$0")"

echo "=========================================="
echo "  PCT Dashboard - Push to GitHub"
echo "=========================================="
echo ""
echo "You need a GitHub Personal Access Token."
echo "Get one at: https://github.com/settings/tokens"
echo "  (Generate new token → check 'repo' → Copy)"
echo ""
echo "Paste your token below (it won't show as you type):"
read -s TOKEN
echo ""

if [ -z "$TOKEN" ]; then
  echo "No token entered. Exiting."
  exit 1
fi

echo "Pushing to GitHub..."
git remote set-url origin "https://Nikhil12121:${TOKEN}@github.com/Nikhil12121/pct-dashboard.git"
git push -u origin main
RESULT=$?
git remote set-url origin "https://github.com/Nikhil12121/pct-dashboard.git"

echo ""
if [ $RESULT -eq 0 ]; then
  echo "✓ Success! Code is at: https://github.com/Nikhil12121/pct-dashboard"
  echo ""
  echo "Next: Deploy at https://vercel.com (see PUBLISH.md)"
else
  echo "✗ Push failed. Check your token has 'repo' scope."
fi
