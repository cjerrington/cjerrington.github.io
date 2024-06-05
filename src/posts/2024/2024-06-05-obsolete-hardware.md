---
title: Obsolete Hardware
description: "When does hardware truly become outdated and no longer usable?"
date: 2024-06-05
tags: 
  - linux
  - computers
---

When does hardware truly become outdated and no longer usable? Who makes that decision; the users or the software makers?

Technology does make leaps of advancements time and time again. This could include hardware and the software that runs on top of the hardware; for the operating system and applications.

If you follow long term supported operating systems they support that one version for 3 years, and security patches for a little while longer. That allows for two things in my opinion: hardware and software improvements.

It is difficult to run software from 20 years ago on today’s hardware. Likewise, it would be difficult to run today software on hardware from 20 years ago.

The problem I ran into recently was a MacBook Pro that was built 8 years ago in 2016, could no longer receive updates from Apple. Nor could any software properly run on the machine. Many apps said the Operating System needed to be a specific version or higher to run the application. The application, a web browser...

Yes, Firefox, Chrome, and others could no longer be upgraded on the machine. The MacBook Pro was only used to stream media content, so nothing major. However, the inconvenience of Safari crashing and websites not loading since they noticed an older browser or specific video playback driver not working was an issue.

The MacBook Pro was still working well, not slow, and in good condition. Apple has had a reputation of having great hardware and keeping their value. There’s also the rumor of purposely pushing customers to upgrade both software and hardware. The issue I think really happened in this case was Apple introduced their M1 chip and all future generations of software were rewritten to only work with the M1 chip.

So what was the solution? This laptop belonged to a family member and was just wanting their laptop to function so they could watch some shows. I was able to successfully run a Linux operating system in a live boot to test and make sure all the boxes were checked they needed.

- Good hardware support
- Connect to wifi
- Stay updated 
- Be able the stream from the requested providers
- User friendly

I have installed a Linux operating system on a MacBook Pro before but this was a few years ago. I remembered there were a few setup steps that were needed to prep the ISO before burning it to the USB drive for the live boot. Since I already had a [Ventoy](https://www.ventoy.net/en/index.html) USB drive with [Pop!_OS 22.04](https://pop.system76.com/) on it I used this as my test.

Surprisingly it was simple to hold Command-R to get to the boot drive selection and choose EFI as it picked up the boot drive. Ventoy successfully loaded and showed the menu of the choices. Initially I used the default option and got an error message about a boot portion. Ventoy also lets you use `grub2` and after another reboot, we had a live operating system.

After testing the WiFi and some streaming services played back, it was time for the install. Using the default choices and a reboot, Pop!_OS was successfully installed and booted as expected. It properly recognized the HiDPI of the display MacBook Pro has as well.

Upon delivering the laptop to the family member they felt right at home with the new operating system and how similar it felt to the MacOS. This Linux distribution has probably become my new reccomendation for new users and anyone that wants a feature rich distribution that is easy to use.