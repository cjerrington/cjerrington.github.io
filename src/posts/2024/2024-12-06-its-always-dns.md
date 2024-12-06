---
title: It's always DNS
description: A story of when it was actually DNS.
date: '2024-12-06'
tags:
  - powershell
  - windows
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

Recently I was working on a migration to update a service and it involved DNS changes. The fun tag line is "It's always DNS, even when it's not DNS", this time it was.

We worked with the teams that could do the updates, waited for our TTL to expire and re-query the addresses to ensure they updated and reflected on the systems accordingly. Some larger DNS zone are configured to have an internal DNS zone and external DNS zone. We quickly saw our DNS updated externally, but had issues internally.

Quickly we began clearing the DNS cache on the server and checking again. Next, we checked our additional sub-networks and noticed it was correctly updated in two of the three. After waiting a while, we decided to dig into it in the morning, thinking it was the DNS servers cache that was the problem and needed someone to restart that server and things would start working.

As we came in the next day it still wasn't working. A few of the networking team members did some digging and research into the routes and where the problem could be. In the mean time I decided to write a quick PowerShell script to query the DNS records so I could tell when it updated.

What I decided to do was do a loop that would query for the DNS records but sleep on the TTL. I was seeing some of the results from `Resolve-DNSName` had the TTL from the DNS zone and the systems TTL since the last cache. Using this I was able to use a sleep command to wait and query when the system would naturally check for the DNS results and not keep querying when it wasn't needed.

```powershell
$hostheader = "www.claytonerrington.com"

while ($true){
    $date = Get-Date -Format "HH:mm:ss"
    $resolve = Resolve-DnsName $hostheader

    $timeTTL = $resolve.TTL | Sort-Object | Select-Object -First 1
    Write-Host "$date $($resolve.NameHost)"

    [int]$Time = $timeTTL
    $Length = $Time / 100
    for ($Time; $Time -gt 0; $Time--) {
        $min = [int](([string]($Time/60)).split('.')[0])
        $text = " " + $min + " minutes " + ($Time % 60) + " seconds left"
        
        Write-Progress -Activity "Waiting for..." -Status $Text -PercentComplete ($Time / $Length)
        Start-Sleep 1
    }
}
```

```text
16:34:51 cjerrington.vercel.app
16:37:52 cjerrington.vercel.app
16:38:37 cjerrington.vercel.app
16:43:40 cjerrington.vercel.app
Waiting for... [ 4 minutes 27 seconds left                ]
```

I was able to use the systems TTL cache to sleep the script and wait till it was ready to check if a new result was available. The fun was adding in the `Write-Progress` so I could have a visual timer of when the next check would happen. Then it would display on the screen.

When using a `CNAME` record the output needs to use the `NameHost` property, and for `A` records the `IPAddress` property. This was a quick write, and can be helpful for other types of DNS changes and waiting to see the updates. The response could be updated based on the DNS item checked as well, and can just let it run without needing to retype the commands in repeatedly.
