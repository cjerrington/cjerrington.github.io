---
title: "Working with Tags in Jekyll"
excerpt_separator: "<!--more-->"
categories:
  - Blog
tags:
  - Jekyll
  - 100DaysToOffload
classes: wide
---

Jekyll has some powerful uses now with categories, tags, post, pages. I found a unique way to create a page just for one post. 

<!--more-->

The purpose for this was to have a better way to track and view all the posts for the `#100DaysToOffload` challenge. 

Simple way for Jekyll to do this is:

```ruby
{.% for tag in site.tags %.}
  {.{ tag[0] }.}
{.% endfor %.}
```

This will list all tags that have been used on the site. Lets take a live look below that I've limited to 5. Jeykll creates a new array so we need to call the array back in the for loop.

<ul>
{% for tag in site.tags limit:5 %}
  <li>{{ tag[0] }}</li>
{% endfor %}
</ul>


The `site.tags` has a condition you can pass long with the name of the tag: `site.tags["100DaysToOffload"]`. 

```ruby
{.% for post in site.tags["100DaysToOffload"] %.}
  {.{ post.title }.}
{.% endfor %.}
```

In action we'll see the following post titles as well.

<ul>
{% for post in site.tags["100DaysToOffload"] %}
  <li>{{ post.title }}</li>
{% endfor %}
</ul>

Lastly, lets see how to get the post counts. This is really simple! Reference the tag we want to get the size of `site.tags["100DaysToOffload"]` and then pipe over the `size` function.

 ```ruby
 The tag, 100DaysToOffload, has {.{ site.tags["100DaysToOffload"] | size }.} posts
 ```

 Currently I have written {{ site.tags["100DaysToOffload"] | size }} posts for [100 Days to Offload](/100DaysToOffload/)

 See my completed result here: [100 Days to Offload](/100DaysToOffload/)

 I’m publishing this as part of 100 Days To Offload. You can join in yourself by visiting [100DaysToOffload.com](https://100DaysToOffload.com).

 P.S. If you use my examples on this page remove the `.` between the `{.{` and `}.}`. Jekyll and the rendering takes the markdown and compiles it into the page. 