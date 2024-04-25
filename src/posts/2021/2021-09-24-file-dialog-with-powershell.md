---
title: File Dialog With PowerShell
tags:
  - powershell
description: A simple way to show how to use FileDialog class with .NET in PowerShell
date: 2021-09-24
---

Several command line scripts can benefit with some graphical user interface interactions. One of the most common that come to mind is opening and saving files. This could be searching for a config file or saving the location of a log file.

With PowerShell we can call the .NET class 

```powershell
[System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms")
```

## Saving a file

With this class we can begin our Save File function and Open File functions.

```powershell
function Save-File([string] $initialDirectory){

    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null

    $OpenFileDialog = New-Object System.Windows.Forms.SaveFileDialog
    $OpenFileDialog.initialDirectory = $initialDirectory
    $OpenFileDialog.filter = "All files (*.*)| *.*"
    $OpenFileDialog.ShowDialog() |  Out-Null

    return $OpenFileDialog.filename
}
```

This will open the window to choose the location of the file to save. The return will get the full path of the file we decided we wanted to save. Now to run the function and actually choose or file.

```powershell
$SaveFile=Save-File $env:USERPROFILE

if ($SaveFile -ne "") 
{
    echo "You choose FileName: $SaveFile" 
} else {
    echo "No File was chosen"
}
```

We specify the initial directory to start in and the `$env:userprofile` will start in the current users profile directory. From here you can browse for the directory and specify the filename we want to use to save our file.

Our file name we can use in our log or export process we can use the variable `$SaveFile` which will include the full path the to file name.

## Opening a file

This process is very similar except we choose the OpenFileDialog instead of SaveFileDialog

```powershell
function Open-File([string] $initialDirectory){

    [System.Reflection.Assembly]::LoadWithPartialName("System.windows.forms") | Out-Null

    $OpenFileDialog = New-Object System.Windows.Forms.OpenFileDialog
    $OpenFileDialog.initialDirectory = $initialDirectory
    $OpenFileDialog.filter = "All files (*.*)| *.*"
    $OpenFileDialog.ShowDialog() |  Out-Null

    return $OpenFileDialog.filename
} 

$OpenFile=Open-File $env:USERPROFILE 

if ($OpenFile -ne "") 
{
    echo "You choose FileName: $OpenFile" 
} 
else 
{
    echo "No File was chosen"
}
```

We could use the `Open-File` function to read a file contents and use this as a config option or just reading the contents of a file 

```powershell
Get-Content $OpenFile
```

Happy Coding!
