/**
 * I try to keep the `eleventy.config.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `./config/collections/index.js`
 *  - `./config/filters/index.js`
 *  - `./config/plugins/index.js`
 *  - `./config/shortcodes/index.js`
 *  - `./config/transforms/index.js`
 */

// JSDoc comment: Hint VS Code for eleventyConfig autocompletion. © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */

// module import filters
const {
  toISOString,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  minifyCss,
  minifyJs,
  splitlines,
  limit
} = require('./config/filters/index.js');

const _ = require("lodash");
const postGraph = require('@rknightuk/eleventy-plugin-post-graph')
const readingTime = require('eleventy-plugin-reading-time');
const readerBar = require('eleventy-plugin-reader-bar')

// module import shortcodes
const {imageShortcode, includeRaw, liteYoutube} = require('./config/shortcodes/index.js');

// module import collections
const {getAllPosts} = require('./config/collections/index.js');
const {onlyMarkdown} = require('./config/collections/index.js');
const {tagList} = require('./config/collections/index.js');

// module import events
const {svgToJpeg} = require('./config/events/index.js');

// plugins

//const {EleventyRenderPlugin} = require('@11ty/eleventy');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language');
const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const markdownLib = require('./config/plugins/markdown.js');
//const {slugifyString} = require('./config/utils/index.js');
const yaml = require('js-yaml');

module.exports = eleventyConfig => {
  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');

  // --------------------- layout aliases -----------------------
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('blog', 'blog.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');

  // 	---------------------  Custom filters -----------------------
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('formatDate', formatDate);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  //eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('splitlines', splitlines);
  eleventyConfig.addFilter('cssmin', minifyCss);

  eleventyConfig.addNunjucksAsyncFilter('jsmin', minifyJs);

  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);

  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addNunjucksAsyncShortcode('eleventyImage', imageShortcode);
  eleventyConfig.addShortcode('youtube', liteYoutube);
  eleventyConfig.addShortcode('include_raw', includeRaw);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, by stephanie eckles

  // 	--------------------- Custom transforms ---------------------
  eleventyConfig.addPlugin(require('./config/transforms/html-config.js'));

  // 	--------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'));
  eleventyConfig.addPlugin(require('./config/template-languages/js-config.js'));

  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);
  eleventyConfig.addCollection("offload", function(collectionApi) {
    return collectionApi.getFilteredByTag("100DaysToOffload").reverse();
  });

  eleventyConfig.addCollection("postsByYear", (collection) => {
    // create a collection called postsByYear of a glob of the posts folder and only the markdown files
    return _.chain(collection.getFilteredByGlob("./src/posts/**/*.md"))
      .groupBy((post) => post.date.getFullYear())
      .toPairs()
      .reverse()
      .value();
  });

  eleventyConfig.addCollection("tagList2023", collection => {
    const tagsObject = {}
    collection.getFilteredByTag("100DaysToOffload").forEach(item => {
      if (!item.data.tags) return;
      item.data.tags
        .filter(tag => !['posts', 'all'].includes(tag))
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

  // 	--------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    // this only runs in development, on your machine, so og images get installed fonts.
    eleventyConfig.on('eleventy.after', svgToJpeg);
  }

  // 	--------------------- Plugins ---------------------
  //eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(inclusiveLangPlugin);
  eleventyConfig.addPlugin(bundlerPlugin);
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(postGraph)
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(readerBar)

  // Add support for YAML data files with .yaml extension
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // 	--------------------- Passthrough File Copy -----------------------
  // same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images', 'src/assets/images/the100pics'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  // to root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  eleventyConfig.addPassthroughCopy({'node_modules\@zachleat\snow-fall\snow-fall.js': 'snow-fall.js'});
  eleventyConfig.addPassthroughCopy({'src/assets/css/styles.css': 'assets/css/styles.css'})

  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",

    // Default options shown:
    ignore: ["node_modules"],
    watch: true,
    open: true,
    notify: false,
    ui: false,
    ghostMode: false,
    index: "index.html",
    https: {
      key: "ssl/key.pem",
      cert: "ssl/cert.pem"
    }
  })

  // 	--------------------- general config -----------------------
  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
    pathPrefix: '/',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
