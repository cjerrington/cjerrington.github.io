---
title: Updating Docker Containers
description: >-
  After breaking Docker a few times, I think I found the update process that
  works for most every container
draft: false
date: 2023-12-06T06:00:00.000Z
tags:
  - 100DaysToOffload
  - docker
---

At the start of the year, I wanted to start using [Docker](/tags/docker/) for my [self-hosted](/tags/selfhost/) apps. After breaking Docker a few times, I think I found the update process that works for almost every container you are running.

Many products that use Docker politely give you the updating instructions, while others assume this to be common knowledge if using containers. After documenting things at work the way I have, I'd like to error on the side that everything should be documented so that the next time, or person, who has to the task has all they need and not have to ask questions, or combine other research to a simple task.

The part that I think is left out of the Docker and container updating is the "backup" process. The idea in containers is it is just the placeholder and entry point to the application. Some applications might update the data points and volumes of the container, but if a process fails, there is not a simple way to revert.

So, this "backup" process? It's simple, you can rename the container!

```shell
$ docker stop <container>
$ docker rename <container> <container_old>
$ docker pull <container/version>
$ # Start your container
$ docker run
$ #  docker-compose -d up
$ # test container once it starts
$ docker rm <container_old>
```

After testing your upgraded container, in your own time cleaning up the unused images, containers, volumes should be your next process. If something doesn't work, you should be able to remove this new container, rename your old one back and be up and running again until you can diagnose why the update failed.

Docker pruning

* Cleaning up [Docker Images](https://docs.docker.com/engine/reference/commandline/image_prune/#docker-image-prune)
* Cleaning up [Docker Volumes](https://docs.docker.com/engine/reference/commandline/volume_prune/#docker-volume-prune)
* Cleaning up [Docker System](https://docs.docker.com/engine/reference/commandline/system_prune/#docker-system-prune)

Next steps would be to automate the images and containers as well.
