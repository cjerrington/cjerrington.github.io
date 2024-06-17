---
title: Skipping the CI Build on commit
description: 'How to setup a [skip ci] process on Vercel and their CI integration'
date: '2024-06-17'
tags:
  - vercel
  - 11ty
  - web dev
___mb_schema: /.mattrbld/schemas/schemaposts.json
---
Working with continuous integration services like Vercel that can watch for a git commit to your repository, then build your static website and host it for you is a great thing. However, there are times when you need to send an update but not trigger a new build.

Let’s say, you need to update a graphic, or update a package file, but a complete rebuild is not necessary at this time. Each `git push` to your repository will trigger a rebuild. These rebuilds take time, and could potentially cost money.

Some CI process you might want to skip for the time being. In my case, it’s when I commit a draft post. I want to commit the draft, so I can work on it later from another machine or just save what I have at the time. Thus, there is no need for a rebuild of my website.

Vercel does allow for a way to ignore a build command, but the [documentation](https://vercel.com/docs/projects/overview#ignored-build-step) can be a little complicated in the process. There are a few ways of accomplishing this, but the first few do not seem to work, for a way to add `[skip ci] adding new files` in the commit message, and ignore the build process. Many of the steps include an environment variable configure, which is hard to set in a regular commit.

## Project Settings

Under your Project’s Settings, there is the `Git` section. At the bottom you will find the Ignored Build Setup.

> When a commit is pushed to the Git repository that is connected with your Project, its SHA will determine if a new Build has to be issued. If the SHA was deployed before, no new Build will be issued.
> 
> You can customize this behavior with a command that exits with code 1 (new Build needed) or code 0.

The default is Automatic, just run the CI to build the application, and a few others. What I choose was a Custom behavior, and my own command.

```shell
git log -1 --pretty=oneline --abbrev-commit | grep -w "\[skip deploy\]" && exit 0 || exit 1
```

This command reads the commit message that was just used, and if `[skip deploy]` is in the commit message it will exit with a status of 0. If `[skip deploy]` is not found, we exit with a status code of 1, so the new build is needed.

## Committing changes

Now, when I am adding files to my remote repository and do not want to trigger a rebuild, I can add `[skip deploy]` and the rest of my message of the commit, so I know what also happened in the commit.

I went to check this out and noticed the Vercel integration I have on GitHub showed a build was canceled by Ignored Build Step, and upon viewing the details of the build log we can see why the build was canceled.

```shell
Cloning github.com/cjerrington/cjerrington.github.io (Branch: master, Commit: 70a92de)
Cloning completed: 2.327s
Running "git log -1 --pretty=oneline --abbrev-commit | grep -w "\[skip deploy\]" && exit 0 || exit 1"
70a92de [skip deploy] test drafts (drafts)
The Deployment has been canceled as a result of running the command defined in the "Ignored Build Step" setting.
```

I have successfully ignored the build steps.

## Conclusion

So technically the CI/CD process still registers there is a change in the repository, but now with the `ignoreBuild` command configured, it will either build or cancel accordingly. If you want to make use of the `vercel.json` file you can do so, just might want to adjust your quotation marks to have a valid string in the field. Check out that section of [documentation](https://vercel.com/docs/projects/project-configuration#ignorecommand).

```json
{
  "ignoreCommand": "git log -1 --pretty=oneline --abbrev-commit | grep -w '[skip deploy]' && exit 0 || exit 1"
}
```

You can change the message to what you’d like it to be, just update the `grep` command:

- `[skip deploy]`
- `[skip ci]`
- `[draft]`

There are a few commands I think I'd like to add to cover a few bases like the ones mentioned above. If this gets more complicated, try changing the ignore build step to use a [bash script](https://vercel.com/guides/how-do-i-use-the-ignored-build-step-field-on-vercel#with-a-script).

This was done with the help of a GitHub Issue [#60](https://github.com/orgs/vercel/discussions/60#discussioncomment-114386), but hopefully this helped to actually get what the discussion needed you to do as well.
