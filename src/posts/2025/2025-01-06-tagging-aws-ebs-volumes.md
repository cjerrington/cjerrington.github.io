---
title: How to tag AWS EBS volumes on Linux EC2 Servers
description: Tagging your AWS resources is a good management practice, and EBS volumes are no different.
date: 2025-01-06
tags:
  - 100DaysToOffload
  - aws
  - linux
  - shell
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

Over the last few months, my team has decided to utilize Linux more in our environment and I took on most of the Linux management processes. For all of our resources we utilize tags to help identify and group resources together.

For our Windows machines we used PowerShell to get the disk's dive letter and label and tag our volumes accordingly. This is helpful when we get tickets to expand drives on the servers when more disk space is needed. We get the servername, disk letter, and the space to be added. However, when looking in the console we can see the volumes that are attached, but the AWS console does not reflect if the Device name in shown of `/dev/sda1` or `xvdb` is the C: drive or D: or otherwise.

The same issue applies to the Linux servers. Luckily in both cases the volume id becomes the serial number of the disk within the operating system. So we can use this to match the volume id of the attached instance and add a tag to it how we see fit.

## Finding the mounts

In our environment, we mount our disks in the same locations, but in case there was a misconfiguration, we will use the mount path to get the device id, then label it as such.

The use of `findmnt` can provide us the source disk the mount path is using. I want to look for `/mnt/mdf/` and find what disk that belongs to.

```shell
$ findmnt -noheadings --output SOURCE --target /mnt/mdf

/dev/nvme1n1
```

## Getting the Volume ID

Luckily for us, AWS uses the volume id as the serial number on the disks when they are attached to the machine. We can do some leg work and get it in the format we need. For this, I used the command `nvme` and can be installed via `apt install nvme-cli`.

```shell
$ sudo nvme id-ctrl -v /dev/nvme1n1 | grep "sn"

sn        : vol03f4v1o75f8lkbbqs
```

Now we just need the second half of this and to add a dash between `vol` and the rest of the characters. We will use `cut` to select the content on the right of the `:`, then `tr` to replace `vol` with `vol-`.

```shell
$ sudo nvme id-ctrl -v /dev/nvme1n1 | grep "sn" | cut -d ":" -f2 | tr " vol" "vol-"

vol-03f4v1o75f8lkbbqs
```

## Tagging the resources

Tagging EBS volumes is just like tagging an EC2 instance. In this case I want to tag the volume in AWS the way the operating system sees it.

```shell
aws ec2 create-tags --resources vol-03f4v1o75f8lkbbqs `
--tags Key=os-drive-letter,Value=/dev/nvme1n1 Key=os-volume-name,Value=sqldata
```

This will create the tags:

```text
os-drive-letter = /dev/nvme1n1 
os-volume-name = sqldata
```

Now when someone asks to expand the volume for the SQL Data drive we know which one it is exactly if more than one disk is attached.

## Functional programming

Now that we know how to tag our volumes we can make a script and function out of this to make is quick and easy. The great thing with functional scripting is being able to use the same block of code more than once and get the same desired outcomes. Since we do have multiple volumes attached and will mount them in the same place, we can use the logic above to create a function out of it.

```shell
# Usage: 
# tag_volume "/mount/path" "label-to-use"

tag_volume() {
    [ -z "$1" ] && echo "No mount path argument supplied" 
    [ -z "$2" ] && echo "No mount label supplied argument supplied"

    MOUNTPATH=$1
    MOUNTLABEL=$2
    
    echo "looking for $MOUNTPATH to label it as $MOUNTLABEL"
    MOUNT="$(findmnt -noheadings --output SOURCE --target $MOUNTPATH)"
    echo $MOUNT
    
    if [[ $MOUNT ]]; then 
        echo "Fount the mount path '$MOUNTPATH' as '$MOUNT'"
    else
        echo "Could not find the mount path $MOUNTPATH"
    fi
    
    VOLID="$(sudo nvme id-ctrl -v $MOUNT | grep "sn" | cut -d ":" -f2 | tr " vol" "vol-" )"
    aws ec2 create-tags --resources $VOLID --tags Key=os-drive-letter,Value=$MOUNT Key=os-volume-name,Value=$MOUNTLABEL
    echo "On disk $MOUNT created $MOUNTLABEL tag for $VOLID"
}

tag_volume "/mnt/mdf" "sqldata"
tag_volume "/mnt/ldf" "sqllogs"
tag_volume "/mnt/tempdb" "tempdb"
tag_volume "/" "root"
```

## Conclusion

I was able to combine a few different processes to get the information needed to then label the attached EBS volumes accordingly. The `tag_volume` script block is repeatable and made it easy to specify a few variables, and have it do the work; keeping my overall script and process shorter.
