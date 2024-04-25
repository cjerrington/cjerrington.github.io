---
title: "Python Virtual Environments"
description: "Understanding Python virtual environments and how to use them."
tags:
  - coding
  - python
date: 2019-10-29
---

There comes a time in writing [Python](https://www.python.org/) Python programs where you need to test something, work on an update to a module, or test a new module in a sandbox. Luckily there is a helpful process to use called Virtual Environments. Running your project in a virtual environment will allow you to keep modules seperate from your global module set if you do not want to keep everything all together or need to work specifically on a new project.

<!--more-->

## Setting up

1. Before we go further lets ensure we have everything setup.
We need to run ```python --version``` from our terminal
You should get a response back like ```Python 3.7.4```. If you do not have Python you can download it from [Python.org](https://www.python.org/downloads/) or using [Chocolatey](https://chocolatey.org/) as well by doing ```choco install python```.

2. Now that Python is installed, lets upgrade PIP.
[PIP](https://pip.pypa.io/en/stable/) is the package installer for Python. This is what we use to install other Python modules. Run ```python -m pip install -U pip``` in our terminal and pip will check if there is an update to the pip module.

3. Checking on virtualenv
Run ```pip install virtualenv```. This will check to see if ```virtualenv``` is installed and if not, pip will install it.

## Creating our virtualenv

Now that we have our pre-requisites in place we can create our virtual environment. In our terminal lets create a new folder, and change to that directory.

```shell
mkdir testapp
cd testapp
```

Now in our testapp folder run the following command and it will generate a base copy of Python and other setup items.

```python
virtualenv .
```

This will create the following folders for use in the new virtual environment.

```
Include
Lib
Scripts
tcl
License.txt
```

## Activating out virtualenv

Now we will need to activate our virtual environment by doing the following for Windows

```shell
scripts\activate
```

or

```shell
source /bin/activate
```

You will notice your terminal now switched to

```shell
(testapp) PS C:\scripts\testapp>
```

If you were to run ```pip install requests``` this will install a new version of this module for this virtual environment.

If you needed to leave the virtual environment and stay in the terminal you can always type ```deactivate``` and this will return you to your normal terminal.

## Conclusion

A Virtual Environment is a great tool to keep the dependencies required by different projects in separate places, by creating virtual Python environments for them. This allows us to manage different projects that use different dependencies and versions, and keeps your global site-packages directory clean and manageable.

This is also good to test newer module versions to ensure your original source code will work with the newer version.

### Extras

To keep your environments consistent you can "freeze" your current state of packages by typing to following.

```python
pip freeze > requirements.txt
```

This will create a requirements.txt file that you can use for later for easier development or sharing of your Python project with others. The other users will just need to install the requirements.

```python
pip install -r requirements.txt
```
