---
title: List Throttling with Python
description: How to break up and chunk a large list in Python and process it
tags: 
  - aws
  - coding
  - python
  - 100DaysToOffload
draft: false
---

While working on a lambda function in AWS recently I was running into a 429 error, too many requests, or the rate limit. This can be quite common with APIs and Amazon Web Service operations. These restrictions are in place for a purpose and to safe guard the service from potential DDoS style of requests.

However, I really did need to make a bulk request. Some of the AWS services you can increase the rate limits and others you cannot. The project I was working on was to remove an email address from the SES Suppression list. I could get about 15 requests in at a time, and this service does not allow you to adjust the rate limits, so I had to make my own. The list I needed to process was over 100 addresses.

To get started we need a simple list and process through that list.

{% highlight "python" %}
emails = [
  "another.user1@domain.com",
  "another.user2@domain.com",
  "another.user3@domain.com",
  "another.user4@domain.com",
  "another.user5@domain.com"
]

for email in emails:
  print(email)
{% endhighlight %}

This will loop over our Python list and print the contents, which is each email. For the next part we will use the `range()` function in Python since we can specify a start, end, and a step. The part to take note on is the `step` parameter. For me this was an interesting part of this function I have not used before but works great for our use case. So what makes `range()` so special?

## Range Definition

The `range()` function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and stops before a specified number.

## Range Syntax

{% highlight "python" %}
range(start, stop, step)
{% endhighlight %}

## Range Paramerters

Parameter | Description |
---|---|
start | Optional. An integer number specifying at which position to start. Default is 0
stop | Required. An integer number specifying at which position to stop (not included).
step | Optional. An integer number specifying the incrementation. Default is 1

## Setting up our process

The `step` parameter tells Python where to start in the list and in what increment to increase the loop through.

So the following will process the even numbers in a list

{% highlight "python" %}
x = range(0, 20, 2)

for n in x:
  print(n)

0
2
4
6
8
10
12
14
16
18
{% endhighlight %}

## Chunking the list

Taking this idea we can use the `step` and an additional `for` loop to adjust where we are in the list and slice our list into chunks. For this, I'll provide a sample list of items and how to process the large list into chunks.

First we'll need our list:

{% highlight "python" %}
emails = [
  "another.user1@domain.com",
  "another.user2@domain.com",
  "another.user3@domain.com",
  "another.user4@domain.com",
  "another.user5@domain.com",
          ......
  "another.user20@domain.com",
  "another.user21@domain.com",
  "another.user22@domain.com",
  "another.user23@domain.com",
  "another.user24@domain.com",
  "another.user25@domain.com",
]
{% endhighlight %}

We will have a simple function that is called to process the list.

{% highlight "python" %}
def process_list(emails):
    for email in emails:
        print(email)
{% endhighlight %}

The next part that does the chucks is a `for` loop with a combination with a `range()` function. We will then be able to slice our list and choose a range in the list to parse.

{% highlight "python" %}
threshold = 5
waitTime = 1

for i in range(0, len(emails), threshold):
    print(f"Processing block: {i+1}-{i+threshold}")
    process_list(emails[i:i+threshold])
    time.sleep(waitTime)
{% endhighlight %}

We want to start at 0, the start of our list, then stop at the total or length of our list. Our `threshold` is the step and where in the list we should chuck up the data. When we then `process_list(emails[i:i+threshold]` we are slicing the list to say, "pass this part of the list to the processing". Take the 11-15 items and process those. 

The `{i+1}-{i+threshold}` humanizes our numbers when it runs the output, since the list starts at 0 naturally in programming.

{% highlight "text" %}
Processing block: 1-5
another.user1@domain.com
another.user2@domain.com
another.user3@domain.com
another.user4@domain.com
another.user5@domain.com
Processing block: 6-10
another.user6@domain.com
another.user7@domain.com
another.user8@domain.com
another.user9@domain.com
another.user10@domain.com
Processing block: 11-15
another.user11@domain.com
another.user12@domain.com
another.user13@domain.com
another.user14@domain.com
another.user15@domain.com
Processing block: 16-20
another.user16@domain.com
another.user17@domain.com
another.user18@domain.com
another.user19@domain.com
another.user20@domain.com
Processing block: 21-25
another.user21@domain.com
another.user22@domain.com
another.user23@domain.com
another.user24@domain.com
another.user25@domain.com
{% endhighlight %}

As we can see the print statement shows us at what place in the list we are processing, and that corresponds with the number in the email. The `time.sleep(waitTime)` is there to adjust the time we need to wait before continuing our process.

If we change our `threshold` to 3, we can see the changes as well.

{% highlight "text" %}
Processing block: 1-3
another.user1@domain.com
another.user2@domain.com
another.user3@domain.com
Processing block: 4-6
another.user4@domain.com
another.user5@domain.com
another.user6@domain.com
Processing block: 7-9
another.user7@domain.com
another.user8@domain.com
another.user9@domain.com
Processing block: 10-12
another.user10@domain.com
another.user11@domain.com
another.user12@domain.com
Processing block: 13-15
another.user13@domain.com
another.user14@domain.com
another.user15@domain.com
Processing block: 16-18
another.user16@domain.com
another.user17@domain.com
another.user18@domain.com
Processing block: 19-21
another.user19@domain.com
another.user20@domain.com
another.user21@domain.com
Processing block: 22-24
another.user22@domain.com
another.user23@domain.com
another.user24@domain.com
Processing block: 25-27
another.user25@domain.com
{% endhighlight %}

# Use case

As mentioned before, my AWS process was hitting the rate limit, and using this method I could chunk up the list into blocks and process a few at a time then add a sleep timer for spreading the work across time.

Feel free to check out the full script in my [snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/python/listThrottle.py).
