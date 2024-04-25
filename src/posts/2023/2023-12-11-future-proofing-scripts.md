---
title: Future proofing scripts
description: >-
  Writing for a problem now, but in a way to easily solve the problem for the
  future. 
draft: false
date: 2023-12-11T00:00:00.000Z
tags:
  - 100DaysToOffload
  - coding
---

There are many scripts we wrote on a daily basis, either for automation or a process the user interacts with to complete the task. Over time, I have been better at solving the problem today, but make it easy to add improvements later or make changes that don’t take a whole refactoring of the code.

## The process of the script

The first time I realized this was with a C Sharp program that has a few input boxes and saves a file based on those inputs. When I was working on this, I made use of the app config file to specify the path to save the file. Having this path in an external location for the compiled product was a good decision. When we migrated data centers, we had a new path to save to. Instead of recompiling the code just for a new path, we updated the app config. This made it super easy and d saved time in the process.

The next time recently I was writing a backup process and the variables were specific for each customer. What I decided to do was create a JSON file that has all the variables, and the script loops through all the config files and does the same process on each config. Since the backup process is the same, the configs make it easy to add, remove, and change the variables without editing the main script. Also, we can hand this to end users and say plop in the customer details to this location, and we’ll handle the rest. We no longer have to worry about “why did the script fail? Oh, someone made a change, and it had a weird spelling and caused it to break”. Things like that make it easier and quicker for later changes.

When writing a process, I’ve been able to foresee what is the repeatable code and can this be a function? Writing more code into functions has saved time and lines of code in the end. Another process was to gather all the items from a Parallels API endpoint, process them and yield the results. Having over ten farms to contact, process, and result was going to be a lot. PowerShell made this easy to loop through the array of URLs and do the processing once rather than individually for each one. There were a lot of for loops, but was able to make one variable contain all the data needed and continue to process once, rather than multiple times

## The comments

After the functional code that makes the entire process more efficient, we add the comments. This is one little piece I’ve continued to get better at for myself or someone later who is trying to read the script. Often comments are overlooked, even for easy-to-read code, but it is still something that might help you understand what you were thinking six months ago when you have to come back to it later.

The power of a comment has saved refactoring something when you don’t need to as well. Maybe that one comment explains why that weird code existed and works the way it does. That way you can see, where you need to change something instead of what you were planning. Maybe that one process can still do what it should, but you change something earlier to pass along that item to the later process.

## The conclusion

The more I've been writing and also understanding the problem, the easier it is to start working on the solution. This level of knowledge only grows by doing more and understanding the tools you are using. Just like everything else, practice makes perfect, and the more you know, the better you start to understand things. Slowing down just a bit to ensure you have your ducks in a row is worth it in the long run.
