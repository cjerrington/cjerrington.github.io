---
title: Updating your Codeberg profile
description: How to create and update your own custom Codeberg profile page
date: '2024-06-20'
tags:
  - automation
  - nodejs
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

A few days ago I saw where on Codeberg you can spruce up your profile page by creating a repository called `.profile` with a single `README.md` file in it. Once done, the Markdown in said file will be shown as default content on your profile page. I wrote [previously](/blog/github-profile-actions/) on how to use GitHub Actions and automate updates from your website and make it look like you’re always keeping it up to date.

Codeberg also has their own CI using Woodpecker, and I was able to use pretty much the same process on GitHub here. The process uses a node script to reach out to my RSS feed to retrieve the last 5 posts, and add them to the Readme file. If there are changes, the process will commit them back to the profile repo and update the page.

Woodpecker recently was updated to have a cron schedule, so now I can schedule the frequency to keep this page updated.

## Show the code

Well, first, ensure to make the repository called `.profile`. To make it simple, initialize the repository with the defaults of the blank README and .gitignore defaults.

Next, create the following files:

- `index.js`
- `.woodpecker.yml`
- `package.json`

Since this is a node based process, install a few npm packages so we can complete our process.

- markdown-it
- markdown-it-emoji
- prettier
- rss-parser

To keep it simple, check out the source code of what I have for the [index.js](https://codeberg.org/cjerrington/.profile/src/branch/main/index.js). It’s a basic async process that runs and returns a markdown file and outputs the Readme.md file.

Next, the Woodpecker CI file has come a long ways, and we will have the follow steps in the workflow.

```yml
steps:
  - name: build
    image: node
    secrets: [ cbtoken, cbmail ]
    commands:
      - git config --global user.email "$CBMAIL"
      - git config --global user.name "CI Builder"
      - git config --global init.defaultBranch main
      - git remote set-url origin https://$CBTOKEN@codeberg.org/cjerrington/.profile.git
      - git push --set-upstream origin main
      - npm i
      - npm start
      - cat README.md
      - git add .
      - git diff
      - git commit -m "Updated README at $( env TZ=America/Chicago date +"%Y-%m-%d %X %Z" )" -a || echo "No changes to commit"
      - git push
```

One other important step to add to the `.woodpecker.yml` config is a `when` event. This tells the CI when the [Pipeline events](https://woodpecker-ci.org/docs/usage/terminology#pipeline-events) should occur. I chose the `push`, `cron`, and `manual` so if I push an update it will run, the cron job can access the steps, and any manual pushes if I need to run again quicker. Since the `git commit` only commits if there are changes to the `README.md` I don't have to worry about the CI running in a loop.

```yml
when: 
  event: [ push, cron, manual ]
```

We do have two secrets we will use for this process, which is your email address and the user token for the commit. Now enable the `.profile` in the Codeberg CI and add the secrets.

On the secrets, make sure to enable them to be used for the following.

- Push
- Deploy
- Cron
- Manual

I named the cron job `Daily Build` that way when I come back in 6 months I know what this was used for. The schedule is based on regular cron expressions, and [crontab guru](https://crontab.guru/) is still my favorite place to ensure the cron is set right.

## Next Steps

Once you have either created the files or cloned my profile and got your updates, a simple push will start the CI job and if there are changes since the last build it will commit the updated page. With the permissions we set earlier on the secrets, you can manually trigger the CI job, and the cron permissions allow for the CI job to run on the schedule.

## Conclusion

Now when you visit my [profile on Codeberg](https://codeberg.org/cjerrington) you see a nicer looking portfolio page rather than just a list of repositories. The workflow process adds a nice touch to keep things up to date while I’m working on projects. You can also take a look at my [pipeline events](https://codeberg.org/cjerrington/.profile/src/branch/main/.woodpecker.yml) as well.

Since Codeberg is related to Gitea and Forgejo this process could work on those platforms as well.

- [Codeberg CI](https://docs.codeberg.org/ci/)
- [GitHub profile with Actions](https://claytonerrington.com/blog/github-profile-actions/)
- [Forgejo customize user profile](https://forgejo.org/docs/v1.20/user/profile/)
