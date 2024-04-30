---
title: Website redesign and update
description: Same website, new design
date: 2024-04-29 
tags:
  - web design
---

Last year I wrote 100 blog posts and also [migrated static site generators](/blog/11ty-redesign/) from Jekyll to [Eleventy](https://www.11ty.dev/). In that transition I found a decent starter template that allowed a quick and easy transition to the new system. Since learning more about Eleventy and getting more involved with the community, I learned how to take advantage of the [zero-config](https://www.11ty.dev/docs/glossary/#zero-config) system it uses and how flexible the system really is for my posts and pages.

Over my time in web design and technology, I've found I enjoy the backend of web hosting than I do making the front-end from scratch myself. With this, I found [Eleventy Excellent](https://eleventy-excellent.netlify.app/) created by [Lene Saile](https://www.lenesaile.com/). Her design and layout was something I was looking for, and instead of creating it all myself, I find the benefit of showing other developers their hard work pays off and people like it too!

I enjoy knowing that the time I spend to create or write something there is someone out there who also finds it useful.

## Updating Challenges

One of the things I looked at was how to move my rendering from just markdown for posts to nunjucks this template uses. Nunjucks has some benefits as well, and actually makes writing some posts easier moving forward.

Since the Eleventy rendering of my `codeblocks` is different in markdown from nunjucks I needed to find a way to edit the 100+ posts I have written over the years. Also, this template used `description` where I used `excerpt` previously. This could have been changed in the `post.njk` template, but if I wanted to update anything later on from Lene, this would cause a problem again.

Good thing the Linux terminal made this easy for me. I needed to edit every file and update the code blocks. First, I used `grep` to get the output of the types of coding blocks I used. 

{% raw %}

```shell
grep -h "{% highlight" ./* | sort -u
```

{% endraw %}

That gave me the following, then I could update each file with one command. 

{% raw %}

```text 
{% highlight bash %}
{% highlight batch %}
{% highlight html %}
{% highlight javascript %}
{% highlight js %}
{% highlight powershell %}
{% highlight python %}
{% highlight shell %}
{% highlight text %}
{% highlight toml %}
{% highlight xml %}
{% highlight yaml %}
{% highlight yml %}
```

{% endraw %}

Now I needed to change each of these: 

{% raw %}

```text
# Change this 
{% highlight shell %}

# To this...
{% highlight "shell" %}
```

{% endraw %}

Yes, needed to add `"` around the language of the highlight tag. I was able to make use of the `find` and `sed` command to look for all files in the directory to do a find and replace. Since most of my posts had a code block, I needed a quick and easy way to update these. I used this same process to mass update a few other items about the way the blog posts were written.

{% raw %}

```shell
find ./ -type f -exec sed -i 's/{% highlight bash %}/{% highlight "bash" %}/gI' {} \; 

find ./ -type f -exec sed -i 's/excerpt:/description:/gI' {} \; 
```

{% endraw %}

## Some improvements

The main page had a good use of the pagination and I was able to use this for my display of [100DaysToOffload](/100DaysToOffload/) content. Paginate of 10 posts per page seems more manageable than 100 posts on one page.

I was able to add in my "this post is part of the 100 Days to Offload" easily still.

I like the way the new [Tags](/tags) page lays out the content as well.

For the new home page, I took some time to look at a few other sites I follow as well and see what kind of content they have on their website and made some adjustments as well. The code block on my home page I like as well, gives it a quick summary of things in a way that also expresses what I enjoy as well.

The template also creates fancy Open Graph images and that was fun making a new background to use.

Some visitors may find it nice to see there is limited JavaScript on the website now, and the page functions the same if JavaScript is disabled.

My RSS readers may also find that I was able to update the [Reply by email](/blog/adding-reply-by-email/) in the RSS content now.

One other item I really wanted was to do a quick dead link check. It's been a while since I've wrote some of the posts and to ensure with all the changes, my internal and external links continue to work. Recently I seen where good URLs don't change and [this project](https://4042302.org/) is a good example. While Vercel uas a `_redirects` or `vercel.json` you can have a few setup, I didn't want my entire structure to change.

With the help of a little Python I could write up a quick `deadlinks.py` script and was able to ensure all the links on my pages are still resolvable. Feel free to use this as well, it gets the job done.

During this process I was able to do some spell check and fix those errors.

## Things still needed

I have used the search feature of my website myself a lot. Nothing like reading your own posts to work on your next project. I could reuse the [search process](/blog/adding-a-basic-search/) I had, but might look at a few additional [search methods](https://11tybundle.dev/categories/search/).

I've looked at many pages to ensure I have a complete build, but need to look at each page to make sure there's no other odd rendered posts.

My RSS feed should remain the same, but I'd like to [format my RSS feed](/blog/adding-some-flare-to-rss/) again in the browser view. 

### Closing Thoughts

I've enjoyed using Eleventy as it has been able to take a variety of things thrown at it in different ways and still be able to create great pages.

Other honorable mentions:

- [11ty](https://www.11ty.dev/) - 11ty website
- [11ty Dev Bundle](https://11tybundle.dev/) - Big book of 11ty resources
- [Excellent Eleventy](https://eleventy-excellent.netlify.app/) - Starter website template
- [Bliss](https://eleventy-bliss.lkmt.us/) - Starter website template