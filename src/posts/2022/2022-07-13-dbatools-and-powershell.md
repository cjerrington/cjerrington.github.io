---
title: "dbatools and PowerShell"
description: "How using dbatools has speed up my SQL processing with PowerShell."
tags:
  - powershell
  - sql
date: 2022-07-13
---

PowerShell is great to use with a Microsoft SQL server. There are plenty of ways to work with a SQL server from [Microsoft's SQL module](https://docs.microsoft.com/en-us/sql/powershell/download-sql-server-ps-module?view=sql-server-ver16), by calling the underlying [.NET classes](https://www.delftstack.com/howto/powershell/running-sql-queries-in-powershell/), but recently I found [dbatools](https://dbatools.io)!

What is the best way to describe dbatools? Let's take it straight from their [webpage](https://dbatools.io/getting-started/): dbatools is a free PowerShell module with over 500 SQL Server administration, best practice and migration commands included.

While they have a great way to get the [modules installed](https://dbatools.io/download/), I found we needed a few extra items. First PowerShell no longer supports TLS1.0 and we need to enforce TLS1.2 by calling the .NET class for this. I enjoyed the first entry-level taste of dbatools that I wrote a quick script to help get it installed or imported properly at the beginning of the script.

One thing I have found when using extra modules that are not part of the "default" core of PowerShell we still need to import the module. This helps the script no matter what to know what the functions are later on and what the script and server are to be using. So how did I get this installed in mass, lets see!

## Installing dbatools

```powershell
if (Get-Module -ListAvailable -Name dbatools) {
    Write-Host "dbatools Module exists"
    Import-Module -Name dbatools
} 
else {
    Write-Host "dbatools Module does not exist"
    Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Install-Module -Name dbatools
    Import-Module -Name dbatools
}
```

Having the above at the top of my new and improved SQL script I can always rest easy knowing that I am first checking the system for the module with the `Get-Module`. If the module exists, we import it. Otherwise, we need to first set the systems package provider with NuGet and set the TLS settings for the session and install the dbatools module. Then once it is installed, import it with `Import-Module` to ensure the install was a success.

Now that we have dabtools installed we can do some fun things to ensure its working.

```powershell
Find-DbaInstance -ComputerName localhost | Select ComputerName,SQLInstance -Unique
```

With this tidbit we can find all the SQL instances on the machine and get the instances running on that server. With this information we might be able to make a selection for the user to confirm the SQL instance to use, then the database to use, etc. All building off of using the commandlets to get the information rather than hard coding or asking the user to pass along variables.

## Using dbatools and PowerShell

Since dabbling with a few of the commands and what we could do with this new toolset, I found writing SQL queries to be a bit challenging. Lets say we had an input using `Read-Input` asking the user for some text that we needed to then use in our query. dabtools does allow the use of SQL files for the queries or they can be directly added to the script. I had a simple script and adding the query to the PowerShell was easier than using and keeping up with yet another file. But how to do this... that was the issue.

So we setup the user input:

```powershell
$customer = Read-Host "What is the client name you are looking for?"
```

Then our query:

```powershell
$query="SELECT Product,Customer FROM Store WHERE Customer like '%$customer%'"
```

Then we use our new SQL query command: 

```powershell
Invoke-DbaQuery -SqlInstance localhost -Query $query
```

This would always not return the result I was looking for. I was thinking logically this query works in SQL or SSMS so why not in PowerShell? The `Invoke-DbaQuery` command was not properly handling the "embedded" PowerShell variable into the query. The `Invoke-DbaQuery` does allow you to pass along `-SqlParameter` and have the variable added that was as well. For me this was still not working. I tried encapsulating the `$customr` variable with `$($customer)` forcing the string to know this was a variable. Still no luck. Then I remembered.

Just like in C# I'd have to allow the string to be allow escapes and allow for a multi-line variable. This also helped with formatting. So our query from early became:

```powershell
$query=@"
SELECT Product,Customer 
FROM Store 
WHERE Customer like '%$($customer)%'
"@
```

After making the change here the query worked as it should and output to the screen. To better manipulate the output I found that I could put the `Invoke-DbaQuery` into a variable `$output` and then pass it along to the `Out-GridView` where PowerShell takes the results and makes a pretty GUI window that you can use as well.

```powershell
$output | Out-GridView
```

Then to wrap up the script it is always good to properly close your connections to SQL. dbatools has a way to `Get-DbaConnections` and just like other PowerShell commands, pass this to the `Disconnect-DbaInstance`. I then passed this to `Out-Null` just so that way I didn't have to see the connections or disconnections in the script, since I knew the database instance already.

```powershell
# disconnect SQL Connections
Get-DbaConnectedInstance | Disconnect-DbaInstance | Out-Null
```

Hope now you can find a great use for [dbatools](https://dbatools.io) like I have. I plan on using the database migration, backup, and clone functions as well.
