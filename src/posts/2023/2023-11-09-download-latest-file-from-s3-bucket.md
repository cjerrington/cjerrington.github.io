---
title: Download latest file from a S3 Bucket
description: Using the AWS S3 CLI to download the latest file from a S3 bucket
draft: false
date: 2023-11-09T00:00:00.000Z
tags:
  - 100DaysToOffload
  - aws
  - powershell
size: wide
---


AWS S3 is a great way to store files and since SQL 2022 allows you to send your backups straight to S3. 

* [Microsoft Documentation](https://learn.microsoft.com/en-us/sql/relational-databases/backup-restore/sql-server-backup-to-url-s3-compatible-object-storage?view=sql-server-ver16)
* [AWS Documentation](https://aws.amazon.com/blogs/modernizing-with-aws/backup-sql-server-to-amazon-s3/)

What I was looking into was a way to download the latest SQL backup from S3 while using the [Ola Hallengren SQL Maintenance Solutions](https://ola.hallengren.com/sql-server-backup.html) but needed to implement the changes in the currently waiting [pull request #714](https://github.com/olahallengren/sql-server-maintenance-solution/pull/714). 

Next, I could use the AWS CLI to [list](https://docs.aws.amazon.com/cli/latest/reference/s3/) the files for the S3 bucket. The Ola maintenance plans create a set of subfolders and a good structure to create an array of our databases loop through them. 

I set up the base path including the database name in the path, then what I noticed is the aws s3 ls command outputs a text based result, and does not take the additional outputs like json or table. With the result, we can actually sort the output and then select the last result. After I was able to get the last result, I can build the full path of the file to then run aws s3 cp  process to download the files to the system.

```powershell
# This assumes AWS CLI exe is in your path.
# Set Download path
$dlPath = "D:\Backups"
#$Env: AWS_ACCESS_KEY_ID = "your_key"
#$Env: AWS_SECRET_ACCESS_KEY = "your_secret"

$databases = @("AdventureWorks2022", "AdventureWorks2019", "AdventureWorks2017")
foreach($database in $databases){
  write-host $database
  $basePath = "s3://bucketname-for-backups/fullbackups/INSTANCENAME/$database/FULL/"
  $files = $(aws s3 ls $basePath | sort | select-last 1)
  $backupFile = "$($basePath)$($files.Split()[-1])"
    aws s3 cp $backupFile $dlPath
}
```
