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
        {%- if "/blog/" in item.x -%}
            {%- if item.x == "/blog/" -%}
                {# do nothing... #}
            {%- else -%}
            <tr>
                <td><a href="{{- item.x -}}">{{- item.x | replace("/blog/", "") | replace("-"," ") | replace("/","") -}}</a></td>
                <td>{{- item.y -}}</td>
            </tr>
            {%- endif -%}
        {%- endif -%}
    {%- endfor -%}
</table>

## Yearly Top 10

<table>
    <tr>
        <th>Page</th>
        <th>Views</th>
    </tr>
    {%- for item in analyticsyearly | limit(10) -%}
        {%- if item.x == "/" -%}
                {# do nothing... #}
            {%- else -%}
            <tr>
                <td><a href="{{- item.x -}}">{{- item.x | replace("/blog/", "") | replace("-"," ") | replace("/","") -}}</a></td>
                <td>{{- item.y -}}</td>
            </tr>
            {%- endif -%}
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
