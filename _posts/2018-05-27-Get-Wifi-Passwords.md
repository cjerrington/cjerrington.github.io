---
title: Viewing Wifi Passwords
excerpt_separator: "<!--more-->"
categories:
  - Blog
tags:
  - Windows
  - PowerShell
---

Did you forget your WiFi passwords and wish you could retrieve them? Or know what wireless networks you've connected to? With PowerShell we can do that pretty easily. 
 
 This will show the current WiFi connection and then show the list of WiFi connections and their decrypted passwords. This will not show enterprise network passwords, only simple network types. 

 ```
function Get-WifiPasswords{
  Write-Host "Current Wifi Connection:"
  netsh wlan show interfaces | Select-String '\sSSID'
  (netsh wlan show profiles) | Select-String "\:(.+)$" | %{$name=$_.Matches | % {$_.Groups[1].Value.Trim()}; $_} |%{(netsh wlan show profile name="$name" key=clear)} | Select-String "Key Content\W+\:(.+)$" | %{$pass=$_.Matches | % {$_.Groups[1].Value.Trim()}; $_} | %{[PSCustomObject]@{ PROFILE_NAME=$name;PASSWORD=$pass }} | Format-Table -AutoSize
}
```

Add this function to your PowerShell Profile and then run ```Get-WifiPasswords```
