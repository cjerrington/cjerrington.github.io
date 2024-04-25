---
title: Using PSCustomObjects
description: I have been really enjoying custom objects in PowerShell lately
draft: false
date: 2023-12-13T00:00:00.000Z
tags:
  - 100DaysToOffload
  - coding
  - powershell
---

When using PowerShell, it took a while to see that almost everything is an object. So what can you do with these objects? Sort them, select certain data, and put a lot of data in one object. The best time I've found to use PSCustomObjects is when running a loop and getting that data returned in one object, similar to how `Get-ChildItem` returns an object of details on the files in that directory. The default output is not all the values you have access to.

Setting up your custom object is pretty simple.

{% highlight "powershell" %}
[PSCustomObject]@{
  Hostname = $Value
  IPAddress = $Value
  Processor = $Value
  Cores = $Value
  Ram = $Value
  OperatingSystem = $Value
  SerialNumber = $Value
}
{% endhighlight %}

What I like is the ability to get a lot of data from different sources and pull it all together in on returnable object. I can then query based on that and also make it easier to export and see the data in the terminal as well.

So let's bring this together in a simple system info script. Starting off with a list of computers.

{% highlight "powershell" %}
$computers = @($env:COMPUTERNAME, "localhost")
{% endhighlight %}

Now we can take the $computers object and loop over each object and do something to it.

{% highlight "powershell" %}
$computers | ForEach-Object {

    $ip=[System.Net.Dns]::GetHostAddresses($_) | Where-Object {$_.AddressFamily -notlike "InterNetworkV6"} | ForEach-Object {
        [PSCustomObject]@{
            IPAddress = $_.IPAddressToString
        }
    }        
    $ProcessCountInfo = Get-CimInstance -ComputerName $_ -ClassName Win32_processor | Select-Object @{'Name' = 'Model'; Expression= {$_.Name}},@{'Name' = 'Description'; Expression= {$_.Caption}},@{'Name' = 'Cores'; Expression= {$_.NumberOfCores}}
    $GetSystemInfo = Get-CimInstance -ComputerName $_ -Class win32_ComputerSystem #| Select-Object DomainRole,Domain,PartOfDomain,Name,TotalPhysicalMemory,Model,Manufacturer
    $Ram = [Math]::Round($GetSystemInfo.TotalPhysicalMemory / 1GB)
    $SerialNumber = Get-CimInstance -ComputerName $_ -Class Win32_SystemEnclosure | Select-Object SerialNumber
    $OS = (Get-CimInstance -ComputerName $_ Win32_OperatingSystem).Caption

    [PSCustomObject]@{
        Hostname = $_
        IPAddress = $ip.IPAddress
        Processor = $ProcessCountInfo.Model
        Cores = $ProcessCountInfo.Cores
        Ram = "$Ram GB"
        OperatingSystem = $OS
        SerialNumber = $SerialNumber.SerialNumber
    }
}

Hostname        : MyDesktop
IPAddress       : 10.0.0.15
Processor       : AMD EPYC 7R13 Processor
Cores           : 2
Ram             : 16 GB
OperatingSystem : Microsoft Windows Server 2019 Datacenter
SerialNumber    : FY8E4V

Hostname        : localhost
IPAddress       : 10.0.0.15
Processor       : AMD EPYC 7R13 Processor
Cores           : 2
Ram             : 16 GB
OperatingSystem : Microsoft Windows Server 2019 Datacenter
SerialNumber    : FY8E4V

{% endhighlight %}

This example is taking the list of computers and as we go to each computer, we are querying multiple system data, adding it to the variables, then in the custom object, we have the name of the column we want on the left and the data on the right. As we loop over the initial object, computer, it is getting data of each one and add it to the object. Once the loop is over, it outputs the data.

In this example, this only exports to the terminal in a nice table. We can assign this to a variable as well, do the loop of data. Once it's done, we can query the result on the property in the custom object.

{% highlight "powershell" %}
$result = $computers | ForEach-Object {
    # Do data gathering

    [PSCustomObject]@{
        Hostname = $_
        IPAddress = $ip.IPAddress
        Processor = $ProcessCountInfo.Model
        Cores = $ProcessCountInfo.Cores
        Ram = "$Ram GB"
        OperatingSystem = $OS
        SerialNumber = $SerialNumber.SerialNumber
    }

}

Write-Host $result
{% endhighlight %}

Now this is in the variable, $result. I can now get just the IP Addresses, or other properties in the object.

{% highlight "powershell" %}
Write-Host $result.Hostname
MyDesktop
localhost
{% endhighlight %}

If you noticed, I added a custom object in the `$ip` variable. There is a lot more we can do with PSCustomObjects and this is just the start of some of what we can do.

## References

Here are some references I have used to help get a better understanding in the past.

- [Everything you wanted to know about PSCustomObject](https://learn.microsoft.com/en-us/powershell/scripting/learn/deep-dives/everything-about-pscustomobject?view=powershell-7.4)
- [About PSCustomObject](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pscustomobject?view=powershell-7.3)
- [Powershell: Everything you wanted to know about PSCustomObject](https://powershellexplained.com/2016-10-28-powershell-everything-you-wanted-to-know-about-pscustomobject/)
