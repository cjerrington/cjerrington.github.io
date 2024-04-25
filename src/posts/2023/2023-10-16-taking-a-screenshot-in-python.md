---
title: Taking A Screenshot In Python
description: Quick demonstration of how to take a screenshot using Python
tags: 
  - python
  - 100DaysToOffload
draft: false
date: 2023-10-16
---

Quick demonstration of how to take a screenshot using Python.

Python is great because there are so many ways to do the same thing. Some are simple while others are built into other larger modules, thus making it simpler to use.

We'll look at a few three ways to do this using Numpy, pyautogui, and OpenCV.

## Modules Needed

- [NumPy](https://numpy.org/)
- [OpenCV](https://opencv.org/)
- [pyautogui](https://pypi.org/project/PyAutoGUI/)

To install run the following in your terminal. If you'd like, you can create a [virtual environment](/blog/python-virtual-environments/) for testing as well.

```shell
pip install numpy
pip install opencv-python
pip install pyautogui
```

## Creating the script

For our Python file we need to import our modules

```python
import numpy as np
import cv2
import pyautogui
```

Next we need to take our screenshot.

```python
# take screenshot using pyautogui
image = pyautogui.screenshot()
```

PyAutoGUI does allow us to save this screenshot using the ```.save()``` function like so

```python
image.save('my_screenshot.png')
```

Since the pyautogui takes as a PIL(pillow) and in RGB we need to convert it to numpy array and BGR so we can write it to the disk again.

```python
image = cv2.cvtColor(np.array(image),
                     cv2.COLOR_RGB2BGR)
   
# writing it to the disk using opencv
cv2.imwrite("my_screenshot2.png", image)
```

Now we can look at both screenshots to see the difference. NumPy is a mathematics module that can take the object to an array and allow the OpenCV module change it to and RGB image.
