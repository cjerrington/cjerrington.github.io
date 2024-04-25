---
title: "Securing Jekyll with SSL locally"
description: "Jekyll is a great static site generator for many reasons, but lets encrypt that traffic!"
tags:
  - jekyll
  - web design
  - 100DaysToOffload
date: 2023-01-11
---

![SSL header](/assets/images/blog/ssl.jpg)

Jekyll is a great static site generator for many reasons, but lets encrypt that traffic!

So you might be thinking why would I need SSL when running locally? That is a great question!

1. If you are publishing your website, most providers are serving it with an SSL on the published hosting server. Or you might have purchased your own SSL and hosting or through service like Let's Encrypt.
2. There are certain production like qualities that might run best under SSL, currently you dont have a way to test that.
3. Some browsers or extentions auto redirect browser pages to use SSL and HTTPS.

## Getting started

Let's assume you already have your Jekyll site and it's good to go. Now we just need to generate a local SSL certificate. `openssl` will help us with that. The following will create a localhost certificate in the current directory, and it will be valid for 365 days. When running the following command, create a folder in your Jekyll site called `ssl` and set your terminal to that location. Add this folder to your `.gitignore` file as well, we dont need that uploaded to your remote git repository.

```bash
openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth") -days 365
```

Now from Jekyll's [Serve Command Options](https://jekyllrb.com/docs/configuration/options/#serve-command-options) they show there is a `--ssl-key` and `--ssl-cert`, but not much else on how to use this or generating the required items.

## Getting secure

Okay so now we have a certificate to use and the command options, how do we put that all together to run the website?

```bash
bundle exec jekyll serve --ssl-key ssl/localhost.key --ssl-cert ssl/localhost.crt
```

You see something like the following:

![SSL header](/assets/images/blog/jekyll-ssl.png)

There is a known issue where the SSL files need to be local to the Jekyll site folder. You can read more about that [here](https://github.com/jekyll/jekyll/issues/5046). If you like this approach and build many sites, you can have this certificate in one location and create a `symlink` as well.

Now you can browse to `https://127.0.0.1` or `https://localhost`. You might see a self-signed certificate issue, and since this is what we know about we can accept and continue to the site.

![SSL browser warning](/assets/images/blog/browser-warning.png)

## Summary

Hopefully you've been able to get to the same place as well as I did. You will need to install [OpenSSL](https://www.openssl.org/) for the generation of the certificate. This is usually available in most Linux distribution software repositories, and on Windows, there are a few extra steps. Now you can test your site locally with SSL to mimic the production environment as close as possible.