# Git Commands — Quick Reference

A practical, syntax-focused companion to `git-and-github-fundamentals.md`. That file covers the *concepts*; this one is a fast lookup for the actual commands, organized by category.

---

## 1. Configuration & Setup

| Command | Description |
|---|---|
| `git config --global user.name "Your Name"` | Set the name attached to your commits, globally (all repos) |
| `git config --global user.email "you@example.com"` | Set the email attached to your commits, globally |
| `git config --list` | View all current Git configuration settings |
| `git config --global init.defaultBranch main` | Set the default branch name for new repos (e.g., `main` instead of `master`) |
| `git config --global core.editor "code --wait"` | Set the default text editor Git opens for commit messages, etc. |

---

## 2. Starting a Repository

| Command | Description |
|---|---|
| `git init` | Initialize a new, empty Git repository in the current directory |
| `git clone <url>` | Copy an existing remote repository (full history included) to your local machine |
| `git clone <url> <folder-name>` | Clone into a specific folder name, instead of the default |
| `git clone --depth 1 <url>` | Shallow clone — only the most recent commit, not full history (faster for large repos) |

---

## 3. Checking Status & Viewing Changes

| Command | Description |
|---|---|
| `git status` | Show staged/unstaged changes and untracked files |
| `git diff` | Show unstaged changes (working directory vs. staging area) |
| `git diff --staged` | Show staged changes (staging area vs. last commit) |
| `git diff <branch1> <branch2>` | Show differences between two branches |
| `git diff <commit1> <commit2>` | Show differences between two specific commits |
| `git log` | View full commit history |
| `git log --oneline` | Condensed, one-line-per-commit history |
| `git log --oneline --graph --all` | Visual branch/merge graph across all branches |
| `git log -p` | Show full diff content for each commit in the log |
| `git log --author="name"` | Filter commit history by author |
| `git log -- <file>` | Show commit history affecting a specific file |
| `git show <commit>` | Show the details and diff of a specific commit |
| `git blame <file>` | Show who last modified each line of a file, and in which commit |

---

## 4. Staging & Committing

| Command | Description |
|---|---|
| `git add <file>` | Stage a specific file's changes |
| `git add .` | Stage all changes in the current directory (and subdirectories) |
| `git add -p` | Interactively stage changes in chunks ("patches"), rather than whole files at once |
| `git commit -m "message"` | Commit staged changes with a message |
| `git commit -am "message"` | Stage all tracked, modified files AND commit, in one step (skips new/untracked files) |
| `git commit --amend` | Modify the most recent commit (message and/or staged changes) instead of creating a new one |
| `git commit --amend --no-edit` | Add currently staged changes to the previous commit, keeping the same message |
| `git rm <file>` | Remove a file from both the working directory and Git tracking |
| `git rm --cached <file>` | Stop tracking a file in Git, but keep it in the working directory |
| `git mv <old> <new>` | Rename/move a tracked file (equivalent to `mv` + `git add` + `git rm`) |

---

## 5. Branching & Switching

| Command | Description |
|---|---|
| `git branch` | List local branches |
| `git branch -a` | List all branches, including remote-tracking ones |
| `git branch <name>` | Create a new branch (without switching to it) |
| `git branch -d <name>` | Delete a branch (safe — refuses if it has unmerged changes) |
| `git branch -D <name>` | Force-delete a branch, even with unmerged changes |
| `git branch -m <new-name>` | Rename the current branch |
| `git checkout <branch>` | Switch to an existing branch |
| `git checkout -b <branch>` | Create and switch to a new branch, in one step |
| `git switch <branch>` | Modern, explicit alternative to `checkout` for switching branches |
| `git switch -c <branch>` | Modern equivalent of `checkout -b` — create and switch |

---

## 6. Merging & Resolving Conflicts

| Command | Description |
|---|---|
| `git merge <branch>` | Merge the named branch into your current branch |
| `git merge --no-ff <branch>` | Force a merge commit even if a fast-forward merge would be possible (preserves branch history explicitly) |
| `git merge --abort` | Abort an in-progress merge and return to the pre-merge state |
| `git diff` (during a conflict) | Shows conflict markers directly in affected files |
| `git add <resolved-file>` | Mark a conflict as resolved after manually editing the file |
| `git commit` (after resolving) | Complete the merge once all conflicts are resolved and staged |

---

## 7. Working with Remotes

| Command | Description |
|---|---|
| `git remote -v` | List configured remotes and their URLs |
| `git remote add origin <url>` | Add a new remote named `origin` |
| `git remote remove <name>` | Remove a configured remote |
| `git remote rename <old> <new>` | Rename a remote |
| `git push origin <branch>` | Push local commits on a branch to the remote |
| `git push -u origin <branch>` | Push and set the upstream tracking branch (lets future `git push`/`pull` omit branch name) |
| `git push --force` | Force-push, overwriting the remote branch's history — **dangerous on shared branches** |
| `git push --force-with-lease` | A safer force-push — fails if the remote has commits you haven't seen yet |
| `git pull origin <branch>` | Fetch and merge remote changes into your current branch |
| `git pull --rebase` | Fetch, then rebase your local commits on top of the fetched changes, instead of merging |
| `git fetch origin` | Download remote changes without merging them |
| `git fetch --all` | Fetch from all configured remotes |

---

## 8. Undoing Changes

| Command | Description |
|---|---|
| `git restore <file>` | Discard uncommitted changes to a file in the working directory (modern) |
| `git checkout -- <file>` | Discard uncommitted changes to a file (legacy equivalent) |
| `git restore --staged <file>` | Unstage a file, keeping its changes in the working directory |
| `git reset <file>` | Unstage a file (legacy equivalent of `restore --staged`) |
| `git reset --soft <commit>` | Move branch pointer to `<commit>`; keep undone changes staged |
| `git reset --mixed <commit>` | Move branch pointer; unstage undone changes but keep them in the working directory (default mode) |
| `git reset --hard <commit>` | Move branch pointer; **completely discard** undone changes — destructive |
| `git revert <commit>` | Create a new commit that undoes a specific previous commit, without rewriting history |
| `git revert --no-commit <commit>` | Apply the revert but don't auto-commit — lets you review or combine with other changes first |
| `git clean -n` | Preview which untracked files would be removed by `git clean` |
| `git clean -fd` | Actually remove untracked files and directories — destructive |

---

## 9. Stashing

| Command | Description |
|---|---|
| `git stash` | Temporarily shelve uncommitted changes, reverting the working directory to match the last commit |
| `git stash save "message"` | Stash changes with a descriptive label |
| `git stash list` | List all stashed changesets |
| `git stash pop` | Reapply the most recent stash, and remove it from the stash list |
| `git stash apply` | Reapply the most recent stash, but keep it in the stash list too |
| `git stash drop` | Delete the most recent stash without applying it |
| `git stash show -p` | View the diff contents of the most recent stash |

---

## 10. Tags

| Command | Description |
|---|---|
| `git tag` | List all tags |
| `git tag <name>` | Create a lightweight tag at the current commit |
| `git tag -a <name> -m "message"` | Create an annotated tag (includes metadata: message, tagger, date) |
| `git tag <name> <commit>` | Tag a specific (not necessarily the latest) commit |
| `git push origin <tag-name>` | Push a specific tag to the remote |
| `git push origin --tags` | Push all local tags to the remote |
| `git tag -d <name>` | Delete a local tag |

---

## 11. Rebasing

| Command | Description |
|---|---|
| `git rebase <branch>` | Replay your current branch's commits on top of `<branch>` |
| `git rebase -i <commit>` | Interactive rebase — reorder, edit, squash, or drop commits since `<commit>` |
| `git rebase --continue` | Continue a rebase after manually resolving a conflict |
| `git rebase --abort` | Cancel an in-progress rebase, returning to the pre-rebase state |
| `git rebase --skip` | Skip the current conflicting commit during a rebase |

**Interactive rebase actions** (used inside the `-i` editor):
| Action | Effect |
|---|---|
| `pick` | Keep the commit as-is |
| `reword` | Keep the commit's changes, but edit its message |
| `edit` | Pause at this commit to make further changes |
| `squash` | Combine this commit into the previous one, merging messages |
| `fixup` | Combine into the previous commit, discarding this commit's message |
| `drop` | Remove the commit entirely |

---

## 12. Inspecting & Comparing

| Command | Description |
|---|---|
| `git show <commit>` | View a specific commit's changes and metadata |
| `git log --all --oneline --graph` | Visual overview of branch history and merges |
| `git branch --merged` | List branches already merged into the current branch |
| `git branch --no-merged` | List branches NOT yet merged into the current branch |
| `git shortlog -sn` | Summarize commit counts per author |
| `git reflog` | View a log of where `HEAD` has pointed recently — useful for recovering "lost" commits after a `reset --hard` |

---

## 13. Miscellaneous & Advanced

| Command | Description |
|---|---|
| `git cherry-pick <commit>` | Apply a specific commit from another branch onto your current branch |
| `git bisect start` | Begin a binary search through commit history to find which commit introduced a bug |
| `git submodule add <url>` | Add another Git repository as a submodule within your repository |
| `git worktree add <path> <branch>` | Check out another branch into a separate working directory, without switching your current one |
| `git archive --format=zip HEAD -o project.zip` | Export the current state of the repo as a zip file, without the `.git` history |
| `git filter-repo` | Rewrite repository history (e.g., to purge a leaked secret) — external tool, install separately |

---

## Quick Reference: Command → Situation

| I want to... | Command |
|---|---|
| Start tracking a new project | `git init` |
| Get a copy of an existing project | `git clone <url>` |
| See what's changed | `git status` / `git diff` |
| Save a snapshot of my work | `git add .` && `git commit -m "..."` |
| Work on something without affecting `main` | `git switch -c <branch>` |
| Combine my branch into another | `git merge <branch>` |
| Send my commits to GitHub | `git push origin <branch>` |
| Get others' latest commits | `git pull` |
| Undo uncommitted changes to a file | `git restore <file>` |
| Undo my last commit, but keep the changes | `git reset --soft HEAD~1` |
| Undo a commit that's already been shared | `git revert <commit>` |
| Temporarily set aside my in-progress work | `git stash` |
| Mark a release point | `git tag -a v1.0 -m "message"` |
| Clean up messy local commit history before merging | `git rebase -i <commit>` |
| Find which commit broke something | `git bisect start` |
| Recover a commit I think I lost | `git reflog` |

---

*A practical command lookup — see `git-and-github-fundamentals.md` for the underlying concepts (staging area, distributed VCS, reset vs. revert, merge vs. rebase, etc.).*