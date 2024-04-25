---
title: 'How to Create a PowerShell Profile'
description: "Speed up your PowerShell use with some profiling"
tags:
  - powershell
date: 2020-03-03
---

Every time you launch a PowerShell console, a profile is loaded that contains settings and much more to use. This is a great place to put your automation tasks and repetitive items if you are frequently using a console. Let's find out.

Setting up the profile
----------------------

To begin, lets see if we have a profile. Run the following to see.

```powershell
Test-Path $PROFILE
```

If this returns False we do not have a profile. This is also found in the user profile as $env:USERPROFILE\Documents\WindowsPowerShell\Microsoft.PowerShell\_profile.ps1

To create a new profile we can run the following:

```powershell
 New-Item –Path $Profile –Type File 
```

Adding to the profile
---------------------

Now with a new profile file we can open it with notepad $PROFILE. Doing so we can start to add some of our functions and console settings.

Adding common commands or repetitive tasks is as easy as adding it to the profile file and then saving. Once saved we need to reload the profile by dot sourcing the profile. This will run the profile ps1 file and add the changes to the same console. You can also close and reopen PowerShell.

```powershell
. $PROFILE
```

Lets add some small changes to our profile. There is some text that displays when launching a new PowerShell

```powershell
function version{
  Write-host "PowerShell Version: $($psversiontable.psversion.major) - ExecutionPolicy: $(Get-ExecutionPolicy)" -for cyan
}
```

Once we save this and relaunch PowerShell we can run our new function. Just type version and see the output. We'll get the following:

```powershell
PowerShell Version: 5 - ExecutionPolicy: Restricted
```

You can add functions, aliases, and console changes for PowerShell. Hope this helps your console needs.