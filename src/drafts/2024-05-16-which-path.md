---
title: Which $PATH
description: "An overview of your systems path variable and knowing what is in it"
date: 2024-05-16T17:23:46.140Z
tags: 
  - linux
  - windows
---

Whatever operating system you use, the system has a `$PATH` it relies on to know where certain functions and processes are. These could be applications that are installed, or scripts you use regularly.

When you ask the terminal it looks at the `$PATH` for a command that matches what you asked for it to run. It starts at the top of the list and goes to the next path. This system variable is static to start with but can be dynamically changed as your terminal environment is configured.

Usually when you build programs from source or want to use a specific program, you can change the PATH variable order. This could be helpful for example, installing different versions of Python, or even testing a new version. Add the new version path to the top of the list and now you have both installed, and your terminal will find the top version first.

## What it looks like

So what does the $PATH look like?

**Linux**

```shell
echo $PATH

/home/clayton/.npm-global/bin:/usr/lib/powershell-7:/home/clayton/.npm-global/bin:/home/clayton/.npm-global/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/var/lib/flatpak/exports/bin:/usr/bin/site_perl:/usr/bin/vendor_perl:/usr/bin/core_perl:/home/clayton/.local/bin:/home/clayton/.local/bin:/home/clayton/.local/bin
```

**Windows**

```powershell
Write-Host $ENV:PATH

C:\ProgramData\Scoop\apps\pwsh\current;C:\Ruby31-x64\bin;C:\windows\system32;C:\windows;C:\windows\System32\Wbem;C:\windows\System32\WindowsPowerShell\v1.0\;C:\windows\System32\OpenSSH\;C:\Program Files\dotnet\;C:\Program Files (x86)\Microsoft SQL Server\160\DTS\Binn\;C:\Program Files\Azure Data Studio\bin;C:\Program Files (x86)\Gpg4win\..\GnuPG\bin;C:\Program Files\Amazon\AWSCLIV2\;C:\Program Files\Git\cmd;C:\Program Files\nodejs\;C:\ProgramData\Scoop\apps\dotnet-sdk\current;C:\ProgramData\Scoop\apps\vscode\current\bin;C:\Users\clayton\go\bin;C:\ProgramData\Scoop\apps\python\current\Scripts;C:\ProgramData\Scoop\apps\python\current;C:\ProgramData\Scoop\apps\mpv\current;C:\ProgramData\Scoop\apps\openssl\current\bin;C:\ProgramData\Scoop\apps\yarn\current\global\node_modules\.bin;C:\ProgramData\Scoop\apps\yarn\current\bin;C:\ProgramData\Scoop\shims;C:\Users\clayton\AppData\Local\Microsoft\WindowsApps;C:\Users\clayton\AppData\Local\GitHubDesktop\bin;C:\Users\clayton\.dotnet\tools;C:\Users\clayton\AppData\Local\Programs\Gpg4win\..\GnuPG\bin;C:\Program Files\WindowsPowerShell\Modules\GnuPg;C:\Users\clayton\.fly\bin;C:\Users\clayton\AppData\Local\gitkraken\bin;C:\Program Files\Azure Data Studio\bin;C:\Users\clayton\.dotnet\tools;C:\Users\clayton\AppData\Local\Programs\Neovim\bin;C:\Users\clayton\.dotnet\tools;C:\Users\clayton\AppData\Roaming\npm
```

That can be hard to read. There’s a lot of text separated by a semicolon and can be really long. On Windows there’s a character limit that can be changed to use a long character path with a [registry change](https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=registry).

To make the $PATH easier to read for a human, we can loop over the item like an array and print each path on a new line.

```shell
echo "$PATH" | tr ':' '\n'
# Or the following
echo "$PATH" | sed -e 's/:/\n/g'

/home/clayton/.npm-global/bin
/usr/lib/powershell-7
/home/clayton/.npm-global/bin
/home/clayton/.npm-global/bin
/usr/local/sbin
/usr/local/bin
/usr/bin
/var/lib/flatpak/exports/bin
/usr/bin/site_perl
/usr/bin/vendor_perl
/usr/bin/core_perl
/home/clayton/.local/bin
/home/clayton/.local/bin
/home/clayton/.local/bin

```

The `tr` command is part of [coreutils](https://www.gnu.org/software/coreutils/manual/html_node/tr-invocation.html#tr-invocation) and is used to translate, squeeze, and/or delete characters. This allows us to replace `:` with the new line return character `\n`. The other process that uses `sed` or the stream editor does the same thing.

For PowerShell we can use the `-Split` method on the variable. Naturally, this will add the new lines.

```powershell
$ENV:PATH -Split ";"

C:\ProgramData\Scoop\apps\pwsh\current
C:\Ruby31-x64\bin
C:\windows\system32
C:\windows
C:\windows\System32\Wbem
C:\windows\System32\WindowsPowerShell\v1.0\
C:\windows\System32\OpenSSH\
C:\Program Files\dotnet\
C:\Program Files (x86)\Microsoft SQL Server\160\DTS\Binn\
C:\Program Files\Azure Data Studio\bin
C:\Program Files (x86)\Gpg4win\..\GnuPG\bin
C:\Program Files\Amazon\AWSCLIV2\
C:\Program Files\Git\cmd
C:\Program Files\nodejs\
...
C:\Users\clayton\AppData\Local\Microsoft\WindowsApps
C:\Users\clayton\AppData\Local\GitHubDesktop\bin
C:\Users\clayton\.dotnet\tools
C:\Users\clayton\AppData\Local\Programs\Gpg4win\..\GnuPG\bin
C:\Program Files\WindowsPowerShell\Modules\GnuPg
C:\Users\clayton\.fly\bin
C:\Users\clayton\AppData\Local\gitkraken\bin
C:\Program Files\Azure Data Studio\bin
C:\Users\clayton\.dotnet\tools
C:\Users\clayton\AppData\Local\Programs\Neovim\bin
C:\Users\clayton\.dotnet\tools
C:\Users\clayton\AppData\Roaming\npm
```

What this can actually help with as well is, seeing multiple of the same paths, we can look at where our path variable is setup and try to trim down on the unneccessary items.

## Which apps are using it?

Now that we know what the path is, how can we tell where a program lives to know the exact program that is running? Let’s introduce the `which` command.

As the name states, you can ask your system `which node` or `which python` or `which pwsh`, and it’ll print the path to that command along with the executable. From there you can either add the new path to the `$PATH`, or ensure the program you want to use is being called from the right location.

```shell
which node
/usr/bin/node

which python3
/usr/bin/python3

which pwsh  
/usr/lib/powershell-7/pwsh
```

On Windows, `which` might be aliased to the `Get-Command` function.

```powershell
Get-Command node

CommandType     Name        Version    Source
-----------     ----        -------    ------
Application     node.exe    21.7.3.0   C:\Program Files\nodejs\node.exe

Get-Command python

CommandType     Name        Version    Source
-----------     ----        -------    ------
Application     python.exe   3.12.3150… C:\ProgramData\Scoop\apps\python\current\python.exe

Get-Command pwsh

CommandType     Name        Version    Source
-----------     ----        -------    ------
Application     pwsh.exe    7.4.2.0    C:\ProgramData\Scoop\apps\pwsh\current\pwsh.exe
```

## How to update it

After knowing what is the path, how its used, now you might want to update it. Reasons for updating could be pretty simple:

- You have your own scripts or function files
- You are installing new software
- Troubleshooting an issue with an application

### Linux

On linux your machine uses a [profile](https://tty1.blog/articles/shell-yes/) and you can `export` variables and also update them.

```shell
cat ~/.zshrc

export PATH=~/.npm-global/bin:$PATH

# Created by `pipx` on 2024-03-25 03:08:31
export PATH="$PATH:/home/clayton/.local/bin"
```

In this example you see that you can add a path then can add the oringal `$PATH` to the suffix: `/path/to/add:$PATH`. The colon, `:` is the path separator. The placement of the new path may either be before or after the new path you want to add.

### Windows

Windows is different and stores this item in the registry, which you can update for system wide things but also at the run time. This can also be used in your [PowerShell Profile](/blog/create-powershell-profile/)

```powershell
# replaces existing path)
$env:PATH = "SomeRandomPath";

# appends to existing path
$env:PATH += ";SomeRandomPath"
```

## Conclusion

Now you know more about Which $PATH to go down when using your console and some troubleshooting ideas as well when things do not work. You can even add a directory that has your own scripts to your path so then you no longer have to change directories to that folder. Since its in the path, your console will look in the `$PATH` setting for a command with what you are trying to run.
