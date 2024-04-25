---
title: "Adding a basic search to a static site"
description: "A simple solution to having a search feature on a static website"
tags:
  - web design
  - 100DaysToOffload
date: 2023-01-30
---

Having a search feature typically requires a database or server side backend to help with the data query. Lets take a quick look at how we can add a simple search to a static website. Somehow we need a system to know about the content on your website so the user can search it. With static files we can query then, so how would this work? 

I'll assume you are using a static site generator like Jekyll, 11ty, Hugo, the like. This process will require three files and will be quick to add to your pages. This example will be based on a 11ty based static site, but concepts and porting should be pretty easy and straight forward. 

## search index

Our search index will be a json file that has our title, excerpt, tags, and special keywords. 
{% raw %} 
```json"
---
permalink: "/search.json"
---
[
  {%- for post in collections.post | reverse %}
    {%- set url %}{{ post.url | url }}{% endset -%}
    {
      "url": "{{ url }}",
      "title": "{{ post.data.title }}",
      "excerpt": "{{ post.data.excerpt }}",
      "keywords": "{{ post.data.keywords }}",
      "tags": "{{ post.data.tags }}"
    }
    {%- if not loop.last -%}
    ,
    {%- endif -%}
  {%- endfor %}
]
```
{% endraw %} 

## search page

Add the following to your page template for your search page

{% highlight "html" %}
Enter text below to begin your search
<input type="text" id="search" autocomplete="off" placeholder="Search..." />
<div id="results"></div>
<script src="/search.js" async defer></script>
{% endhighlight %}

## search worker

The part that does the work is in the `search.js` file. It reads the search index for the content the user enters in the input box. For each match it'll append a link to the HTML the post title and excerpt. 

{% highlight "js" %}
(async () => {
  document.getElementById('search').addEventListener('keyup', (event) => {
    const searchString = event.target.value.toLowerCase()
    const results = []
    posts.forEach((post) => {
      if (
        post.title.toLowerCase().includes(searchString) ||
        post.excerpt.toLowerCase().includes(searchString) ||
        post.keywords.toLowerCase().includes(searchString) ||
        post.tags.toLowerCase().includes(searchString)
      ) {
        results.push(`
          <a href="${post.url}">
            <h2>
              ${post.title}
            </h2>
          </a>
          <p>
            ${post.excerpt}
          </p>
          `)
      }
    })

    document.getElementById('results').innerHTML = results.join('')
  })

  const posts = await fetch('/search.json').then(res => res.json())
})()
{% endhighlight %}

## Conclusion

I have seen this idea from [joshinator.de](https://joshinator.de/posts/11ty-search/), and modified it a little in application on my site. Most of the credit goes to him. How could you use this for your static site? Try it out for yourself too: [Search now](/search/)