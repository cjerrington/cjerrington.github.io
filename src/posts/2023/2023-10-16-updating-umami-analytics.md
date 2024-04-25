---
date: 2023-10-16
title: Updating Umami Analytics
description: How to keep you self hosted analytics software up to date
tags: 
  - automation
  - selfhost
  - 100DaysToOffload
draft: false
---

After deploying your Umami instance, it is a piece of software like everything else, and needs to be updated as well. Previously, I wrote about [The Good Side of Analytics](/blog/the-good-side-of-analytics-umami-vercel/), and how to get this setup on [Vercel](https://vercel.com).

I was updating other software and saw there was an update to Umami as well. Since the install process is making a fork of their repository, setup some database url connection strings, build and deploy, updating shouldn't be that difficult either right? Okay, that was a really simple explanation of the install process.

I mistakenly deleted the repository that had my local `.env` settings and initial build. Since this was a fork, I still had the initial repo forked and knew GitHub lets your sync your repository with the main.

![GitHub fork where you can sync the repository](/assets/images/blog/umami-update.PNG)

All I needed to do now, was to click the sync fork button and let GitHub do the work. Once the sync was complete, there is a new commit created for the update, which triggered a new build on Vercel. Since I have my environment variables setup in my deployment variable settings, everything stayed in place and kept working.
