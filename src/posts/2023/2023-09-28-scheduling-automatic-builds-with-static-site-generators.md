---
title: Scheduling Automatic Builds with Static Site Generators
description: Having a static site is great, but there could be times where you need to build your site on a schedule.
tags:
  - 11ty
  - automation
  - web design
  - 100DaysToOffload
draft: false
---

Having a static site is great, but there could be times when you need to build your site on a schedule. In a recent post, I wrote about [building a blogroll with 11ty](/blog/building-a-blogroll-with-11ty/), and the next part of that is to automatically rebuild my site on a schedule. It is great to list other blogs and show their latest posts, but what about when I do not port for a while and my site is out dated while a fellow blog is posting more? My site is then out dated, but I want to still provide the latest posts of those around me.

Services like Vercel, Netlify, Render all have continuous deployment from a git repository. When a change is made to the repository, there is a web hook to build the site on the static hosting provider of the changes with that new commit.

These services also allow you to trigger a manual build with a web hook of their own. I'll take a look at two options that should work for anyone, but first we need to create our build hook.

## Prep work: Create Build Hook

On [Vercel](https://vercel.com/docs/concepts/git/deploy-hooks), they call it a deploy hook which you can find in `Settings > Git > Deploy Hooks`. You can give it any name you want, I prefer to keep things simple and define what the action is: `cron-build`. Next you have a choice to specify the branch, use the name of the branch your website deploys from. You will be provided a link, copy this and keep it safe.

I moved my site to Vercel, so that is what I'll be showing, but [Netlify](https://docs.netlify.com/configure-builds/build-hooks/) is the same concept. I used to host my site there too.

## Method 1: GitHub

I do host my website in a [repository](https://github.com/cjerrington/cjerrington.github.io) on Github currently still, and there we can set up a [workflow](https://docs.github.com/en/actions/using-workflows).

To get started, create a file called `nightly-build.yml` in a folder at the root of your repository `.github\workflows`. This is a special folder GitHub uses for other things like issue templates, funding Information, dependabot, and more. In that file we'll configure the name of the workflow, the schedule, and the job to run.

{% highlight "yml" %}
# This action triggers the build hook
name: Schedule Build & Deploy Hooks

# Controls when the workflow will run
on:
  schedule:
    # Runs at 9am every weekday
    - cron: "0 9 * * *"
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# The workflow to run
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Runs a request to the build hook
      # For security keep your build hook secret - add it to your github repo in Settings > Secrets
      - name: Build hook request
        run: curl -X POST -d {} ${{ secrets.BUILD_HOOK }}
{% endhighlight %}

Notice the step to run the `curl` command is set to a secret, that's because your deploy hook does not have security on it, so your static site generator provider will build your site every time that endpoint is called.

To add the secret to your repository, go to `Settings > Secrets and variables > Actions`. This is where we create the Name of the variable `BUILD_HOOK` and the value is the full URL we got from our prep work above.

On GitHub you should be able to run this action as well on demand and see the results.

## Method 2: Cron-Job

There is a free service called [cron-job.org](https://cron-job.org) and allows you to create different cron jobs on their platform to call your deploy hook. This service also has many other uses as well. Along with running your cron jobs, they promote reporting metrics as well as history, status pages, notifications of the jobs, and many more.

I have not used this yet, but it does look promising for this purpose and a few others I have in mind.

## Wrapping up

You still need your web hook to build your site either way, but we now have options on what platform will trigger our build event and when we want it to happen. What I did on my [blogroll](/blogroll) was added a helper function to display the `buildTime()` and add that to the page as well. This helps me keep track when my site is being updated, and also lets the visitors know how current my list is, too.

Resources:

- [Github Action Quickstart](https://docs.github.com/en/actions/quickstart)
- [Netlify Build Hooks](https://docs.netlify.com/configure-builds/build-hooks/)
- [Vervel Deploy Hooks](https://vercel.com/docs/concepts/git/deploy-hooks)
- [Render Deploy Hooks](https://render.com/docs/deploy-hooks)
- [Free cron schedule editor](https://crontab.guru/#0_9_*_*_*)
- [Getting into cron jobs](/blog/getting-into-cron-jobs/)