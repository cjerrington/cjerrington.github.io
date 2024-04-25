---
title: "Installing Jekyll the easy way"
description: "Speeding up the way I install Jekyll when on a new system."
tags:
  - coding
  - jekyll
date: 2022-05-05
---

I recently reinstalled my laptop with [Ubuntu Budgie](https://ubuntubudgie.org/), and had to reinstall all my apps. One of them was [Jekyll](https://jekyllrb.com/) to keep up with my blog posts to render this site.

I found the installation instructions for [Ubuntu based](https://jekyllrb.com/docs/installation/ubuntu/) operating systems. While it was easy to follow the prerequisites and the copy and paste or simple tying of the commands, I was in a hurry and wanted a full script to do the install.

Jekyll has very simple requirements and most should already be installed for the majority of major Linux distros. The steps are simple, really just making sure a response is generated.

Requirements

- [Ruby](https://www.ruby-lang.org/en/downloads/) version **2.5.0** or higher, including all development headers (check your Ruby version using `ruby -v`)
- [RubyGems](https://rubygems.org/pages/download) (check your Gems version using `gem -v`)
- [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (check versions using `gcc -v`,`g++ -v`, and `make -v`)

With our prerequisites all in place we are then to install some packages and set our Ruby Gems to be installed to the user profile. This is configured with your `~/.bashrc` profile. Personally my bash profile has a `~/.bask_aliases` where I added the necessary export commands to set `$PATH` variables.

Once this was all done, I decided to make a bash script to automate this for others in the future. It does use Jekyll's default instructions. With this script it does check if you are running the script as `sudo` since we are installing a few packages as well, then does the prerequisites check, and if it all passes, will install the needed items.

<script src="https://gist.github.com/cjerrington/e77ddac11667c01a62ae8361f1962dba.js"></script>

So to help make this a little easier for you we can do the following

```bash
curl -s -L https://gist.githubusercontent.com/cjerrington/e77ddac11667c01a62ae8361f1962dba/raw/d1c02e73e03e96e0446511c21faf4aa228faad31/install-jekyll.sh | bash
```

This will automatically download the script and run it for you.

So now that you have Jekyll installed, lets start a new site!

Create a new Jekyll site at ./myblog

```
jekyll new myblog
```

Change into your new directory.

```
cd myblog
```

Build the site and make it available on a local server.

```
bundle exec jekyll serve
```

Browse to [http://localhost:4000](http://localhost:4000)

Happy Blogging!
