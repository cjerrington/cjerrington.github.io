const fs = require('fs')

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

module.exports = function(plop) {
    const today = new Date(Date.now())
    const year = today.getFullYear()
    const shortDate = today.toISOString().split("T")[0] 

    plop.setHelper("shortDate", () => shortDate),
    plop.setHelper("ISOStringDate", () => today.toISOString()),
    // optional welcome message
    plop.setWelcomeMessage(
    "Welcome to plop! What type of file would you like to generate?"
    ),
    plop.setGenerator("the100pics", {
    description: "template for generating a 100pics post",
    prompts: [
        {
        type: "input",
        name: "title",
        message: "Title of photo:",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'title is required';
        }
        },
        {
        type: "input",
        name: "description",
        message: "Description of photo:",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'Description is required';
        }
        },
        {
        type: "input",
        name: "photonumber",
        message: "the number of the photo:",
        validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'Image photo number required';
        }
        }
    ],
    actions: [
        {
        type: "add",
        path: `src/posts/${year}/${shortDate}-the100pics-{{photonumber}}.md`,
        templateFile: "config/templates/pics.md.hbs",
        },
    ],
    })
}
