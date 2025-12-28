#!/bin/bash
# This script will package, version, and deploy the app to the server (192.168.0.101)

# Color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1: Update version in package.json

# catch uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}Error: There are uncommitted changes in the working directory. Please commit or stash your changes before running this script.${NC}"
    exit 1
fi

TYPE_FASTER_GIT_SHA=$(git rev-parse --short HEAD)
TYPE_FASTER_APP_VERSION=$(cat package.json | grep version | cut -d '"' -f 4)

echo "Select a version update (current version: $TYPE_FASTER_APP_VERSION):"
OPTIONS=("Major" "Minor" "Patch")
select opt in "${OPTIONS[@]}"; do
    case $opt in
        "Major")
            npm version major
            break
            ;;
        "Minor")
            npm version minor
            break
            ;;
        "Patch")
            npm version patch
            break
            ;;
    esac
done

echo -e "${GREEN}Version updated to $TYPE_FASTER_APP_VERSION${NC}"
echo "\n"

# export VITE_GIT_SHA and VITE_APP_VERSION to .env
export VITE_GIT_SHA=$TYPE_FASTER_GIT_SHA
export VITE_APP_VERSION=$TYPE_FASTER_APP_VERSION

# Step 2: Build the app
echo -e "${YELLOW}Building app with version $TYPE_FASTER_APP_VERSION...${NC}"
npm run build
echo -e "${GREEN}Build complete.${NC}\n"

