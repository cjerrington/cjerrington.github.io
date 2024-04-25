---
title: "How to check for Jellyfin updates"
description: As with many software there are updates to them. Jellyfin seems to not have a great way to check for updates and install automatically. However, you can use the built-in API to help with that."
tags:
  - powershell
  - python
  - media server
date: 2022-12-23
---

As with many software there are updates to them. [Jellyfin](https://jellyfin.org/) seems to not have a great way to check for updates and install automatically. However, you can use the built-in API to help with that. 

[Jellyfin](https://jellyfin.org/) comes with an API it uses internally, but also has a public portal as well that gives some useful information. Start by going to `http://localhost:8096/System/Info/Public` if you have the default settings running for your server. This will give you a [JSON](https://www.json.org/json-en.html) response of some basic settings like: `LocalAddress`, `ServerName`, `Version`, `ProductName`, `OperatingSystem`, `Id`, and if the Startup Wizard has been completed. 

What we'll be using today is the `version` part of the response. This will give us the version of the server we are using locally. So now we can query the GitHub API since the repository for Jellyfin has the latest releases as well. The [Github API](https://api.github.com/repos/jellyfin/jellyfin/releases/latest) will give us quite a bit of information but we are only looking for a few small things. Head over to, [https://api.github.com/repos/jellyfin/jellyfin/releases/latest](https://api.github.com/repos/jellyfin/jellyfin/releases/latest) yourself and take a look. 

The JSON response from that will show a name for the `version`, `html_url` for download, and `body` for the content of the release notes. 

## Putting it all together

Now that we have our information lest try putting it all together. 

We'll start with PowerShell

```powershell
$server = "localhost"
$port = 8096

$myinstall = (Invoke-WebRequest -UseBasicParsing http://$($server):$port/System/Info/Public).Content | ConvertFrom-Json

$latest = (Invoke-WebRequest -UseBasicParsing https://api.github.com/repos/jellyfin/jellyfin/releases/latest) | ConvertFrom-Json

if ( $myinstall.Version -eq $latest.name){
    Write-Host "$($myinstall.Version) is the latest version."
}else{
    Write-Host "You are running $myinstall and $($latest.name) is the latest."
    Write-Host "You can download it from $($latest.html_url)"
    Write-Host "$($latest.body)"
}
```

Using the local API endpoint we can get our local version, then use GitHub to get the `latest` version as well. From there we can do a simple comparison of the versions and if a new one is available, you'll see some simple stats and the release notes for the latest version. 

For those that use Python, we can do that too for a multi-platform solution. 

```python
from urllib.request import urlopen
import json

# Setup of variables:
# Update server and port to your local values
server = "localhost"
port = 8096
githubAPI = "https://api.github.com/repos/jellyfin/jellyfin/releases/latest"

localresp = urlopen(f"http://{server}:{port}/System/Info/Public")
myVersion = json.loads(localresp.read())

remoteresp = urlopen("https://api.github.com/repos/jellyfin/jellyfin/releases/latest")
remoteversion = json.loads(remoteresp.read())

if myVersion['Version'] == remoteversion['name']:
    print(f"{myVersion['Version']} is the latest version")
else:
    print(f"You are running {myVersion['Version']} and {remoteversion['name']} is the latest.")
    print(f"You can download it from {remoteversion['html_url']}")
    print(f"{remoteversion['body']}")
```

## Results

Currently I am a little behind on updates and here are the results: 

```
You are running 10.8.7 and 10.8.8 is the latest.
You can download it from https://github.com/jellyfin/jellyfin/releases/tag/v10.8.8
# Jellyfin 10.8.8

Stable hotfix release for 10.8.z release branch.

## New Features and Major Improvements
...
```

You will still need to download the latest version for your operating system and installation method you are using, but you can use the Github API to get the asset information and then start the process to do the install. Maybe even try to make a prompt to download and launch the installer. 

You can also find the code samples on Gists: [Powershell](https://gist.github.com/cjerrington/b39a7ecfbeff8049eff08e1a0fdaf7be#file-jellyfin-update-ps1) and [Python](https://gist.github.com/cjerrington/b39a7ecfbeff8049eff08e1a0fdaf7be#file-jellyfin-update-py)

Happy streaming! 