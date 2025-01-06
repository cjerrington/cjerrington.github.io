const {AssetCache} = require('@11ty/eleventy-fetch');


module.exports = {
	/* Some cool stuff! 
        https://chriskirknielsen.com/blog/group-posts-by-year-with-nunjucks-in-eleventy/
    */
	eleventyComputed: {
		currentYear: function (data) {
			return new Date().getFullYear();
		},
		/* More cool stuff! */
	},
}