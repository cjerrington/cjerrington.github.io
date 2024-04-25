---
title: "Netlify hosting and redirects"
description: "Did you know that Netlify allows for you to have a configuration file to tell it how to deploy your project?"
tags:
  - netlify
  - web design
  - 100DaysToOffload
date: 2023-01-07
image: './src/assets/images/blog/netlify.jpg'
---

Did you know that [Netlify](https://netlify.com) allows for you to have a configuration file to tell it how to deploy your project?

There is a special [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/#sample-netlify-toml-file) file that can be used for many settings you can configure when deploying your site. I want to focus on the redirects in this post specifically.

When building a site Netlify gives you a `random-word-phrase.netlify.app` domain. This is useful for a single app where you dont need a [custom domain](https://docs.netlify.com/domains-https/custom-domains/) attached.

I recently moved to Netlify for hosting instead of [GitHub Pages](https://pages.github.com/) to publish my Jekyll site. the setup and move was easy to do too. I did get my `random-word-phrase.netlify.app` subdomain initally, but you can change that. So I changed mine to `cjerrington.netlify.app` to match some of the other naming schemes of other items.

I found this post on [Moving your Jekyll site to Netfify](https://www.netlify.com/blog/2017/05/11/migrating-your-jekyll-site-to-netlify/), and Netlify makes this easy as well straight from your dashboard when making a new project with them.

Once the site was built, I could go to [cjerrington.netlify.app](https://cjerrington.netlify.app) and (once DNS was update) [claytonerrington.com](https://claytonerrington.com), but just l-ike [www.claytonerrington.com](https://www.claytonerrington.com) forwards to the APEX domain, I wanted the `*.netlify.app` to auto redirect which it does not from the website -configurations.

Thus comes in the redirects:

```toml
[[redirects]]
  from = "https://cjerrington.netlify.app/"
  to = "https://claytonerrington.com"
  status = 301
  force = true
```

Pretty simple right? Now there is another option. To add a `_redirects` file, and with Jekyll we need to include this in our `_config.yml` file for building.

This syntax is pretty simple as well.

```text
# Redirects from what the browser requests to what we serve
/home              /
/blog/my-post.php  /blog/my-post
/news              /blog
/cuties            https://www.petsofnetlify.com
```

When you hit `/home` we want to redirect that to the root of the domain `/`. This redirect could be realated to how a `.htaccess` file works as well for redirects.

As mentioned earlier, there are plenty of [config](https://docs.netlify.com/configure-builds/file-based-configuration/#sample-netlify-toml-file) options you can use with the `netlify.toml` file.
