---
title: Upgrading 11ty to v3
description: The easy of upgrading 11ty to the latest version
date: '2024-10-21'
tags:
  - web dev
  - 11ty
___mb_schema: /.mattrbld/schemas/schemaposts.json
---

Upgrading Eleventy (11ty) has historically been on the simpler side of updates. Recently, 11ty version v3.0 was [released](https://www.11ty.dev/blog/eleventy-v3/), and this is the runtime engine so to speak of the static site generator.

Unlike other npm packages, 11ty has an [upgrade helper](https://www.11ty.dev/docs/plugins/upgrade-help/) plugin when going from one version to the other. This looks at the build process and makes sure your configuration, build process, structure correctly reflects how 11ty will build your website.

It finds warnings or errors based on how you built your website structure to be built with the generator. This is really helpful as certain built-in functions might have been broken out into its own plugin to expand on the process better.

I don’t know why it too me so long to do the upgrade, as the upgrade plugin is pretty helpful. If I’m being honest some is the ESM vs CommonJS modes, models, I get confused. Once I get something working, I’m good to go.

To test the upgrade process, it might be a good idea to make a branch for the upgrade to confirm how to upgrade your project, then either merge that back into your main branch, or if simple enough, redo the updates.

## How to upgrade

The [Eleventy documentation](https://www.11ty.dev/docs/plugins/upgrade-help/) is great and is the first place I go for answers to some questions.

1. Upgrade Eleventy
2. Install the Helper plugin
3. Add to configuration file
4. Run your build
5. Remove the plugin

### Checking for errors

This is the part I felt like I needed the most help in. As mentioned earlier, I use Node, but also not a Node JavaScript developer. I do find many beneficial use cases that make processes easier, and I should spend more time learning and understanding the development engine I’m using.

Many of the errors or warnings though provide examples of how to resolve the issue the helper plugin found while building your website.

For me, one problem I could not figure out was an issue with the `EleventyRenderPlugin`. The errors kept mentioning import the plugin this way, do this if it’s CommonJS or ESM… I reviewed my config and code and realized I wasn’t using the module at all. I removed the plugin and tested that the site would built successfully and as I intended it to. Since I am using the [Excellent Eleventy](/blog/website-update/) starter site, I wasn't sure at first if this was needed.

### Success

Once you’ve reviewed any warnings or errors, remember to remove the plugin from your dependencies, package.json, and your Eleventy configuration file. This is helpful to ensure there are no breaking changes with the upgrade and helps you resolve any if there are some.

Now this site is using [Eleventy v3.0](https://www.npmjs.com/package/@11ty/eleventy?activeTab=versions)!
