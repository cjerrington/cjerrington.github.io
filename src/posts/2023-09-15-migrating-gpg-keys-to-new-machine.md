---
_schema: default
title: Migrating GPG keys to new machine
excerpt: Steps I went through to migrate my GPG keys to a new machine
tags: 100DaysToOffload
draft: true
---
gpg --list-keys

gpg --export -a \[your key\] &gt; gpg-pub.asc

gpg --export-secret-keys -a \[your key\] &gt; gpg-sc.asc

https://gist.github.com/angela-d/8b27670bac26e4bf7c431715fef5cc51