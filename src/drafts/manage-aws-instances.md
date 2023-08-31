---
_schema: default
title: Manage AWS Instances
excerpt: Using the AWS CLI to manage your AWS EC2 Instances in a quick and easy way
tags:
  - 100DaysToOffload
  - cloud
  - powershell
  - aws
---
Recently I have moved into a new position working on the cloud environment in my current company as an AWS Engineer to help build, support, maintain the infrastructure of our systems. With this change has also allowed me to learn more about AWS and use the CLI both locally and on the hosted EC2 instances.

There was a time I needed to start a server, but logging into the AWS Console, navigating to the right page, searching, performing the action took a bit of time. Not much, but also was thinking there should be a quicker way to do this from the command line.

Quickly I found the \`aws ec2 start-instances\` was the way to go. The problem was I wanted to specify a server name for it to start, and needed the instance id. I found a way to get the instance id from the tag Name and the Value of a server.

(aws ec2 describe-instances --filters "Name=tag:Name,Values=ServerHostName)" --query "Reservations\[\].Instances\[\].InstanceId" --profile default --output text --region us-east-1)

This query would describe the instance given the server name and query the JSON output for the InstanceID and output it as text. From here I could then start an EC2 instance

aws ec2 start-instances --instance-ids i-XXXXXXXXXXXX --profile default --output text --region us-east-1

We found a solution, but there is no way I was able to remember that. So I started writing a function around this idea.