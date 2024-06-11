---
title: Stats
permalink: /stats/index.html
description: Website Stats
layout: page
---

## Last month's Top 10

<table>
    <tr>
        <th>Page</th>
        <th>Views</th>
    </tr>
    {%- for item in analytics | limit(10) -%}
        <tr>
            <td><a href="{{- item.x -}}">{{- item.x -}}</a></td>
            <td>{{- item.y -}}</td>
        </tr>
    {%- endfor -%}
</table>

View the full stats on [Umami](https://analytics.claytonerrington.com/share/9FNL88ifrvc1v0EY/claytonerrington.com)

## Blog Stats from last {{ currentYear - 2015 }} years

There are {{ collections.posts.length }} posts of all time across {{ collections.tagList2023.length }} tags

<ul role="list">
{% for tag in collections.tagList2023 %}
    <li><a href="{{ '/tags/' }}{{ tag.tagName }}">{{ tag.tagName }}</a> - {{ tag.tagCount }} Posts</li>
{% endfor %}
</ul>

{% postGraph collections.posts, { sort: 'desc' }  %}
