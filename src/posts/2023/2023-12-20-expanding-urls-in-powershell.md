---
title: Expanding URLs in Powershell
description: Using the HTTP Headers to find the final resting spot for a URI.
draft: false
date: 2023-12-20T06:00:00.000Z
tags:
  - 100DaysToOffload
  - powershell
---

There is a lot of information you can get from an HTTP response. We can use the .NET class to create an HTTP Web Request and then get the `ResponseUri`. Using the .NET class, we can get a little more information than the `Invoke-WebRequest` method.

```powershell
$URL = "http://claytonerrington.com"
$req = [System.Net.HttpWebRequest]::Create($URL)
# Set user agent so request acts like it would in a browser
$req.UserAgent=".NET Framework Test Client";
$req.Method = "HEAD"
$response = $req.GetResponse()
```

If we now look at the `$response`, we will see some good information.

```shell
IsMutuallyAuthenticated : False
ContentLength           : 12320
ContentType             : text/html; charset=utf-8
ContentEncoding         :
Cookies                 : {}
LastModified            : 12/20/2023 12:11:00 PM
Server                  : Vercel
ProtocolVersion         : 1.1
Headers                 : {Accept-Ranges, Access-Control-Allow-Origin, Age, Cache-Control…}
Method                  : HEAD
ResponseUri             : https://claytonerrington.com/
StatusCode              : OK
StatusDescription       : OK
CharacterSet            : utf-8
SupportsHeaders         : True
IsFromCache             : False
```

As we can see we, I looked up the HTTP headers for the non-ssl version of my website, I can see the `Server` for the hosting, and the `ResponseUri`, and this ensures the browser is redirected to the right place the web server says it should be.

If I want to use this to get the file Location to download a file, I can do that too. Now, I can use the `ResponseUri` and combine some other path elements to get a filename and begin downloading the file. Let's take SQL Server Management Studio, URL: [https://aka.ms/ssmsfullsetup](https://aka.ms/ssmsfullsetup).

```powershell
Function Expand-URL{
	param ( 
		[Parameter(Mandatory = $True)]
		[uri]$URL
	)
  
	if(isURIWeb($URL)){
		$req = [System.Net.HttpWebRequest]::Create($URL)
		# Set user agent so request acts like it would in a browser
		$req.UserAgent=".NET Framework Test Client";
		$req.Method = "HEAD"
		$response = $req.GetResponse()
		$fUri = $response.ResponseUri
		$filename = [System.IO.Path]::GetFileName($fUri.LocalPath);
		$fUri.AbsoluteUri
		$response.Close()
	
		return $filename
	}else{
		write-host 'URL needs to be in a valid format: http or https'
		write-host "Received: $URL"
	}
 }
  
 Function isURIWeb($address) {
	$uri = $address -as [System.URI]
	$uri.AbsoluteURI -ne $null -and $uri.Scheme -match '[http|https]'
 }
```

We begin with the following the same way, and pass our URI into the isURIWeb function and proceed to expand the ResponseUri, then scrape the response to get the local path and file name leaf of the object.

```powershell
> Expand-URL https://aka.ms/ssmsfullsetup

https://download.microsoft.com/download/6/2/6/626e40a7-449e-418d-9726-33b523a1e336/SSMS-Setup-ENU.exe
SSMS-Setup-ENU.exe
```

The output currently returns the filename of the file, but we can also see the AbsoluteUri is echoed to the termainal as well for verification, $fUri.AbsoluteUri. I could update the return of the Expand-Url with a [PSCustomObject](/blog/using-pscustomobjects/).

```powershell
function Expand-URL{

	param ( 
		[Parameter(Mandatory = $True)]
		[uri]$URL
	)
  
	if(isURIWeb($URL)){
		$req = [System.Net.HttpWebRequest]::Create($URL)
		# Set user agent so request acts like it would in a browser
		$req.UserAgent=".NET Framework Test Client";
		$req.Method = "HEAD"
		$response = $req.GetResponse()
		$fUri = $response.ResponseUri
		$filename = [System.IO.Path]::GetFileName($fUri.LocalPath);
		$fUri.AbsoluteUri
		$response.Close()
		
		$result = [pscustomobject]@{
			URL = $fUri.AbsoluteUri
			FileName = $filename
		}
		
		return $result
	}else{
		write-host 'URL needs to be in a valid format: http or https'
		write-host "Received: $URL"
	}
 }
  
 function isURIWeb($address) {
	$uri = $address -as [System.URI]
	$uri.AbsoluteURI -ne $null -and $uri.Scheme -match '[http|https]'
 }
```

The basic command to download a file would be to use Invoke-WebRequest.

```powershell
> $fileLink = Expand-Url "https://aka.ms/ssmsfullsetup"
> Invoke-WebRequest -Uri $($fileLink.URL) -OutFile .\$($fileLink.FileName)
    Web request status [Downloaded: 473.3 MB of 646.9 MB]

> Get-ChildItem .\SSMS-Setup-ENU.exe
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          12/20/2023 12:49 PM      678287184 SSMS-Setup-ENU.exe

> (Get-Item .\SSMS-Setup-ENU.exe).VersionInfo.FileVersion
19.2.56.2
```

A setup like this is great when the URL is the same, and the provider changes the file path as they update the product. This can also be helpful in expanding a short URL you're not sure where it leads to.
