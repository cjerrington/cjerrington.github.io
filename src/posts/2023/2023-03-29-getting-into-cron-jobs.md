---
title: Getting Into Cron Jobs
description: A quick overview of Cron Jobs to get started and how to manage the tasks
tags: 
  - linux
  - shell
  - 100DaysToOffload
date: 2023-03-29
---

On a unix-like operating system you have a command line tool to manage scheduled tasks called `cron`. This is similar to what Windows has, Task Scheduler. With `cron` you can schedule any command line command and also bash or shell scripts, and these tasks can run periodically at fixed times, dates or intervals. `Cron` jobs can be used for a general purpose like a repetitive task or performing system updates.

So `cron` is the name of the command but each command is stored in a cron table or **crontab**. These cron tables store each command either by user and also a system-wide file as well. Each file has a unique structure that sets up the schedule and the command to run as well.

{% highlight "shell" %}
15 14 1 * * echo hello world
{% endhighlight %}

## How does it work?

So what does that cron line actually do? Well, at 14:15 on day-of-month 1 run echo hello world. Okay, lets look at how to read that.

{% highlight "shell" %}

# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday
# │ │ │ │ │                                   7 is also Sunday on some systems)
# │ │ │ │ │
# │ │ │ │ │
# * * * * * <command to execute>

{% endhighlight %}

You start with `minute, hour, day (of the month), month, day (of the week) command/script`. The values are either the appropriate numerical value for that segment or an asterisk denoting any value will work. So that is why we see on the 15th minute of the 14th hour of the 1st day of the month, and every month, no matter the day, echo hello world.

Cron can get complicated and add intersections and unions of the schedule. This is a little more advanced than my overview will cover.

## Scheduling a script to run

To schedule a simple backup script to run each night at 8 PM you could do the following:

{% highlight "shell" %}
0 20 * * * /home/username/Desktop/backup.sh
{% endhighlight %}

Within my `backup.sh` file, are the commands and normal backup scenario logic. This file I did make to be executable as well with `chmod +x ./backup.sh`.

## Managing cron jobs

I spoke of `crontab` earlier but this is the command line interface to basically `vi` into the `cron` jobs and edit them and see what is happening on your system.

{% highlight "shell" %}
usage: crontab [-u user] file
 crontab [ -u user ] [ -i ] { -e | -l | -r }
  (default operation is replace, per 1003.2)
 -e (edit user's crontab)
 -l (list user's crontab)
 -r (delete user's crontab)
 -i (prompt before deleting user's crontab)
{% endhighlight %}

The two simple `crontab` options I use regularly are `crontab -l` to list the jobs, and `crontab -e` to edit the jobs.

Running `cron` is a system service you can check the status, start, stop, and restart it to look into any issues you may have.

On Ubuntu and other Debian-based systems:

{% highlight "shell" %}
service cron status
service cron stop
service cron start
{% endhighlight %}

## Some additional helpful tricks

When creating cron jobs, it is always best to have a way to check that the schedule you entered actually makes sense. With the advanced cron jobs it gets real literal. Take the following, At 05:05 on day-of-month 4 and on Wednesday. So at 05:05 when the day of the month is the 4th and its a Wednesday do something... This can be complicated to find out why you job did not run when expected.

{% highlight "shell" %}
5 5 4 * 3 /home/username/Desktop/backup.sh
{% endhighlight %}

To help with this, I found a site called [crontab.guru](https://crontab.guru), and it has helped to verify the scheduled I made makes sense, before waiting for it. They also have great [examples](https://crontab.guru/examples.html) as well.

There are also some additional character notations that help with adjusting schedules on additional intervals.

{% highlight "shell" %}
*/30 * * * * echo "this will happen every half hour"
{% endhighlight %}

The folks at [crontab.guru](https://crontab.guru) has a great tip I'd like to quote as well:
> If the day-of-month or day-of-week part starts with a *, they form an intersection. Otherwise they form a union.`* * 3 * 1` runs on the 3rd day of the month and on Monday (union), whereas `* * */2 * 1` runs on every second day of the month only if it's also a Monday (intersection)

### References used and more learning

- [https://crontab.guru/](https://crontab.guru/)
- [https://en.wikipedia.org/wiki/Cron](https://en.wikipedia.org/wiki/Cron)
- [https://linuxhandbook.com/crontab/](https://linuxhandbook.com/crontab/)
- [http://cheat.sh/crontab](http://cheat.sh/crontab)
