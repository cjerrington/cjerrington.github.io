---
title: Backing up the Cloud
description: Even your cloud data should have a backup
draft: false
date: 2023-12-12T06:00:00.000Z
tags:
  - 100DaysToOffload
  - cloud
  - docker
  - selfhost
---

We typically expect that our data in the cloud is always backed up. We also let the cloud service handle the data space and RAID configuration to ensure our data is not lost. In my self-hosted NextCloud install with Docker, I was faced with the opportunity to make sure I had a good backup. Using Docker for my NextCloud install has been a lot better experience that having it installed on bare metal. I don't have to worry about the upgrade of the operating system updating packages NextCloud uses and break the installation and a few others.

Last night I went to my NextCloud to upload some data and was greeted with the upgrade NextCloud screen. I really don't know how the upgrade was even possible as I didn't stop my container and do a pull myself, and after [the last upgrade](/blog/i-broke-next-cloud-again/), I was pretty cautious. I looked back and remembered I had my NextCloud data configured to use a volume and was able to find the mount points.

First I needed to get the Container ID.

```shell
$ docker ps
CONTAINER ID  IMAGE ....
containerid   nextcloud:latest ....
```

This will give you some output about your docker containers, and we need to find the one for NextCloud. Next, we can inspect our container. Replace containerid with the one from the output from above.

```shell
# Added extra space around the curly brackets for proper rendering
$ docker inspect -f '{ { .Mounts } }' containerid
```

Your mounts will show you the JSON of that item we are querying.

```json
[{"Type":"volume","Name":"nextcloud_nextcloud","Source":"/var/lib/docker/volumes/nextcloud_nextcloud/_data","Destination":"/var/www/html","Driver":"local","Mode":"z","RW":true,"Propagation":""}]

```

We can pretty this up a little as well. We can pass JSON in to the command and can use either [jq](https://jqlang.github.io/jq/) or Python's json module to format this.

```shell
# Using jq for formatting
$ docker inspect -f '{ { json .Mounts } }' containerid | jq

# Using Python for formatting
$ docker inspect -f '{ { json .Mounts } }' containerid | python3 -m json.tool
```

The pretty output is the same, jq seems to add nice coloring to the output.

```json
[
  {
    "Type": "volume",
    "Name": "nextcloud_nextcloud",
    "Source": "/var/lib/docker/volumes/nextcloud_nextcloud/_data",
    "Destination": "/var/www/html",
    "Driver": "local",
    "Mode": "z",
    "RW": true,
    "Propagation": ""
  }
]
```

Now that we know where our data lives, we can make our backup. I decided to go with a simple tar process. I was already in the directory I wanted to save my backup too and ran the following. Since the `_data` is the entire web app, we can specify the subfolder of data and the user.

```shell
$ sudo tar -czvf "./nextcloud.tar.gz" "/var/lib/docker/volumes/nextcloud_nextcloud/_data/data/MyUsername"
```

After this ran, I had a nice backup of my data and proceeded with the upgrade in the browser for NextCloud which was successful. I might make this a regular process to backup my cloud data to ensure I don't lose data for any reason.
