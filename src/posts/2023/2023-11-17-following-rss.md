---
title: Do you follow RSS?
description: >-
  Lately following RSS not only blogs, but also from other sources has been
  helpful
draft: false
date: 2023-11-17T06:00:00.000Z
tags:
  - 100DaysToOffload
---

The use of [RSS](https://www.rssboard.org/rss-specification) or **R**eally **S**imple **S**yndication, has plenty of uses and is probably used in more areas than you think. What I remember using RSS for, and still do, is to follow websites, or [blogs](/blogroll/). Not only this, but services like GitHub and Codeberg for example have RSS on their Git Repositories.

So why follow Git Repositories RSS? Well, I have a few applications that get regular updates, and when there is an update and the repo is tagged and released properly on versions, you can see this pop up in your RSS reader. This has been helpful to follow a few of these applications this way to keep my apps up to date when I may or may not know otherwise of the application upgrade. Some apps don't have an in-app notification letting me know there is an update, and I don't always go hunting for it.

## To follow RSS code repositories

1. GitHub
   1. Go to the Releases section of the Repo of choice: \
      [https://github.com/umami-software/umami/releases](https://github.com/umami-software/umami/releases)
   2. Just add `.atom` to the end of the URL:\
      [https://github.com/umami-software/umami/releases.atom](https://github.com/umami-software/umami/releases.atom)
2. Codeberg
   1. Go to the Repo of choice: \
      [https://codeberg.org/Kbin/kbin-core](https://codeberg.org/Kbin/kbin-core)
   2. Next to the repo name you'll see the international symbol for RSS or just add `.rss` to the end of the URL.\
      [https://codeberg.org/Kbin/kbin-core.rss](https://codeberg.org/Kbin/kbin-core.rss)

Many feed readers will be able to gather the feed URL from the HMTL source code and autofill in what is needed.

## Why not follow your own RSS?

This is something I've been doing even since I started my website. Why, you might ask? Well, initially I was just curious of RSS and soon found that by following my own [RSS](/feed.xml), I can see what it's like for those who might follow me by RSS. That way if there is an error in the feed, post, etc, I see it as well and can help fix it. Not too long ago, I saw that I made a website build, where the data and pages were right on the website, but had an extra entry in my RSS. Then I was able to find that I had a duplicate file, that was causing the problem.

The one thing I did research was how to "take back" an RSS entry, and it is not as easy. The thing with RSS is it is really simple that when an item is added, and a reader receives it, that's it. You can redact a malformed entry that easily, but what you can do is, update the entry and post, to have a new updated message explaining the mistake and direct readers where they should go.

Just by removing the post and entry from my blog and RSS, didn't remove it from the feed reader, as it already grabbed the syndication.

## What other uses do you use RSS for?

RSS has been around for a long time, and can have a lot of uses. I've seen where podcast websites still use RSS to publish new podcasts to the listeners. News organizations still use RSS for articles and categories.

There are plenty of RSS readers and tools that are out there that use RSS for one thing or the other. Recently I saw a post on [How to Create an RSS to Email Subscription](https://medium.com/@paulmiller3000/how-to-create-an-rss-to-email-newsletter-with-getresponse-756f006be199) process. Things like this make use of being able to use one basic process and incorporate it to another delivery service like email for other kinds of readers.
