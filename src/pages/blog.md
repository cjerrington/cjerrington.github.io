---
title: Blog
description: 'All blog posts can be found here'
layout: blog
pagination:
  data: collections.posts
  size: 10
permalink: 'blog/{% if pagination.pageNumber >=1  %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
---

I publish a few blog posts about Powershell, Technology, and other random thoughts.