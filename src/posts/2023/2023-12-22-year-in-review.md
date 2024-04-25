---
title: Year in Review
description: Take an overview look at the year 2023 and what it had in store
draft: false
date: 2023-12-22T06:00:00.000Z
tags:
  - 100DaysToOffload
---

Not only is this the Year in Review for 2023, but it also completes the <a href="/100DaysToOffload/">100 Days to Offload</a> challenge I started this time last year. 

I wrote about {{ collections.tagList2023.length }} total tags and topics throughout the year.

<p>Here's a neat graph by <a href="https://postgraph.rknight.me/" target="_blank">Robb Knight</a> as well, similar to the GitHub commit graph. This is showing all the posts tagged for the <a href="/100DaysToOffload/">100 Days to Offload</a>, which should be all posts from 2023 as well. There's that one post in 2022 for the start of journey.</p> 

{% postGraph collections.100DaysToOffload %}  

<p>Next, I thought it would be neat to list out the tags and the count of posts per tag to see the topics I wrote about.</p>
<ul role="list">
{% for tag in collections.tagList2023 %}
    <li><a href="{{ '/tags/' }}{{ tag.tagName }}">{{ tag.tagName }}</a> - {{ tag.tagCount }} Posts</li>
{% endfor %}
</ul>

<p>This has been an exciting year! I have written a lot about my adventures of Docker, powershell, a new position and learning more about AWS. Upgrading my blog to use the 11ty backend static site generator. I think was the best choice this year to help add to the fun of writing and experimenting with the static site generator.</p>

<p>What is in store for next year? I have not decided if I will partake in the 100 Days to Offload again right now, but I have found a new groove in writing and keeping things updated. I still like writing about the new things I learn while coding and preparing my solutions. Writing things down this year has been helpful, and I have even gone back to my own posts later one to see how I did something as it also applied to a new issue.</p>

<p>Here's to 2024!</p>