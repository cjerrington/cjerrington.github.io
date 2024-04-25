---
title: Ubuntu's change with Python support
description: Discussing Python package manager PIP and recent changes Ubuntu has taken
tags:
  - python
  - linux
  - 100DaysToOffload
---

Recently [Ubuntu](https://ubuntu.com/desktop) released their most recent release of 23.04 for the start of the year. Like any good developer you find time to test your scripts and programs on new operating systems and runtime environments for Python changes. However to be like a great Python developer, you use [virtual environments](https://claytonerrington.com/blog/python-virtual-environments/).

With the new release of Ubuntu they adopted [PEP 668](https://peps.python.org/pep-0668/) to make Python base environments as “externally managed”. So what does this mean?

## PEP 668

From the abstract of the PEP itself says it best:

> A long-standing practical problem for Python users has been conflicts between OS package managers and Python-specific package management tools like pip. These conflicts include both Python-level API incompatibilities and conflicts over file ownership.

> Historically, Python-specific package management tools have defaulted to installing packages into an implicit global context. With the standardization and popularity of virtual environments, a better solution for most (but not all) use cases is to use Python-specific package management tools only within a virtual environment.

> This PEP proposes a mechanism for a Python installation to communicate to tools like pip that its global package installation context is managed by some means external to Python, such as an OS package manager. It specifies that Python-specific package management tools should neither install nor remove packages into the interpreter’s global context, by default, and should instead guide the end user towards using a virtual environment.

> It also standardizes an interpretation of the `sysconfig` schemes so that, if a Python-specific package manager is about to install a package in an interpreter-wide context, it can do so in a manner that will avoid conflicting with the external package manager and reduces the risk of breaking software shipped by the external package manager.>

On many Linux distributions like: Ubuntu, Fedora, and Linux Mint, Python has a huge part of how the operating system functions and operates. For many years Python 2.7 was the only supported version of Python since so many Linux distributions still relied on it on the OS level. More Python development has improved in [Python 3.11](https://www.python.org/downloads/) now. 

What makes Python great is the user community that has such a great input on how the language evolves. Many PEPs have been introduced and the community helps pitch in ideas and ways to adopt them.

A few PEPs that make the language great:

- [The Zen of Python](https://peps.python.org/pep-0020/)
- [Python Virtual Environments](https://peps.python.org/pep-0405/)
- [Python Language Governance](https://peps.python.org/pep-0013/)

## Python's hold on Linux Distributions

According to [Debian.org](https://wiki.debian.org/Python), their website states, 'Debian is the largest "integrated Python distribution"', and recently removed the "python" package and symlink since Python 2 is depreciated. Meaning there are packaged scripts shipped with the OS that rely on certain aspects of the Python language to perform certain functions within the OS.

Take Ubuntu for example, you can count the number of packages that depend on Python, not counting the python specific packages. This number will be pretty large.

{% highlight "shell" %}
apt-cache rdepends python3 | grep -v python | wc -l
{% endhighlight %}

Ubuntu has a package for `ubuntu-minimal` that depends on `python3`. That being said, it would be hard to run the rest of the OS without it. Ubuntu's `unattended-upgrades` is also written in Python. The description of `ubuntu-minimal` says it as well:

{% highlight "text" %}
This package depends on all of the packages in the Ubuntu minimal system, that is a functional command-line system with the following capabilities:

- Boot
- Detect hardware
- Connect to a network
- Install packages
- Perform basic diagnostics

It is also used to help ensure proper upgrades, so it is recommended that it not be removed.
{% endhighlight %}

Linux Mint a fork of Ubuntu and uses [MintUpgrade](https://github.com/linuxmint/mintupgrade/blob/master/usr/lib/linuxmint/mintupgrade/mintupgrade.py) to upgrade their Operating System between major releases.

## Thoughts on the PEP

Virtual environments do have a great place when working with specific versions of Python and also the packages. This is handy when you work on various projects and either need to have different versions of a module for testing, upgrading and also general separation between projects and the global and now system modules. I think this change will have some good results to help protect the integrity of the operating system.

What I don't like though is any package will need to be installed in a virtual environment. There is a way to install the module system wide as well:

{% highlight "shell" %}
$ # To install crytography do this
$ apt install python3-cryptography

$ # instead of this
$ pip install cryptography
{% endhighlight %}

However you can also pass along `--break-system-packages` when you do your `pip install package`, but this can also have it's own negative impact as well.

I hope this kind of change doesn't disrupt too much of the Python ecosystem and how you use Python too much. There are a few other package managers as well:

- [Conda](https://github.com/conda/conda/)
- [pipenv](https://github.com/pypa/pipenv)
- [poetry](https://python-poetry.org/)
- [pdm](https://pdm.fming.dev/)
- [packagr](https://www.packagr.app/)