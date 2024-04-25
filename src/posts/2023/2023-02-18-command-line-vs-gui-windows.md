---
title: Command Line vs GUI Windows programs
description: A quick review of some command line apps versus a windowed applications
tags: 
  - 100DaysToOffload
  - coding
date: 2023-02-18
---

When I started writing some basic scripts for my company, I went right to PowerShell and got the job done. Part of that reasoning was the environment we needed to run them on was Windows server operating systems from 2008 R2 all the way to the latest 2022. Each of these servers have PowerShell and was a common process to write what we needed that would always work. PowerShell script is still a text file that is easily edited and run in a command line without needing to always install extra components.

After I got a great script out the door and showed off what it could do, I was told, "Command line is great, but no one likes those anymore. Make a window for it and it'll be better." Well, what do you do with that information? Learn C# of course! So I dove into learning new territory and "converted" my command line script into a windowed application. Luckily much of what I was doing was information gathering, so made this task easier. In the end learned some C# and started a new journey.

Over the last few years, I've been asked to create a few tools for our department and customers to automate some other operations. Depending on the task a quick command line app is all we need. Something small, efficient, and easily editable if needed. This is the contrast to some of the windowed programs I've made as well. Some of them require additional DLLs, a folder, installer, not easily changed when something needs to be in the moment.

Now windowed programs have their place as well. When I choose the method of making the program, I also think of the end user. Some things could be run by the customer, someone from our team, myself, others outside of our department. I find some tools need a quick modification then a quick script it is. A tool run by a customer and others, a GUI could be easier for them as it is what they are used to seeing. Sometimes a GUI you can guide your user to do what you need them to do too: enter data, review settings, view results.

When making a command line program I like future proofing myself and add in some arguments and make it a functional script and not hard code everything. With command line apps, you now have to explain how to use them and the arguments you can use. With a windowed program, some of these arguments would just be options within the GUI.

I enjoy writing both kinds of programs and tooling, and deciding which one to write might depend on time needed for a program and the complexity involved. When looking at a lot of Linux tools they are usually command line first, then GUI second. What kind of program do you like writing?
