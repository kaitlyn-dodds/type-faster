#!/bin/bash
# This script will package, version, and deploy the app to the server (192.168.0.101)

# Color variables
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Target Server
TARGET_SERVER="kaitlyn@192.168.0.101"

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

TYPE_FASTER_APP_VERSION=$(cat package.json | grep version | cut -d '"' -f 4)
echo -e "${GREEN}Version updated to $TYPE_FASTER_APP_VERSION${NC}"
echo "\n"

# export VITE_GIT_SHA and VITE_APP_VERSION to .env
export VITE_GIT_SHA=$TYPE_FASTER_GIT_SHA
export VITE_APP_VERSION=$TYPE_FASTER_APP_VERSION

# Step 2: Build the app
echo -e "${YELLOW}Building app with version $TYPE_FASTER_APP_VERSION...${NC}"
npm run build

# verify build command didn't fail
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Build failed.${NC}"

    # remove git tags
    git tag -d $TYPE_FASTER_APP_VERSION
    git push origin :refs/tags/$TYPE_FASTER_APP_VERSION

    exit 1
fi

echo -e "${GREEN}Build complete.${NC}\n"
echo "\n"

# Step 3: Copy files to server
echo -e "${YELLOW}Copying files to server...${NC}"

# create release directory
ssh $TARGET_SERVER "mkdir -p /var/www/type-faster/releases/v$TYPE_FASTER_APP_VERSION"

scp -r ./dist/* $TARGET_SERVER:/var/www/type-faster/releases/v$TYPE_FASTER_APP_VERSION

# verify copy command didn't fail
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Copy failed.${NC}"

    # remove git tags
    git tag -d $TYPE_FASTER_APP_VERSION
    git push origin :refs/tags/$TYPE_FASTER_APP_VERSION

    exit 1
fi

echo -e "${GREEN}Copy complete.${NC}\n"
echo "\n"

# Step 4: Set current release

# need to ssh into the server, verify file permissions, and set current release
ssh $TARGET_SERVER `
  "cd /var/www/type-faster/releases/v$TYPE_FASTER_APP_VERSION && \
   sudo chown -R kaitlyn:kaitlyn . && \
   sudo find . -type d -exec chmod 755 {} \; && \
   sudo find . -type f -exec chmod 644 {} \;" \
   && sudo ln -s /var/www/type-faster/releases/v$TYPE_FASTER_APP_VERSION /var/www/type-faster/current


# verify set current release command didn't fail
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Set current release failed.${NC}"

    # remove git tags
    git tag -d $TYPE_FASTER_APP_VERSION
    git push origin :refs/tags/$TYPE_FASTER_APP_VERSION

    exit 1
fi

# Step 5: Restart server

# need to ssh into the server and restart nginx
ssh $TARGET_SERVER << EOF
    sudo systemctl restart nginx
EOF

# verify restart command didn't fail
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Restart failed.${NC}"

    # remove git tags
    git tag -d $TYPE_FASTER_APP_VERSION
    git push origin :refs/tags/$TYPE_FASTER_APP_VERSION

    exit 1
fi

# Step 6: Verify

# need to ssh into the server and verify the app is running
ssh $TARGET_SERVER << EOF
    curl http://localhost
EOF

# verify curl command didn't fail
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Verify failed.${NC}"

    # remove git tags
    git tag -d $TYPE_FASTER_APP_VERSION
    git push origin :refs/tags/$TYPE_FASTER_APP_VERSION

    exit 1
fi

# Step 7: Clean up

# need to ssh into the server and clean up old releases
ssh $TARGET_SERVER << EOF
    sudo rm -rf /var/www/type-faster/releases/*
EOF

# verify clean up command didn't fail
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Clean up failed.${NC}"

    # remove git tags
    git tag -d $TYPE_FASTER_APP_VERSION
    git push origin :refs/tags/$TYPE_FASTER_APP_VERSION

    exit 1
fi

# Step 8: Done

# print success message
echo -e "${GREEN}Deploy complete.${NC}"
exit 0
