---
title: Hosting FreshRSS on Fly.io
description: Self hosting FreshRSS with Fly.io for free
tags: 
  - docker
  - selfhost
  - 100DaysToOffload
draft: false
date: 2023-10-11
---

RSS is a great way to follow websites that publish content via blog posts, new articles, or other syndicated media. A RSS reader that is out there is called [FreshRSS](https://www.freshrss.org/) and can easily installed via self-hosted options or on the public cloud providers.

[Fly.io](https://fly.io/) is also a great service that allows you to have a few applications for free, for testing or small containers. Check out what else their [free tier](https://fly.io/docs/about/pricing/) has to offer.

## Getting started

- Sign up for [Fly.io](https://fly.io/) or sign-in
- Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
- Sign into your account: `flyctl auth login`
- Create a volume for persisting data using the command `fly volumes create freshrss_data --size 1`
  - In this command, we create a volume of size 1GB. This can be increased later if needed, but so far, FreshRSS has archive abilities and more and I haven't needed to expand this yet with the number of feeds and posts that I am following.
- Create a `fly.toml` file
  - update a few of the user specific items like the `app` name. This becomes your subdomain on your `appname.fly.dev` url once built
- Save the `fly.toml` file. From the same directory where `fly.toml` is present, deploy FreshRSS the application using `fly launch`. Fly.io will pull the Docker image and launch the VM.

Sample fly.toml file

{% highlight "toml" %}
app = "freshrss" # Change this, should be unique
kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  image = "freshrss/freshrss:1.20.1"

[env]
  CRON_MIN='*/20'

[mounts]
  source="freshrss_data"
  destination="/var/www/FreshRSS/data"

[experimental]
  allowed_public_ports = []
  auto_rollback = true

[[services]]
  http_checks = []
  internal_port = 80
  processes = ["app"]
  protocol = "tcp"
  script_checks = []
  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"
{% endhighlight %}

## Updating FreshRSS on Fly.io

Updating is still pretty easy as well. When I saw how to do this, FreshRSS was on version 1.20.1. Looking at the [latest release](https://github.com/FreshRSS/FreshRSS/releases/latest) on GitHub, it is now at 1.21.0. We just need to update one line in our `fly.toml` file and re-launch the app `fly launch`. This will download the specified version, rebuild the container, and redeploy the application.

{% highlight "toml" %}
[build]
  image = "freshrss/freshrss:1.21.0"
{% endhighlight %}

## Start reading

Once the deployment is successful, you'll be able to access the site from `appname.fly.dev`, or what you updated `app` to in the `fly.toml` file. You can use this domain, or also create a custom certificate, and subdomain on a domain you already own. You can read more at their documentation for [Custom Domains and SSL Certificates](https://fly.io/docs/app-guides/custom-domains-with-fly/#creating-a-custom-domain-on-fly-manually).

The setup is pretty straight forward from here. First you'll be creating your account in a single-user mode and begin importing your RSS feeds.

Happy reading!
