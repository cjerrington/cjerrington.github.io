---
title: "Quick tips on Linux aliases"
description: "Working in the terminal there are great commands you can use, but what about the long ones or frequently used commands; how can you save those for repetitive tasks?"
tags:
  - linux
  - shell
  - 100DaysToOffload
image: './src/assets/images/blog/coding.jpg'
date: 2023-01-18
---

Working in the terminal there are great commands you can use, but what about the long ones or frequently used commands; how can you save those for repetitive tasks?

## What are aliases

All linux systems have a profile you can put many commands in there. These can be shortcuts to longer commands or custom things too. Enter the bash aliases.

Take `ls` for examle, default output is to display the contents of the folder with certain information or format. You can add `ls -l` to use a long listing format instead. If this is your prefered style you can alias `ls` to actually be `ls -l`.

{% highlight "shell" %}
alias ls='ls -l'
{% endhighlight %}

## How to get this setup

Okay, so where are do you put this? There is a hidden file called `.bash_aliases` and this lives in your home directoy. Most dot files are hidden files on your system so you may not see them from you file explorer window. To get started open a terminal and run:

{% highlight "shell" %}
nano ~/.bash_alias
{% endhighlight %}

Add the alias in the format above and follow the prompt in `nano` to save and close nano. The easiest thing now, is to close and reopen you terminal, and try the `ls` command again. You should see a different `ls` output style.

## Make it yours

While working in both Windows and Linux based systems a common one to add has been:

{% highlight "shell" %}
alias cls=clear
{% endhighlight %}

Your aliases can even be functions that you make as well. Another simple one when creating directories is then you have to `cd` into them. If you make a new function you can do just that! The following takes input after the new `mkd` command to be the folder name, then change directories into it.

{% highlight "shell" %}

# make directory and then cd to it

mkd () {
  mkdir -p $1
  cd $1
}
{% endhighlight %}

What I just learned that is a game chaner, is you can alias a bash script. This does have its purpose and reason, but could come with some security concerns for a few as well. I made a `git-summary.sh` file and wanted to always have access to it from my terminal. To do this, we need to `source` our script, which is a facy way of telling the terminal of additional code.

{% highlight "shell" %}
alias gstatus="source ~/git-summary.sh"
{% endhighlight %}

So now I can type `gstatus` and get the update of multiple repositories I have in a directory without having to go to each on to get an update.

## I want more

Aliases are a great way to speed up your time while working in a terminal environment. Some people I've seen come up with great oneliners and this is a fun thing to follow as well. People share their dotfiles for not only a backup, but you might find something that helps you too, and share with those around you. If you do share, ensure what is public, can be and nothing is sensitive information.

If you have problems getting started with your bash aliases, there are plenty of guides for doing this on your specific system and shell environment.

You can view more of the aliases that I use in my [dotfiles](https://codeberg.org/cjerrington/dotfiles)
