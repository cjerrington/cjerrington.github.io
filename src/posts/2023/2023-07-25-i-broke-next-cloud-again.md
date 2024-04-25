---
title: I Broke NextCloud, Again
description: How not to update NextCloud and figuring out Docker updates
tags: 
  - docker
  - selfhost
  - 100DaysToOffload
---

Not too long ago, there was an update to my selfhosted version of [NextCloud](https://nextcloud.com/) that I recently got setup with [Docker](/blog/nextcloud-docker-compose). This was the first time I did an update to any Docker image so I was not quite sure what I was doing yet.

To update Docker containers you should do something like the following: 

{% highlight "shell" %}
docker stop nextcloud
docker rm nextcloud
docker pull nextcloud:latest
docker compose up -d
{% endhighlight %}

This should have stopped the current application, removed the container, downloaded the new app image, then started up the container again to do the upgrade and have NextCloud working again. The only problem is NextCloud it's self... 

Every time there is an update I always seem to have issues of some kind, so this didn't really surprise me. The problem was I had no way go get that version of the container image back to start over. NextCloud only allows upgrading from major version to major version in Docker images, not minors. Also, [downgrading](https://help.nextcloud.com/t/cant-start-nextcloud-because-the-version-of-the-data-is-higher-than-the-docker-image-version-and-downgrading-is-not-supported/109438/2) is not supported either and I got in a weird loop. Another issue is you can only go one major version of the upgrade at a time. 

So this was the point I was stuck in. I think I started from 23.0.x and the latest is 27.0.1 at the time of writing. I installed [portainer.io](https://docs.portainer.io/start/install-ce) a while ago to help manage images, containers, ports, etc, and was able to confirm the persitant volume location. I found it located below and for safety, I copied everything from the Docker volume to a folder I knew I had access to.

{% highlight "shell" %}
$ sudo cp /var/lib/docker/volumes/nextcloud_nextcloud/_data /srv/docker/nextcloud/files
$ sudo ls -l -d /srv/docker/nextcloud/files
$ sudo chown -R <username> /srv/docker/nextcloud/files
{% endhighlight %}

Since I copied these from a root folder, my normal username did not have permissions, so saw who owned the files, then did a `chown` to change the owner to myself. Once I viewed the files and ensudred I had what I needed, I used portainer to delete all containers, volumes, images related to NextCloud. I think I had messed it up so much I wanted to start completely over. 

Once done, I reran my `docker compose up -d` and everything got reinstalled. I think the important thing to remember might have been to rename my nextcloud container and then pulled and started the new image. This might have saved a lot of work. The OCC commands and other methods did not work as the app kept crashing and would not let me update anything or force the upgrade either.

It is important to make sure you have a backup even if you don't think you need one.