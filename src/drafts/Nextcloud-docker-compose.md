---
title: "Nextcloud Docker Compose"
excerpt: "I did things the hard way and how I saved my Nextcloud data and began using docker"
tags:
  - docker
  - 100DaysToOffload
---

For the longest time I was intimidated by Docker. I have been fairly familiar with virtual machines, linux environments, desktops; it's been my job for most of my career. Working in the terminal was not an issue, I really don't know what the issue was. Finally I decided to use some dedicated hardware to experiment with Docker more. Recently I built a [minetest server](/blog/dockerize-minetest/), and that went well.

I've installed Nextcloud before and installed an operating system, Ubuntu Server, and all the required components: PHP, nginx/apache, mariaDB, Nextcloud. Did the configuration, and it worked well for quite a while. One day there was an update, so I went ahead and started in, and.... crash.... Nextcloud was stuck at step 5. I Googled the issue, did the suggestions, and nothing worked. It was lost... Luckily, I had setup my VM to have an OS drive and a data drive. This was setup initially when I setup the server. Glad I did!

So for the longest time, I left it alone. I knew if I the data, could attach it to another VM and get the data when needed. Why I wanted to start with Docker was the upgrading when the time comes. I could be wrong, we'll see, but, seems like we can just update the docker image and the dat volumes will remain. This would be a perfect case scenario. Time will tell on this.

I used a default template for the `docker-compose.yml` and was setup and running in now time! Then a problem... I could only connect via localhost and the hostname from that machine. Nextcloud does allow you to connect via IP address, or a trusted domain. There is a configuration file that has this as well. So I looked at my docker file and there was no local config location to update the config.php file locally and restart the container. I searched as well and there is a docker compose environment line you can add as well.

```shell
  "NEXTCLOUD_TRUSTED_DOMAINS=nextcloud.example.com",
```

This didn't either and upon further research, seems like this is only accepted on first creation of the container. So I didn't have anything saved yet, so deleted the container and volumes and recreated. Same problem. Then I remembered Nextcloud has a command line you can run for upgrades, and docker allows you to get to a shell prompt on your container. First I needed to connect to the container.

```shell
sudo docker exec -u 33 -it nextcloud-nextcloud-1 bash
```

This tells docker to launch a bash prompt from inside the nextcloud-nextcloud-1 volume as the user id 33. From here we are in the right directory to begin [using the occ command](https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/occ_command.html). Once here I found the section that talks about the config and how to get and set the trusted domains.

```shell
# Running this will list the trusted domains nextcloud will trust
./occ config:system:get trusted_domains

# 
./occ config:system:set trusted_domains 2 --value=nextcloud.local
./occ config:system:set trusted_domains 3 --value=192.168.0.3

./occ config:system:delete trusted_domains X
Where X is the according number from the relevant configuration,
```