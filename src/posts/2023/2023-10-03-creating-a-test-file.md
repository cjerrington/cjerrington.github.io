---
title: Creating a Test File
description: Using PowerShell to create a test file for various uses
tags: 
  - powershell
  - snippets
  - 100DaysToOffload
draft: false
date: 2023-10-03
---

I needed a quick way to create a test file of various sizes and filenames. This was handy when needing to create test files for a certain file manipulation script and didn't want to use real files in the process, or have files of various sizes. Today, I'd like to share this snippet wtih you. 

{% highlight "powershell" %}
function Create-TestFile {

  [CmdletBinding()]

    param(
    # Default the current directory as the start path
    $filePath = [IO.Directory]::GetCurrentDirectory(),

    # Default a random file name
    $fileName = [System.IO.Path]::GetRandomFileName(),

    # Default is 1MB
    [int64]$fileSize = 1MB
  )

  # Build file path
  $fullPath = Join-Path -Path $filePath -ChildPath $fileName

  Write-Verbose "File Path: $($filePath)"
  write-Verbose "File Name: $($fileName)"
  Write-Verbose "File Size: $($fileSize)"
  Write-Verbose "File Full Path: $($fullPath)"
  
  # Create temp file
  try{
    $tempFile = new-object System.IO.FileStream "$fullPath", Create, ReadWrite
    $tempFile.SetLength($fileSize)
    $tempFile.Close()
    
    Write-Output "Created the following temp file:"
    Get-ChildItem $fullpath | Select-Object FullName,DirectoryName,Name,Length,CreationTime
  }catch{
	  $_
  }
}
{% endhighlight %}

What is great about this is the ability to set the `filepath`, `filename`, and the `filesize`. To create a file just run the following

{% highlight "powershell" %}
# Create a file with a random name in the C:\TEMP folder that is 1 GB in size.

Create-TestFile -filePath "C:\TEMP" -fileSize 1000MB

Created the following temp file:


FullName      : C:\TEMP\yeu0hhbb.iw4
DirectoryName : C:\TEMP
Name          : yeu0hhbb.iw4
Length        : 1048576000
CreationTime  : 10/2/2023 8:41:12 PM
{% endhighlight %}

Download the full code on my [snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/powershell/Create-TestFile.ps1).