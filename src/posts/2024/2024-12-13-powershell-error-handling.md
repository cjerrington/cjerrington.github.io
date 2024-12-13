---
title: Try to Catch PowerShell Error Handling
description: A guide to handling errors within PowerShell and the best approach
date: '2024-12-13'
tags:
  - powershell
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

Within PowerShell there are a few ways to test a condition. By using `if-else` or `try-catch` blocks. Both of these methods have their advantages and disadvantages.

To start simply, we are all familiar with the `if-else` style of logic.

```powershell
if(Test-Path .\test.log){
  Write-Host "File Exists"
}else{
  Write-Host "File does NOT Exist"
}
```

While this does what we'd expect and we could create the file, there might be more we'd like to do. PowerShell has good exceptions built into the commands, and we can leverage those easily with a `try-catch` block. While using the `if-else` statement it is looking for the `return` value of `$true` or `$false` to complete the logic.

A `try-catch` block looks at the exceptions as there are specific reasons the process is not able to complete, and we can use those to our advantage. Let's take creating a file for example.

```powershell
try{
  New-Item -Path .\test.log -ItemType File -ErrorAction Stop
}catch {
  $_
}
```

Using the `$_` we can reference the current value of the last operation and see the error message.

```text
New-Item -Path .\test.log -ItemType File -ErrorAction Stop
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : WriteError: (C:\Users\me\test.log:String) [New-Item], IOException
    + FullyQualifiedErrorId : NewItemIOError,Microsoft.PowerShell.Commands.NewItemCommand
```

These error exceptions are based on the .NET and C# values you'd expect in those applications as well. So we can target a specific exception and do a different operation in the `catch` block. First, we need to see what the specific exception is. When there are errors, there is an environment variable that keeps track of these.

```powershell
try{
  New-Item -Path .\test.log -ItemType File -ErrorAction Stop
}catch {
  $error[0].Exception.GetType().FullName
}

System.IO.IOException
```

Now we can build in some other operations based on the exception, we need to `catch` them.

```powershell
try{
  New-Item -Path .\test.log -ItemType File -ErrorAction Stop
}catch [System.IO.IOException] {
  Write-Host "File Already exists"
}catch {
  Write-Host "Operation failed. Error message:"
  $_
  $error[0].Exception.GetType().FullName
}
```

We can try to create a file to a directory that does not exist, and can catch that as well, or even a permissions issue.

```powershell
try{
  New-Item -Path .\test.log -ItemType File -ErrorAction Stop
}catch [System.IO.IOException] {
  Write-Host "File Already exists"
}catch [System.IO.DirectoryNotFoundException] {
  Write-Host "Directory does not exist"
}catch [System.UnauthorizedAccessException] {
  Write-Host "User does not have permissions to create the file"
catch {
  Write-Host "Operation failed. Error message:"
  $error[0].Exception.GetType().FullName
}
```

This last example would be harder to do with a traditional `if-else` block. You'd have to build that into the `if` statement to check for the directory and the access. In the example for the `System.IO.DirectoryNotFoundException` it would be simple enough the create the directory and then the file. For the `System.UnauthorizedAccessException` you could handle that with logging, exiting the process, or stopping the whole script.

What I've found is using a multi-catch block has been beneficial and allows for some simple actions to know exactly what the process will do if it hits it's roadblocks. The biggest benefit in the `ErrorAction` in this and changing that to the other values `Continue`, `SilentlyContinue` ignore the exception and allow the process to continue. If you'd like to make use of the benefit of the `ErrorAction` in the `try-catch` blocks the `ErrorAction` of `Stop` allows you some additional control of the output to the console as well.

You can create your own processes to get past the exception or provide a more human approach to your scripts if sharing with others. The `Stop` goes right to the `catch` block and processes that section.
