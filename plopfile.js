

module.exports = function(plop) {
    const today = new Date(Date.now())
    const shortDate = today.toISOString().split("T")[0]

    plop.setHelper("shortDate", () => shortDate),
      plop.setHelper("ISOStringDate", () => today.toISOString()),
      // optional welcome message
      plop.setWelcomeMessage(
        "Welcome to plop! What type of file would you like to generate?"
      ),
      plop.setGenerator("blog post ✏️", {
        description: "template for generating blog posts",
        prompts: [
          {
            type: "input",
            name: "title",
            message: "Title of post:",
            validate: function (value) {
              if ((/.+/).test(value)) { return true; }
              return 'title is required';
            }
          },
          {
            type: "input",
            name: "description",
            message: "Description of post:",
            validate: function (value) {
              if ((/.+/).test(value)) { return true; }
              return 'Description is required';
            }
          },
          {
            type: "checkbox",
            name: "category",
            message: "Category:",
            choices: ["Computers", "C#", "Javascript", "Powershell", "Python", "Security", "Web"],
            //filter: function(val) {
            //  return val.toLowerCase()
            //},
            validate: function (value) {
              if ((/.+/).test(value)) { return true; }
              return 'Main Category is required';
            }
          },
        ],
        actions: [
          {
            type: "add",
            path: `src/drafts/${shortDate}-{{dashCase title}}.md`,
            templateFile: "drafts.md.hbs",
          },
        ],
      })
}