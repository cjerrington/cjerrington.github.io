---
title: Plop in Automation
description: How I use npm to automate the inner workings of my website and within other projects
tags: 
  - javascript
  - automation
  - 100DaysToOffload
date: 2023-02-12
---

My blog now is powered by 11ty, as previously [mentioned](/blog/11ty-redesign), and this runs within the NodeJS environment as well. Each node project comes with a `package.json` file and this holds the information for the node packages, scripts or processes to run, and a few more items. 

Since starting the [100DaysToOffload](/100DaysToOffload) I am writing a lot more and each post is its own file with some specific frontmatter used to render the website and the rest of the website. I have used [PlopJS](https://plopjs.com/documentation/#getting-started) before on another blog I maintain and it has been helpful as well. 

## So what is PlopJS? 

After installing Plop we create a `plopfile.js` and can start generating some questions and get going. 

A sample plop file

{% highlight "javascript" %}
export default function (plop) {
    // controller generator
    plop.setGenerator('controller', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'controller name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/{{name}}.js',
            templateFile: 'plop-templates/controller.hbs'
        }]
    });
};
{% endhighlight %}

This will as a question, you answer and then create a new file based on a template. You can take a look at my [plop file](https://github.com/cjerrington/cjerrington.github.io/blob/master/plopfile.js) I am using to see the full process. Now I have a [template file](https://github.com/cjerrington/cjerrington.github.io/blob/master/drafts.md.hbs) that is pretty straight forward as well. 

{% highlight "javascript" %}

{% raw %}
---
title: {{titleCase title}}
description: {{description}}
tags: 
{{#each category}}
  - {{this}}
{{/each}}
  - 100DaysToOffload
---

{{description}}
{% endraw %}
{% endhighlight %}


One of the neat things plop can do is have a mulitple choice prompts. I am using them to add the tags to my blog so I don't have to write them by hand all the time. To add to the automation, I need a way to get the tags previously used. Node to the rescue here with a simple directory search on my build folder's tag directory.

{% highlight "javascript" %}
function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

const tags = getDirectories("./build/tags")

// other plop file
{
  type: "checkbox",
  name: "category",
  message: "Category:",
  choices: tags,
}
// rest of plop file            
{% endhighlight %}

## Putting it all together

![plop in use](/assets/images/blog/plop-automation.PNG)

I have some other helpful scripts as well! One to clean my build directory to have a fresh start every once in a while, and also a git process too. Some automation can be fully autonomous, some is just helpful when doing the repetitive tasks, and others can simplify a few processes as well. 