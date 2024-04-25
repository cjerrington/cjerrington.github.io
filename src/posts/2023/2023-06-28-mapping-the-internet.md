---
title: Mapping the internet
description: How to map out the IP trace of a domain with PowerShell and IP Geo Location services
tags: 
  - powershell
  - 100DaysToOffload
size: wide
---

Every domain has an IP address a domain is linked to. There are commandlets we can use in PowerShell like `Test-NetConenction` or to get the IP a website is hosted at. There are also geo location services, like [https://ipinfo.io](https://ipinfo.io) you can use to find a general location of where the IP resides and by who.

## Basics

To try this out we can run the following:

{% highlight "powershell" %}
Test-NetConnection -ComputerName claytonerrington.com

ComputerName           : claytonerrington.com
RemoteAddress          : 75.2.60.5
InterfaceAlias         : Local Area Connection
SourceAddress          : 10.8.0.6
PingSucceeded          : True
PingReplyDetails (RTT) : 72 ms
{% endhighlight %}

The Remote address is the IP the website resolves to to host the web content. If we go to [https://ipinfo.io](https://ipinfo.io) and look up 75.2.60.5, we'll see it is located in Seattle, Washington.

## Tracing the route

With command prompt we would run a `tracert` to see the hops and jumps your connection is taking to reach it's destination. This was helpful in troubleshooting network issues locally and across the globe with the internet. PowerShell built this into `Test-NetConenction` with an argument `-TraceRoute` and can now do two things with one command, ping and trace the route. One other neat addition is the `-Port` argument to test a connection to a specific port on the remote host.

{% highlight "powershell" %}
Test-NetConnection -ComputerName claytonerrington.com -TraceRoute
{% endhighlight %}

{% highlight "text" %}
ComputerName           : claytonerrington.com
RemoteAddress          : 75.2.60.5
InterfaceAlias         : Ethernet 5
SourceAddress          : 10.69.1.64
PingSucceeded          : True
PingReplyDetails (RTT) : 13 ms
TraceRoute             : 10.69.1.3
                         10.69.255.250
                         10.127.250.2
                         10.76.255.1
                         10.76.255.254
                         32.143.184.169
                         0.0.0.0
                         0.0.0.0
                         32.130.17.31
                         12.89.191.130
                         0.0.0.0
                         75.2.60.5
{% endhighlight %}

The hops or relaying conenctions are listed in the TraceRoute part of the generated object. With this we can see our source IP, hops to the external routes to reach the destination. The `0.0.0.0` are all hops where the provider did not respond with who they are. This is pretty common at the different network levels as well.

## Putting the locations together

With each of the IPs in the `TraceRoute` object we can loop through them and query the API for [https://ipinfo.io](https://ipinfo.io) or other provider.

{% highlight "powershell" %}
(Invoke-WebRequest "ipinfo.io/72.2.60.5?token=API-KEY-HERE").Content | ConvertFrom-Json
{% endhighlight %}

{% highlight "text" %}
ip       : 75.2.60.5
hostname : acd89244c803f7181.awsglobalaccelerator.com
anycast  : True
city     : Seattle
region   : Washington
country  : US
loc      : 47.5413,-122.3129
org      : AS16509 Amazon.com, Inc.
postal   : 98108
timezone : America/Los_Angeles
{% endhighlight %}

Now that we have gotten all the IPs between me and the remote website, we can loop through the `TraceRoute` object items and query each for location information and build out visual trace, or map to the remote destination. I've added a custom function to `Test-PrivateIP` so we can skip local IPs as our geo location service only has knowledge of external IP addresses.

{% highlight "powershell" %}
$trace = Test-NetConnection -ComputerName $domain -TraceRoute | Select-Object TraceRoute

$starting = (Invoke-WebRequest "ipinfo.io/?token=API-KEY-HERE").Content | ConvertFrom-Json
"# Running Trace for $domain" | Show-Markdown
Write-Host "Starting from: $($starting.ip)"
Write-Host "$($starting.ip) : $($starting.city), $($starting.region)"

$trace.TraceRoute | ForEach-Object {
    
    if((Test-PrivateIP -IP $_) -eq $False){
        
        $location = (Invoke-WebRequest "ipinfo.io/$($_)?token=API-KEY-HERE").Content | ConvertFrom-Json
        Write-Host "$_ : $($location.city), $($location.region)"

    }
}
{% endhighlight %}

{% highlight "text" %}
Starting from: 98.145.52.25
98.145.52.25 : El Centro, California
38.32.12.218 : Dallas, Texas
32.143.184.169 : Fort Worth, Texas
32.130.17.31 : Irving, Texas
12.89.191.130 : Dallas, Texas
99.83.231.61 : Seattle, Washington
{% endhighlight %}

## Conclusion

I've always enjoyed DNS and seeing how the internet works. Seeing where your traffic is being routed to as well is pretty nice to know as well. Have fun creating a map of the internet!
