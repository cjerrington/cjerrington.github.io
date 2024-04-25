---
title: Finding your Windows Install Date
description: Did you ever need to find when you installed your operating system? Check out the many ways to check your system.
tags: 
  - powershell
  - windows
  - 100DaysToOffload
size: wide
---

Did you ever need to find when you installed your operating system? Check out the many ways to check your Windows Operating System. I was reading another blog post by Adam's Desk on [How to Find the Linux Install Date](https://www.adamsdesk.com/posts/linux-install-date/) when I remembered how we can do this on a Windows operating system as well.

What I find the most interesting is how much information the operating system stores about itself and the tools and ways you can get that information. I'll explore the registry, the Windows Management Instrumentation or WMI, and a few built in system tools.

## Registry

Windows stores a lot of information in the Registry and there is an `InstallDate` key which stores the install date in seconds or UNIX time.

{% highlight "text" %}
Computer\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion
{% endhighlight %}

You can query this registry hive location and get the value of the `InstallDate` item. Since this will return a timestamp we need to convert that to a human readable timestamp. The second option below will show the Universal Time Zone or UTC of the date.

{% highlight "powershell" %}
# Get timestamp from registry
$installdate = (get-itemproperty 'HKLM:\Software\Microsoft\Windows NT\CurrentVersion').InstallDate

# Convert timestamp to local time from the Unix Time Stamp
Get-Date -UnixTimeSeconds $installdate

# Convert the timestamp to UTC time
(Get-Date -Date "1970-01-01 00:00:00Z").toUniversalTime().addSeconds($installdate)

# All in one way to get the infomration
[timezone]::CurrentTimeZone.ToLocalTime(([datetime]'1/1/1970').AddSeconds($(get-itemproperty 'HKLM:\Software\Microsoft\Windows NT\CurrentVersion').InstallDate))
{% endhighlight %}

## Using systeminfo

Windows has had the `systeminfo` command that has always been in the operating system that is gathers a bunch of information that is beneficial for many reasons. You can run the following either in Powershell or command promt and the pipe command we can then `find` and serach for the text we want from the output. 

{% highlight "shell" %}
systeminfo | find "Install Date"
{% endhighlight %}

The Powershell equivalent is the `Get-ComputerInfo` command. This has more information in the output object.

{% highlight "powershell" %}
Get-ComputerInfo | select OSInstallDate,WindowsInstallDateFromRegistry
{% endhighlight %}

## Using WMI

The Windows Management Instrumentation is a way to interact with the operating system at the OS level down to the driver and hardware level as well. You can perform changes to the OS and also gather information as well. In Powershell 5.1 and higher the `Get-CimInstance` is proffered over the `Get-WmiObject` and `wmic`. We need to query the `Win32_OperatingSystem` class in the WMI system to get the information we need.

{% highlight "powershell" %}
Get-CimInstance Win32_OperatingSystem | Select InstallDate
{% endhighlight %}

## History of the upgrades

Since the registry contains current and past information about the operating system, we can even query the system to check the original install and it even knows the history of the upgrades to the Operating System and build release updates.

{% highlight "powershell" %}
$OS=@(Get-ChildItem -Path HKLM:\System\Setup\Source* | ForEach-Object {Get-ItemProperty -Path Registry::$_}; Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion')

$OS | Select-Object ProductName, ReleaseID, CurrentBuild, @{Name='InstallDate'; Expression={[timezone]::CurrentTimeZone.ToLocalTime(([datetime]'1/1/1970').AddSeconds($_.InstallDate))}} | Sort-Object "InstallDate"
{% endhighlight %}

## Conclusion

As you can see there are many ways to gather system information from the operating system. With the many different ways to gather the information we can use the method that works best for us at the time. Some are a little quicker than others as well. The WMI calls have a history of being slow to return a value, while others might be simple in nature and more complex. Try building this into a system information script of your own!

What is your install date? Do you have a history of updates as well?