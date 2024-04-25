---
title: Git Status
description: Quick way to get the status of multiple repositories at a time
draft: false
date: 2023-11-06T06:00:00.000Z
tags:
  - 100DaysToOffload
  - git
  - powershell
---

On my Linux machines, I found a Git summary script to scan a directory and print out a table to all the Git summary not only for one directory but a list of directories. From my experience, when you clone a git repository, all the repositories usually end up in one directory, whether that is your `Github` or personal `git` folder, they all get bundled.

When it comes toe checking on a repository, you can run git status and see what has changed and what needs to be done about it, locally or on the remote branch. For me, I have one directory for all my cloned and working repositories and work on them all. Sometimes it is nice to be on the parent folder and know the status of the sub git repos.

First is to gather all the repositories in a folder that have a `.git` folder. This is the folder that contains the brains of our repository and to know how to keep it in sync with the remote branch for changes that need to be made locally or synced remotely.

To get started, I can get the list of all the folders.

```powershell
Get-ChildItem -Path $cwd -Recurse -Depth 2 -Force
```

I only need to go one subfolder down to get to the `.git` folder. When running this initially, we will not see the folder, that is because the folder is a hidden system folder on Windows.

```powershell
Get-ChildItem -Path $cwd -Recurse -Depth 2 -Force |
  Where-Object { $_.Mode -match "h" -and $_.FullName -like "*\.git" } |
    ForEach-Object {
      $dir = Get-Item (Join-Path $_.FullName "../")
      # quickly change directory to the .git dir.
      pushd $dir
      Write-Host $_.Full
      # Go back to the previous root directory
      popd
    }
```

Now I can see the folder name because I'm looking for hidden objects with the `$_.Mode -match "h"`.

This is where the fun begins. Within the `ForEach-Object` I will look for the following items

* Branch name
* Repository name
* Untracked files
* New files
* Modified files
* If the local copy of the repository is ahead or behind the remote

To get started, I need the branch name. This is also stored in the git `HEAD`, and how [git knows](https://git-scm.com/book/en/v2/Git-Internals-Git-References) what branch is checked out to work on locally.

```powershell
$branchName = git rev-parse --abbrev-ref HEAD
```

Next is the repository name. This seems simple by getting the folder name, but when cloning a repository, we can change the folder it gets cloned to.

```powershell
$repoName = (git remote get-url origin | Split-Path -leaf) -replace ".{4}$"
```

This was a little interesting. The `git remote get-url origin` gets the URL of the remote location for the repository. So something like

```powershell
https://github.com/cjerrington/cjerrington.github.io.git
```

By using `Split-Path -Leaf` I get the repo name. I was able to take off the `.git` with the `replace` statement to strip the last four characters off the leaf. I tried a replacement of `.git` to a blank character, but that took out the `.git` in `.github` as well.

For tracking the untracked, new, and modified status, I can use `git status` and select a string and store that to a variable.

```powershell
# Check local status
$untrackedFiles = git status | Select-String Untracked
$newFiles = git status | Select-String "new file"
$modifiedFiles = git status | Select-String modified 

if( $untrackedFiles ){ $repoStatus += "?" }
if( $newFiles ){ $repoStatus += "+" }
if( $modifiedFiles ){ $repoStatus += "M" }
```

Checking for the remote status was neat, especially in this context where branch names change and there is no standard. With Git, you can check the difference in your local commit history with the remote and count the difference. You can check the local to the remote, and remote to local, thus checking if you are behind or ahead of the remote branch to keep your file tracking in sync.

```powershell
# Check remote status
$repoAhead=$(git rev-list --count origin/$branchName..$branchName)
$repoBehind=$(git rev-list --count $branchName..origin/$branchName)

if ( $repoAhead -ne 0 ){ $repoStatus += "^" }
if ( $repoBehind -ne 0 ){ $repoStatus += "V" }
```

All of this is checked in each directory that has the .git folder. Now it is time to output our results.

```powershell
# Add items to custom object
[pscustomobject]@{
  RepoName = $repoName
  BranchName = $branchName
  RepoStatus = $repoStatus
}
```

When running this as is, the PSCustomObject made each Git repository its own object. By turning the bulk of the code into a function, then setting a variable to the Object and returning the Object, I could get the pretty table I was after.

```powershell
RepoName              BranchName RepoStatus
--------              ---------- ----------
blog                  main       MV
Bookmarks             main
cjerrington           main
cjerrington.github.io master      ?
```

The status symbols are as followed:

| Status | Meaning                               |
| ------ | ------------------------------------- |
| M      | Modified files                        |
| +      | New files                             |
| ?      | Untracked files                       |
| ^      | Local repository is head of remote    |
| V      | Local repository is behind the remote |

From here I can see that my blog repo has locally modified files and also has files I can pull from the remote as well. My website repository has untracked files that are needing to be added to git to then be synced with the remote repository. Once the `git add filename.txt` is done, the `?` will change to `+` since now the files are added to git.

I went a step further and added CmdletBinding to the script since I would like to add this to my [profile ](/blog/create-powershell-profile/)and be able to specify a specific folder as well as the multiple directories.

```powershell
[CmdletBinding()]
param (
    [Parameter(Mandatory=$false)]
    [string]$cwd = (Get-Location).Path
)

Function Git-Status {
  # git status code here
}

$Object = Git-Status
$Object
```

Now when calling the script directly, I can specify a folder path from anywhere on the system.

```javascript
Git-Status.ps1 -cwd "C:\git"
```

Feel free to use, and update if needed, the full script located in my [snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/powershell/Git-Status.ps1).
