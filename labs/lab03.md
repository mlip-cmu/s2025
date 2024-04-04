# Lab 3: Git

## Deliverables:
You will perform three tasks in this exercise. 

- [ ] Create and fix a merge conflict
- [ ] Amend a commit

It is strongly recommended that you use a git extension for your IDE to complete this lab. If you are using Visual Studio Code, you can use the [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) extension. 

## Setup
1. Fork the [PyTorch](https://github.com/pytorch/pytorch) repository to your GitHub account.
2. Clone the forked repository to your local machine by running the following command in the terminal:
```
git clone -n --depth=1 --filter=tree:0 <your repo url>
cd pytorch
git sparse-checkout set --no-cone torch/nn
git checkout
```
3. Open the repository in your IDE.

## Exercise 1: Create and fix a merge conflict

1. Create a new branch called `merge-conflict` from `main` branch.
2. Open the `torch/nn/functional.py` file, navigate to the `interpolate` function (line 3856) and change the resizing mode from `nearest` to `bilinear`:
3. Commit the changes to the `merge-conflict` branch. Make sure you add a meaningful commit message.
4. Switch back to `main` branch.
5. Open the `torch/nn/functional.py` file, navigate to the `interpolate`(line 3856) function and change the resizing mode from `nearest` to `bicubic` and `align_corners` to `True`:
6. Commit the changes to the `main` branch. Make sure you add a meaningful commit message.
7. Merge the `merge-conflict` branch into the `main` branch.
8. Resolve the merge conflict by keeping the resizing mode `bilinear` and `align_corners` `True`.
9. Commit the changes to the `main` branch. Make sure you add a meaningful commit message.

## Exercise 2: Amend a commit

1. Create a new branch called `amend-commit` from `main` branch.
2. In the `torch/nn/functional.py` file, navigate to the `multi_margin_loss` function (line 3566) and change the margin to 1.5 and reduction mode to `sum'
3. Commit the changes to the `amend-commit` branch. Make sure you add a meaningful commit message.
4. Amend the commit by changing the margin to 2.0
5. Commit the changes to the `amend-commit` branch. Make sure you add a meaningful commit message.

## Exercise 3: Create and approve a pull request

**Note: Please ensure on GitHub, you create the pull request to the main branch of your forked repository. Under no circumstances should you create a pull request to the original PyTorch repository.**
<br><br>
(make sure you choose *username*/pytorch instead of pytorch/pytorch)<br>
<img src="https://github.com/eshetty/s2024/assets/107862033/c874f0a6-abae-478a-af83-0f62eaa8cd4d" alt="image" width="500" height="auto"><br>

1. Create a new branch called `pull-request` from `main` branch.
2. In the `torch/nn/functional.py` file, navigate to the `l1_loss` function (line 3308) and add code to check if the reduction mode is `sum` and raise an exception:
3. Commit the changes to the `pull-request` branch. Make sure you add a meaningful commit message.
4. Push the `pull-request` branch to the remote repository.
5. Create a pull request to merge the `pull-request` branch into the `main` branch.
6. Approve the pull request.
7. Merge the `pull-request` branch into the `main` branch.



## Useful commands

- `git checkout -b <branch-name>` - creates a new branch and switches to it
- `git checkout <branch-name>` - switches to the specified branch
- `git merge <branch-name>` - merges the specified branch into the current branch
- `git status` - shows the status of the current branch
- `git add <file-name>` - adds the specified file to the staging area
- `git commit -m "<commit-message>"` - commits the staged changes with the specified commit message
- `git log` - shows the commit history
- `git log --oneline` - shows the commit history with each commit on a single line
- `git log --oneline --graph` - shows the commit history with each commit on a single line and the branches graph
- `git push origin <branch-name>` - pushes the specified branch to the remote repository
- `git pull origin <branch-name>` - pulls the specified branch from the remote repository
- `git branch -d <branch-name>` - deletes the specified branch
- `git commit --amend` - amends the last commit
- `git push origin --delete <branch-name>` - deletes the specified branch from the remote repository


## Resources
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Git Documentation](https://git-scm.com/doc)
- [Git Exercises](https://gitexercises.fracz.com/)

