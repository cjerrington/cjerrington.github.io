const { DateTime } = require('luxon')
const navigationPlugin = require('@11ty/eleventy-navigation')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const editOnGithub = require('eleventy-plugin-edit-on-github');
const pluginSEO = require('eleventy-plugin-seo');
const _ = require("lodash");

module.exports = (config) => {
  
  config.addPlugin(navigationPlugin);
  config.addPlugin(rssPlugin);
  config.addPlugin(syntaxHighlight);
  config.addPlugin(editOnGithub, {
    // required
    github_edit_repo: 'https://github.com/cjerrington/blog',
    // optional: defaults
    github_edit_path: "", // non-root location in git url. root is assumed
    github_edit_branch: 'master',
    github_edit_text: 'Edit on Github', // html accepted, or javascript function: (page) => { return page.inputPath}
    github_edit_class: 'edit-on-github',
    github_edit_tag: 'a',
    github_edit_attributes: 'target="_blank" rel="noopener"',
    github_edit_wrapper: undefined, //ex: "<div stuff>${edit_on_github}</div>"
  });
  config.addPlugin(pluginSEO, {
    title: "Clayton Errington",
    description: "Specialized web designer and software developer",
    url: "https://claytonerrington.com",
    author: "Clayton Errington",
    twitter: "cjerrington",
    image: "https://claytonerrington.com/static/images/avatar.webp"
  });

  config.addPassthroughCopy('css');
  config.addPassthroughCopy('static');
  config.addPassthroughCopy('_redirects');
  
  config.setDataDeepMerge(true);

  config.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL, yyyy");
  });

  config.addCollection("tagList", collection => {
    const tagsObject = {}
    collection.getAll().forEach(item => {
      if (!item.data.tags) return;
      item.data.tags
        .filter(tag => !['post', 'all'].includes(tag))
        .forEach(tag => {
          if(typeof tagsObject[tag] === 'undefined') {
            tagsObject[tag] = 1
          } else {
            tagsObject[tag] += 1
          }
        });
    });

    const tagList = []
    Object.keys(tagsObject).forEach(tag => {
      tagList.push({ tagName: tag, tagCount: tagsObject[tag] })
    })
    return tagList.sort((a, b) => b.tagCount - a.tagCount)

  });

  config.addCollection("postsByYear", (collection) => {
    // create a collection called postsByYear of a glob of the posts folder and only the markdown files
    return _.chain(collection.getFilteredByGlob("src/posts/*.md"))
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  // Get only content that matches a tag
  config.addCollection("offload", function(collectionApi) {
    return collectionApi.getFilteredByTag("100DaysToOffload").reverse();
  });

  return {
    dir: {
      input: './src',
      output: './build'
    }
  }

}