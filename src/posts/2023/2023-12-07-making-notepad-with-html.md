---
title: Making Notepad with HTML
description: A quick tip of some of the fun things you can do with HTML and your browser
draft: false
date: 2023-12-08T06:00:00.000Z
tags:
  - 100DaysToOffload
  - web design
---

Did you know your browser can do more than render web pages? There's a little trick I found many years ago and still use today. We take a moment to expose the inner workings of a browser to our advantage.

In the URL we will add the simple text. The `contentEditable` tells the HTML that the text of the element can be changed by the user. This is one way a WYSIWYG editor makes content editable on the pages.

```html
data:text/html,<html contentEditable>
```

This tells the rendering protocol the object will be text/html what's next is the cool part. We can add as little as one HTML component, and now we have a text input.

```html
data:text/html,<textarea autofocus/>
```

We now have a basic textarea element and can input data. If we add some in-line CSS, we can make this usable.

```html
data:text/html,<textarea style="background-color: white; width:95%; height:95%; padding:20px; font-size:1em; font-family: arial; color:black; border:1px solid black; border-left: 10px solid blue; margin-left: 30px; resize: none;" autofocus/>
```

Not all HTML works in this way, but we can add a few other items, like a title to update our browser tab so we know where we are. Also, some other fun elements to the body. I tried a few other HTML tags and some did not work, nor a complete head. It's a simple rendering. Even the color attributes need to be text based colors, as the hex based colors tend to break the rendering.

```html
data:text/html,<title>Notepad</title><body style="background-color: black;"><textarea style="background-color: black; width:95%; height:95%; padding:20px; font-size:1em; font-family: arial; color:white; border:1px solid black; border-left: 10px solid blue; margin-left: 30px; resize: none;" autofocus/>
```

Just add the contents of what you'd like our browser based notepad to be like as a bookmark, and you'll always have a quick text editor readily available.
