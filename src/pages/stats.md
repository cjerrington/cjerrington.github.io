---
title: Stats
permalink: /stats/index.html
description: Website Stats
layout: page
---

## Total Blog Stats from last {{ 2024-2015 }} years

There are {{ collections.posts.length }} posts of all time across {{ collections.tagList2023.length }} tags

<ul role="list">
{% for tag in collections.tagList2023 %}
    <li><a href="{{ '/tags/' }}{{ tag.tagName }}">{{ tag.tagName }}</a> - {{ tag.tagCount }} Posts</li>
{% endfor %}
</ul>

{% postGraph collections.posts, { sort: 'desc' }  %}  