---
title: Using ChatGPT wisely
description: A conversation about the proper use of ChatGPT and programming
draft: false
date: 2023-10-27T05:00:00.000Z
tags:
  - automation
  - 100DaysToOffload
---

Using ChatGPT and the like is not a bad thing, you just need to understand the results it gives you and use your best judgment on implementing what it provides. I was talking with a developer friend at work, and he mentioned he likes ChatGPT and the like, but mentioned it gives you answers a human needs to review before you copy and paste and put it to use.

I put that to the test myself - I asked Google Bard the following statement, "Write a simple backup script in bash that backups a user's profile daily and keeps 2 weeks", and this is what it provided.

```shell
#!/bin/bash

# Get the current date
DATE=$(date +%Y-%m-%d)

# Get the user's home directory
USER_HOME=$(getent passwd $USER | cut -d: -f6)

# Create a backup directory for the current date, if it doesn't exist
BACKUP_DIR="${USER_HOME}/backup/${DATE}"
mkdir -p "${BACKUP_DIR}"

# Tar and compress the user's profile directory
tar -czvf "${BACKUP_DIR}/profile.tar.gz" "${USER_HOME}"

# Delete old backups that are more than 2 weeks old
find "${USER_HOME}/backup/" -type d -mtime +14 -exec rm -rf {} \;
```

Then Bard proceeded to show me steps to save the file, set execution permissions, even how to set up a cron job to run the backup every day at midnight.

I learned a few things as well, like the `getent` command. This is a way to [get environment](https://www.man7.org/linux/man-pages/man1/getent.1.html) variables from the system. By specifying the global variable `$USER`, you can then limit the key to look for your current user and then cut the output to select just the home path of the user.

This worked well, except... do you see it? The file, `profile.tar.gz`, is being sent to the profile folder, `BACKUP_DIR`, and is also in the source to be backed up. This creates a backup of the backup each time.

I asked Bard the same question, but "with excluding multiple folders". The solution was the same, but with a few ways the `--exclude` works with `tar`.

I did have some issues with the exclusion of paths, but was able to get a solution working for my needs. The interesting thing is you can specify the `--exclude` multiple times and also a glob path within the path

```shell
tar --exclude={"file1.txt", "file2.txt"}
```

I tried multiple things and this did not work for me, so I stuck with the multiple --exclude items.

Finally, the 2-week clean-up was spot on as well. The use of find does exactly what it is designed to do, find directories in a path where the time is older than 14, then execute a remove file on the items it finds.

Here is my completed simple backup solution.

```shell
#!/bin/bash

# Get the current date
DATE=$(date +%Y-%m-%d)

# Get the user's home directory
USER_HOME=$(getent passwd $USER | cut -d: -f6)

# Create a backup directory for the current date, if it doesn't exist
BACKUP_DIR="${USER_HOME}/backup/${DATE}"
mkdir -p "${BACKUP_DIR}"

# Tar and compress the user's profile directory, excluding the excluded folders
tar \
    --exclude="${USER_HOME}/.mozilla" \
    --exclude="${USER_HOME}/.cache" \
    --exclude="${USER_HOME}/.config" \
    --exclude="${USER_HOME}/.cinnamon" \
    --exclude="${USER_HOME}/.local" \
    --exclude="${USER_HOME}/backup*" \
    -czvf "${BACKUP_DIR}/profile.tar.gz" "${USER_HOME}" 

# Delete old backups that are more than 2 weeks old
find "${USER_HOME}/backup/" -type d -mtime +14 -exec rm -rf {} \;
```

My final solution excludes the backup folder all together, and some other config folders. Now just need to set up a [cronjob](/blog/getting-into-cron-jobs/) and begin making some regular backups.

If you'd like, you can also encrypt the backup with your [GPG keys](/blog/file-encryption-with-gpg/). Add the following after the `tar` file is made.

```shell
# Encrypt the backup file
gpg --encrypt --sign --armor -r "email@domain.com" "${BACKUP_DIR}/profile.tar.gz"
# Remove the unencrypted file
rm "${BACKUP_DIR}/profile.tar.gz"
```

So, just like I said, we need to take what a ChatGPT solution provides with a bit of human review as well. It can be a learning tool, but I would not put all your trust in it and review what you get, no matter what you might use a ChatGPT solution for.
