---
title: Copyright Code in Jekyll
description: "How to add a copyright statment in your Jekyll sites."
tags:
  - coding
  - jekyll  
  - web design
date: 2016-02-12
---

In a previous [post](/blog/Copyright-Code-in-PHP/) I talked about how to create your copyright date in PHP. Some time ago, I found a way to do the same thing in Jekyll.

The great thing about this is it will auto-generate the site name and date based of your site settings. This makes it easier when creating a Jekyll site for someone else when they fork it. All they have to do is update the site settings in the `_config.yml` file and the new user is ready to go.

```ruby
&copy; { { site.name } } { { site.time | date: '%Y' } } | All Rights Reserved.
```

&copy; Site Name 2016 | All Rights Reserved.

You can see this in effect below. This was great too when the new year started, I didn't have to update my websites copyright time-stamp.

Sure you could add a date span by stating your "start date" in plain text. Something like:

```ruby
&copy; { { site.name } } 2010 - { { site.time | date: '%Y' } } | All Rights Reserved.
```

&copy; Site Name 2010 - 2016 | All Rights Reserved.

You could even add a `startyear` variable and reference it instead.

```ruby
&copy; { { site.name } } { { site.startyear } } - { { site.time | date: '%Y' } } | All Rights Reserved.
```
