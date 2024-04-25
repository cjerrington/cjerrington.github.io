---
title: "Creating a static site using Python and Flask"
description: "Using Flask as a static site generator for a simple website"
tags: 
  - python
  - web design
  - 100DaysToOffload
date: 2023-02-05
---

In today's time there seems like there are static site generators that are a dime a dozen. What if you like Python and building sites with Flask. Using Flask as a static site generator for a simple website was a decision I did for a real simple website for an organization. This decision was made because I was learning Python for desktop scripts, and it is quite versatile for many application uses. I had the site on a Jekyll template initially, and the conversion to a Flask app was a way to learn Flask in the processes.

## Getting Started

So how do we start with Flask to begin with? You will need to install [Flask](https://flask.palletsprojects.com/en/2.2.x/) with pip and it is supported on many versions of [Python](https://www.python.org/). Let's begin with a simple Flask app.

{% highlight "python" %}
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
{% endhighlight %}

With this we can now go to a web browser and see the new paragraph with `Hello, World!`. To run the development server, and the browse to [http://127.0.0.1:5000/](http://127.0.0.1:5000/):

{% highlight "shell" %}
python -m flask run
{% endhighlight %}

Now lets skip ahead and assume you have your perfect site built with flask. When you run a Flask app you need a server that can run Python, and this isn't always possible with hosting sites on Netlify, or others. I came across a Python package called Frozen-Flask and it solves part of this problem as well! This is different than the `pip freeze > requirements.txt` to create a requirements file of the Python packages used for a specific file or module you made.

When you run the development server of Flask, you are interacting with the app itself and it is taking the request, processing, and rendering the HTML back to the user. Frozen Flask will render your app and save the rendered coded as HTML files in the same directory structure.

## Setting up Frozen Flask

First install [Frozen Flask](https://pythonhosted.org/Frozen-Flask/) with pip.

{% highlight "shell" %}
pip install Frozen-Flask
{% endhighlight %}

Now we need a `freeze.py` file. This is used to create the static build site, and later used when hosting on Netlify for example.

{% highlight "python" %}
from flask_frozen import Freezer
from app import app

freezer = Freezer(app)

if __name__ == '__main__':
    freezer.freeze()
{% endhighlight %}

When running the `freeze.py` file with python or python3, it will create a build folder of the rendered HTML files of your Flask app. We can then publish this folder to your static hosting.

## Hosting on Netlify

You can use Netlify to host your Python Flask app and the static files. Hook up your new site to a GitHub repository for example and under your build settings you need to set the Build command and Publish Directory.

![Netlify build settings](/assets/images/blog/netlify-build-flask.png)

Some tricks that help build your site correctly are setting some [Python build variables](https://docs.netlify.com/configure-builds/manage-dependencies/#python) in your repository with a `runtime.txt` file to specify a Python version. You will also need to save our Pyhton dependencies to our `requirements.txt` file. When the build process on Netlify looks for these additional environment files and runs them accordingly.

## Wrap up

If you like to write Flask apps that are static page content and not truly needing the server-side rendering for the HTML content, then this might be helpful for you. Flask and Python can be used for anything from a simple site to a complex application. Maybe you too, can add this to your web design tool box. There are some unique things you can create with a Flask app too.
