---
title: "SQL Builder"
description: "Simple C# app to build SQL Attach Scripts."
tags: 
  - c#
  - projects
date: 2021-01-26
---

Simple C# app to build SQL Attach Scripts.

Allows users to build a mass attach script from the MDF and LDF files for MS SQL. I was looking into a way to automate the process when migrating a SQL server and running the ATTACH command. We had a lot of files and sometimes the file path was long. This simplified that process.

<!--more-->

## Usage

You can select the location of the MDF files and the LDF files. These can be in different drives. The program will then compile the list of files in the directories and create the appropriate attach script.

You can also specify a file prefix if you so choose to. This will only select and create the script for the MDF and LDF files with that name.

You may also export the generated SQL Query to a SQL file for later use. It will be saved in the same directory as SQLBuilder and if a file prefix is entered, the file name will be save as well.

## Screenshot

![SQLBuilder](https://raw.githubusercontent.com/cjerrington/SQLBuilder/main/SQLBuilder.png)

## Download

Check out the [latest releases](https://github.com/cjerrington/SQLBuilder/releases/latest) to download. 
