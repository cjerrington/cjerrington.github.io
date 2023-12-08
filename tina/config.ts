import { defineConfig } from "tinacms";

//const htmldate = (new Date()).toISOString().split('T')[0];

const now = new Date().toLocaleDateString("en-US", {timeZone : "America/Chicago"});
const year = now.split("/")[2];
const month = now.split("/")[0];
const day = now.split("/")[1]

const htmldate = `${year}-${month}-${day}`

console.log(htmldate)

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: "admin",
    publicFolder: "build",
  },
  media: {
    tina: {
      mediaRoot: "static",
      publicFolder: "",
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/posts",
        format: 'md',
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            date: htmldate,
            draft: true,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            label: 'Excerpt',
            name: 'excerpt',
          },
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
            required: true,
            description: 'If this is checked the post will not be published',
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            ui: {
              dateFormat: 'YYYY-MM-DD',
              
            },
          },
          {
            type: 'string',
            label: 'Tags',
            name: 'tags',
            list: true,
            options: [
              {
                value: "100DaysToOffload",
                label: "100DaysToOffload"
              },
			  {
                value: "AdventOfCode",
                label: "AdventOfCode"
              },
              {
                value: "11ty",
                label: "11ty"
              }, 
              {
                value: "automation",
                label: "Automation"
              }, 
              {
                value: "aws",
                label: "AWS"
              },
              {
                value: "cloud",
                label: "Cloud"
              },
			        {
                value: "coding",
                label: "Coding"
              },
              {
                value: "docker",
                label: "Docker"
              },
              {
                value: "git",
                label: "Git"
              },
              {
                value: "linux",
                label: "Linux"
              },
              {
                value: "powershell",
                label: "PowerShell"
              },
              {
                value: "python",
                label: "Python"
              },
              {
                value: "selfhost",
                label: "Selfhost"
              },
              {
                value: "shell",
                label: "Shell"
              },
              {
                value: "snippets",
                label: "Snippets"
              },
              {
                value: "web design",
                label: "Web Design"
              },
              {
                value: "windows",
                label: "Windows"
              },
              {
                value: "wordle",
                label: "Wordle"
              },
              
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
              return `${htmldate}-${values.title
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            },
          },
          
        },
      },
      {
        name: "drafts",
        label: "Drafts",
        path: "src/drafts",
        format: 'md',
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            date: htmldate,
            draft: true,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            label: 'Excerpt',
            name: 'excerpt',
          },
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
            required: true,
            description: 'If this is checked the post will not be published',
          },
          {
            label: "Date",
            name: "date",
            type: "datetime",
            ui: {
              dateFormat: 'YYYY-MM-DD',
              
            },
          },
          {
            type: 'string',
            label: 'Tags',
            name: 'tags',
            list: true,
            options: [
              {
                value: "100DaysToOffload",
                label: "100DaysToOffload"
              },
              {
                value: "11ty",
                label: "11ty"
              }, 
              {
                value: "automation",
                label: "Automation"
              }, 
              {
                value: "aws",
                label: "AWS"
              },
              {
                value: "cloud",
                label: "Cloud"
              },
              {
                value: "docker",
                label: "Docker"
              },
              {
                value: "git",
                label: "Git"
              },
              {
                value: "linux",
                label: "Linux"
              },
              {
                value: "powershell",
                label: "PowerShell"
              },
              {
                value: "python",
                label: "Python"
              },
              {
                value: "selfhost",
                label: "Selfhost"
              },
              {
                value: "shell",
                label: "Shell"
              },
              {
                value: "snippets",
                label: "Snippets"
              },
              {
                value: "web design",
                label: "Web Design"
              },
              {
                value: "windows",
                label: "Windows"
              },
              {
                value: "wordle",
                label: "Wordle"
              },
              
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: (values) => {
              // Values is an object containing all the values of the form. In this case it is {title?: string, topic?: string}
              return `${htmldate}-${values.title
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            },
          },
          
        },
      },
    ],
  },
});
