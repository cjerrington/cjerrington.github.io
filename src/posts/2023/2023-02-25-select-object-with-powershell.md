---
title: Select-Object with PowerShell
description: A quick glance at a small over-looked tool PowerShell has available to us
tags: 
  - coding
  - powershell
  - 100DaysToOffload
daet: 2023-02-25
---

Recently I was reading on social media a post where someone asked, "What is your favorite PowerShell command?". I saw many responses like `Get-Help`, `Get-ChildItem`, `Out-GridView`. One of my favorites is [Select-Object](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/select-object?view=powershell-7.3) since so many PowerShell commandlets return an object to display the data.

For example, when running `Get-ChildItem` you get some default output of the objects it return: Mode, LastWriteTime, Length and Name. Now when we pipe over `Select-Object` we can see there are more data objects in the return.

Try it out, `Get-ChildItem | Select-Object *`. The `*` will select all all items and show them in the console. I'll select the README.md for my website

{% highlight "powershell" %}
PSPath              : Microsoft.PowerShell.Core\FileSystem::C:\git\cjerrington.github.io\README.md
PSParentPath        : Microsoft.PowerShell.Core\FileSystem::C:\git\cjerrington.github.io
PSChildName         : README.md
PSDrive             : C
PSProvider          : Microsoft.PowerShell.Core\FileSystem
PSIsContainer       : False
Mode                : -a---
ModeWithoutHardLink : -a---
VersionInfo         : File:             C:\git\cjerrington.github.io\README.md
                      InternalName:
                      OriginalFilename:
                      FileVersion:
                      FileDescription:  
                      Product:
                      ProductVersion:
                      Debug:            False
                      Patched:          False
                      PreRelease:       False
                      PrivateBuild:     False
                      SpecialBuild:     False
                      Language:

BaseName            : README
Target              :
LinkType            :
Length              : 927
DirectoryName       : C:\git\cjerrington.github.io
Directory           : C:\git\cjerrington.github.io
IsReadOnly          : False
FullName            : C:\git\cjerrington.github.io\README.md
Extension           : .md
Name                : README.md
Exists              : True
CreationTime        : 7/13/2022 8:35:43 PM
CreationTimeUtc     : 7/14/2022 1:35:43 AM
LastAccessTime      : 2/25/2023 7:16:34 PM
LastAccessTimeUtc   : 2/26/2023 1:16:34 AM
LastWriteTime       : 2/4/2023 11:30:13 AM
LastWriteTimeUtc    : 2/4/2023 5:30:13 PM
LinkTarget          :
Attributes          : Archive
{% endhighlight %}

As you can see there are quite a few more object details gathered than what is initially shown to us. This quick commandlet can help you learn more about a command, or the object it is returning. I've used this to remind myself some of the additional items like Name, BaseName, FullName. It's nice to have these options available to you without extra work too.

When doing certain commands with PowerShell it is best to use the FullName, and that is already provided and we wont have to do a `Join-Path` quite as often.

Beyond selecting all properties, you can select what you need too.

{% highlight "powershell" %}
$files = Get-ChildItem | Select-Object Name,FullName

Write-Host $files

Name      FullName
----      --------
README.md C:\git\cjerrington.github.io\README.md
{% endhighlight %}

As you can see now, we have just what we might need in our `$files` object. With this though, we won't have other attributes like `Extension`. The other fun item with selecting data, is wrapping it around some parenthesis.

{% highlight "powershell" %}
$files = (Get-ChildItem).Name

Write-Host $files

README.md
{% endhighlight %}

In this example we are filtering the whole object as well and it only returns the `Name` property. PowerShell has a lot of neat little tricks like this that are helpful in the moment, but also in some scripts to possibly help ensure you get only the data properties you are needing and not accidentally doing something you don't meant to do. What is your favorite PowerShell command?
