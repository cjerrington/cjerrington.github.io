---
title: Installing Node.js on Pop!_OS 22.04 LTS
description: How to install Node.js on Pop!_OS 22.04 LTS
draft: false
date: 2023-11-02T05:00:00.000Z
tags:
  - 100DaysToOffload
  - linux
  - shell
  - nodejs
---

Recently I had to reinstall my laptop with [Pop!\_OS ](https://pop.system76.com/)and use [Node.js](https://nodejs.org/en) regularly for my website and other applications and installing from the apt repository was not the best option.

First, I tried to install from `apt` but the Node version was v12.18 and this is an old LTS version from 2019. Not sure why the repository maintainers keep older LTS versions available for users. I saw similar issues with [Installing Node.js on Fedora](/blog/installing-nodejs-on-fedora/).

Next, I found steps to download the source and build. This was how I went about installing Node initially, but the build took forever. I then saw the built binaries you can download, install, update your `PATH`, and begin working.

I wrote up a little script that will help assit with this process

```shell
# Set Version
VERSION=v20.9.0
DISTRO=linux-x64
INSTALL_FOLDER=/usr/local/lib/nodejs

# Download prebuilt binaries 
curl -O https://nodejs.org/dist/$VERSION/node-$VERSION-$DISTRO.tar.xz

# Create necessary folders, and extract binaries to install folder
sudo mkdir -p $INSTALL_FOLDER
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C $INSTALL_FOLDER

# update profile
FILE=~/.profile
if [ -f "$FILE" ]; then
    # Append node path to $PATH in your profile
    echo "export PATH=$INSTALL_FOLDER/node-$VERSION-$DISTRO/bin:$PATH" >> $FILE
    # Reload profile
    . $FILE
    echo 'Updated user profile'
    # Run version reports
    node -v
    npm version
    npx -v
else 
    echo "$FILE does not exist."
    echo "Please manually update your profile to add Node.js to your PATH"
fi

```

What is nice about this is when there is a new release, we can update the `VERSION` and run. You might want to double check your profile settings to ensure your path to your node binaries are in the right order in `$PATH`.

This was geared towards Pop!\_OS, but should work similarly for a [Ubuntu](https://ubuntu.com/) or [Debian](https://www.debian.org/) based distribution as well.

Resources:

* [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* [https://github.com/nodejs/help/wiki/Installation](https://github.com/nodejs/help/wiki/Installation)
* [https://codeberg.org/cjerrington/snippets/src/branch/main/bash/install\_node.sh](https://codeberg.org/cjerrington/snippets/src/branch/main/bash/install_node.sh)
