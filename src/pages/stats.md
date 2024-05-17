---
title: Stats
permalink: /stats/index.html
description: Website Stats
layout: page
---

## Blog Stats from last {{ currentYear - 2015 }} years

There are {{ collections.posts.length }} posts of all time across {{ collections.tagList2023.length }} tags

<ul role="list">
{% for tag in collections.tagList2023 %}
    <li><a href="{{ '/tags/' }}{{ tag.tagName }}">{{ tag.tagName }}</a> - {{ tag.tagCount }} Posts</li>
{% endfor %}
</ul>

{% postGraph collections.posts, { sort: 'desc' }  %}
