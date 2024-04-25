---
title: Using Cheat sheets
description: How to quickly get help with command line commands and other resources
tags: 
  - shell
  - snippets
  - 100DaysToOffload
draft: false
date: 2023-10-01
---

Recently I have come across a few other ways to get help on terminal commands and some examples. Sometimes you need a quick note about a command and there are a few ways to do this. Many terminal based languages and even the operating system have a help system.

- Powershell = Get-Help
- Linux = man

Both the commands can display help about the commands you need. Sometimes these are missing a few things, like good examples rather than just concepts of the command. This is where many 3rd party help systems come in to help.

There is a popular one I've used before called [cheat.sh](https://cheat.sh) where you can do a `curl` request to the site and the command.

{% highlight "shell" %}
curl cheat.sh/ls

# To display everything in <dir>, excluding hidden files:
ls <dir>

# To display everything in <dir>, including hidden files:
ls -a <dir>

# To display all files, along with the size (with unit suffixes) and timestamp:
ls -lh <dir>

# To display files, sorted by size:
ls -S <dir>

# To display directories only:
ls -d */ <dir>

# To display directories only, include hidden:
ls -d .*/ */ <dir>

# To display all files sorted by changed date, most recent first:
ls -ltc 

# To display files sorted by create time:
ls -lt

# To display files in a single column:
ls -1

# To show ACLs (MacOS):
# see also `cheat chmod` for `/bin/chmod` options for ACLs
/bin/ls -le

# To show all the subtree files (Recursive Mode):
ls -R

 ...
{% endhighlight %}

## Issues on Windows

I ran this with PowerShell and we had to select the `Content` to get it to output right. So to get around this, I wrote a PowerShell wrapper around this concept.

{% highlight "powershell" %}
function cht{

  [CmdletBinding()]
  param (
      [Parameter(Mandatory)]
      [string]$cht
  )

  try {
      (Invoke-WebRequest -UseBasicParsing https://cht.sh/$cht).Content
  }
  catch {
      Write-Output "There was an issue finding help."
  }

}
{% endhighlight %}

This wrapper function takes a parameter which is your command to search for, then does the `Invoke-WebRequest` and selects the `Content` already for us.

Check out the full function on my [snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/powershell/cht.ps1)

## Other alternatives

I have used `cheat.sh` for quite a while, but there are some alternatives, both online and offline offerings. All of these resources support many languages, operating systems, and more.

- [cheat.sh](https://cheat.sh/)
- [tldr pages](https://tldr.sh/)
- [Tealdeer](https://dbrgn.github.io/tealdeer/)
- [cheat](https://github.com/cheat/cheat)