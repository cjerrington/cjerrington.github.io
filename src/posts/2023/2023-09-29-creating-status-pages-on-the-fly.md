---
title: Creating Status Pages on the Fly
description: Monitoring uptime and status pages on Fly.io with Kuma
tags: 
  - docker
  - selfhost
  - 100DaysToOffload
draft: false
size: wide
---

Monitoring uptime and status pages on Fly.io with Kuma. Earlier this year I wanted to get more knowledge of Docker, and I have made some good progress on that goal.

From my previous posts on [Docker](/tags/docker), I've gotten a good understanding of Docker and a few applications running that I use regularly. One of the issues I had was how to acess my applications from outside my home network. Some of the applications I was okay with being private at home, but how do I host a Docker application to access it when I'm not there? Introducing [Fly.io](https://fly.io)!

## Getting started

Fly.io has a pretty generous free tier for my needs currently and works by using their configuration files to make a Docker file to build, launch, and deploy a docker image. To begin, create an account follow their [install instructions](https://fly.io/docs/hands-on/install-flyctl/).

To get started, we create a `fly.toml` file with our instructions, and then when we deploy to their infrastructure, it creates the proper docker file to deploy our app. You'll see in the example `fly.toml` file we have a variable of `app`, and this will need to be unique as this will be the subdomain for you to browse to and connect to your app once it is deployed.

You will be given a url on their `https://myapp.fly.dev`, but you can change this later if you'd like using their certificates and dns updates.

{% highlight "toml" %}
# fly.toml file generated for mykuma

# Change to your subdomain you'd like your app to live at
app = "mykuma"

kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  image = "louislam/uptime-kuma:1.17.1"

[mounts]
source="kuma"
destination="/app/data"

[env]
  PORT = "8080"

[experimental]
  allowed_public_ports = []
  auto_rollback = true

[[services]]
  http_checks = []
  internal_port = 8080
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

First we need to initialize the app by running `flyctl launch` and go through the prompts. Next we need to create the volume needed for the app, `flyctl volumes create kuma --size 1`. This will create our volume at 1 GB rather than the default of 3 GB. This wont use that much space. Finally we need deploy our app and run `flyctl deploy`.

This will create our Kuma status page and go ahead and create a username and password and start setting up your status pages.

## Adding a certificate

To use a custom domain like [status.claytonerrington.com](https://status.claytonerrington.com), you need to create a ssl certificate within your Fly dashboard or their CLI and then setup the acme challenge on your DNS to complete that request. Instructions can be found on their documentation: [Adding a custom domain](https://fly.io/docs/app-guides/custom-domains-with-fly/#adding-the-certificate)

## Updating Fly applications

If you notice we used kuma:1.17.1 in the initial build. To run the update, in your fly.toml file, change the version to the latest 1.23.2. This version was the latest at time of writing. After updating the `fly.toml` file rerun `flyctl deploy` and this will update our docker image and deploy this on our Fly.io hosted machine.

## Completing the process

Once it's all complete, you will have a nice looking [status page](https://status.claytonerrington.com/status/primary) to monitor all your services, and various other web services.

I was able to get a few of my websites and subdomains monitored. I was able to get a ping test setup on my dynamic DNS to monitor a few things at home as well. Setting up a website through we'd want to stick with a GET request rather than a ping for your web hosting as Vercel is a shared host, but that doesn't check my website specifically.

Of course, you could still have this running in Docker locally at as self host solution to monitor items locally and externally as well. What is neat with Kuma, is I can setup a dashboard status page for just a few services, all of them, by type, etc. I can even provide a status page for a few friends or by sites I manage with their own dashboard and unique status page for difference services or individuals.

Feel free to use these resources as well:
- [sample kuma.toml](https://codeberg.org/cjerrington/snippets/src/branch/main/docker/kuma.toml)
- [my status page](https://status.claytonerrington.com/status/primary)
- [Fly.io Home](https://fly.io)
- [Fly.io Documentation](https://fly.io/docs/)