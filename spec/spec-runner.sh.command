#!/bin/sh
###################
# gulp-node-slate #
###################

# To make this file runnable:
#    $ chmod +x *.sh.command

package=https://raw.githubusercontent.com/pinntech/gulp-node-slate/master/package.json
projectHome=$(cd $(dirname $0)/..; pwd)

info() {
   cd $projectHome
   pwd
   echo
   echo "Node.js:"
   which node || { echo "Need to install Node.js: https://nodejs.org"; exit; }
   node --version
   test -d node_modules || npm install
   npm update
   npm outdated
   echo
   }

showVersions() {
   cd $projectHome
   echo "Local changes:"
   git status --short
   versionLocal=v$(grep '"version"' package.json | awk -F'"' '{print $4}')
   versionRemote=v$(curl --silent $package | grep '"version":' | awk -F'"' '{print $4}')
   versionReleased=$(git tag | tail -1)
   echo
   echo "Versions:"
   echo "   $versionLocal (local)"
   echo "   $versionRemote (checked in)"
   echo "   $versionReleased (released)"
   echo
   echo "To publish release:"
   echo "   cd $projectHome"
   echo "   git tag -af $versionRemote -m release"
   echo "   git remote -v"
   echo "   git push origin --tags --force"
   echo "   npm publish"
   echo
   }

echo
echo "Specification Runner"
echo "===================="
info
showVersions
npm test
sleep 2
open api-docs/output/index.html
