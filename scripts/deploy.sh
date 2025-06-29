#!/bin/bash

# Exit on any error
set -e

# Store current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Checkout main and update
git checkout main
git pull origin main

# Merge dev into main
git merge dev --no-edit

# Push to origin main
git push origin main

# Switch back to your previous branch
git checkout "$CURRENT_BRANCH"

echo "✅ Deployed main from dev and returned to $CURRENT_BRANCH"