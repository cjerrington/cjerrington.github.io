---
title: "GitHub profile with actions"
description: "GitHub has a few hidden features for a user profile repository and how to add some GitHub Actions to them"
tags:
  - git
  - automation
  - 100DaysToOffload
date: 2023-01-27
---

For some time now Github.com has allowed users to setup and manage their [GitHub profile](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile). This always includes a photo, pinned repositories, and a few other features. Just like with GitHub pages you created a repository `username.github.io` and this was a special place to create a website that got published and hosted by GitHub, there is a special one you can make for just `username`. Mine is [cjerrington](https://github.com/cjerrington).

So the special part of this is then you add a `README.md` file and this can then have HTML code, markdown text, or anything you'd like. Some profile read me's I've seen are really fancy, others are like a mini webpage for content. I have mine set to share some bio information, social media, and then some recent blog posts.

This was a neat feature and wanted to add it to my profile. One way way to this was manually update the file each time there is a new post or content I want to share. That could be time consuming and would require two or more commits to keep things updated. However, GitHub Actions still work on this repository as well.

## Set up

Once you've made your new `username` repository, lets make it a node based project.

{% highlight "shell" %}
npm init
{% endhighlight %}

Go through the prompts and have the main entry point be the `index.js` file. Now lets install a few dependencies.

{% highlight "shell" %}
npm i markdown-it markdown-it-emoji prettier rss-parser --save-dev
{% endhighlight %}

Now we can begin editing our `index.js` file.

We can then setup a few constants and setup what we want our layout to be. I have a few async functions to build the new README.md file that takes the constants and renders some RSS feeds. Here is a small simple starter process of what I've done.

{% highlight "js" %}
const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});
const fs = require("fs");

(async () => {

  const headerText = `<h1>Hi 👋, I'm Clayton</h1>\n\n<h3>A passionate developer of open source projects from Texas</h3>`;
  const bodyText = `<p>Body text here</p>`
  const footer = `<p align="center"><small>Updated once a day via <a href="https://github.com/cjerrington/cjerrington/blob/main/.github/workflows/build.yml">Github Actions</a>.</small></p>`

  const text = `${headerText}\n\n
    ${bodyText}\n\n
    ${footer}\n\n
  `;

  const result = md.render(text);

  fs.writeFile("README.md", result, function (err) {
    if (err) return console.log(err);
    console.log(`${result} > README.md`);
  });
})();
{% endhighlight %}

Once the page is ready to be built we just run the following and it will run our `index.js` file and create a new README.md file.

{% highlight "shell" %}
npm run start
{% endhighlight %}

## Action Time

So now that we can generate our README.md file that becomes the "web style" content on our profile page, we can setup a GitHub Action to run this on a schedule. Create a subfolder called `.github` and a subfolder there called `workflows`. Inside workflows, a new file called `build.yml`. We can now tell the action to use Node to run our package run statement, then add it to git, and commit if there are changes to the file. The `schedule` at the top takes a cron job format. 

{% highlight "yaml" %}
name: Build README

on:
  push:
  workflow_dispatch:
  schedule:
    - cron:  '0 12 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - name: Install dependencies
      run: |
        npm ci
    - name: Update README
      run: |-
        npm start
        cat README.md
    - name: Commit and push if changed
      run: |-
        git add .
        git diff
        git config --global user.email "github-action-bot@example.com"
        git config --global user.name "GitHub Action Bot"
        git commit -m "Updated README" -a || echo "No changes to commit"
        git push
{% endhighlight %}

## Wrap up

So now that we have the `index.js` file and the workflow add, ensure those are committed the repository and let the work be done for you. Now each day this workflow will run and read my RSS links for new posts and update the Gitub profile for me. 

Take a look at some extra resources:
- [my workflow](https://github.com/cjerrington/cjerrington/blob/main/.github/workflows/build.yml)
- [my index.js](https://github.com/cjerrington/cjerrington/blob/main/index.js)
- [Awesome README Profile list](https://zzetao.github.io/awesome-github-profile/)
- [readme-scribe](https://github.com/muesli/readme-scribe)