---
_schema: default
title: Manage AWS Instances
description: Using the AWS CLI to manage your AWS EC2 Instances in a quick and easy way
tags:
  - 100DaysToOffload
  - cloud
  - powershell
  - aws
size: wide
---

Recently I have moved into a new position working on the cloud environment in my current company as an AWS Engineer to help build, support, maintain the infrastructure of our systems. With this change has also allowed me to learn more about AWS and use the CLI both locally and on the hosted EC2 instances.

## The issue and resolution

There was a time I needed to start a server, but logging into the AWS Console, navigating to the right page, searching, performing the action took a bit of time. Not much, but also was thinking there should be a quicker way to do this from the command line.

Quickly I found the `aws ec2 start-instances` was the way to go. The problem was I wanted to specify a server name for it to start, and needed the instance id. I found a way to get the instance id from the tag Name and the Value of a server.

{% highlight "shell" %}
(aws ec2 describe-instances --filters "Name=tag:Name,Values=ServerHostName)" --query "Reservations[].Instances[].InstanceId" --profile default --output text --region us-east-1)
{% endhighlight %}

This query would describe the instance given the server name and query the JSON output for the InstanceID and output it as text. From here I could then start an EC2 instance

{% highlight "shell" %}
aws ec2 start-instances --instance-ids i-XXXXXXXXXXXX --profile default --output text --region us-east-1
{% endhighlight %}

I found a solution, but there is no way I was able to remember the long list of command line switches and JSON filters. So I started writing a function around this idea.

## Making the wrapper functions

First I needed to gather the available profiles from the `~/.aws/config` file that contained the SSO login and profile information. Next I looped through each line replacing items to get just the profile name. Once that was done, I made a numerical menu listing of the profiles so you can select the profile you'd like to use. If the profile is not listed, you can make a selection then configure the SSO parameters and continue.

While using the CLI I noticed the session token would timeout just like the web console does. For this I also made a wrapper function around the aws call to query the Account information. If your token is still active the length will be 14 and if not, I had it pass along the `aws sso login --profile` command to refresh our token automatically.

{% highlight "shell" %}
# the call to check if your session is still active or not
(aws sts get-caller-identity --query "Account" --profile $chosenProfile | Select-Object Length).Length
{% endhighlight %}

To begin, I wanted to test if my session is active for my profile and if so, proceed. If not, my `Select-AWSProfile` function will proceed with the `aws sso login --profile`.

{% highlight "powershell" %}
# Read the profiles and send user to select the one they want
if ($null -eq $chosenProfile) {
    $chosenProfile = Select-AWSProfile
}

if (Test-SessionActive -chosenProfile $chosenProfile){
    #Session still active
    if($null -eq $ServerName){
        $ServerName = Read-Host -Prompt "What is the servename"
    }
    Write-Host "Attempting to start $ServerName in $region"
    $instanceID = (aws ec2 describe-instances --filters "Name=tag:Name,Values=$($ServerName)" --query "Reservations[].Instances[].InstanceId" --profile $chosenProfile --output text --region $region)
    aws ec2 start-instances --instance-ids $instanceID --profile $chosenProfile --region $region
}else{
    # Error in the process
    Write-Host "There was an issue running the process: $($MyInvocation.MyCommand)"
}
{% endhighlight %}

Part of this process is in the function to pass along a few command line switches: `-ServerName`, `-chosenProfile`, `-region`. All of the wrapper functions have these to pass along or override the defaults for the profiles.

The EC2 management functions are:

- Start-AWSInstance
- Stop-AWSInstance
- Restart-AWSInstance

## Helper functions

- Get-AWSInstanceName
- Get-AWSInstanceID

After successfully creating the helper functions I found a way to get the instance id of an instance by providing the name of the server. This could be a little off from time to time, but in my case the tag:Name and its value is also the hostname of the machine. This might not always be the case in other situations.

I used the same logic as before but was able to query the JSON for the right function to get the Instance ID from a server name or the server name from the instance id. Both of these functions have an additional switch for `-copy` to add the output to your clip board if you'd like.

Underlying AWS CLI in the wrapper functions:

{% highlight "shell" %}
# Getting the Server Name from the Instance ID
aws ec2 describe-instances --instance-id $instanceID --profile $chosenProfile --query "Reservations[].Instances[].Tags[?Key=='Name'].Value" --output text --region $region

# Getting the Instance ID from the Server Name
aws ec2 describe-instances --filters "Name=tag:Name,Values=$($ServerName)" --query "Reservations[].Instances[].InstanceId" --profile $chosenProfile --output text --region $region
{% endhighlight %}

## Download yourself

I've placed the code on my public snippets and you can add this to your profile as well. If you need to create one, you can follow along [here](https://claytonerrington.com/blog/create-powershell-profile/). Once you have your profile, just dot source the file into our profile.

{% highlight "shell" %}
# previous profile items
. C:\path\to\Manage-AWSServers.ps1
{% endhighlight %}

Find the full code of `Manage-AWSServers.ps1` in my [PowerShell Snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/AWS/Manage-AWSServer.ps1)