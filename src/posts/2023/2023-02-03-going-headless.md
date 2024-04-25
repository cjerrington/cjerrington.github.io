---
title: "Going Headless"
description: "Using headless displays to make servers work and remote connections easier."
tags:
  - selfhost
  - linux
  - windows
  - 100DaysToOffload
date: 2023-02-03
---

What is headless? According to [Wikipedia](https://en.wikipedia.org/wiki/Headless_computer):

> A headless computer is a computer system or device that has been configured to operate without a monitor (the missing "head"), keyboard, and mouse. A headless system is typically controlled over a network connection, although some headless system devices require a serial connection to be made over RS-232 for administration of the device. Headless operation of a server is typically employed to reduce operating costs.

I was recently using a linux desktop for a file server and was using a free service for remote access. This remote software couldn't connect and needed to turn off wayland and restart the machine or the gdm3 service then it would work. So the remote connection worked great, but the site didn't have a monitor and just wanted to leave the server in a corner.

I looked for a linux driver just to trick the machine that there was a monitor connected. This did not work either, and then I found dummy display adapters. These have quite a few other users too, but found something similar to this [HDMI Dummy Plug](https://www.amazon.com/Headless-Display-Emulator-Headless-1920x1080-Generation/dp/B06XT1Z9TF).

These dummy displays are available for all monitor connections. They have just enough of a device that the motherboard thinks there is a display and then can continue to boot or render graphics the way it should normally. Since this was a way to cut costs and store a machine away in a corner it can take up less resources and power.

When I started with Docker to build my [minetest](/blog/nextcloud-docker-compose/) and [Nextcloud](/blog/dockerize-minetest/) servers, the machine I was using needed a monitor to configure it which was fine. Once the configuration was done, I no longer needed a monitor but would like to remote into the machine.

Currently my remote access tool of choice is [RustDesk](https://rustdesk.com/) and works on all my systems the way I like and able connect. There is no support for wayland yet, so I had to disable wayland following [these steps](https://linuxconfig.org/how-to-enable-disable-wayland-on-ubuntu-20-04-desktop)

{% highlight "shell" %}
sudo gedit /etc/gdm3/custom.conf
{% endhighlight %}

Find the line that talks about uncommenting the line to force the login to use Xorg. Line starting with # are comments.

{% highlight "shell" %}
# Change the following from

#WaylandEnabled=false

# To the following
WaylandEnabled=false
{% endhighlight %}

Now we need to restart our display manager, and log back in.

{% highlight "shell" %}
sudo systemctl restart gdm3
{% endhighlight %}

After these steps I could then use RustDesk to connect and work on my new server while away from home and keep it in the corner. I do something similar with VirtualBox, as you can start a VM in Headless mode as well. This allows a VM to start with out the main window as the display and if you need to let your VM run in the background, you don't need the window open all the time then for the VM to be powered on.

For VirtualBox, I made a simple batch file to start my VM in a headless state upon startup of the host machine

{% highlight "batch" %}
@echo off
cd "c:\Program Files\Oracle\VirtualBox"
VBoxManage.exe startvm "Ubuntu" --type headless
{% endhighlight %}

Getting more of my selfhost / homelab setup and going. This was a simple solution for what could be a complicated issue and hardware too.
