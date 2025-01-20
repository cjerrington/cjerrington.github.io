---
title: Colophon
description: How this site is stitched together
permalink: /colophon/
layout: default
---

A *colophon* is a page or section (typically in a footer) of a site that describes how the site is made, with what tools, supporting what technologies, and often published on personal sites at a top level `/colophon` page.

See: [http://en.wikipedia.org/wiki/Colophon_(publishing)](http://en.wikipedia.org/wiki/Colophon_(publishing))

## Built with

- 11ty
- markdown
- Nunjucks
- liquid
- NodeJS
- VS Code
- Pop!_OS
- git

This site is built using [11ty](https://www.11ty.dev/) or Eleventy. This is a static site generator that really puts the power in your hands. So far using 11ty has allowed me to create various complex pages easily like my [bookmarks](/bookmarks), [stats](/stats), and [100DaysToOffload](/100DaysToOffload) pages.

11ty uses [NodeJS](https://nodejs.org/en) for building and serving the pages locally while developing content.

My primary way to create content on the website is with [VS Code](https://code.visualstudio.com/) as my text editor. Writing my content is mostly in [Markdown](https://www.markdownguide.org/) so I can focus on the content rather than the HTML page structure. The additional benefit of static site generators and templating. 11ty allows the user to use multiple [templating systems](https://www.11ty.dev/docs/languages/) between [Nunjucks](https://mozilla.github.io/nunjucks/) and [liquid](https://liquidjs.com/index.html).

Images are typically managed with [Gimp](https://www.gimp.org/), [ImageMagick](https://imagemagick.org/), or the [11ty Image](https://www.11ty.dev/docs/plugins/image/) plugin.

Currently my operating system and build machine is a Dell Latitude 5520 running [Pop!_OS](https://pop.system76.com/).

I use [git](https://git-scm.com/) to maintain changes to my website.

## Hosted with

### Website content

I use a CI/CD process with [Vercel](https://vercel.com/) which integrates with my Git repository and does the build and deploy to their systems to serve the built static site content. Currently my git repository is hosted at GitHub, but looking to moving to [Codeberg](https://codeberg.org/cjerrington) and still deploying to Vercel for the hosting. Codeberg does have their [Pages](https://codeberg.page/), but I am not using is right now for my main website until [Woodpecker CI](https://docs.codeberg.org/ci/#using-codeberg's-instance-of-woodpecker-ci) is a little more stable.

### Domain Registrar

My domain provider is [Porkbun](https://porkbun.com/). They have excellent pricing and customer service.

### DNS Provider

My domain uses [Cloudflare DNS](https://developers.cloudflare.com/dns/) for a few reasons. I get a free SSL certificate for my domain automatically. The move of my DNS to Cloudflare was a few years ago before Let's Encrypt and other hosting service providers offered SSL certificates to their customers. For many of my DNS records I choose to have the record be DNS only instead of Proxied through Cloudflare.

I do use the proxied records for some self service reasons so I can have some privacy of where those services are located.

For most of my web career, I've always separated my services out instead of having everything at one spot. Having these items separated allows for an easy change in services if the need comes up, and I'm not locked into one ecosystem.
