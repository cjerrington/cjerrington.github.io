---
title: Updating Codeberg Pages Static Sites
description: >-
  While the Codeberg CI is still in beta, I found another way to publish my
  static files for hosting
draft: false
date: 2023-12-21T00:00:00.000Z
tags:
  - 100DaysToOffload
  - automation
  - coding
  - web design
size: wide
---

Back in March, I got access to the Codeberg CI which uses Woodpecker CI. I wrote up a [post](/blog/codeberg-ci-and-11ty-builds/) to help get the 11ty static site generator setup on the platform. This process uses two separate repositories, one for the source code and one to serve the HTML files. The CI already clones the source repo, then we installed the dependencies, built the site, set an origin URL and pushed our content. Here lately, I've noticed a few times the pipeline fails to run, or the platform is under maintenance.

My first thought, which should work on the CI, but in testing, the whole platform was having issue, is to clone the **main** branch, clone the **pages** branch as `_site`, build, and commit both branches respectively. Let's look at the process. I'll be using PowerShell for a few variables, but that is easily ported.

## The setup

I recently made a site called [Dad Jokes](https://dadjokes.claytonerrington.com/), and hosted this on [Codeberg](https://codeberg.org/cjerrington/dadjokes). My repository had a main branch and a pages branch. This pages branch is just like GitHub's dedicated static files hosting.

```powershell
# Clone main source
$ git clone https://codeberg.org/cjerrington/dadjokes.git

# Clone the 'pages. branch as _site. 
$ git clone -b pages https://codeberg.org/cjerrington/dadjokes.git _site
# Install 11ty and dependencies
$ npm i

# To see the compiled site locally
$ npm run start

# Build will go to _site and update the built pages
$ npm run build
```

## Publishing

This is where the nifty stuff comes in. Just like we can clone specific branches, you can also push changes to those as well.

```powershell
# Get the current date
$ $now = get-date -Format "yyyy-MM-dd"

# Build the site, if you have not already.
# Should be in the root of the source to build
$ npm run build
 
# Add source code changes to git, commit, and push
$ git add . 
$ git commit -m "Update dad jokes on $now"
$ git push -u origin main

# Now to add build changes to pages
$ cd _site
$ git add . 
$ git commit -m "Update dad jokes on $now"
$ git push -u origin pages
```

Since you cloned the pages branch, the origin should still be set already to that branch. But since we are going between source/main branch to _site/pages, I think it's best to ensure you're pushing to the right location. This is found in the [git documentation](https://git-scm.com/docs/git-push) as well.

## Woodpecker

Since Woodpecker is using a source repository, it is already downloading the source. We can keep the same git clone -b pages as we are now, but only need to specify one repo, the project. I think once the stability of the Codeberg CI is ensured, I can update the process there as well. Until then This might be my process, and also keeps the number of repositories to keep up with.

## Codeberg Hosting DNS

Codeberg has a default user Pages repository, which is a default repository for each user. However, each repository can have its own pages branch for that project's static hosted files.

According to [Codeberg Pages,]() I set up a CNAME and added a `.domains` file in my pages branch. After some time to allow for Codeberg to set up the static pages route and issues an SSL certificate, the web page worked!

```powershell
$ Resolve-DnsName -Name dadjokes.claytonerrington.com | Select Name,Type,NameHost,IPAddress

Name                                Type NameHost                           IPAddress
----                                ---- --------                           ---------
dadjokes.claytonerrington.com      CNAME dadjokes.cjerrington.codeberg.page
dadjokes.cjerrington.codeberg.page  AAAA                                    2001:67c:1401:20f0::1
dadjokes.cjerrington.codeberg.page     A                                    217.197.91.145
```

It all checks out and now can keep the website updated.
