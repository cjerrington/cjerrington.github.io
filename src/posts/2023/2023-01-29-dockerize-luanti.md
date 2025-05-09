---
title: "Getting started with docker and Luanti (Minetest)"
description: "Setting up the open source Minecraft alternative, Luanti (Minetest), with docker. "
tags:
  - docker
  - gaming
  - selfhost
  - 100DaysToOffload
date: 2023-01-29
---

*<p style="background:var(--color-tertiary); padding:5px; text-align:center;">On 10/13/2024 MineTest changed their name to [Luanti](https://blog.minetest.net/2024/10/13/Introducing-Our-New-Name/)</p>*

I have been playing ~~Minetest~~ [Luanti](https://www.minetest.net/) off and on for the past few months. It is easy to set up, play and enjoy. Even the kids love playing, and have seen it talked about anywhere from [education](https://blog.tcea.org/build-block-worlds-with-minetest/) to enthusiasts. It's a great alternative for anyone.

What's nice is the download client is both a server and a client to connect to other servers. This makes the game great as a portable game too.

Recently I wanted to try out docker and since there's a container for everything, I built a ~~Minetest~~ Luanti server. This was easy to set up and start playing.

First you'll need to install [docker](https://docs.docker.com/engine/install/) then crate your `docker-compose.yml`

*<p style="background:var(--color-tertiary); padding:5px; text-align:center;">As of 10/17/2024 the Docker images are still under the MineTest name</p>*

```highlight yaml
---
services:
  minetest:
    image: lscr.io/linuxserver/luanti:latest
    container_name: minetest
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Chicago
      - CLI_ARGS=--gameid minetest --port 30000
    volumes:
      - /path/to/local/data:/config/.minetest
    ports:
      - 30000:30000/udp
    restart: unless-stopped
```

This docker file will create a container for ~~Minetest~~ Luanti mapping your local path for game data to the container location. It'll create a new world called minetest and bind to the port 30000. Next update your volume paths for the data folder, we'll need this in a little bit. Now run docker compose to pull the image and create the server. While that is working download your client so we can connect here in a moment.

```shell
docker compose up -d
```

In your client click join and enter your servers IP, this will be the docker host IP, and port used in your config file; default is 30000. Enter the username and password you'd like to use. This will create the account and launch a whole new world for you.

You might want to add yourself as an admin to the server. To do this, on the host browse to your data folder and edit the Minetest.conf file. Search for admin and uncomment this and add your username like so. This file is found here `data/main-config/mintest.conf`.

![minetest config](/assets/images/blog/minetest/minetest-conf.png)

Now you can restart your Minetest container and you'll be an admin! Minetest has many plugins for building, animals, and much more.

Some of my favorite mods:

- Animalia
- Bike
- Creatura
- i3
- Unified Inventory
- Wield3d

![Luanti game](/assets/images/blog/minetest/minetest-game.png)
