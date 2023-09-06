---
_schema: default
title: CloudCannon + Eleventy
excerpt: Getting CloudCannon setup with your Eleventy project is easier than you think
tags: 100DaysToOffload
draft: true
---
CloudCannon has been a visual CMS that can interact with your Git repository and allow you to push changes directly while using a visual editor to your static website. Along with a visual way to make new posts, you can also edit pages and provide a CMS to a static site making it easier for you and potential clients who may not be as savvy.

<a target="_blank" rel="noopener" href="https://www.zachleat.com/">Zach Letherman</a> who create <a target="_blank" rel="noopener" href="https://www.11ty.dev/">11ty</a>, created a <a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=yXcxvBJuULU">video</a> as well to go through the process.

## Getting started

To get started go to <a target="_blank" rel="noopener" href="https://cloudcannon.com/">cloudcannon.com</a> and create an account. There is a personal plan you will be downgraded to after a trial period. This should work for any small blog with the limits they provide on that level.

You will need to create your Organization and from there you create a Site by building with your own files. Next, you'll need to name your Site Name the same as your GitHub repo and choose your file source and you can choose from Bitbucket, GitHub, GitLab, or a folder. You can then choose and update your build settings and then you are complete and ready to start editing on CloudCannon.

The Dashboard will show you a preview of your built site, your Live URL you can use for testing, recent activity, and recent files. 11ty and CloudCannon have a natural integration and will load your data files, collections, and more. You can go to your collection, Post, in my case and see all the blog posts that I have written and&nbsp; begin editing in the visual editor. The editor also shows the frontmatter of the post and allows you to edit the title, excerpt, tags, etc. You can also create a new post and start writing right away!

## CloudCannon config

CloudCannon has a configuration you can add to your repository and control additional elements of your visual editing experience. I believe I got the config updated to my needs that should be easy to help others as well. All you need to do is add a \`cloudcannon.config.yml\` file to your repo and add some settings.

To start, you can specify your source, paths, and collections config. This part is neat as you can have one kind of settings for a draft, that is different from a production posts collection. Another settings is to set the creation of a filename and when creating a file use a template to start your new page or post.

### Collection and Post Options

To change the default text you can add the following to change the text to "Add Post", "Add Draft", or other type of item from your collection.

\`add\_options\`

Creating files was a tricky one. With my blog post setup I name my files \`YYYY-MM-DD-slugify-title.md\` By default CloudCannon did not abide by this and needed some extra settings.

\`create\`

When creating a post it pulls the metadata from the last file. This is not what we want when creating a new item as we have a new title, tags, or what else we have. We can add a \`schema\` and specify a path to this source file.

\`schemas:\`

\`path file\`

After I got this setup CloudCannon read my \`draft.json\` and posts.json\` file as a data file for me to edit. If I need to edit that file, it won't be in CloudCannon. I'll be using it for adding new posts and content, not the design and layout. You can exclude files. In my case I choose these data files. You could specify any number of files you'd like, just need to specify the full file name.