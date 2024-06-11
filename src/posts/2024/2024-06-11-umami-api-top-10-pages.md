---
title: Umami API Top 10 Pages
description: "Using the Umami API to show the Top 10 pages on my website"
date: 2024-06-11
tags: 
  - 11ty
  - automation
  - web design
---

Recently I added a [Stats](/stats) page, and wanted to add a few more interesting facts. This last change was to add the top 10 most popular posts from the last month.

To get started, I wanted to use [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/) since this is a built-in and can cache the results for us. Since [migrating](http://localhost:8080/blog/the-good-side-of-analytics-umami-vercel/) to Umami, I've enjoyed some of the analytics again. Every once in a while it's nice to see which blog posts people are reading the most. It helps me enjoy writing and sharing my thoughts and solutions on my website.

Umami has some decent [documentation](https://umami.is/docs/api) and we need to [authenticate](https://umami.is/docs/api/authentication) first, then you can get website stats and more. When I was looking at what was available, the [Website stats](https://umami.is/docs/api/website-stats#get-/api/websites/:websiteid/metrics) was what I was looking for.

## The Setup

I created a global data file `_data/analytics.js` for this. This is what gets the data for the API call. First have to authenticate, so I created a function that would get the `token` needed for the next requests. After successfully testing, I did update the strings with environment variables.

```javascript
const token = await fetch(`https://${process.env.UMAMI_ANALYTICS_HOST}/api/auth/login`, {
    method: "post",
    headers: {
        'Content-Type': 'application/json'
    },
    
    //make sure to serialize your JSON body
    body: JSON.stringify({
        "username": `${process.env.UMAMI_ANALYTICS_USER}`,
        "password": `${process.env.UMAMI_ANALYTICS_PASS}`
        })
    })
    .then( ( response) => { 
        return response.json();
    }).then(function(data){
    
    //do something awesome that makes the world a better place
    return data.token
});
```

Next, we need to setup our URL. We have our domain, the website id is the guid from your installation, then the endpoint.

The available endpoints are:

```text
GET /api/websites/:websiteId/active
GET /api/websites/:websiteId/events
GET /api/websites/:websiteId/pageviews
GET /api/websites/:websiteId/metrics
GET /api/websites/:websiteId/stats
```

I was able to get the current time in milliseconds for the `endAt` period. There is a great website to find the [current milliseconds](https://currentmillis.com/) and it even gives you some suggestions on how to get the time, and a converter so you can find the right start time.

```html
https://umami.mydomain.com/api/websites/8dc75463-34f0-4398-a3cf-d2b905edaaac/metrics?startAt=1656679719687&endAt=1718128068697&type=url
```

Finally, I can `return` the `EleventyFetch` with our options to download and cache the results. The fetch call allows for headers with `fetchOptions` so I could pass the `token`.

```javascript
return EleventyFetch(url, {
    duration: "1d", // save for 1 day
    type: "json", // we’ll parse JSON for you
    fetchOptions: {
        headers: { Authorization: `Bearer ${token}` },
    }
});
```

When the site is built, I wanted to update the results to start from 30 days ago, and end now. Since I am using [Vercel](https://vercel.com) for my hosting, I won't be able to add the time myself, so I wrote some date math to accomplish this.

```javascript
const today = new Date().getTime();
const priorDate = new Date(new Date().setDate(new Date().getDate() - 30));
```

The `getTime()` method gets the date in milliseconds. Next was to find the date timestamp from 30 days ago; this was a little trickier. I had to start with getting a new date then set the date from 30 days ago. It's a bit ugly, but works for this process.

## Implementation

Since I used a global data file, I could loop through the items in the `analytics` object that gets created. When Umami returns the results it's pretty simple where `x` is the url path, and `y` is the count.

```json
[
  {
    "x": "/blog/powershell-gui-with-wpf/",
    "y": 440
  }
]
```

The API call can also have a limit on the request, but I pulled all the data, so I can adjust the limit during deployment if needed. For my site I had to add an Eleventy filter for `limit`.

```javascript
eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
});
```

To loop through the items, I simply made a table to properly display the data.

{% raw %}

```html
<table>
    <tr>
        <th>Page</th>
        <th>Views</th>
    </tr>
    {% for item in analytics | limit(10) %}
        <tr>
            <td><a href="{{ item.x }}">{{ item.x }}</a></td>
            <td>{{ item.y }}</td>
        </tr>
    {% endfor %}
</table>
```

{% endraw %}

## Conclusion

This all turned out nicely for my [Stats](/stats) page, adding some more great data. Since I am querying the type of `url`, and the output is the URI path, I didn't want to add more complexity yet to query the page and get the human title of the page. The page slugs I use seem to describe the page well enough, that if you're interested you'd know what it is.

You can see the full source for the `_data/analytics.js` on [Github](https://github.com/cjerrington/cjerrington.github.io/blob/master/src/_data/analytics.js)

There are a few other resources I found while working through this. What I have works for what I was trying to accomplish using Eleventy Fetch and pull data from the Umami API.

- [Umami API](https://umami.is/docs/api)
- [Umami API Client](https://umami.is/docs/api/api-client)
- [Umami Node Client](https://umami.is/docs/api/node-client)
- [umami-api](https://www.jsdelivr.com/package/npm/umami-api)
- [Eleventy Fetch](https://www.11ty.dev/docs/plugins/fetch/)
