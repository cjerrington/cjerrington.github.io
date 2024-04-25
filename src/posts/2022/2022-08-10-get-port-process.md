---
title: "How to get the Process a Port is Bound to"
description: "Have you ever needed to query a machine for a port but not sure what process is using that port? Here is a simple way to find that information out."
tags:
  - powershell
  - coding
date: 2022-08-10
---

Have you ever needed to query a machine for a port but not sure what process is using that port? Here is a simple way to find that information out.

## Setting the stage

To get started we need to look at a few PowerShell commands: [Get-Process](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process) and [Get-NetTCPConnection](https://docs.microsoft.com/en-us/powershell/module/nettcpip/get-nettcpconnection)

Let's start with `Get-Process` by running `Get-Process | Select -First 5`. You will see quite a bit of information, what we'll be interested in is the `Id` and `ProcessName`.

Next lets run `Get-NetTCPConnection | Select -First 5`. We'll now see some important properties: `LocalPort` and `OwningProcess`.

## Closer Investigation

With PowerShell what we see with the initial output is not all of the values that module exports to the screen for you. Try running `Get-NetTCPConnection | Select * -First 1`. Take note of the `OwningProcess` Property. We'll use this later. So we can specify a port to query for a port by using the `-LocalPort` property. On my machine I an running my Jekyll server to check my website and it runs on Port 4000. Let's try `Get-NetTCPConnection -LocalPort 4000`. I can see the `OwningProcess` is currently 19124.

So what's next? Lets see what the `Get-Process` can give us. With this module we can query by the `-Id`: `Get-Process -Id 19124` and we'll see the `ProcessName` will be ruby. This makes sense as Jekyll runs off Ruby! 

## Putting it together

PowerShell has a nice way to select the property value you are after by wrapping the command in parenthesis and specifying the value. For instance, let's get the `OwningProcess` from the port we're looking for.

Running `(Get-NetTCPConnection -Port 4000).OwningProcess` will select just the Owning Process. We can then see the process ID and pass that to `Get-Process`.

All together now!

```powershell
$port = 4000

(Get-Process -ID (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess).ProcessName
```

The Error Action is SilentlyContinue just incase the port we are looking at isn't found. We're using the `Get-Process` command and specifying the process id, but embedding the `Get-NetTCPConnection` output as the ID value.

After all of this, we can wrap this up in a function and make use of `Read-Host` to get some user input.

```powershell
function Get-PortProcess {

    Param
    (
         [Parameter(Mandatory=$true, Position=0)]
         [int] $port
    )
        
    try{
        $process = (get-process -ID (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess).ProcessName 
        
        Write-Host "$process is using port $port"
    }
    catch{
        write-Host "Cannot find anything on the port $port"
    }
}

while($true){
    $port = Read-Host "What port are you looking for?"
    Get-PortProcess $port
}
```

Hope this helps you!
