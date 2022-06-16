+++
author = "Josh"
categories = ["short", "guide"]
date = 2022-06-14T22:00:00Z
description = "lesgooooooo"
image = "bed.png"
tags = ["development"]
title = "My New Blog workflow ^~^"

+++
<!--more-->

## Intro

Alright so dis is a **banger** post. I haven't written in about 2 months because I've been swamped with campus work and updating the blog became tiresome with the workflow I had going.

![](https://macawls.dev/apu-gallery/apu/beer.jpeg)

## Old Workflow(TRASH)

So, this blog is made using [Hugo](), which is a **static site generator**(SSG) using GitHub as a remote repository. What I would do is have all of my files up on Github including the build which would be put under the "docs/" folder for hosting and Github pages. What I would have to do to **add another** post is:

1. Clone the repo(with my theme submodule)
2. Add another post under a new folder written in markdown
3. Build the static site with something like "Hugo -d docs"
4. Upload/Commit to remote

Now this isn't absolutely terrible, but its always a good idea to separate the source files from the build in some way otherwise you'll just have a monolithic/convoluted repo. Also manually building is just terrible.

#### Another Issue: Hugo On Windows

Don't its just, so bad. Windows is bad. Winblows.

## New Workflow

Really have no idea why I didn't do this sooner. Feel free to inspect the source repo and have a look at the [main.yml](https://github.com/Macawls/blog/blob/based/.github/workflows/main.yml "main.yml") . So using GitHub actions, on every commit to the repository, it builds and deploys on another branch within the repository to GitHub Pages. Using [Forestry](https://forestry.io/ "Forestry"), a headless **Git**-Based **CMS**(Content Management System) I can edit the content of my blog.

![Forestry Frontend](https://i.imgur.com/DV6cRA6.png)

#### What does this mean tho?

All I have to do is login to Forestry.IO on any PC, with or without Hugo installed and update my blog. No hassle, no issues, plain and simple.