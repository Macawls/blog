+++
author = "Josh"
title = "The XY Problem"
date = "2022-10-28"
description = "🧠⚡"
toc = true
tags = [
    "development"
]
categories = [
    "guide"
]
image = "https://i.imgur.com/aXu6r95.png"
+++
<!--more-->
<center>

## Stuff I've been working on recently

A star pathfinding in an isometric game.

{{< video src="astar.mp4" controls="yes" >}}

***

Adding choices to a dialogue.

{{< video src="dialogue.mp4" controls="yes" >}}

***
</center>

## Intro
The motivation behind this post stemmed from recent experiences. I started helping out some peeps alot more these days and found that certain patterns started to repeat itself. 

## The Problem Solving Process

1. You understand the problem
2. Iterate over possible solutions.
3. Decide which solution is most optimal.
4. Execute.

<center>

![](https://media.giphy.com/media/dbtDDSvWErdf2/giphy.gif)

</center>

This first step; **Understanding** is paramount. This is becuase in order to arrive at a complete solution, the problem must be completely understood. Not considering communication skills, a good understanding of the problem directly correlates to how well it can be effectively communicated.

I noticed that a common pattern is to only understand a problem at a **high level**. 
This is problematic. Subsequently, one might derive at a solution that *supposedly* should suffice which would be more prone to adopting inefficient or incorrect solutions.

After its fully understood, it should be divided into smaller, digestable chunks if possible. Finally, each chunk should be solved by priority. This is a pretty effective way to tackle an issue in my humble opinion.

<center>

![](https://i.imgur.com/klhHGBA.jpg)

</center>

## What is the XY Problem?
<center>

[SOURCE](https://xyproblem.info/)

</center>
<center>

![](https://i.imgur.com/dlBrxQf.png)

</center>

Quite simply, its asking about an attempted solution for a problem rather than the **actual** problem. Which leads to both parties (The asker and the mentor) backtracking and misscomunicating.  

A really general example is someone asking, how many hours do I need to solve X? **How many hours** in this case, is completely irrelvant and is a Y problem. The actual problem is how X can be solved i.e the solution, regardless of time.

As a personal example, I was asked how one could **essentially** have a serialized dictionary. It was asked in a convoluted way, whereby their attempted solutions were explained unnecessarily.

By asking some more questions, it became apparent that the root problem was retrieving a component by name. This makes things much easier for the person that was being asked the question by providing more context.

One of the worst offenders is sending over an error message and asking how the problem can be fixed. The solution is not how to get rid of the error, it is the error message itself. 

Maybe not the best analogy but suppose you pour milk into a bowl and realize there's no milk left, the problem is there's no milk left. Therefore the solution is there's no milk left. 

No milk left = Ask yourself how to get more milk

From this, we can try
- Buying milk from the store.

An example Y problem in this case would be, which store has the cheapest milk? It should be obvious that asking someone which store has the cheapest milk has little or nothing to do with the solution of getting more milk.

Finally, [RTFM or read the fucking manual](http://www.readthefuckingmanual.com/) is the main motto for many problems. Greatest advice of all time. 

