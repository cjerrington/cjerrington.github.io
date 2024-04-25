---
title: Robots and AI
description: Discussing AI, ChatPGT, and other web scrapper bots
tags: 
  - web design
  - 100DaysToOffload
draft: false
date: 2023-10-10
---

What is this robots file even for? It is supposed to be used by the web crawlers to know information about your website. This is how crawlers for search engines like Google, Bing, Yahoo! and more know about your website, and thus it's content. These web crawlers got the nickname of web robots, and begin to archive and categorize websites across the web. Most of these bots are designed to look for a `robots.txt` file on the root of the domain, and read any special instructions as to how to crawl and index the web site.

This file contains the contents the bot should ignore whether it's files or directories. Setting these values might be for privacy reasons, or just certain content that should not be indexed by the crawler like an admin folder, images, or specific files.

With the introduction of AI and other chat bots, that industry believes the default should be opt-out not opt-in. So without the proper robots.txt file details, your website might be crawled by these bots and used for AI and other chat bot reasons. So since the industry believes we should allow the crawlers by default, there have been a few individuals who have created a list of the bots so we can opt-out. Neil Clarke discusses this a little further as well in his [article](https://neil-clarke.com/block-the-bots-that-feed-ai-models-by-scraping-your-website/).

There was a post by [@patricksamphire](https://wandering.shop/@patricksamphire/111147479309728367) where he lists a few of these different AI and chat bots you can add to your robots.txt file. A comment in that post by [ecnepsnai](https://github.com/ecnepsnai), mentioned they created a [GitHub Repository](https://github.com/ecnepsnai/Robots.txt-Block-AI) in hopes that as more of these bots appear, they can be added to the list of AI and chat bots.

Here is a current list I have set for my `robots.txt` file at the time of writing:

{% highlight "text" %}
User-agent: CCBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Omgilibot
Disallow: /

User-agent: FacebookBot
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: Teoma
Disallow: /

User-agent: Gigabot
Disallow: /

User-agent: Robozilla
Disallow: /

User-agent: Nutch
Disallow: /

User-agent: psbot
Disallow: /
{% endhighlight %}

## Wrap up & Resources

While the use of the `robots.txt` is a great resource there is no guarantee that a web crawler will adhere to the contents of the file either.

- [robots.txt](https://en.wikipedia.org/wiki/Robots.txt)
- [ai.txt Generator](https://site.spawning.ai/spawning-ai-txt)
- [Free Robots.txt Generator](https://www.seoptimer.com/robots-txt-generator)
- [Robots.txt Generator](https://www.robotstxtgenerator.org/)
