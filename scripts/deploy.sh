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
# 查看当前目录下的文件信息
ls -la
# 定义远程仓库地址变量
remote=$(git config remote.origin.url)
echo 'remote address is: '$remote

# 新建一个发布项目的目录
mkdir git-pages-rp
cd git-pages-rp

# 创建的一个新的仓库
# 设置发布的用户名与邮箱 这里的邮箱和用户名都是取自上面设置的环境变量
git config --global user.email "$GH_EMAIL" >/dev/null 2>&1 # 这里的处理是为了不让其输出信息到控制台
git config --global user.name "$GH_NAME" >/dev/null 2>&1 # 这里的处理是为了不让其输出信息到控制台
# 初始化一个临时的git仓库
git init
# 和远程仓库建立关联
git remote add --fetch origin "$remote" #这里的remote是上面定义的变量

# 切换gh-pages分支
# 验证git 是否存在gh-pages分支 如果存在则切换 不存在则创建一个空历史分支
if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then
  # 检出此分支
  git checkout gh-pages
  # 删除掉旧的文件内容
  git rm -rf .
else
  git checkout --orphan gh-pages
fi

# 把构建好的文件目录给拷贝进来
cp -a "../${STATIC_SOURCE}/." .
# 查看拷贝的文件
ls -la

# 把所有的文件添加到git
git add -A
# 添加一条提交内容
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]" # 【ci skip】是为了跳过ci的构建
# 推送文件
git push --force --quiet origin gh-pages
# 资源回收，删除临时分支与目录
cd ..
rm -rf git-pages-rp

echo "Delpoy Sucessful"