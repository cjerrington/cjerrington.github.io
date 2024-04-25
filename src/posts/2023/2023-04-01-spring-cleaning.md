---
title: Spring Cleaning
description: It's time to spruce up your digital life and weed out those old and oversized files
tags: 
  - linux
  - shell
  - windows
  - powershell
  - 100DaysToOffload
date: 2023-04-01
---

It's time to spruce up your digital life and weed out those old and oversized files. I have had a bad habit of data hoarding, and always making sure I have a backup of the important things. Well over time as well, what might have been important then might not be now, but taking up that precious hard drive, flash drive, or cloud space. Now is the time to press that delete button and clean up.

Other areas it might be good to do some pruning is also with your passwords. I cringe when I see the last time a password was changed was years ago... Okay I have a MFA on most accounts so that helps, but it is good to do some rotation a little more frequent than that. Along with passwords, take a moment to also review your online footprint and take a step back and review what is needed and what is not.

## Finding large files

Back to some file cleanup. One thing you might need to do is just organize your files. On my [usefulscripting.network](https://usefulscripting.network/) site I have two organization posts as well one for [Python](https://usefulscripting.network/python/automate-file-organizing/) and one for [PowerShell](https://usefulscripting.network/powershell/powershell-sorting-files/).

### PowerShell

PowerShell's `Get-ChildItem` has plenty of properties it obtains from the files when it creates the object.

{% highlight "powershell" %}
Get-ChildItem | Sort-Object -descending -property length | Select-Object -first 5 name, length
{% endhighlight %}

If you did a `Select-Object *` that will get all the properties which can also be helpful to us. We are looking for the `Length` property. From the above we should see something like the following.

{% highlight "text" %}
Name                              Length
----                              ------
Rock and Roll Photography.mp4 2686002201
ArchiTorture.mp4              1743399640
GettingRadWithBrad.mp4         249076124
Personal.mp4                   179525808
News Story.mp4                 153353942
{% endhighlight %}

While this is helpful, seeing the length in bytes isn't very helpful. Let's add a custom property value for the length instead. We do this by making the customer property know with a Name and Expression. For the length PowerShell is neat in that you can divide by 1GB to do file size math much easier.

{% highlight "powershell" %}
Get-ChildItem | Sort-Object -descending -property length | Select-Object -first 5 name, @{Name="Gigabytes";Expression={[Math]::round($_.length / 1GB, 2)}}

Name                          Gigabytes
----                          ---------
Rock and Roll Photography.mp4       2.5
ArchiTorture.mp4                   1.62
GettingRadWithBrad.mp4             0.23
Personal.mp4                       0.17
News Story.mp4                     0.14
{% endhighlight %}

### Bash

The Bash command `find` is supper powerful. It does what it says, finds files.

{% highlight "shell" %}
$ find . -type f -printf '%s %p\n' | sort -nr | head -5

2686002201    ./Rock and Roll Photography.mp4
1743399640    ./ArchiTorture.mp4
249076124     ./GettingRadWithBrad.mp4
179525808     ./Personal.mp4
153353942     ./News Story.mp4
{% endhighlight %}

We start by specifying our path, then format the output, sort the data. The `-n` is for numeric sort and the `-r` passed to sort will reverse the result of comparisons.  The Head will take the first 5 items as well.

## Conclusion

After finding the large files hopefully now we know what is taking up disk space and have an idea of how to manage that: move to glacier storage, delete, or keep it. Maybe now we've found that one file that was misplaced and is now the largest file on the disk. Hopefully this has inspired you to take a moment and find some other areas you might need to do some Spring Cleaning in other areas and finding ways to help automate the archive or removal of some old data.
