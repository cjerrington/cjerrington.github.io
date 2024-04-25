---
title: Regex a UNC path
description: While working with files and paths I needed a way to extract a UNC path.
draft: false
date: 2023-10-18T00:00:00.000Z
tags:
  - 100DaysToOffload
  - powershell
  - windows
---

Not too long ago, I was working on a report of some data from some logon scripts. Part of what we were needing was the server name a logon script had in it to map a network drive. It was easy enough to get all the batch files and then read the file for the contents. 

I was able to use Select-String and specify a pattern to use against the file. Then for each match we can set that to a new variable and have just the UNC path. 

First, we need a file UNC path to look for. We'll use the following.

```powershell
$path = "net use Z: \\servername.domain.tld\fileshare /persistent::no"
```

Next we need to use Select-String and use a pattern, and regex in our case today.

```powershell
$pattern = '\\\\[a-zA-Z0-9\.\-_]{1,}(\\[a-zA-Z0-9\-_]{1,}){1,}[\$]{0,1}'
```

This pattern looks for the double backslashes, anything a-z, A-Z, and 0-9. Also allowing the . for a fully qualified hostname in the path, and finally the \ in the path. 

Now we need to put it all together.

```powershell
$path = "net use Z: \\servername.domain.tld\fileshare /persistent::no"
$pattern = '\\\\[a-zA-Z0-9\.\-_]{1,}(\\[a-zA-Z0-9\-_]{1,}){1,}[\$]{0,1}'

$path | Select-String -Pattern $pattern | ForEach-Object {$unc = $_.Matches.Groups[0].Value}
```

Finally, we see the $unc variable added in the For-EachObject that makes all the matches and assigns them to a specific variable we can use later. 

Now in the output we have just the path we need.

```powershell
Write-Host $unc
\\servername.domain.tld\fileshare
```

Regex is a powerful string manipulator, but can get very complex and detailed as well. This example was taken from a larger batch script that maps a network share to a path. There was more text in the file, but all we needed was the full UNC path. From here I was able to go a little further to use Split-String to get just the server name and share in separate stings as well.
