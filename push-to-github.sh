#!/bin/bash
# Push PCT Dashboard to GitHub

cd "$(dirname "$0")"

# Option 1: Token in .github_token file (create it, paste token, run this script)
# Option 2: Run as: GITHUB_TOKEN=your_token ./push-to-github.sh

if [ -f .github_token ]; then
  TOKEN=$(cat .github_token)
  rm .github_token  # Remove after use
elif [ -n "$GITHUB_TOKEN" ]; then
  TOKEN="$GITHUB_TOKEN"
else
  echo "No token found. Either:"
  echo "  1. Create .github_token file, paste your token, then run this script"
  echo "  2. Run: GITHUB_TOKEN=your_token ./push-to-github.sh"
  exit 1
fi

echo "Pushing to GitHub..."
git remote set-url origin "https://Nikhil12121:${TOKEN}@github.com/Nikhil12121/pct-dashboard.git"
git push -u origin main
RESULT=$?
git remote set-url origin "https://github.com/Nikhil12121/pct-dashboard.git"

if [ $RESULT -eq 0 ]; then
  echo "Success! https://github.com/Nikhil12121/pct-dashboard"
else
  echo "Push failed. Check token has 'repo' scope."
fi
