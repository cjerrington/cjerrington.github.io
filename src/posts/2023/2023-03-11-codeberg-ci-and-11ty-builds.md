---
title: Using the Codeberg CI
description: Using Codeberg CI to build 11ty based static sites to push to Codeberg Pages
tags: 
  - automation
  - coding
  - git
  - javascript
  - 100DaysToOffload
date: 2023-03-11
---

In this post we will help walk you through how to build a [NodeJS](https://nodejs.org/en/) and [11ty](https://www.11ty.dev/) (eleventy) website on [Codeberg Pages](https://codeberg.page/).

Currently users need early adopter access to Codeberg's CI environment based on the Woodpecker CI. You can gain access here: [https://codeberg.org/Codeberg-CI/request-access](https://codeberg.org/Codeberg-CI/request-access)

## Overview

This process will make use of the following

- Source repo to contain the source code 
- Destination repo that will be used to serve the pages 
- Codeberg CI (early access)
- Secrets within the CI

## How it works

Currently the `.Woodpecker.yml` file will live in your source codes repo, and have the build commands. Find the latest [here](https://codeberg.org/cjerrington/eleventy-base-blog-source/src/branch/main/.woodpecker.yml).

For the CI we will start by using the node image, setup the secrets, and build commands.

```yml
pipeline:
  build:
    # Use the official jekyll build container
    image: node
    secrets: [ cbtoken, cbmail, cbusername, sourcerepo, destrepo ]
    commands:
      # Avoid permission denied errors
      - chmod -R a+w .
      # Set up git in a working way
      - git config --global --add safe.directory /woodpecker/src/codeberg.org/$CBUSERNAME/$SOURCEREPO/_site
      - git config --global user.email "$CBMAIL"
      - git config --global user.name "CI Builder"
      # clone and move the target repo
      - git clone -b pages https://codeberg.org/$CBUSERNAME/$DESTREPO.git _site
      - chmod -R a+w _site
      - cd _site
      # Prepare for push
      - git remote set-url origin https://$CBTOKEN@codeberg.org/$CBUSERNAME/$DESTREPO.git
      - cd ..
      # Run 11ty build stage
      - npm install
      - npm run build
      # Only needed for custom domains
      #- cp domains _site/.domains
      # Push to target
      - cd _site
      - git add --all
      - git commit -m "Woodpecker CI 11ty Build at $( env TZ=America/Chicago date +"%Y-%m-%d %X %Z" )"
      - git push -u origin pages
```

The use of secrets keeps your information secured and only accessed by the build system. This is beneficial for the email and access token. During the build, the pipeline will clone the source repo, then move into our commands.

We will use the default build dir by 11ty of `_site`. The pipeline will clone our destination repo as _site, then set the remote url for the push after we run our install and build. Once built, it will change directory to the build site and perform our commit and push.

## Accessing the site

On the remote repo we need the default repo to be named pages. This is also how [Codeberg Pages](https://docs.codeberg.org/codeberg-pages/) setups up the access to what serves the pages we just built. You can follow their documentation on how to access your build site based on `username.codeberg.page`.

Checkout the demo 11ty Base Blog template built on Codeberg Pages using the Codeberg CI

- [Source Repository](https://codeberg.org/cjerrington/eleventy-base-blog-source/src/branch/main)
- [Destination Repository](https://codeberg.org/cjerrington/eleventy-base-blog-site)
- [Built solution](https://cjerrington.codeberg.page/eleventy-base-blog-site/)

## Wrap up

Hopefully soon the [Pull Request](https://codeberg.org/Codeberg-CI/examples/pulls/23) gets added soon, so more people can make use of this great service. It was fun to help pioneer this build CI solution and is a great starting place for other NodeJS based static site generators, such as VueJS, Gatsby, Nuxt, Astro, and more.
