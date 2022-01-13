#!/bin/sh

# vercel config
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "cur"  ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi

set -e
pwd
ls -la
# define path variable of remote repo
remote=$(git config remote.origin.url)
echo 'remote address is: '$remote

# create a direction for publishing the project
mkdir git-pages-rp
cd git-pages-rp

# create a new repo
# $GH_EMAIL、$GH_EMAIL both are environment variables
git config --global user.email "$GH_EMAIL" >/dev/null 2>&1 # /dev/null 2>&1, in order not to appear in the terminal
git config --global user.name "$GH_NAME" >/dev/null 2>&1 
# init temporary repo
git init
# associate with a remote repo
git remote add --fetch origin "$remote" #

# checkout gh-pages branch
# verify git, does gh-pages branch exist? switch if exists, create otherwise
if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then
  git checkout gh-pages
  # remove old file
  git rm -rf .
else
  git checkout --orphan gh-pages
fi

# copy the built file diretory
cp -a "../${STATIC_SOURCE}/." .
# watch copied file
ls -la

# add all files to git
git add -A
# add a commit
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]" # 【ci skip】是为了跳过ci的构建
# push
git push --force --quiet origin gh-pages
# recycle, delete temporary branchs and diretories
cd ..
rm -rf git-pages-rp

echo "Delpoy Sucessful"