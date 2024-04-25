---
title: Strings to Hashtables
description: How to take a string and turn it into a PowerShell hash table
draft: false
tags:
  - coding
  - powershell
---

While working on a SQL maintenance solution in PowerShell to create our maintenance plans, I was faced with an issue of data types. I was using a hash table for a data selection process, and it worked great.

The PowerShell script is written in a way that the script is the same between regions in AWS and there is limited changes need in the documents. Our process allows us to get the region and then from that set a value of another variable to keep that updated correctly.

We started off with a mapping of the regions and the values we needed from each region:

```powershell
$S3Mappings = @{
  "us-east-1" = "s3://bucket-backup-east-1";
  "us-east-2" = "s3://bucket-backup-east-2";
  "us-west-2" = "s3://bucket-backup-west-2";
}
```

Next we got the region from AWS and the EC2 instance:

```powershell
$region = aws ec2 describe-availability-zones --output text --query 'AvailabilityZones[0].[RegionName]'

us-east-1
```

Now we can use our hash table to select the right path based on the region:

```powershell
$backupLocation = $S3Mappings.($region)

s3://bucket-backup-east-1
```

How does this work? Well, the `$S3Mappings` is a [hashtable](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hash_tables?view=powershell-7.4) and is a Key/Value pair. Hashtables have Keys and Values properties, and use dot notation to display all the keys or all the values. So, we are selecting the Value of the Key where the region is `us-east-1`.

## The problem

This week I needed to put the data into an AWS Parameter Store item so we can have a simpler way to update the table if we needed to and not create a brand-new SSM Document version. Then came the problem. The `Get-SSMParameterValue` was string value. Now I needed a way to convert a sting back into a hashtable. There was little around this need for a change.

At first, I thought this would be an array, but it was not. I found that by doing a `.GetType()` on the variable and reading the `Name`.

There is a lesser known PowerShell command called `ConvertFrom-StringData`. This [module](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-stringdata?view=powershell-7.4) converts a string containing one or more key and value pairs to a hash table.

Lets set up our object as a string.

```powershell
$HashString = @'
us-east-1 = s3://bucket-backup-east-1
us-east-2 = s3://bucket-backup-east-2
us-west-2 = s3://bucket-backup-west-1
'@

$HashString.GetType()

IsPublic IsSerial Name                                     BaseType
-------- -------- ----                                     --------
True     True     String                                   System.Object
```

By default, the key must be separated from the value by an equals sign (=) character. The data needs to be single lines and contain the key value pair per line. Next we can pipe the data to the function or call our `$HashString` as our `StringData`.

```powershell
$Table = ConvertFrom-StringData -StringData $HashString

$Table."us-east-1"

s3://bucket-backup-east-1

$Table.GetType()

IsPublic IsSerial Name                                     BaseType
-------- -------- ----                                     --------
True     True     Hashtable                                System.Object
```

## Conclusion

For my use, this process actually added some complexity, but also made the values I needed easier to use. The backup location variable needed to be in quotes and had issues before with escape characters to get the right data in to the variable I needed the value for.

As I was writing this too, I was thinking another solution could have been a switch statement, but this was more fun to use and resolve the issue. The use of the hash table sets up the key value pairs, but also allows us to reuse the hashtable if we need to use the data as a whole and not a specific item.

I found a [post](https://tommymaynard.com/there-is-a-difference-arrays-versus-hash-tables/) on the differences between `HashTables` and `Arrays` and this is a good summary:

> Microsoft even uses the word array to describe them: *"A hash table, also known as a dictionary or associative array, is a compact data structure that stores one or more key/value pairs."*

### Resources

- [about_Hash_Tables](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_hash_tables?view=powershell-7.4)
- [ConvertFrom-StringData Module](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-stringdata?view=powershell-7.4)
- [Hashtable vs Array](https://tommymaynard.com/there-is-a-difference-arrays-versus-hash-tables/) | [archive.today](https://archive.ph/XN6oa)
