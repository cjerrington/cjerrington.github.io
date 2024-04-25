---
title: Using Cloudflare Workers to Get Visitor Information
description: How to setup a Cloudflare worker to get certain information about the users connection
tags: 
  - web design
  - 100DaysToOffload
date: 2023-02-26
---

A little while ago I saw a blog post from [adamsdesk.com](https://www.adamsdesk.com/posts/get-public-ip-address-identme/) that talks about how to get the public IP address using [ident.me](https://ident.me/). There are plenty of reasons to know your external IP address and plenty of sites out there to get this information.

To name a few others:
- [ipinfo.io](https://ipinfo.io/)
- [whatismyipaddress.com](https://whatismyipaddress.com/)
- [ipchco.net](https://ipecho.net/)

For the last year or two now, and started using Cloudflare for my websites DNS and [Cloudflare Workers](https://developers.cloudflare.com/workers/) as well. Cloudflare Workers are a serverless execution environment to perform certain functions prior to a page loading, render its own content, or other serverless functions.

For some basic Workers you can use Cloudflare's [Wrangler CLI](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) or from within the dashboard. Some more advanced workers, using the CLI might be best. I setup a worker a while ago to track some visitor information like IP, location, etc. I don't store this information anywhere but could then leverage Cloudflare's edge network to route county origins to a `EN`, `US`,`MX`, `CA` version of my website. Sample worker for a [county code redirect](https://developers.cloudflare.com/workers/examples/country-code-redirect/) is here too.

You can setup your worker in the dashboard and it will give you a default *.workers.dev subdomain to start with. This is where the execution of the worker takes place, and if something is rendered to the browser, you'll see it here too. You will create your worker subdomain, then each worker has its own name as well. I created a worker called `visitor`.

Then for my worker, I added an event listener that will return a JSON object to the browser.

{% highlight "js" %}
addEventListener("fetch", event => {
  const data = {
    Colo: event.request.cf.colo,
    Continent: event.request.cf.continent,
    Country: event.request.cf.country,
    City: event.request.cf.city,
    Latitude: event.request.cf.latitude,
    Longitude: event.request.cf.longitude,
    PostalCode: event.request.cf.postalCode,
    MetroCode: event.request.cf.metroCode,
    Region: event.request.cf.region,
    RegionCode: event.request.cf.regionCode,
    asOrganization: event.request.cf.asOrganization,
    Timezone: event.request.cf.timezone,
    ip: event.request.headers.get('cf-connecting-ip'),
  };

  return event.respondWith(
    new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8"
      }
    })
  )
})
{% endhighlight %}

In this example we're using Cloudflare's `event.request` object from the browser session to Cloudflare's network. This has an object of the `cf` that holds data of what Cloudflare regional Colo the end user is connecting to. This is all data about the users connection to Cloudflare. This is how Cloudflare also uses this information to route visitors to the right edge network for the websites they host DNS for.

In our worker this is all in the `data` object and then we tell the worker to return the data in a JSON format and set the pages header `content-type` to `application/json;charset=UTF-8`.

Since this is all part of what Cloudflare knows of a user, it doesn't keep the users IP in the `cf`, but we can still access the sessions `header` request and pull out the `cf-connecting-ip`. This will hold your visitors IP address. There are plenty of other [HTTP Request headers](https://developers.cloudflare.com/fundamentals/get-started/reference/http-request-headers/) to look at as well.

Cloudflare allows you to add a [Custom Domain](https://developers.cloudflare.com/workers/platform/routing/custom-domains) our [Route](https://developers.cloudflare.com/workers/platform/routes/#matching-behavior) for your worker. For my use case on this one I added a Route for [visitor.claytonerrington.com](https://visitor.claytonerrington.com/).

The part that was a little confusing was the DNS record for my website and Zone. By creating an `A` record for `visitor.claytonerrington.com`, pointing it to 192.0.2.1, and proxying it through Cloudflare, this tells the DNS to go to my worker subdomain and run the worker code.

You could set your own worker up and use it in your scripts as well. Maybe even use [Select-Object with PowerShell](https://claytonerrington.com/blog/select-object-with-powershell/) to get just the IP address, or any of the values. How else are you going to use Cloudflare Workers, the [Examples](https://developers.cloudflare.com/workers/examples/) have an expansive array of how to implement them.
