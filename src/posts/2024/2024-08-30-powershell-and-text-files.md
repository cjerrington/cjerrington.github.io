---
title: Working with PowerShell and text files
description: Reading and managing text files using PowerShell
date: 2024-08-30 13:32:41
tags:
  - powershell
  - windows
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

There is always a time you need to work with text files in PowerShell. Text files are the simplest form of files and PowerShell has built in commands to interact with them. Since PowerShell uses the verb command approach remembering these or typing them could be seen as time consuming, but the power we have over text files is great. Here's some basic commands you might be familiar with:

| Command | Alias |
| -------- | ------- |
| Get-Content | cat |
| Select-String | grep |
| Set-Content |  |
| Sort-Object | sort |
| Measure-Object | measure |
| Select-First | first |
| Select-Last | last |

Lets assume we have a log file and we need to read some of the text from it. To read the whole file:

```powershell
Get-Content .\test.txt

succeeded: first line
debug: something here
failed: first failure
succeeded: process complete
succeeded: another success
failed: something bad failed
info: information message
failed: process failed
info: here's some information
info: another line item
debug: this is a debug line
debug: you made it this far!
```

Now, since this is a log file, we may want the last or first number of lines in our log file. PowerShell allows piping one command into another.

```powershell
Get-Content .\test.txt | Select-First 1

succeeded: first line
```

In a recent process, I had a log file that dumped the results to a file, now I just needed them to be sorted and easier to read. How else to sort than, `Sort-Object`!

```powershell
Get-Content .\test.txt | Sort-Object

debug: something here
debug: this is a debug line
debug: you made it this far!
failed: first failure
failed: process failed
failed: something bad failed
info: another line item
info: here's some information
info: information message
succeeded: another success
succeeded: first line
succeeded: process complete
```

After sorting, you can even re-save the file with the new sort order if you'd like!

```powershell
Get-Content .\test.txt | Sort-Object | Set-Content .\test.txt
```

This looks to sort the lines alphabetically and then by length. This could be useful as well as `Get-Content` provides the `Length` as a property we can parse out if needed.

```powershell
Get-Content .\test.txt | Where-Object { $_.Length -gt 27 } | Sort-Object

debug: you made it this far!
failed: something bad failed
info: here's some information
```

Now lets say we need to search for failures in the log. We can do that with `Select-String`.

```powershell
Select-String -Pattern "failed" -Path .\test.txt

test.txt:3:failed: first failure
test.txt:6:failed: something bad failed
test.txt:8:failed: process failed
```

Another helpful function is the `Measure-Object`. This command is a little underrated sometimes. When working with files, we can see how many lines are in a file, or how many lines match our text search from `Select-String`.

```powershell
Get-Content .\test.txt | Measure-Object

Count             : 12
Average           :
Sum               :
Maximum           :
Minimum           :
StandardDeviation :
Property          :

Select-String -Pattern "failed" -Path .\test.txt | Measure-Object

Count             : 3
Average           :
Sum               :
Maximum           :
Minimum           :
StandardDeviation :
Property          :
```

In my latest project I was able to use these commands to quickly find just the items I needed to help resolve the issue. Reading the file for the type of text I was looking for then re-save or save to a new file.

```powershell
Select-String "failed:" -Path .\test.txt

test.txt:4:failed: first failure
test.txt:5:failed: process failed
test.txt:6:failed: something bad failed

Select-String "failed:" -Path .\test.txt | ForEach-Object {
    $_
} | Set-Content .\test.txt

Get-Content .\test.txt 

failed: first failure
failed: process failed
failed: something bad failed
```

The `Select-String` returns an object, so we can loop through each object to get just the line match, and re-save the file.

This last piece was the most helpful to comb through such a large log file of many levels of logging. Many logging processes have a string format for the date, info level, message, and being able to quickly look through this large file, I could pin point the issue much quicker. While having all the `info` or `debug` messages in the log, the important ones were the `failures`.

Enjoy parsing those logs!
