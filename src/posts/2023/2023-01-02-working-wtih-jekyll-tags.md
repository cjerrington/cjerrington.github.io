---
title: "Working with Tags in Jekyll"
description: Jekyll has some powerful uses now with categories, tags, post, pages. I found a unique way to create a page just for one post."
tags:
  - jekyll
  - 100DaysToOffload
date: 2023-01-02
---

Jekyll has some powerful uses now with categories, tags, post, pages. I found a unique way to create a page just for one post. 

The purpose for this was to have a better way to track and view all the posts for the `#100DaysToOffload` challenge. 

Simple way for Jekyll to do this is:

{% raw %}

```highlight ruby
{ % for tag in site.tags % }
  { { tag[0] } }
{ % endfor % }
```

{% endraw %}

This will list all tags that have been used on the site. Lets take a live look below that I've limited to 5. Jeykll creates a new array so we need to call the array back in the for loop.

<ul>

{% for tag in collections.tagList %}
  <li>{{ tag }}</li>
{% endfor %}
</ul>


The `site.tags` has a condition you can pass long with the name of the tag: `site.tags["100DaysToOffload"]`. 

```highlight ruby
{ % for post in site.tags["100DaysToOffload"] % }
  { { post.title } }
{ % endfor % }
```

In action we'll see the following post titles as well.

<ul>
{% for post in site.tags["100DaysToOffload"] %}
  <li>{{ post.title }}</li>
{% endfor %}
</ul>

Lastly, lets see how to get the post counts. This is really simple! Reference the tag we want to get the size of `site.tags["100DaysToOffload"]` and then pipe over the `size` function.

```highlight ruby
The tag, 100DaysToOffload, has { { site.tags["100DaysToOffload"] | size } } posts
```

The tag, `100DaysToOffload`, has { { site.tags["100DaysToOffload"] | size } } posts

See my completed result here: [100 Days to Offload](/100DaysToOffload/)