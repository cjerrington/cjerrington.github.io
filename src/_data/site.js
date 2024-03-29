module.exports = {
  meta: {
    title: "Clayton Errington",
    description: "Specialized web designer and software developer",
    lang: "en",
    siteUrl: "https://claytonerrington.com/",
  },
  feed: { // used in feed.xml.njk
    subtitle: "Specialized web designer and software developer",
    filename: "feed.xml",
    path: "/feed.xml",
    id: "https://claytonerrington.com/",
    authorName: "Clayton Errington",
    authorEmail: "me@claytonerrington.com"
  },
  hero: { // used in hero section of main page ie. index.html.njk
    title: "Clayton Errington",
    description: "Specialized web designer and software developer"
  },
  env: process.env.ELEVENTY_ENV,
}