---
title: Boto3 cross regions for AWS Lambda Functions
description: Using Python and boto3 for AWS management across regions
tags: 
  - aws
  - cloud
  - python
  - 100DaysToOffload
draft: false
---

Part of some resource management we do is auto drive expansions. This is accomplished with a combination of CloudWatch metrics that watch drive space and if a drive goes below our threshold, CloudWatch goes into an alarm state, then a subscribed lambda function gets kicked off and expands the EC2 instance.

Part of the problem is once the drive gets into an alarm state there was a 1% chance a drive could go into an alarm, expand, but still be stuck and never make it out into the green again until the state is changed manually and let CloudWatch do it's thing again.

Using the [Python SDK](https://aws.amazon.com/sdk-for-python/) and [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) is the best route to go I've found when working with Lambda functions. We can get all the alarms that are in an alarm state and then do something to them.

{% highlight "python" %}
import boto3

client = boto3.client('cloudwatch')

response = client.describe_alarms(
    StateValue='ALARM',
)

for alarm in response['MetricAlarms']:
    inAlarm = alarm['AlarmName']

    print(f"{inAlarm}")
{% endhighlight %}

The `response` will print all the alarms in the `StateValue` we need: OK, ALARM, INSUFFICIENT_DATA.

Now to change the state of the alarm we can use the `set_alarm_state` function and change the `StateValue`

{% highlight "python" %}
for alarm in response['MetricAlarms']:
  inAlarm = alarm['AlarmName']

  response = client.set_alarm_state(
      AlarmName=inAlarm,
      StateValue='OK',
      StateReason='re-alert',
  )

  if response["ResponseMetadata"]:
      print(f"Reset alarm {inAlarm} in region {region}")
{% endhighlight %}

There is no print response that gets returned to our session so we need to check the `ResponseMetadata`, then we can properly handle our success or failed processes.

When running this from my workstation you need to update your `credentials` file and then run it against each region if you have them setup. To get around this, I setup a list and looped the list of regions then our processing of the alarm states. The `client` can accept a `region_name` variable and gather the proper details in additional regions.

{% highlight "python" %}
import boto3

regions = ["us-east-1", "us-east-2", "us-west-2"]

for region in regions:
    client = boto3.client('cloudwatch', region_name=region)

    response = client.describe_alarms(
        StateValue='ALARM',
    )

    for alarm in response['MetricAlarms']:
        inAlarm = alarm['AlarmName']

        response = client.set_alarm_state(
            AlarmName=inAlarm,
            StateValue='OK',
            StateReason='re-alert',
        )

        if response["ResponseMetadata"]:
            print(f"Reset alarm {inAlarm} in region {region}")
{% endhighlight %}

That's it! Now we can reset our alarms and let our additional automation that runs get re-triggered and check back in on our resources.

### Resources

- [Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)
- [describe_alarms](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cloudwatch/client/describe_alarms.html#describe-alarms)
- [set_alarm_state](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/cloudwatch/client/set_alarm_state.html#set-alarm-state)