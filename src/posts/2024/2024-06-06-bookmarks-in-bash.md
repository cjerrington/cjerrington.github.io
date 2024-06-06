---
title: Bookmarks in Bash
description: "Setting bookmark locations with the Bash console and quickly move into them"
date: 2024-06-06
tags: 
  - linux
  - automation
---

Recently I made a spare laptop of mine, my main computer since it was a little newer, and installed Linux overtop Windows 11. Since most of my daily work is on Windows, I enjoyed making [Bookmarks](https://codeberg.org/cjerrington/Bookmarks) and wrote about it as well [here](https://claytonerrington.com/blog/bookmarks-in-powershell/). Most of the inspriation came from [lazy-cd](https://github.com/pedramamini/lazy-cd/blob/master/lcd.sh) where you it creates a `~/.bookmarks` file and stores them for you.

When I installed [Endeavor OS](https://endeavouros.com/) on my laptop, which has been great, I also switched to the `zsh` [shell](https://www.zsh.org/) as well. You can learn more about `zsh` at the [Linux Handbook](https://linuxhandbook.com/why-zsh/). When I brought over my bookmarks and the `lcd.sh` script things didn't work right. Also, since I use my `bookmarks` daily in PowerShell, when I come home I wanted something that aligned better.

Yes, `zsh`, `ohmyzsh`, and others have command prediction and auto completion, but there is something that it's missing, and something like a static bookmarks prcocess like this works better for me in some cases.

I created `bookmarks.sh` in my `~/.local/bin` and got to work. I recreated the logic and process that aligns with how `bookmarks` for PowerShell operates. Keeping the same aliases or function names is great for my muscle memory while typing.

## Function

- `bm <bookmark>` - changes to the directory of the bookmark
- `bma <bookmark>` - Add a bookmark
- `bmv <bookmark>` - View the saved bookmarks
- `bmd <bookmark>` - Delete a bookmark
- `bmp <bookmark>` - Display a single bookmark

## Usage

Download the `bookmarks.sh` from my [dotfiles](https://codeberg.org/cjerrington/dotfiles/src/branch/main/stow_home/.local/bin/bookmarks.sh) to your machine and `source` the file in your terminal. It will create the `~/.bookmarks` file for you if it does not already exist.

To view the bookmarks

```shell
$ bmv

Bookmark Name  Bookmark Path
website        /home/clayton/git/cjerrington.github.io
home           /home/clayton
```

To change to a new directory
```shell
$ bm home
```

## Updates

While rewriting the process, I found a few helpful shortcuts. In the PowerShell version I was able to make a custom object of the `.bookmarks` file and add a nice heading for Bookmark and Path. The original solution in bash had some extra lines I could shorten with the `column` command since I was reading from a file.

```shell
  column -N "Bookmark Name","Bookmark Path" -t -s '|' $bookmarks_file
```

The `-N` allows for headings, the `-t` is for a table, and the `-s` is the separator character for the table.

Other updates from the original `lcd` script was similar to what I did in the PowerShell version - better output and working to help the end user.

## Downloading and contributing

Feel free to look at the source code in my [dotfiles](https://codeberg.org/cjerrington/dotfiles/src/branch/main/stow_home/.local/bin/bookmarks.sh) and use this process as well. I think it works pretty well and now have a system in place that works for either operating system I am working on.

Inspiration still from:

- [lazy-cd](https://github.com/pedramamini/lazy-cd/blob/master/lcd.sh)
- [Bookmarks](https://claytonerrington.com/blog/bookmarks-in-powershell/)