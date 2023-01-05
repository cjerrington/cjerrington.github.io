---
title: "Working with Tags in Jekyll"
excerpt_separator: "<!--more-->"
categories:
  - Blog
tags:
  - Jekyll
  - 100DaysToOffload
classes: wide
header:
  og_image: https://jekyllrb.com/img/jekyll-og.png
---

Jekyll has some powerful uses now with categories, tags, post, pages. I found a unique way to create a page just for one post. 

<!--more-->

The purpose for this was to have a better way to track and view all the posts for the `#100DaysToOffload` challenge. 

Simple way for Jekyll to do this is:

{% highlight ruby %}
{% raw %}
{% for tag in site.tags %}
  {{ tag[0] }}
{% endfor %}
{% endraw %}
{% endhighlight %}


This will list all tags that have been used on the site. Lets take a live look below that I've limited to 5. Jeykll creates a new array so we need to call the array back in the for loop.

<ul>
{% for tag in site.tags limit:5 %}
  <li>{{ tag[0] }}</li>
{% endfor %}
</ul>


The `site.tags` has a condition you can pass long with the name of the tag: `site.tags["100DaysToOffload"]`. 

{% highlight ruby %}
{% raw %}
{% for post in site.tags["100DaysToOffload"] %}
  {{ post.title }}
{% endfor %}
{% endraw %}
{% endhighlight %}

In action we'll see the following post titles as well.

<ul>
{% for post in site.tags["100DaysToOffload"] %}
  <li>{{ post.title }}</li>
{% endfor %}
</ul>

Lastly, lets see how to get the post counts. This is really simple! Reference the tag we want to get the size of `site.tags["100DaysToOffload"]` and then pipe over the `size` function.

{% highlight ruby %}
{% raw %}
 The tag, 100DaysToOffload, has {{ site.tags["100DaysToOffload"] | size }} posts
{% endraw %}
{% endhighlight %}

The tag, `100DaysToOffload`, has {{ site.tags["100DaysToOffload"] | size }} posts

See my completed result here: [100 Days to Offload](/100DaysToOffload/)

I’m publishing this as part of 100 Days To Offload. You can join in yourself by visiting [100DaysToOffload.com](https://100DaysToOffload.com).
