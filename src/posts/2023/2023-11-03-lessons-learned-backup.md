---
title: 'Lessons learned, backup'
description: The importance of regular backups and checking on them
draft: false
date: 2023-11-03T05:00:00.000Z
tags:
  - 100DaysToOffload
---

This week I did updates on my laptop like any other day. After a reboot, I was greeted with a rescue shell and some basic areas to start in to look into the issue.

I started with `journalctl` and was greeted with a long log to read through. Finally, I saw some errors and messages around those. To filter the log for errors I ran the following then could see the latest errors.

```shell
journalctrl -p 3 -xb
```

From here I noticed the error and started researching what this meant.

```shell
BRRFS error (device dm-0): bad tree block start...
Failed to mount sysroot.mount - /sysroot
```

From the research I was able to do, led me to dust of a live CD and try to recover the root drive. Other sites said it was a kernel issue and to rebuild the kernel in the live CD and try again. More and more led me to a partition issue on the drive. I then looked with GParted and sure enough, my 256 GB hard drive was only 165 GB with an unknown 91 GB partition.

My disk was encrypted, so I could decrypt the LUKS crypto volume, but then it wouldn't mount. So, I could not recover my /home partition and data. I quickly looked for backups I knew I had... but the drive was empty. There was one recently made, but the flash drive I had used no longer had the backup, as I needed the space back.

I had no choice but to do a reinstallation. I'm sure there was that 1% chance I could have gotten it restored. After determining what my laptop was used for and the time it would take to repair it, it was not worth the effort.

The good thing was, there is not anything on my laptop I can't live without. It is a utility machine, so all the real important data is on another machine and within NextCloud. These should probably be backed up as well. My other important scripts, programs, and website items are all on a git system, and that is what my laptop is mostly used for. So restoring these items was getting a new OS set back up first.

I do have a data hording problem as well. I went through a drawer and a stack of 20 hard drives were found, 30 flash drives. So there really is not an excuse to not make a backup. These drives should go into a drive enclosure and be used to backup some of my data.

The irony is, not practicing what you preach. I do some IT for a friend and have about 3 backups running of their work data for them and check in to make sure that is running as it should. Even my question in [Using ChatGPT Wisely](/blog/using-chatgpt-wisely/) was a backup script.

This weekend, I should bring those extra hard drives out of storage and put them to use and make some backups.

I've used a few solutions at a time before as well. Sometimes one job or app might fail and another one still works and runs correctly.

* A custom bash script to make a local backup on a [cronjob]()
* [Pika Backup](https://apps.gnome.org/PikaBackup/) for a second solution
* [Kopia](https://kopia.io/) backup for a cloud storage solution with [Backblaze](https://www.backblaze.com/cloud-storage)

Hopefully, I can find a better routine to stay in the habit of backing up the important data more frequently, even for less catastrophic disasters.
