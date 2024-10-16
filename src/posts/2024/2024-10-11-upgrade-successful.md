---
title: Upgrade Successful
description: When upgrading your system goes according to plan
date: '2024-10-10'
tags:
  - linux
  - docker
___mb_schema: /.mattrbld/schemas/schemaposts.json
---
This week, I was prompted to upgrade my Ubuntu desktop to the latest LTS [Noble Numbat](https://discourse.ubuntu.com/t/ubuntu-24-04-lts-noble-numbat-release-notes/39890) (20.04). Normally in-place upgrades I avoid, but there is something satisfying when you get your computer ready, type the commands, and watch the process fly as new packages are added, removed, updated.

I’ve had issues in the past of having applications installed as bare metal apps where the installed packages are updated, but the application is not. NextCloud was one and PiHole another. Last year I started with [Docker](/blog/nextcloud-docker-compose/) and it has been [great](/tags/docker/). I didn’t have to worry that I wanted to update PiHole and NextCloud, but the supported versions of Apache didn’t match.

Since most of my [self-hosted](/tags/selfhost/) apps are Docker now, I felt comfortable to prematurely do the in-place upgrade. There I was running the upgrade commands…

```
sudo apt update 
sudo apt upgrade 
do-release-upgrade
```

Then the final reboot…

Now to sit back and watch, click a few boxes, watch intensely as the process automatically happens. This is the part I enjoy, especially as I try to automate as much as I can at home and work; seeing these things successfully happen makes me happy.

So the hour or so goes by, and the reboot happens. I watch as everything came back up and stayed working. Part of this success is most of the applications are installed with Docker, which makes these complex apps their own bubble and not completely effected by the packages installed on the host.

I typically also like to wait for the first patch or group of updates to ensure I’m not in a public beta upgrade process. Here’s to hoping future apps and upgrades as smoothly!
