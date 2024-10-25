---
title: Checking for Environment Variables in a Node.js project
description: Run sanity checks for required environment variables in your Node.js project
date: '2024-10-25'
tags:
  - nodejs
  - coding
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

Not too long ago I was trying to build a project and was having issues, and it turned out I did not have my environment variables set correctly on my machine. This led me to look for a way to build a sanity check for required variables in my `.env` file.

In most of my projects I make use of the node module `dotenv`. In the [Readme](https://www.npmjs.com/package/dotenv) for the module there are a lot of helpful uses for this module, none talked about having "required" environment variables.

My idea was to create a file that is run prior to the build and serve processes and checks for these values. This could have been baked into my code, but if I ever changed how or where my secrets are in my project, that is more to change. Hopefully, setting this up this way allows for more flexibility to do the sanity check for required variables first, then spend the compute time to build the project.

## Setting up the check

First create a JavaScript file in your project, I named mine `getenv.js`.

```js
const dotenv = require('dotenv')
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '.env') });

const requiredEnvVars = [
  'REQUIRED_SECRET', 
  'WEBHOST', 
  'REQUIRED_PASSWORD'
]

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if ( missingVars.length > 0 ) {
  console.error('The following environment variables are missing:');
  missingVars.forEach(varName => console.error(`- ${varName}`));
  console.error('Please add required environment variables before continuing...');
  process.exit(1);
}else{
  console.log('All required Environment variables are set!')
}
```

When the script starts, and loads your `.env` it adds your variable into the `process.env` and we are doing a filter where if the `process.env[varName]` does not exist, since it is not in our `.env` file, it will add it to the console log messages.

```text
The following environment variables are missing:
- REQUIRED_SECRET
- WEBHOST
- REQUIRED_PASSWORD
Please add required environment variables before continuing...
```

After it does the `missingVars.forEach();` console logging, we do a process exit to kill the run time from continuing to the next process. In my case, this was a server or build of my project.

## Conclusion

The primary goal of this is to ensure that the application has all the necessary environment variables before it starts. This is crucial for security and proper configuration. By failing early if variables are missing, the application prevents potential errors and data leaks.

Since I'm missing a crucial variable that's essential for the subsequent stages of the build process, I believe it's best to close and cancel the current process. This proactive approach will avoid unnecessary troubleshooting efforts that might be misdirected due to the missing variable. Additionally, it will guarantee that the build process on remote platforms like Vercel or Netlify has access to all the required variables.

This is a really simple implementation of this idea, and I found a way to do this with [Joi](https://joi.dev/). For a more complex setup or specific type of validations, this module looks like it will handle that.

### Resources

- [How to validate environment file in NodeJS](https://dev.to/sukruozdemir/how-to-validate-environment-file-in-nodejs-m2m)
- [joi](https://joi.dev/api/)
