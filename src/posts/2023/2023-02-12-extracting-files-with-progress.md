---
title: Extracting Files with Progress
description: Working with zip files in Python to show a progress bar while it is doing the extraction.
tags: 
  - python
  - 100DaysToOffload
date: 2023-02-12
---

While working on a deployment script, one of the tasks I needed was to extract a zip file and then edit some files. I was working on this in Python and could easily use the `ZipFile` module, but I like to show some progress to the end users so they know something is happening.

We will be using `zipfile`, `os`, and `tqdm` to extract the files today. In the fast movement of today we all like to see progress. It makes us all feel better to see something moving rather than a flashing cursor.

To being lets see the simple way to extract files with the `zipfile` module.

{% highlight "python" %}
from zipfile import ZipFile

filetoextract = "zip_10MB.zip"
with ZipFile(filetoextract,"r") as zip_ref:
    zip_ref.extractall(".")
{% endhighlight %}

After specifying the zip file we can read the Zip file the same way we can with files using the `with` command. We call the `extractall()` method and specify the location to extract to, the current directory in our example. The files will also be placed in a folder using the same name as the Zip file.

Next we need to add the progress bar as this will just flash on the screen until it is complete. The progress bar is with the help from the `tqdm` module. This is a great module to use for any kind of progress bars when working with Python scripts.

In a simple example we can show how `tqdm` can be used. We will count to 10 and for the loop part of the loop, sleep 1 second. Otherwise it'll complete so fast you wont see the progress. For almost any for loop we can plug in the `tqdm` module to add some progress.

{% highlight "python" %}
import time
from tqdm import tqdm

for i in tqdm(range(10), desc="Sleeping"):
    time.sleep(1)
{% endhighlight %}

Back to our file extraction example we will update our `with` statement and loop over each file.

{% highlight "python" %}
 with ZipFile(filetoextract,"r") as zip_ref:
     for file in tqdm(iterable=zip_ref.namelist(), total=len(zip_ref.namelist())):
          zip_ref.extract(member=file)
{% endhighlight %}

We need to pass an iterable object in and the `zip_ref.namelist()` generates a list of the files in the zip file. Adding this `tqdm` has something to iterate over in the loop. The `total` variable sets the length of the progress bar. And the `zip_ref.extract(member=file)` is extracting the file in the X position of the for loop and extracts that one file and then moves to the next file.

Try extracting Zip files with different amount of files and file sizes and you can see the progress bar adjust accordingly. What is nice as well with `tqdm` is it'll also show the estimated time and the bits per second.

In the full example I have added some additional checks if the path to the Zip file exists and if the Zip file is a valid file.

I have used a 10 MB sample Zip file from [file-examples.com](https://file-examples.com/index.php/text-files-and-archives-download/).

For further learning please check out the documentation for [zipfile](https://docs.python.org/3/library/zipfile.html) and [tqdm](https://tqdm.github.io/).

Full code for this is my [codeberg snippets](https://codeberg.org/cjerrington/snippets/src/branch/main/python/ziparchive.py). Try yourself to add a method to create a zip file, and also look into Python's [Argparse](https://docs.python.org/3/library/argparse.html). This is a great way to add some CLI arguments to your scripts too.