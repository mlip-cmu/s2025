# Lab 3: Git

## Prerequisites
- Github account
- Git installed on your local machine
  - Please use github cli or git directly


## Deliverables:

- [ ] Create and fix a merge conflict locally. Then, amend the merge commit to state that a merge conflict was resolved.
- [ ] Raise a pull request with your new changes. Show the the url of the pull request to a TA.
- [ ] Explain to a TA the difference between a cloned and forked repository, when you would use each, and why we use pull requests.

It is recommended that you use a git extension for your IDE to complete this lab. If you are using Visual Studio Code, you can use the [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) extension.

## Setup
1. **Clone** this PyTorch repository to your local machine - [Rajeevveera24/PyTorch-copy](https://github.com/Rajeevveera24/pytorch-copy) - by running the following command in your terminal:

```
git clone https://github.com/Rajeevveera24/pytorch-copy.git  # Feel free to use the SSH URL instead if you prefer
cd pytorch-copy
```

2. Open the repository in an IDE.

## Exercise 1: Create and Fix a merge conflict. Then amend the merge commit.

1. Create a new branch called `merge-conflict` from `main` branch.
2. Open the `torch/nn/functional.py` file, navigate to the `interpolate` function (line 4293) and change the resizing mode from `nearest` to `bilinear`:
3. Commit the changes to the `merge-conflict` branch. Make sure you add a meaningful commit message.
4. Switch back to `main` branch.
5. Open the `torch/nn/functional.py` file, navigate to the `interpolate`(line 4293) function and change the resizing mode from `nearest` to `bicubic` and `align_corners` to `True`:
6. Commit the changes to the `main` branch. Make sure you add a meaningful commit message.
7. Merge the `merge-conflict` branch into the `main` branch.
8. Resolve the merge conflict by keeping the resizing mode `bilinear` and `align_corners` `True`.
9. Commit the changes to the `main` branch.
10. Amend the merge commit to the following - "Merge from merge-conflict branch after resolving merge conflict".

## Exercise 2: Create a pull request to the original repository

1. Create a new branch called `pull-request` from `main` branch.
2. Push the `pull-request` branch to the remote repository.
3. Did you encounter any issues while pushing the branch? Try running the following command - `git remote -v` - to debug the issue (We expect you to understand the usage and output of this commmand)
4. Now, fork the [Rajeevveera24/PyTorch-copy](https://github.com/Rajeevveera24/pytorch-copy) repository. (You had only cloned it earlier)
5. Set the remote repository to your forked repository's URL (We expect you to find the correct command to do this)
6. Try pushing the `pull-request` branch to the remote repository again. You should succeed this time.
7. Create a pull request to merge the `pull-request` branch into `main` branch of [Rajeev-veara24/pytorch-copy](https://github.com/Rajeevveera24/pytorch-copy)
8. Save the URL of the pull request to show to a TA (It should be similar to [https://github.com/Rajeevveera24/pytorch-copy/pull/1](https://github.com/Rajeevveera24/pytorch-copy/pull/1)).



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
- [Simple Git Command Visualizations](https://learngitbranching.js.org/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Git Documentation](https://git-scm.com/doc)
- [Git Exercises](https://gitexercises.fracz.com/)
