---
title: Building a Blogroll with 11ty
description: How I created a blogroll with 11ty based off of Ben Myers solution
tags: 
  - 11ty
  - 100DaysToOffload
  - personal
draft: false
---

I was reading the [11ty Bundle](https://11tybundle.dev/) and saw a post on how to create a blogroll with 11ty. This has been something I've been interested in creating and the solution from [Ben Myers](https://benmyers.dev/) was great and only had to make a few modifications. Check out the final version of [my blogroll](/blogroll) to skip ahead.

So what is a [blogroll](https://blogroll.org/what-are-blogrolls/)? It is a list of blogs and websites on one page that have links to other blogs and websites. This is is similar to a [webring](https://en.wikipedia.org/wiki/Webring), but could be viewed as a little more personal to the author.

This time I won't go into all the details of how this was configured, since [Ben Myers](https://benmyers.dev/blog/eleventy-blogroll/) does a great job of this. But what is happening here...

## The setup and design

I created a folder in my website called `src/blogroll`. This is the root of the generated page as well and this is where the data files will go. The process will use an Eleventy data file, json array of rss feed links, and an index page for rendering the [blogroll](/blogroll).

With the `blogroll.11tydata.json` file that contains the rss link data, I made a change to the array to be called `"blogroll"`. I then had to update the `src/blogroll/blogroll.11tydata.js` file as well to compute the export in the end in the part for `async blogData({blogroll})` and the promise `await Promise.all(blogroll...)`.

Using Ben's solution for some reason kept throwing build errors, but calling the data object `blogroll` kept the section consistent for me.

In the 11ty data file the processes uses a combination of the plugin [@11ty/eleventy-fetch](https://www.11ty.dev/docs/plugins/fetch/) and the node package [rss-parser](https://www.npmjs.com/package/rss-parser). What is nice about the `eleventy-fetch` plugin is it comes with a built-in caching system of our RSS feeds. This cache is nice, so we can store the data for 1 day, so if we make multiple changes, we are not spamming our fellow blogroll sites, and lengthening our own build times.

The `index.njk` template was a great outline, but my site uses a `<div>` system for the post/card and not the `<article>` tag.

This has solution makes use of Zach's [IndieWeb Avatar service](https://www.11ty.dev/docs/services/indieweb-avatar/) which I thought was pretty neat! You provide the API an `encodedURIComponent` and it finds the sites favicon for us, and adds it to the blogroll members' card.

{% highlight "js" %}
const encodedBlogUrl = encodeURIComponent(blog.url);
const src = `https://v1.indieweb-avatar.11ty.dev/${encodedBlogUrl}/`;
{% endhighlight %}

## Final product

You can see the files specifically used for the blogroll creation in this [git commit fc18ed5](https://github.com/cjerrington/cjerrington.github.io/commit/fc18ed51f714f024081b6d9846a1872310e17c7c). Check out my [blogroll](/blogroll) to see some of the sites that I follow and read too. I'd like to create one for podcasts as well. 

If you'd like to be addded let me know! There are a few more to add for sure.