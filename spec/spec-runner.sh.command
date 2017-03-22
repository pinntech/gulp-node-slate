#!/bin/sh
###################
# gulp-node-slate #
###################

# To make this file runnable:
#    $ chmod +x *.sh.command

package=https://raw.githubusercontent.com/pinntech/gulp-node-slate/master/package.json
projectHome=$(cd $(dirname $0)/..; pwd)

update() {
    which node || alert "Need to install node: https://nodejs.org"
    echo "Node.js $(node --version)"
    npm install
    npm update
    npm outdated
    echo
    }

getVersions() {
    cd $projectHome
    echo "Local changes:"
    git status --short
    versionLocal=v$(grep '"version"' package.json | awk -F'"' '{print $4}')
    versionRemote=v$(curl --silent $package | grep '"version":' | awk -F'"' '{print $4}')
    versionReleased=$(git tag | tail -1)
    echo
    echo "Versions:"
    echo "    $versionLocal (local)"
    echo "    $versionRemote (checked in)"
    echo "    $versionReleased (released)"
    echo
    }

instructions() {
    echo "To publish release:"
    echo "    git tag -af $versionRemote -m release"
    echo "    git remote -v"
    echo "    git push origin --tags --force"
    echo "    npm publish"
    echo
    }

echo
echo "Specification Runner"
echo "===================="
cd $projectHome
pwd
update
echo "Analyzing JS:"
npm run lint
echo "Running mocha specs:"
npm run mocha
getVersions
instructions
