---
title: TinaCMS + 11ty
description: Taking a deep dive into setting up a CMS for my static site with TinaCMS
draft: false
date: 2023-10-17T05:00:00.000Z
tags:
  - 11ty
  - 100DaysToOffload
  - selfhost
---

I was browsing the web and kept coming across [TinaCMS](https://tina.io/ "TinaCMS") and how you can run it locally, as well as in their cloud platform. What I did not want to do was add a lot of complexity to adding this to my site, and make changes to the structure of my site, more dependencies, etc. Luckily, most of the installation was a drop-in-place system and was able to get started pretty quickly.

There is a nice [11ty + TinaCMS Setup Guide](https://tina.io/docs/frameworks/11ty/) as well. Plus, I'll share a little of my setup post install.

## Getting Started

TinaCMS has a pretty simple quick setup guide to get their CMS style solution added to your project.

```shell
npx @tinacms/cli@latest init
```

This will install the `tinacms` and accompanying CLI tools if needed. You might get asked some basic questions, and I took the defaults, as I didn't have much to change.

## Configuration after install

After the installation, their guide has you go through your new `tina/config.ts` file and update any [content modeling](https://tina.io/docs/schema/), as they call it. A fancy way to state you can adjust the CMS to your project and customize the system to your needs.

I'll review the changes I made for my [11ty](https://www.11ty.dev/ "11ty website") install later.

## Starting TinaCMS

To get started and make sure everything is starting correctly, we can run the following command.

```shell
npx tinacms dev - c "@11ty/eleventy --serve"
```

This will start the tinacms server and then your custom dev command to serve your content while editing.

Once your page is running and started, you can browse to [http://localhost:8080/admin](http://localhost:8080/admin) or \<your-dev-server>:\<dev-port>/admin and see something like the following

![Welcome screen of TinaCMS after initial install](/assets/images/blog/tinacms.jpg)

## Deploying your site

Once you start editing and get your site configured, you can commit your `tina/` folder that has your configurations to your remote git host and then integrate with the [Tina Cloud](https://app.tina.io/) and be able to edit files online from anywhere.

For now, I am going to keep it all local, and could commit the `tina/` folder to keep configuration consistent across devices.

If you'd like more information, check out the documentation for [Deploying Tina to your site](https://tina.io/docs/frameworks/11ty/#deploy-tina-to-your-site).

## My Configuration Changes

First, I wanted to configure a new run command. The `npx tinacms dev -c "eleventy --serve"` is a bit much to always type in. Plus I have dev command that properly starts up my stylus, eleventy watch, and serve commands.

```javascript
"scripts": {
  "dev": "cross-env ELEVENTY_ENV=dev concurrently -n stylus,11ty \"npm:watch:stylus\" \"npm:watch:11ty\"",
  "cms": "npx tinacms dev -c \"npm run dev\"",
},
```

Now I can run npm run cms and properly the CMS engine and the 11ty project.

Within the `tina/config.ts` file, you have all your configurations for your CMS site.

The `build` and `media` are configured based on where you have your static content and build directory going when 11ty builds your site. For me, I have it create a `build` folder on the root and my media is stored in a `static` folder at the root that gets copied over to the build folder on build.

```javascript
build: {
  outputFolder: "admin",
  publicFolder: "build",
},
media: {
  tina: {
    mediaRoot: "static",
    publicFolder: "build",
  },
},
```

The schema is where the real fun begins! You define a collection, and can customize the settings as well as the fields for the front matter, defaults, file names, and more.

By default, TinaCMS names your file the title you provide and adds the markdown extension. I wanted to require a title and have it save the file name according to how my site is built.

```javascript
const dateTime = (new Date()).toISOString().split('T')[0];

// excerpt from the export function of defineConfig();
schema: {
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "src/posts",
      format: 'md',
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          isTitle: true,
          required: true,
        },
        {
          type: "rich-text",
          name: "body",
          label: "Body",
          isBody: true,
        },
      ],
      ui: {
        filename: {
          // if disabled, the editor can not edit the filename
          readonly: true,
          // Example of using a custom slugify function
          slugify: (values) => {
            // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
            return `${dateTime}-${values.title
              ?.toLowerCase()
              .replace(/ /g, '-')}`
          },
        },
      },
    },
  ],
  }
```

There is a lot here. I was able to define the custom path to my posts in `src/posts` and TinaCMS properly displayed my posts in the year folders I recently added. The `ui:{}` section sets the filename filed to read-only, so you can't edit the field, this is optional. However, I did create a `dateTime` constant prior to the export function to get today's date in the format needed. We can then pass along the built-in `slugify` filter and return the `YYYY-mm-dd-title-of-file.md` as needed.

I added a date field, and was able to set a default for this value as well. TinaCMS has some nice filters on the files, but reads the front matter for a `date` item, and my posts do not have this already. Once I added a custom field, this will be good moving forward.

```javascript
{
  label: "Date",
  name: "date",
  type: "datetime",
    ui: {
      dateFormat: 'YYYY-MM-DD',   
    },
},
```

I kept with the same date format as the file name for consistency. What is nice is the ability to set default values for the fields as well.

```javascript
schema: {
  collections: [
    {
      name: "post",
      label: "Posts",
      path: "src/posts",
      format: 'md',
      defaultItem: () => {
        return {
          // When a new post is created the title field will be set to "New post"
          date: dateTime, // the const defined previously.
        }
      },
      fields: [
        ...
```

The other neat thing you can do with string fields is create a list of items. I used this for my site's tags that I choose when writing the posts.

```javascript
{
  type: 'string',
  label: 'Tags',
  name: 'tags',
  list: true,
    options: [
      {
        value: "100DaysToOffload",
        label: "100DaysToOffload"
      },
      {
        value: "11ty",
        label: "11ty"
      },
    ]
}
```

Here is what this looks like now.

![Screenshot of the final TinaCMS config updates.](/assets/images/blog/tinacms-1.jpg)

## Conclusion

I know I previously wrote about [CloudCannon and 11ty](/blog/cloudcannon-eleventy/), but with today's technology there are plenty of great choices. CloudCannon is a great choice as well. Currently, it is in some infancy and will only get better. TinaCMS I have heard of for a while, just never had a moment to get it tested and working until now. There is some setup needed still, but so far I am enjoying the configuration changes and ability to write in a visual way as well.
