# Git & GitHub Fundamentals


---

## 1. What Is Git, and Why Version Control?

### Learning Perspective
**Git** is a **distributed version control system (VCS)** — software that tracks changes to files over time, letting you record a history of every modification, revert to earlier states, and collaborate with others without overwriting each other's work.

**"Distributed"** is the key distinguishing word: **every developer's local copy of a repository is a full, complete copy of the project's entire history** — not just a snapshot of the current files. This is different from older, **centralized** version control systems, where only one central server held the full history, and local copies were typically just the current working files.

**Why this matters:**
- You can commit, branch, view history, and work fully offline — only synchronizing with others (via `push`/`pull`) when you choose to
- There's no single point of failure — if the central server goes down, every developer's local clone still has the complete project history
- Merging and branching are fast and cheap, since they're purely local operations

**Git vs. GitHub — an important distinction:** **Git is the version control tool itself** (works entirely locally, no internet required). **GitHub is a cloud-hosted platform** built around Git — providing remote repository hosting, collaboration features (pull requests, issues, code review), and social/discovery features. GitHub is one of several such platforms (GitLab and Bitbucket are common alternatives) — Git itself doesn't require GitHub (or any hosting service) to function.

### Interview Perspective
**Q: What's the difference between Git and GitHub?**
> Git is the version control system itself — a tool that tracks changes to code locally, entirely independent of any remote server. GitHub is a cloud platform built around Git, providing remote repository hosting plus collaboration features like pull requests, issue tracking, and code review. You can use Git without ever touching GitHub; GitHub is one of several popular hosting platforms built on top of Git (along with GitLab, Bitbucket, etc.).

**Q: Why is Git described as a "distributed" version control system, and why does that matter?**
> Because every clone of a repository contains the entire project history, not just the current files — unlike older centralized systems where only a central server held the full history. This means you can work, commit, and browse history fully offline, there's no single point of failure, and operations like branching and merging are fast since they happen locally rather than requiring constant server communication.

---

## 2. The Three (or Four) Core Areas

### Learning Perspective
Understanding Git requires understanding the distinct "areas" a file's changes pass through:

1. **Working directory** — the actual files on your filesystem, as you're currently editing them
2. **Staging area (the "index")** — a intermediate holding area where you **explicitly select** which changes will be included in the *next* commit, via `git add`
3. **Local repository** — where committed snapshots are permanently recorded (`.git` folder), via `git commit`
4. **Remote repository** — a copy of the repository hosted elsewhere (e.g., on GitHub), synchronized via `git push`/`git pull`

```
Working Directory  --git add-->  Staging Area  --git commit-->  Local Repo  --git push-->  Remote Repo
```

**Why a separate staging area exists (rather than just committing everything that changed):** it lets you **selectively choose exactly which changes go into a given commit** — even if you've modified multiple files, or multiple unrelated changes within the same file, you can stage and commit them separately, producing cleaner, more focused, more reviewable commits.

### Interview Perspective
**Q: Walk through Git's core areas, from editing a file to it being permanently recorded.**
> You edit a file in the working directory. `git add` moves those specific changes into the staging area. `git commit` takes what's staged and permanently records it as a snapshot in the local repository. `git push` then sends those local commits to a remote repository (like on GitHub), making them available to others.

**Q: Why does Git have a separate staging area, rather than just committing all current changes directly?**
> It lets you deliberately curate what goes into each commit — even if you've made several unrelated changes across your working directory, you can stage and commit them as separate, focused commits rather than lumping everything into one messy commit. This produces a cleaner, more meaningful project history that's easier to review, understand, and revert selectively if needed.

⭐ **Very frequently asked** — be ready to name and order these areas clearly; it's one of the most fundamental Git interview questions.

---

## 3. Core Commands: Init, Clone, Add, Commit, Status, Log

### Learning Perspective
```bash
git init                       # initialize a new, empty Git repository in the current directory
git clone <url>                 # copy an existing remote repository (including its full history) locally

git status                      # show current state: staged/unstaged changes, untracked files
git add <file>                  # stage a specific file's changes
git add .                       # stage all changes in the current directory
git commit -m "message"         # commit staged changes, with a descriptive message

git log                         # view commit history
git log --oneline               # condensed, one-line-per-commit view
git diff                        # show unstaged changes (working directory vs. staging area)
git diff --staged               # show staged changes (staging area vs. last commit)
```

**Commit messages matter:** a good commit message concisely explains **what** changed and, ideally, **why** — future developers (including yourself) rely on commit history to understand the reasoning behind past changes, not just what lines were edited.

### Interview Perspective
**Q: What's the difference between `git clone` and `git init`?**
> `git init` creates a brand-new, empty Git repository in the current directory — used when starting a new project. `git clone <url>` copies an *existing* remote repository (its full history and current state) down to your local machine — used when you want to start working on a project that already exists elsewhere.

**Q: What's the difference between `git diff` and `git diff --staged`?**
> `git diff` shows changes in your working directory that haven't been staged yet (comparing working directory to the staging area). `git diff --staged` shows changes that *have* been staged, but not yet committed (comparing the staging area to the last commit) — useful for reviewing exactly what you're about to commit before actually running `git commit`.

---

## 4. Branching & Merging

### Learning Perspective
A **branch** is an independent line of development — letting you work on a feature, fix, or experiment without affecting the main codebase until you're ready to integrate it.

```bash
git branch                      # list local branches
git branch <name>               # create a new branch (without switching to it)
git checkout <name>              # switch to an existing branch
git checkout -b <name>           # create AND switch to a new branch, in one step
git switch <name>                # modern, more explicit alternative to `checkout` for switching branches

git merge <branch-name>          # merge the named branch INTO your current branch
```

**Why branching is central to Git workflows:** it lets multiple people (or a single person working on multiple things) develop in parallel, in complete isolation, without stepping on each other's work-in-progress — changes only integrate into the shared main line once they're ready, via merging.

**Merge conflicts** occur when Git **cannot automatically reconcile** changes — typically because the **same lines of the same file** were modified differently on both branches being merged. Git marks the conflicting sections directly in the affected file(s), using conflict markers:

```
<<<<<<< HEAD
your current branch's version of this code
=======
the incoming branch's version of this code
>>>>>>> feature-branch
```

Resolving a conflict means manually editing the file to the correct final content, removing the conflict markers, then staging and committing the resolution.

### Interview Perspective
**Q: What is a branch, and why is branching central to collaborative Git workflows?**
> A branch is an independent, isolated line of development, letting you work on changes without affecting the main codebase until you're ready to integrate them. It's central to collaboration because it lets multiple people work on different features or fixes in parallel, entirely isolated from each other's in-progress work, merging their changes into a shared branch only once each piece is actually ready.

**Q: What causes a merge conflict, and how do you resolve one?**
> A merge conflict occurs when Git can't automatically reconcile two branches' changes — typically because the same lines of the same file were edited differently on each branch, and Git has no way to know which version (or combination) is correct. Git marks the conflicting sections directly in the file with conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`); resolving it means manually editing the file to the intended final content, removing the markers, then staging and committing the resolved file.

**Q: What's the difference between `git checkout -b <name>` and `git switch <name>`?**
> `git checkout` is a historically overloaded command — it's used both for switching branches *and* for restoring/discarding file changes, which can be a source of confusion. `git switch` (and its counterpart `git restore`) were introduced more recently specifically to separate those concerns — `git switch` is dedicated purely to switching (or, with `-c`, creating and switching) branches, making commands more explicit and less error-prone.

---

## 5. Working with Remotes: Push, Pull, Fetch

### Learning Perspective
```bash
git remote -v                    # list configured remotes (typically "origin")
git remote add origin <url>       # link a local repo to a remote

git push origin <branch>          # send local commits on a branch to the remote
git pull origin <branch>          # fetch AND merge remote changes into your current branch
git fetch origin                  # download remote changes WITHOUT merging them into your current branch
```

**The key distinction between `git pull` and `git fetch`:** `git fetch` downloads the latest changes from the remote **without** touching your working directory or current branch — it just updates your local knowledge of what's on the remote. `git pull` does the same download, **and then immediately merges** those changes into your current branch — effectively `git fetch` + `git merge` combined into one step.

**Why this distinction matters:** `git fetch` lets you **inspect** incoming changes (e.g., via `git log origin/main` or `git diff`) before deciding to actually merge them — giving more control than `git pull`'s automatic, immediate merge.

### Interview Perspective
**Q: What's the difference between `git pull` and `git fetch`?**
> `git fetch` downloads the latest changes from a remote repository, but doesn't merge them into your current branch — it just updates your local knowledge of the remote's state. `git pull` does the same download, but immediately merges those changes into your current branch as well — it's effectively `git fetch` followed automatically by `git merge`. `fetch` gives you a chance to review incoming changes before integrating them; `pull` integrates them right away.

**Q: Why might a more cautious developer prefer `git fetch` + manual review over `git pull`?**
> `git fetch` lets you inspect what actually changed on the remote (e.g., via `git log` or `git diff` against the fetched branch) before deciding whether and how to merge it — giving you a chance to catch unexpected changes or plan how to handle a merge, rather than `git pull` immediately and automatically merging whatever's on the remote into your current work.

---

## 6. Undoing Changes: Reset, Revert, Checkout

### Learning Perspective
Git offers several distinct ways to "undo" something, each with very different implications — a frequently confused area:

- **`git checkout -- <file>`** (or `git restore <file>`) — discards **uncommitted** changes to a specific file in the working directory, reverting it to match the last commit. **Destructive** — the discarded changes are gone.

- **`git reset`** — moves the **current branch pointer** to a different commit, with three modes controlling what happens to changes *after* that point:
  - **`--soft`** — moves the branch pointer only; changes from the "undone" commits remain **staged**
  - **`--mixed`** (default) — moves the branch pointer and **unstages** changes, but keeps them in the working directory
  - **`--hard`** — moves the branch pointer and **completely discards** those changes — **destructive**, use with caution

- **`git revert <commit>`** — creates a **new commit** that **undoes** the changes introduced by a specified previous commit, **without altering history** — the original commit still exists in the log; a new, opposite commit is added on top.

**The critical distinction: `reset` vs. `revert`:**
> `reset` **rewrites history** (moving/removing commits from the branch's timeline) — dangerous on shared/pushed branches, since it can cause serious problems for collaborators who've already pulled the commits being removed. `revert` **preserves history** and adds a new, corrective commit instead — safe to use on shared branches, since nothing that others may have already pulled ever disappears.

### Interview Perspective
**Q: What's the difference between `git reset` and `git revert`, and when would you use each?**
> `git reset` moves the branch pointer to a different commit, effectively rewriting history — the commits after that point are removed from the branch's timeline (though they may still exist temporarily until garbage collected). `git revert` creates a brand-new commit that undoes a previous commit's changes, without altering history at all — the original (now-undone) commit stays in the log. Use `revert` on any branch that's already been shared/pushed to others, since it doesn't disrupt anyone else's history. `reset` is generally safe only on local, unpushed commits that no one else has already pulled.

**Q: What's the difference between `git reset --soft`, `--mixed`, and `--hard`?**
> All three move the branch pointer to a specified commit, differing in what happens to the changes from the commits being "undone": `--soft` keeps those changes staged, ready to be re-committed differently. `--mixed` (the default) unstages them but leaves them in your working directory, as uncommitted edits. `--hard` discards those changes entirely — the most destructive option, since the changes are gone with no straightforward way to recover them (short of Git's internal reflog, in some cases).

⭐ **Extremely frequently asked** — the reset-vs-revert distinction (and *why* `reset` is dangerous on shared branches) is one of the single most common Git interview questions.

---

## 7. Pull Requests & Code Review (GitHub-Specific)

### Learning Perspective
A **pull request (PR)** — GitHub's term for this workflow (GitLab calls the equivalent a "merge request") — is a **proposal to merge changes from one branch into another**, opened for **discussion and review** before the merge actually happens.

**Typical PR workflow:**
1. Create a **feature branch** off the main branch
2. Make and commit changes on that branch
3. **Push** the branch to the remote (GitHub)
4. Open a **pull request**, comparing the feature branch against the target branch (typically `main`)
5. Teammates **review** the PR — leaving comments, requesting changes, or approving it
6. Once approved (and often once automated checks/CI pass), the PR is **merged** into the target branch

**Why PRs matter beyond just merging code:**
- **Code review** — a second set of eyes catches bugs, design issues, and knowledge gaps before code reaches the main branch
- **Discussion/documentation** — the PR itself becomes a permanent record of *why* a change was made, associated discussion, and any caveats
- **CI/CD integration** — automated tests and checks typically run against a PR before it's allowed to merge, catching regressions early

### Interview Perspective
**Q: What is a pull request, and why is it a central part of collaborative development workflows?**
> A pull request proposes merging one branch's changes into another, opened specifically for discussion and review before that merge happens. It's central to collaboration because it enforces a review step — catching bugs and design issues before they reach the main codebase — while also serving as a documented record of what changed and why, and typically triggering automated tests/CI checks that must pass before the merge is allowed.

**Q: What's the difference between a "pull request" and a "merge request"?**
> They're the same concept, using different platform-specific terminology — "pull request" is GitHub's (and Bitbucket's) term, "merge request" is GitLab's term. Both describe a proposed merge of one branch into another, opened for review before it's completed.

---

## 8. `.gitignore` & Managing What Gets Tracked

### Learning Perspective
A **`.gitignore`** file specifies **files and directories that Git should not track** — patterns matching things like build artifacts, dependency folders (`node_modules/`), environment/secret files (`.env`), OS-specific files (`.DS_Store`), and IDE configuration, which shouldn't be committed to version control.

```
# .gitignore example
node_modules/
.env
*.log
__pycache__/
.DS_Store
```

**Why this matters:** committing things like dependency folders or secrets bloats the repository unnecessarily (dependencies should be reinstalled via a package manager, not version-controlled directly) and can create serious **security risks** (accidentally committing API keys, passwords, or other credentials directly into a repo's permanent history — which is difficult to fully scrub even after removal, since the history persists).

### Interview Perspective
**Q: What's the purpose of a `.gitignore` file, and what kinds of things typically belong in it?**
> It tells Git which files/directories to exclude from version control entirely — commonly build artifacts, dependency folders, environment/secret files, and OS/IDE-specific files. It matters both for keeping the repository clean and appropriately sized (dependencies shouldn't be committed; they're reinstalled via a package manager) and for security (preventing secrets/credentials from ever being committed in the first place).

**Q: What would you do if you accidentally committed a secret (like an API key) to a Git repository?**
> Simply deleting the file in a later commit isn't enough — the secret still exists in the repository's history and is recoverable. You'd need to rotate/invalidate the leaked credential immediately (treating it as compromised, regardless of cleanup), and then use tools designed to actually purge it from history (like `git filter-repo` or BFG Repo-Cleaner) if the repository's history genuinely needs to be scrubbed — though if the repo has already been pushed/shared, assume the secret may have already been seen, which is why rotating the credential is the non-negotiable first step.

⭐ **Frequently asked as a practical/scenario question** — interviewers like probing whether candidates understand that deleting a file doesn't remove it from history, and that rotating the credential is the real fix.

---

## 9. Rebasing (Brief Overview)

### Learning Perspective
**`git rebase`** is an alternative to merging — instead of creating a merge commit that combines two branches' histories, rebase **replays your branch's commits on top of another branch**, producing a **linear, cleaner-looking history** without a merge commit.

```bash
git checkout feature-branch
git rebase main   # replays feature-branch's commits on top of the latest main
```

**Merge vs. rebase — the trade-off:**
- **Merge** — preserves the true, exact history of when branches diverged and merged (including a merge commit); non-destructive, safe on shared branches
- **Rebase** — produces a cleaner, linear history, but **rewrites commit history** (each replayed commit gets a new hash) — this makes it **dangerous on any branch that's already been shared/pushed**, for the same underlying reason `git reset` is risky on shared branches

**The common guidance:** "**never rebase a public/shared branch**" — rebasing is generally considered safe only for cleaning up your own local, not-yet-pushed (or not-yet-shared) commits before merging them into a shared branch.

### Interview Perspective
**Q: What's the difference between merging and rebasing, and why is rebasing considered riskier?**
> Merging combines two branches' histories with a dedicated merge commit, preserving exactly what happened, non-destructively. Rebasing replays your branch's commits on top of another branch, producing a cleaner, linear history — but it rewrites commit history in the process (generating new commit hashes), which is dangerous if anyone else has already pulled the original commits, since their local history will then conflict with the rewritten version. The standard guidance is to only rebase local, unshared commits, and never rebase a branch that others are already working from.

---

## Quick Interview-Prep Cheat Sheet

| Topic | One-line answer |
|---|---|
| Git vs. GitHub | Git = the version control tool (local); GitHub = a cloud platform hosting Git repos + collaboration features |
| Distributed VCS | Every clone has the full project history — no single point of failure, works offline |
| Core areas | Working directory → (git add) → Staging → (git commit) → Local repo → (git push) → Remote repo |
| `git clone` vs `git init` | Copy an existing remote repo vs. create a brand-new empty one |
| `git diff` vs `git diff --staged` | Unstaged changes vs. staged-but-not-committed changes |
| Branching | Isolated line of development, enabling parallel work without conflict |
| Merge conflict | Same lines of the same file changed differently on both branches — resolved manually |
| `git pull` vs `git fetch` | Fetch + auto-merge vs. fetch only, review before merging |
| `git reset` vs `git revert` | Rewrites history (risky if shared) vs. adds a new commit undoing changes (safe if shared) |
| `reset --soft`/`--mixed`/`--hard` | Keeps changes staged / unstaged-but-present / fully discarded |
| Pull request | Proposed merge, opened for review/discussion/CI checks before merging |
| `.gitignore` | Excludes files (dependencies, secrets, build output) from version control |
| Leaked secret in Git history | Rotate the credential immediately — deleting the file alone isn't enough |
| Merge vs. rebase | Preserves true history (safe, shared) vs. linear rewritten history (risky if shared) |