---
title: Download latest file from S3 Bucket
excerpt: Using the AWS S3 CLI to download the latest file from a S3 bucket
draft: true
date: 2023-10-20T00:00:00.000Z
tags:
  - 100DaysToOffload
  - aws
  - powershell
---

```powershell
# This assumes AWS CLI exe is in your path.
# Set Download path
$dlPath = "D:\Backups"
#$Env: AWS_ACCESS_KEY_ID = "your_key"
#$Env: AWS_SECRET_ACCESS_KEY = "your_secret"

$databases = @("AdventureWorks2022", "AdventureWorks2019", "AdventureWorks2017")
foreach($database in $databases){
  write - host $database
  $basePath = "s3://bucketname-for-backups/fullbackups/INSTANCENAME/$database/FULL/"
  $files = $(aws s3 ls $basePath | sort | select - last 1)
  $backupFile = "$($basePath)$($files.Split()[-1])"
    aws s3 cp $backupFile $dlPath
}
```
