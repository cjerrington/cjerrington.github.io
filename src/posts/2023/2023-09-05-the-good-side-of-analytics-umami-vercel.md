---
_schema: default
title: The Good Side of Analytics - Umami & Vercel
description: The term analytics has gotten a bad name recently, but not all of it is bad.
tags:
  - 100DaysToOffload
  - web design
  - selfhost
  - vercel
draft: false
size: wide
---
Analytics. It's been a word of taboo for a while now, and for a good reason. No one really likes to be tracked knowingly or unknowingly. I think there is a difference between analytics and telemetry and also how that data is to be used. When a company or organization adds analytics to a product it should be for the purpose of improving the product and understand the end user workflows.

There are some positive things analytics do provide. If you have your product able to track page requests you can see what content is most popular over time. Also, you can see what page flow a user tends to go through and maybe you can determine that the workflow a user needs to go through to get to a certain page is not as intuitive as you thought.

## The new solution

Recently I removed Google Analytics and moved to <a target="_blank" rel="noopener" href="https://umami.is/">Umami</a> which is self-hosted and makes analytics easy for the user, and maintains visitor privacy and data ownership. I recently created a cloud account on their service for free, which was great. After getting some data I could see in a clearer way than Google Analytics ever did what pages and data it was collecting. The integration, setup, and review of the data was simple and easy.

Also this weekend, I moved my web hosting to <a target="_blank" rel="noopener" href="https://vercel.com">Vercel</a> and was looking again and the full self-hosted options Umami offers and saw a <a target="_blank" rel="noopener" href="https://umami.is/docs/running-on-vercel">Running on Vercel</a> page and started looking into this option. The trick was I still didn't have a database connection. Vercel to rescue!

They have plenty of <a target="_blank" rel="noopener" href="https://vercel.com/docs/storage">storage options</a> and a Postgres database is one of them. I was able to create a Postgres Database withing my Vercel account and import the forked Umami git repository to my GitHub account. There were a few settings I did not find in the setup on the page that might be helpful, even from a process workflow.

## The setup

The steps below are the settings I would think could be updated for a better deployment solution.

1. Fork the <a target="_blank" rel="noopener" href="https://github.com/umami-software/umami">https://github.com/umami-software/umami</a> project to your GitHub account.
2. Create an account on <a target="_blank" rel="noopener" href="https://vercel.com/">Vercel</a>.
3. From the dashboard page click **Import Project** then specify the URL to your fork of the project on GitHub.
4. Add the required environment variables DATABASE\_URL to your Vercel project. These values are defined in the **Configure Umami** step from [Install](https://umami.is/docs/install). You can also create a Vercel Postgres database at this point.
   1. Vercel Postgres database creation
   2. Under your Dashboard go to Storage and choose **Create Database**
   3. Choose Postgres
   4. Once named and created you will find your database url in the `.env.local` settings
   5. You will use the POSTGRES\_PRISMA\_URL\_PRISMA\_URL as the DATABASE\_URL environment variable for your Vercel deployment settings.
5. You should use POSTGRES\_PRISMA\_URL for umami, which is in the form of `postgres://user:passwd@endpoint-pooler.postgres.vercel-storage.com/verceldb?pgbouncer=true&connect_timeout=10`.
6. The environment variable used for the database URL can be changed in the db/postgresql/prisma.schema file.
7. Deploy and visit your application at `<deploy-id>.vercel.app`.
8. Follow the **Getting started** guide starting from the [Login](https://umami.is/docs/login) step and be sure to change the default password.

After creating the database in step 4, I would clone your forked repository of the Umami project add a `.env` file with your `DATABASE_URL={connection_url}`. Yes, you do need to add a deployment environment variable called `DATABASE_URL` to your project and deploy that.

Then run:

{% highlight "shell" %}
yarn install 
yarn build 
{% endhighlight %}

This will create the database and ensure the connection is made. Then once the database build is complete, run your deployment to Vercel and build the app front end. This will create the basic `<deploy-id>.vercel.app` domain. You can leave it here if you'd like.

I went ahead and added a website for <a target="_blank" rel="noopener" href="https://analytics.claytonerrington.com/">analytics.claytonerrington.com</a> and added the DNS CNAME to point to Vercel's hosting loadbalancer.

## The final solution

Once I was able to complete the deployment I could log into my newly created analytics site and add my websites to this new application. Again, I'm not tracking users specifically and I'm more interested in which pages are people finding my site for, what pages are being read the most, where are they located?

These are the simple questions, and helps me know what to keep writing, updating, and where to focus my content. Some of this is neat information since I've been sharing my blog posts to the \#100DaysToOffload hashtag for people to read that way was well.

The nice thing about Umami, I can create a share URL for my analytics. You can see my stats in the link below. What has been neat to see is how some pages have had over 100 views per month, and what keeps the top of the leader board.

<a target="_blank" rel="noopener" href="https://analytics.claytonerrington.com/share/9FNL88ifrvc1v0EY/claytonerrington.com">View my analytics</a>

Top pages ![Top Pages](/assets/images/blog/analytics.png)