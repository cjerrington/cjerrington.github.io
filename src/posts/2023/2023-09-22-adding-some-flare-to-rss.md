---
title: Adding some flare to RSS
description: RSS is still a great way to subscribe to content, so why not add some style to it?
tags: 
  - web design
  - 100DaysToOffload
draft: false
---

RSS is still a great way to subscribe to content, so why not add some style to it? That is just what I did! Check out my ne and improved [RSS Feed](https://claytonerrington.com/feed.xml).

I came across [Derek Kay's](https://fosstodon.org/web/@darekkay) blog post on [styling rss](https://darekkay.com/blog/rss-styling/) awhile ago and have gotten back into some RSS feeds recently as well. RSS is not a dead protocol, it's not the most popular, but it is still used quite a bit by personal websites to large news organizations. RSS is an XML style page that has a few properties that an RSS feed reader can interpret for the end user to obtain the contents of the file.

So how do we style RSS? Well let's look before we do anything.

![Style before](/assets/images/blog/rss-style/style-before.jpg)

Not very pretty right? Since an RSS feed is XML, there is a style sheet you can add called XSL(T). This allows you to add the instructions in the XML of the file how to style the output in the browser.

{% highlight "xml" %}
<?xml version="1.0" encoding="utf-8"?>
<?xml-stylesheet href="/rss.xsl" type="text/xsl"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:media="http://search.yahoo.com/mrss/">
  ...
</feed>
{% endhighlight %}

The `xml-stylesheet` is the key here and uses the `href` to specify the path to an external file on how to style the xml. the XSL style sheet is a mix of XML and HTML and allows us to render HTML for a browser but read the XML file for the content.

Since I am using 11ty for my site, I had to save my file as `rss-style.xsl.njk`. I know can also have 11ty build my file with site details and not manual updates.

{% highlight "xml" %}
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>
          RSS Feed |
          <xsl:value-of select="/atom:feed/atom:title"/>
        </title>
        <meta charset="utf-8"/>
        <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="/static/css/rss.css"/>
      </head>
      <body>
        <main class="layout-content">
          <dk-alert-box type="info">
            <strong>This is an RSS feed</strong>. Subscribe by copying
            the URL from the address bar into your newsreader. Visit <a
            href="https://aboutfeeds.com">About Feeds
          </a> to learn more and get started. It's free.
          </dk-alert-box>
          <div class="py-7">
            <h1 class="flex items-start">
              RSS Feed Preview
            </h1>
            <h2>{{ site.meta.title }}</h2>
            <p>
              <xsl:value-of select="/atom:feed/atom:subtitle"/>
            </p>
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="/atom:feed/atom:link[2]/@href"/>
              </xsl:attribute>
              Visit Website &#x2192;
            </a>

            <h2>Recent blog posts</h2>
            <xsl:for-each select="/atom:feed/atom:entry">
              <div class="pb-7">
                <div class="text-4 font-bold">
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="atom:link/@href"/>
                    </xsl:attribute>
                    <xsl:value-of select="atom:title"/>
                  </a>
                </div>

                <div class="text-4">
                    <xsl:attribute name="href">
                      <xsl:value-of select="atom:link/@href"/>
                    </xsl:attribute>
                    <xsl:value-of select="atom:description"/>
                </div>
                <div class="text-2 text-offset">
                  Published on
                  <xsl:value-of select="substring(atom:updated, 0, 11)" />
                </div>
              </div>
            </xsl:for-each>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
{% endhighlight %}

Many of the selections and alterations to the XML values is with [XSLT functions](https://www.w3.org/TR/xpath-functions-30/).

Support of RSS style sheets is still [pretty great](https://caniuse.com/?search=xslt), and if a browser does not support it the default view without the XML is shown.

# Other use cases

Sitemaps are also XML based. So why not help visitors to stumble upon these links and show them something pretty instead of some `<?xml>` text.
