---
title: "WP Helper Master"
excerpt_separator: "<!--more-->"
categories:
  - Blog
tags:
  - WordPress
  - Web Design
  - Plugins
---

This is a WordPress Plugin that I developed that disables, enables, and enhances WP and other settings. 

This plugin is hosted at [WordPress.org](https://wordpress.org/plugins/wp-helper-master/) and [GitHub.com](https://github.com/cjerrington/WP-Helper). More information can be found [here](http://claytonerrington.com/WP-Helper/)

**Feature list includes:**

**WP Clean Up: Clean up WP header.**

* RSD Links - Remove the link to the Really Simple Discovery
* Canonical Links - Remove Canonical Links
* Windows Live Writer manifest file - Removes the link to the Windows Live Writer manifest file.
* Short Link - Removes the short links.
* WP Generator - Removes the WordPress version i.e. - 4.0.2.
* Adjacent Posts - Removes the relational links for the posts adjacent to the current post.
* Index Link - Removes the index link.
* Parent and Post links - Removes the Parent and Post Link link.
* RSS feeds for post, category and comments - Removes the post, category and comments RSS feeds.
* Display WP Version? - Removes the WP Version.
* Disable RSS Feeds - Disables RSS Feeds

**Performance: Help speed up WP with these options**

* Enable GZIP compression - This will speed up your WordPress website drastically and reduces bandwidth usage as well.
* Remove Query Version - Remove the version query string from scripts and styles - allows for better caching. i.e. jquery.js?ver=1.8
* Prevent SSL Check when XMLRPC is not utilized? - Prevents WordPress from testing SSL capability on domain.com/xmlrpc.php?rsd when XMLRPC not in use
* Disable Auto-Formatting - Disable Auto-Formatting in Content and Excerpt

**Security: Add more security to WP**

* Hide login form error messages - Hide login form error messages
* Remove WordPress version number - Remove WordPress version number
* Disable XMLRPC - Disable XMLRPC
* Post Revisions true false 3 5 - Set the maximum number of post revisions unless the constant is already set in wp-config.php.
* True = enable post revisions. False = disables post revisions. Or 3 or 5 post revisions.
* Disable Auto Linking - Disable Auto Linking of URLs in comments
* Disable self-ping - Disable self-ping
* Remove lost password link - Remove lost password link if you do not want people trying to reset your password or theirs.

**Admin Modifications: Add more security to WP**

* Change the greeting for the Admin Page. Change the standard Howdy to something you like.
* All Settings - Add new Admin menu item "All Settings"

**A sample of the Settings page is below:**
![Settings Page](/images/settings-page.jpg)

**Sample code is below for the file**

```php

<?php
// ++++++++++++++++ WP CLEANUP +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //
 	
if (get_option( 'wphm_cononical_links' )){remove_action ('wp_head', 'rsd_link');}
if (get_option( 'wphm_manifest_file' )){remove_action( 'wp_head', 'wlwmanifest_link');}
if (get_option( 'wphm_short_link' )){remove_action( 'wp_head', 'wp_shortlink_wp_head');}
if (get_option( 'wphm_wp_generator' )){remove_action( 'wp_head', 'wp_generator');}
if (get_option( 'wphm_adjacent_posts' )){
	remove_action( 'wphm_wp_head', 'adjacent_posts_rel_link_wp_head' );
	remove_action( 'wphm_wp_head', 'adjacent_posts_rel_link');
}
if (get_option( 'wphm_index_rel_link' )){remove_action( 'wp_head', 'index_rel_link' );}
if (get_option( 'wphm_post_rel_link' )){
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
}
?>
```
