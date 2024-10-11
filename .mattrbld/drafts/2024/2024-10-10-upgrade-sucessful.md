---
title: Upgrade Successful
description: When upgrading your system goes according to plan
date: '2024-10-10'
tags:
  - linux
  - docker
___mb_schema: /.mattrbld/schemas/schemaposts.json
---
This week, I was prompted to upgrade my Ubuntu desktop to the latest LTS Noble Numbat (20.04). Normally in-place upgrades I avoid, but there is something satisfying when you get your computer ready, type the commands, and watch the process fly as new packages are added, removed, updated.

Then the final reboot… I’ve had issues in the past of having applications installed as bare metal apps where the installed packages are updated, but the application is not. NextCloud was one and PiHole another. Last year I started with [Docker](/blog/nextcloud-docker-compose/) and it has been [great](/tags/docker/).

Since most of my [self-hosted](/tags/selfhost/) apps are Docker now, I felt comfortable to prematurely do the in-place upgrade. There I was running the upgrade commands…

```
sudo apt update 
sudo apt upgrade 
do-release-upgrade
```

Now to sit back and watch, click a few boxes, watch intensely as the process automatically happens. This is the part I enjoy, especially as I try to automate as much as I can at home and work; seeing these things successfully happen makes me happy.

So the hour or so goes by, and the reboot happens. I watch as everything comes back up and stays working. Part of this success is most of the applications are installed with Docker
