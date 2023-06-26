+++
author = "Josh"
title = "Why a Multi-scene workflow in Unity is important"
date = "2023-01-10"
description = "📑"
tags = [
    "unity",
    "development"
]
categories = [
    "Guide"
]
image = "yeah.jpg"
+++
<!--more-->
## Resources

<center>
<p align="center">
  <img src="https://media.giphy.com/media/igFbuVNCTNQ1V516Ng/giphy.gif" alt="" width="500"/>
</p>

[Unity Docs](https://docs.unity3d.com/560/Documentation/Manual/MultiSceneEditing.html)
<br> [Unity-Glue.com](http://www.unity-glue.com/)
<br> [Unity Youtube](https://youtu.be/zObWVOv1GlE)



</center>

## TLDR
It's important because it allows designers and developers test and work on and different aspects of the game in isolation.


## What is a multi-scene workflow?

It's relatively simple practice that's often overlooked in smaller projects. It simply means there'll be multiple scenes loaded at runtime. 

<center>

![](https://docs.unity3d.com/560/Documentation/uploads/Main/MultiSceneEditingHierarchy.png)

</center>

A multi-scene workflow isn't all that viable for something like prototypes since the principle of [separation of concerns](https://nalexn.github.io/separation-of-concerns/) doesn't really matter.

Where it's value becomes most apparent is when we need to maximize reusability, modularity, performance and most importantly **collaboration**. Of course it's different on a case by case basis, but I've found it to be a very useful practice generally.


## Data
There's many places data could live. It could be scene dependent (game objects/monobehaviours etc) or scene independent(statics/scripts/scriptable objects). At the end of the day, scenes are just data containers where the data is stored in a hierarchy.
 There's no need to duplicate data across scenes when it's not necessary.

<p align="center">
  <img src="https://i.imgur.com/lnStXSV.jpg" alt="" width="150"/>
</p>

## Example
Suppose we have a couple people in a team, all with their own roles.
Perhaps there are environment artists, programmers, designers etc.

Splitting up each logical component of the game into it's own scene allows each person to work on their own component in isolation.

<center>It really is that simple 😎🤙</center>

Instead of say Level 1 being a single scene, we could have
- Level_1_Environment 
- Level_1_Props
- Level_1_Audio


Or whatever arbitrary names we want. 
As long as it's logical.

Maybe we realize that Level_1_Environment can be split into 3 logical sections or scenes. 
So, we simply load or unload whichever scene we need accordingly runtime.

So now, suppose we need to test something specific in the final section of Level 1. We simply load Level_1_Environment_3, and if necessary, setup some required data or other scenes beforehand to simulate the state of the game and we're good to go. It's isolated and testable.

## Source Control
To preface I'm mainly talking about [git](https://git-scm.com/) in this case since I'm not familiar with other solutions such as [plastic scm](https://unity.com/products/plastic-scm).

Working with source control and monolithic scenes is a massive headache. I've had my fair share of merge conflicts 😌👍.
 
More often than not if we don't separate scenes accordingly within a decently sized team, chaos will ensue.
Even if you're working alone, it's still a good idea to separate scenes logically which I recommend doing regardless.

After getting used to it, it felt like I was sort of free from the shackles of coupling.
<center>
 <video width="300" controls>
  <source src="frog.mp4" type="video/mp4">
Your browser does not support the video tag.
</video> 

</center>

## How do we handle communication across scenes?    
There are 2 options as far as I believe.
- Statics
- Scriptable objects.

Scriptable objects are great for events and storing data that's not scene dependent. 
This is a great blog post on the subject.
- [Game Architecture with Scriptable Objects](https://unity.com/how-to/architect-game-code-scriptable-objects)

Statics are okay, but they're not great and I'd advocate against using them in most cases.
They're not flexible and can be a pain to test. I'm not just regurgitating what many others have said, it really is painful. 

It's very difficult to simulate a specific state of the game when you have to worry about 50 invisible references scattered across the codebase and a global state.

<center>
 <video width="550" controls>
  <source src="confused.mp4" type="video/mp4">
Your browser does not support the video tag.
</video> 

</center>

### Conclusion
I've benefitted quite a lot from this workflow which is why I decided to write a post about it.
I could elaborate on how it helped me personally, but the resources above do more than enough to explain it. 

Peace ✌️