---
title: Changing Git config URL
description: >-
  How to change you git url to change your connection method to the remote
  source for a local repository
draft: false
date: 2023-12-02T06:00:00.000Z
tags:
  - 100DaysToOffload
  - git
  - web design
---

Remote Git hosting providers usually allow their users to interact with their service over HTTPS and SSH. By default, and some user configurations, services like [GitHub](https://github.com/), [GitLab](https://about.gitlab.com/), or [Codeberg](https://codeberg.org/) use HTTPS as the default cloning URL. This is not a bad thing, and it makes it easy for others to clone a repository and build, run, deploy the project if they'd like. GitHub might be the most common for a lot of folks, and they have good documenation for general understanding.

The use of SSH would be for repositories you have access to perform the complete `git pull` and `git push` process. The use of SSH is prefered when you have multi factor autentication, MFA, setup on your user account. The setup instructions [GitHub has for SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) are some of the best and other Git providers use this as a reference as well.

Via the command line these services don't have a way to interact with the MFA process. Setting up your authentication is pretty important, and you should choose the [right method](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line) for you when accessing git from the CLI.

Earier today I saw a conversation where a friend recloned their whole repository just so they could push the code back to the remote source. While this works, there is a little simpler way. If you already have SSH enabled in your remote source and on your local machine, there is a quick change. If you've already cloned your repo and want to change to SSH after setting it up, you can do that too.

When you clone a repository you get a hidden folder calld .git. This is how git knows all about your local changes, remote, and how to keep them in sync. That can be a whole other topic. There is a really great [post by Julia Evans](https://jvns.ca/blog/2023/09/14/in-a-git-repository--where-do-your-files-live-/) on some of the inner workings of git.

If you did a listing of your .git you might see something like this:

```shell
➜  cjerrington.github.io git:(master)$ ls .git
branches        config       FETCH_HEAD  hooks  info  objects    packed-refs
COMMIT_EDITMSG  description  HEAD        index  logs  ORIG_HEAD  refs
```

Within the config file you will see the URL this repository is set to.

```shell
➜  cjerrington.github.io git:(master)$ cat .git/config | grep url
url = https://github.com/cjerrington/cjerrington.github.io.git
```

So all you would need to do is first find the SSH URL your remote Git repositiory and hosting would use for that repository, update the url =  with the SSH url, and save.

```shell
➜  cjerrington.github.io git:(master)$ cat .git/config | grep url
url = git@github.com:cjerrington/cjerrington.github.io.git
```

Now if you have your SSH key connected with the remote Git service you should be able to push your code without issues.

SSH can be a little more secure as these keys are generated on your machines and the pulic key with the remote service. I know I've made a mistake of cloning my repositories on new machines as HTTPS, do my updates, and it won't push. Then have to change them back to SSH, and this keeps my local changes without needing to save, copy, replace, and potentially more work. Git has a lot of great configuration options from global to local folders. I read this great post from [Garrit on Organizing Multiple Git Identities](https://garrit.xyz/posts/2023-10-13-organizing-multiple-git-identities), and it has some great uses for the git configurations for personal and work repositories.

Hope this helps you too!
