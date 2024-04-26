---
title: Website redesign and update
description: Same website, new design
date: 2024-04-26T06:00:00.000Z
tags:
  - web design
---

Last year I wrote 100 blog posts and also [migrated static site generators](/blog/11ty-redesign/) from Jekyll to [Eleventy](https://www.11ty.dev/). In that transition I found a decent starter template that allowed a quick and easy transition to the new system. Since learning more about Eleventy and getting more involved with the community, I learned how to take advantage of the [zero-config](https://www.11ty.dev/docs/glossary/#zero-config) system it uses and how flexible the system really is for my posts and pages.

Over my time in web design and technology, I've found I enjoy the backend of web hosting than I do making the front-end from scratch myself. With this, I found [Eleventy Excellent](https://eleventy-excellent.netlify.app/) created by [Lene Saile](https://www.lenesaile.com/). Her design and layout was something I was looking for, and instead of creating it all myself, I find the benefit of showing other developers their hard work pays off and people like it too!

I enjoy knowing that the time I spend to create or write something there is someone out there who also finds it useful.

## Updating Challenges

One of the things I looked at was how to move my rendering from just markdown for posts to nunjucks this template uses. Nunjucks has some benefits as well, and actually makes writing some posts easier moving forward.

Since the Eleventy rendering of my `codeblocks` is different in markdown from nunjucks I needed to find a way to edit the 100+ posts I have written over the years. Also, this template used `description` where I used `excerpt` previously. This could have been changed in the `post.njk` template, but if I wanted to update anything later on from Lene, this would cause a problem again.

Good thing my Linux terminal made this easy for me. I needed to edit every file and update the code blocks.

{% raw %}

```text
# Change this 
{% highlight shell %}

# To this...
{% highlight "shell" %}
```

{% endraw %}

Yes, needed to add `"` around the language of the highlight tag. I was able to make use of the `find` and `sed` command to look for all files in the directory to do a find and replace. Since most of my posts had a code block, I needed a quick and easy way to update these.

```shell
find . 
```

## Some improvements

The main page had a good use of the pagination and I was able to use this for my display of [100DaysToOffload](/100DaysToOffload/) content. Paginate of 10 posts per page seems more manageable than 100 posts on one page.

I was able to add in my "this post is part of the 100 Days to Offload" easily still.

I like the way the new [Tags](/tags) page lays out the content as well.

For the new home page, I took some time to look at a few other sites I follow as well and see what kind of content they have on their website and made some adjustments as well. The code block on my home page I like as well, gives it a quick summary of things in a way that also expresses what I enjoy as well.

The template also creates fancy Open Graph images and that was fun making a new background to use.

Some visitors may find it nice to see there is limited JavaScript on the website now, and the page functions the same if JavaScript is disabled.

My RSS readers may also find that I was able to update the [Reply by email](/blog/adding-reply-by-email/) in the RSS content now.

## Things still needed

I have used the search feature of my website myself a lot. Nothing like reading your own posts to work on your next project. I could reuse the [search process](/blog/adding-a-basic-search/) I had, but might look at a few additional [search methods](https://11tybundle.dev/categories/search/).
