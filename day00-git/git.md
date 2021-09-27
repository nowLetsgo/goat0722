- `git status`: 查看状态
  - 红色代表工作区和暂存区不一致
  - 绿色代表暂存区和仓库去的当前版本不一致
  - Untracked files：未跟踪的文件（新增的文件）
  - modified:   01.txt:修改了某个文件
  - deleted:    01.txt：删除了某个文件
- `git add .` / `git add filename` :提交某个文件或者全部文件 到 暂存区
- `git commit -m` '注释信息'：提交暂存区的内容到仓库区
- `git commit -am` '注释信息'：跳过暂存区的步骤 直接提交仓库（新增文件不可以）



- `git restore .`/`git restore 文件名`：撤销工作区的改动到上一次的提交
- `git restore --staged .`:撤销 提交到暂存区的 这一步操作
- 如果是工作区新增文件的撤销，直接删除就可以





删除操作（前提是三个区域都有这个文件[被仓库管理的文件]）

- `git rm 文件名`：删除暂存区和工作区的某个文件（然后直接commit提交，仓库的最新版本就没有这个文件了）
- `git rm --cached 文件名`：删除暂存区的文件，此时工作区和暂存区，仓库区和暂存区都不一致

- `git rm 01.txt -f`:强制删除文件（当工作区和暂存区或仓库不一致的时候 强制删除） 



重命名操作[前提文件被仓库管理]

- `git mv 01.js 02.js`:重命名01.js为02.js
- `git mv 01.js js/`:移动01.js文件位置到js文件夹中
- `git mv 01.js js/02.js`:移动01.js文件到js文件夹中，并重命名为02.js



- `git log`:查看所有的提交，用下键控制向下查看，按q退出
- `git log --oneline`:查看所有提交的简略信息
- `git log -p`：查看所有提交及每次的差异



- `git reset --hard hash`:仓库回退到某个版本，重置工作区和暂存区

- `git reset --mixed hash`:仓库回退到某个版本，重置暂存区

- `git reset --soft hash`: 仓库回退到某个版本

- `git reflog`：查看所有的日志操作（包括commit和reset的操作）

  

- `git diff`：比较工作区和暂存区之间的差异
- `git diff --cached`：比较暂存区和仓库当前版本的差异
- `git diff a b`:比较两个版本的差异



配置忽略文件

- 只有本地有当前文件：
  - 直接创建一个`.gitignore`文件，里边书写忽略的文件名或者文件夹即可
- 已经被仓库管理的文件想要忽略
  - 首先让仓库和暂存区不再管理这个文件
  - `git rm --cached 文件`：把暂存区的这个文件删除，再commit提交到仓库，此时当前文件在工作区就是一个新增文件了，然后再去.gitignore中配置忽略即可



- `git branch`:查看所有分支
- `git branch 分支名`：创建一个分支
- `git checkout 分支名`：提交当前分支后，再切换分支
- `git checkout -b 分支ing`：创建并切换分支
- `git merge 分支名`：合并某个分支
- `git branch -d 分支名`:删除某个分支









- `git remote add 别名 地址`：把本地仓库和远程仓库关联，并起一个别名
- `git remote`：查看所有的关联仓库
- `git remote remove 别名`：删除某一个关联远程仓库
- `git push -u origin master`：向远程仓库origin 推送master分支的更新 -u是关联，以后可以直接使用git push
- `git push origin --all`:一次性推送所有的分支



- `git clone 远程仓库地址`：拉取远程仓库到本地

- `git pull 别名 master`：拉取远程仓库的更新到本地
- `git pull origin 分支:分支`:拉取远程仓库的其他分支