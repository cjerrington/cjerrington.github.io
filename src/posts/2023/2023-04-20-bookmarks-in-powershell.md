---
title: Bookmarks in PowerShell
description: Setting bookmark locations within the PowerShell console and quickly move into them
tags: 
  - automation
  - powershell
  - 100DaysToOffload
---

I work in the terminal quite a bit, and needed a quick way to change directories between projects. I started this based off a similar project in bash called [lazy-cd](https://github.com/pedramamini/lazy-cd/blob/master/lcd.sh). This works similarly as it stores the bookmarks you add to a file, and if the bookmark is found, the terminal location will be set accordingly.

Making this work, I knew a few functions were needed and was interested in some better function management. I learned a lot on processes, procedures, function arguments, and some simple regex to help search and find the bookmark item for each function and cleanly execute the task at hand.

## Functions

- `Check-Bookmark` - Initializing function to create bookmark file if needed
- `View-Bookmark` - List all the bookmarks that have been added to the library
- `Add-Bookmark <name>` - Adds the bookmark using the `<name>` and the current location you are in
- `Delete-Bookmark <name>` - Remove the specified bookmark line based on the `<name>`
- `Goto-Bookmark <name>` - If the bookmark `<name>` exists in the bookmark file, the terminal will `Set-Location` to the path defined.

## Aliases

|Alias|Function|
|-----------|-----------|
| bm | Goto-Bookmark |
| bma | Add-Bookmark |
| bmd | Delete-Bookmark |
| bmv | View-Bookmark |

## Usage

Download the the `bookmark.ps1` file and dot source it to your `Microsoft.PowerShell_profile.ps1`.

```powershell
. "path\to\bookmarks.ps1"

PS C:> bmv
You have 4 Bookmarks

Bookmark      Path
--------      ----
home          C:\Users\username
website       C:\git\cjerrington.github.io
snippets      C:\git\snippets
root          C:\
```

## Downloading and contributing

You can view the source code and help improve the process if needed as well. Check out the Bookmark repo on Codeberg. Oh, and to be exciting, it's less than 100 lines of code!

- [https://codeberg.org/cjerrington/Bookmarks](https://codeberg.org/cjerrington/Bookmarks)

### Thanks to a few

I was chatting on [mastodon](https://mstdn.social/@cjerrington/110211892885482441) the other day and got some great advice as well from a few folks on how to make this possible.

Thanks to the following for some inspiration!

- [lazy-cd](https://github.com/pedramamini/lazy-cd/blob/master/lcd.sh)
- [Benjamin Hollon](https://fosstodon.org/@benjaminhollon)
- [R. L. Dane](https://fosstodon.org/@RL_Dane)
- [David Sass](https://infosec.exchange/@sassdawe)
- [Bjompen](https://mastodon.nu/@bjompen)
- [furicle](https://mastodon.social/@furicle)