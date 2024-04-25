---
title: 100DaysToOffload
description: All blog posts can be found here
layout: blog
pagination:
    data: collections.offload
    size: 10
permalink: 100DaysToOffload/{% if pagination.pageNumber >=1  %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html
---

The challenge, [100 Days To Offload](https://100daystooffload.com/), is a challenge to publish 100 posts on your personal blog in a year. They don't need to be long, deep, meaningful, just content.

You can see my list of posts below in the challenge and others as well:
- [Mastodon](https://fosstodon.org/tags/100DaysToOffload)
- [Twitter](https://twitter.com/hashtag/100DaysToOffload)
- [Facebook](https://www.facebook.com/hashtag/100daystooffload)

There are {{ collections.offload.length }} posts in the challenge.
