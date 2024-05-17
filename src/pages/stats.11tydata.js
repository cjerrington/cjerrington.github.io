module.exports = {
	/* Some cool stuff! 
        https://chriskirknielsen.com/blog/group-posts-by-year-with-nunjucks-in-eleventy/
    */
	eleventyComputed: {
		currentYear: function (data) {
			return new Date(data.date || data.page.date).getFullYear();
		},
		/* More cool stuff! */
	},
}