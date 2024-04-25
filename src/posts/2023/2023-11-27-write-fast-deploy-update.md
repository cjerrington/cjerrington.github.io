---
title: 'Write fast, deploy, update'
description: >-
  Working fast has its benefits, and sometimes you just have to get started then
  you can update your process
draft: false
date: 2023-11-27T00:00:00.000Z
tags:
  - 100DaysToOffload
  - automation
  - coding
---

When creating a new process, function, automation, you have to start somewhere. Lately what I've been able to work on is a work fast process. Much of what I do while working on a new team is we have an idea and just start working on it, and get version one out the door, and as time goes on, make updates, improvements, and even sometimes a full rewrite.

This helps to get the job done faster and out the door for our end users. Sometimes this even helps you run fast, fail quickly. While failing doesn't have a good connotation to it, every once in a while you just need to get something started. In everything we do there is always room for improvement. Other times the job is so large it's hard to know where to start.

I've seen for these large projects in the mentality it's one large function or process that is cumbersome and can be difficult to follow. A simple example is when I was learning more of the AWS CLI and a PowerShell wrapper to start and stop instances. I started with the simple CLI options to start and stop an EC2 instance. Next we had to pick a profile, the. Check if we were logged in, and process a login if not.

Soon I had quite a few functions, loops, and if-else statements. After getting something to work, I began adding more process to the code; searching for the EC2 instance by a tag, by the ID, and more. What I did was copy and paste the code for the next process and had a long if-else flow and a lot of code that was reused.

I took a step back after getting all this working the way I wanted to and noticed I had reusable code and could place that in its own function complete with its own inputs and return values. This then helped and cleaned up the process, even simplifying other elements.

As a result this particular instance will make it easier in the future if I would like to add a new function to the mix. Find the CLI and make a new function and apply the right references and away I go.

This method may not work in all situations, but allows you to get the process started and have something to work off of. There have been many times when you never get anywhere because you just don't start. It's okay if version one is a bit rough if it gets the job done. Sometimes too, you need end users to run through it a few times to find the elements that could be improved.

I keep this phrase handy too: "How do you eat an elephant? One bite at a time!" That hard part of the process is just starting.
