---
title: Showing Omnivore links as Bookmarks
description: 'How to setup a [skip ci] process on Vercel and their CI integration'
date: 2024-06-25 16:34:40
tags:
  - vercel
  - 11ty
  - web dev
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

I have been using [Omnivore](https://omnivore.app/) for a while now as a Pocket alternative. This has been a great way to save links for later, organize them, and even share them between devices. I have seen this article by Tom Doe about [Creating a Reading List with Eleventy and Omnivore](https://ttntm.me/blog/creating-a-reading-list-with-eleventy-and-omnivore/), and decided to try this out. One of the other things I've seen is the rise of [/slashpages](https://slashpages.net/) - website created by [Robb Knight](https://rknight.me/).

What I love about 11ty now is the ability to fetch data from remote sources and add it to my website. Things like my [blogroll](/blogroll), [bookmarks](/bookmarks), [stats](/stats) pages all pull from RSS or different APIs to present this data on the page.

Tom does a great job at explaining how this works and the setup process. First, you need an Omnivore account and API. Then, a basic understanding of the GraphQL process and how to use the [Omnivore API](https://docs.omnivore.app/integrations/api.html).

What I wanted differently in the process is only display a certain tag, and not any of the first 10 items that were saved. I was able to update the query to pull in the labels and have `eleventy-fetch` cache the updates. Just like Tom, I had to look at the schemas and interpret what is needed. The labels are store in an additional array object and I only wanted the name and not the color, created at, or description.

```json
node {
    id
    title
    description
    siteName
    url
    publishedAt
    savedAt
    labels {
        name
    } 
}
```

This saved the `labels` in the json object that was cached. I needed to then process the labels in my loop and only show the item if the label was for `bookmarks`.

{% raw %}

```js
{% for item in reading %}
    {% for label in item.labels %}
    {% set mylabel = label | values %}
    {% if 'bookmarks' in mylabel %}
    <li class="card">
        <div class="flow">
        <h2>
            <a href="{{ item.url }}" class="no-indicator">{{ item.title }}</a>
        </h2>

        <p>{{ item.description }}</p>
        </div>
    </li>
    {% endif %}
    {% endfor %}
{% endfor %}
```

{% endraw %}

I created a new variable called `label` for better readability and added the filter for `values`.

```js
eleventyConfig.addFilter('values', Object.values);
```

Next, I looked to see if `bookmark` was in `mylabel`, and if it was we displayed that item on the bookmarks page.

Now when my site gets rebuilt, and I save new links tagged as `bookmark` in Omnivore, they will be displayed on my website automatically.

Enjoy my [Bookmarks](/bookmarks)!
