---
title: "Copyright Code in PHP"
description: "How to add a copyright statment on your PHP pages."
tags:
  - php
  - coding
date: 2015-03-10
---

When making websites many want a copyright year date in their footer. I wrote a simple PHP copyright function that simply gets the year and then calculates if the year given is the current year or not.

If the year is this year it will output ``` Copyright 2015 ```. If there is a difference in years the function will out put ``` Copyright 2010 - 2015 ```.

This is a set it and forget it kind of script. Once you start using it you still need to put this years date as your start date when calling the function. I hope this is very simple to use and hope it helps you in your projects. Below you will find the Gist file where you can download, edit, upgrade, or whatever you'd like.

<script src="https://gist.github.com/cjerrington/a11c95a1cdeabd8cdc69.js"></script>
