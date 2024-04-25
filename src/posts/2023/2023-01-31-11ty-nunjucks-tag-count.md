---
title: "11ty, nunjucks, tag counts"
description: "Using nunjucks to get the count of the posts for a tag."
tags:
  - 11ty
  - web design
  - 100DaysToOffload
---

As I write more for the [100DaysToOffload](/100DaysToOffload/), I like to post on my social media the post number. I also made this page for myself to review the posts I've written, and post counts. Initially I did not have this added on this page, but it is on my [tags](/tags/) page where I list the tag and the number of posts in it. 

On my tags page, it uses an eleventy filter of the collection of all posts, and adds this information to the collection. Then on the tags page do a for loop to loop through all the tags and post counts with [Nunjucks](https://mozilla.github.io/nunjucks/). 

{% highlight "js" %}
config.addCollection("tagList", collection => {
    const tagsObject = {}
    collection.getAll().forEach(item => {
      if (!item.data.tags) return;
      item.data.tags
        .filter(tag => !['post', 'all'].includes(tag))
        .forEach(tag => {
          if(typeof tagsObject[tag] === 'undefined') {
            tagsObject[tag] = 1
          } else {
            tagsObject[tag] += 1
          }
        });
    });

    const tagList = []
    Object.keys(tagsObject).forEach(tag => {
      tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
    })
  return tagList.sort((a, b) => b.tagCount - a.tagCount)
});
{% endhighlight %}

This is great, but I have a simpler collection of the posts by tags using the `collectionApi.getFilteredByTag()` filter.

{% highlight "js" %}
// Get only content that matches a tag
config.addCollection("offload", function(collectionApi) {
  return collectionApi.getFilteredByTag("100DaysToOffload").reverse();
});
{% endhighlight %}

So now on my page specificly for the 100DaysToOffload, we can do a for loop to display just the posts in this collection. 

{% highlight "js" %}
{% for post in collections.offload %}
  {{ post.data.title }}
{% endfor %}
{% endhighlight %}

This solution does not have a built in way to get the tag count. So I found two solutions that work in this situatution. 

## Solution 1

Using the full tags collection. For this to work, we need to loop over all the tags, and if we find the tag we want, pull out the tagCount that is defined in our collection.

{% highlight "html" %}
<h1>100 Days To Offload
  {% for tag in collections.tagList %}
    {% if tag.tagName === "100DaysToOffload" %}
      <small>({{ tag.tagCount }} Posts)</small>
    {% endif %}
  {% endfor %}
</h1>
{% endhighlight %}

Depending on how many tags you have you'd still have to loop over all of them to pull out the one. This is a collection that is more of an array of the data that would be needed in one object.

## Solution 2

The second method uses a variable and a loop as well to increase a count, then output that count. 

{% highlight "html" %}
<h1>100 Days To Offload
  {% set postCount = 0 %}
  {% for post in collections.offload %}
    {% set postCount = postCount + 1 %}
  {% endfor %}
  <small>({{ postCount }} posts)</small>
</h1>
{% endhighlight %}

I like this method as I have already filtered the tag in a collection, and manually added the count on the page at render time. This is a collection that just has the posts and basic information and not the extra details that could be included.

## Wrap up

Both methods do work and could still have a valid use case when needed. My [tags page](/tags/) has its own loop process to notate the tag name and tag counts. Now as I post more to the 100DaysToOffload, I can know the post counts. The [100DaysToOffload](/100DaysToOffload/) page uses the simpler collection and a for loop to get the data that is needed. On this page, I'd rather call back to the same collection, than call a larger collection to get a smaller amount of data. 

When I moved from Jekyll and talked about the [11ty redesign](/blog/11ty-redesign), I had a post about the same process in [Jekyll and working with tags](/blog/working-wtih-jekyll-tags)