1. 项目经理要研发一个新的项目，首先初始化了项目解构和一个本地仓库，创建了两个分支，xiaowang和xiaoli，协同开发,并推送至远程仓库

   - `git init 仓库名`
   - `cd 仓库名`
   - `git add .`,`git commit -m '初始化'`:创建项目架构 并提交本地仓库
   - `git branch xiaowang`,`git branch xiaoli`：创建两个分支
   - `git remote add origin 远程地址`：把本地仓库和远程仓库关联
   - `git push -u origin --all`:把本地仓库推送至远程仓库

   



3. xiaoli开始第一天上班，拉取分支并开始工作
   - `git pull origin xiaoli:xiaoli`
   - `git checkout xiaoli`
4. xiaoli工作完成推送自己的分支到远程仓库
   - `git add .`,`git commit -m 'XXX'`:先本地提交
   - `git push -u origin xiaoli`:远程推送



5. xiaowang开始第一天上班，拉取分支并开始工作(和小李一样)
6. xiaowang工作完成推送自己的分支到远程仓库(和小李一样)



7. 项目经理合并xiaowang和xiaoli两个分支的内容，并完成当天的开发，更新远程仓库
   - 如果在master分支拉取其他分支，则会自动的合并到当前分支
   - 如果在当前分支拉取当前分支的更新，则不会合并到其他，需要手动合并到其他
   - `git pull origin xiaowang`
   - `git pull origin xiaoli`
   - 都合并到master后可能需要解决冲突，解决冲突后需要先提交到本地仓库
   - 推送已经合并好的master到远程仓库



8. 小李第二天开始上班开始工作
   - 在自己的分支上拉取master的更新并合并到自己的分支
   - `git pull origin master`
9. 小王第二天上班开始工作(和xiaoli一样)