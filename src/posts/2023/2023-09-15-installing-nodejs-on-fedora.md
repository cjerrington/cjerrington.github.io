---
_schema: default
title: Installing Node.js on Fedora
description: How to properly install Node.js on Fedora 38
tags: 
    - 100DaysToOffload
    - coding
    - linux
    - nodejs
draft: false
size: wide
---

I recently reinstalled [Fedora 38](https://www.fedoraproject.org/) on my laptop and needed [Node.js](https://nodejs.org/en) installed. I was going through and needed to install and update quite a few applications, and Node was stuck at version 16. I finally found a few additional articles on how to install a specific version of Node.

Typically you can run the following command, and it'll install the version of Node we'd like. You can specify a version as well. This method is installing from the Fedora Repository.

{% highlight "shell" %}
# Install default version
$ sudo dnf install nodejs

# Specify alternate version
$ dnf module install nodejs:18/common
{% endhighlight %}

These methods did not work as for some reason I was only able to see the Node 16 LTS version. I was able to find how to add the NodeSource Repository by doing the following, but that has changed as well.

{% highlight "shell" %}
$ curl -sL https://rpm.nodesource.com/setup_lts.x | sudo bash -
$ sudo dnf install nodejs
{% endhighlight %}

I tried running this but got that the install method is retired and sent me to a [GitHub Link](https://github.com/nodesource/distributions#fedora-versions) describing the new method of installing from the NodeSource repository

## Step 1: Update your system

Before you install Node.js it is best to make sure your system is up to date. It could be possible that the version we need just needs to be updated.

{% highlight "shell" %}
$ sudo dnf upgrade --refresh
{% endhighlight %}

Running the command ensures your system checks for updates regardless of the last cache time. There is an optional step, which I did perform before running the Node.js install.

## Step 2: Install optional items and cleanup

{% highlight "shell" %}
$ yum install gcc-c++ make
{% endhighlight %}

With Node you can install and compile native javascript modules and having these tools installed helps on the build process.

This part I'd say is optional, but I did do an uninstall of Node.js before continuing with the NodeSource install.

{% highlight "shell" %}
$ yum remove nodejs &&\
$ rm -r /etc/yum.repos.d/nodesource*.repo &&\
  yum clean all
{% endhighlight %}

## Step 3: Install Node.js from NodeSource

Now you will be able to add the Node.js nodesource repo and install v18.x.

{% highlight "shell" %}
$ sudo yum install https://rpm.nodesource.com/pub_18.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
$ sudo yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1
{% endhighlight %}

Now after install process you will be able to see the version of Node you have installed and get to work! I had to update my Node version that was done on a fresh install of Fedora 38 since projects are built and tested with v18.x.

{% highlight "shell" %}
$ node -v
v18.17.1

$ npm -v
npm@9.6.7 /usr/lib/node_modules/npm
{% endhighlight %}

## Step 4: Updates

At the time of installing the `npm` version was 9.6.7, and version 10.x was available. Let's get that updated too.

{% highlight "shell" %}
$ npm install -g npm@latest
$ npm -v
10.1.0
{% endhighlight %}

## Step 5: Begin building and testing

Now that we have installed the current LTS version of Node.js we can begin our development processes and get to work.

I hope this helps you like it did for me. After a clean install, it's times like this getting your environment set back up can be a little challenging, but we have to find the right processes.

Soon Node.js v18.x will be out of Active support and will need to move onto Node.js v20.

![Node.js Releases](https://raw.githubusercontent.com/nodejs/Release/main/schedule.svg?sanitize=true)

Once this happens, we should be able to follow along the same path to install v20. You might want to uninstall v18 first, but once I see this I'll figure out the best path forward to upgrade.

{% highlight "shell" %}
# installing Node.js v20.x
$ sudo yum install https://rpm.nodesource.com/pub_20.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
$ sudo yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1
{% endhighlight %}

## Conclusion

There is also a way to install Node.js using NVM (Node Version Manager), but for my use case I only have one version installed. If I did more development work or wanted to test versions before upgrading my main version, I can see where this process would be beneficial.

I have not tested this method out at this time, but you can read more as well: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)