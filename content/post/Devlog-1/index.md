+++
author = "Josh"
title = "Racing Game Devlog, Episode 1"
date = "2022-10-01"
description = "Cool ass game!, epic 💯"
toc = true
tags = [
    "development, 
    unity"
]
categories = [
    "programming"
]
image = "https://i.imgur.com/gH6DeZQ.png"
+++
<!--more-->

## Intro

I've came a long way from this [absolute dumpster fire of a project](https://macawls.dev/blog/post/my-first-unity-project/) from 5 months ago. I've improved so much it's ridiculous. Looking at the code I wrote back then is so embarassing. But I wanna keep it there for growth refference.

<center>
<img src="https://i.imgur.com/y4DHR9O.png">
</center>

Making mistakes and learning from them is just so so valuable.
There are so many principles to follow, but I feel like you only learn **WHY** it's good to follow these principles when you the trash you wrote before comes back to haunt you. It's a never ending cycle.

Tangent over, lets get it into it ^~^
***

## Abstract Data Structures

Alright so in this task we've gotta implement the linked list, hashmap, stack, queue and all that good stuff.
The restriction we have is that we can't use any Systems.Collections namespaces for any adt implementations.

I definitely appreciate them much much more than before.
It's quite long so I recommend navigating to different sections using the **table of contents** on the right.

I'll showcase some of my favourite methods and new things I learnt.

### LinkedList
Full Source: [gist](https://gist.github.com/Macawls/3c16861ec269df07bdfefcd87ba99489)
<br>Learnt: Taking in funcs and actions as method parameters

```csharp
public void ForEach(Action<T> action)
{
    var current = Head;
    while (current != null)
    {
        action(current.Data);
        current = current.Next;
    }
}

public CustomLinkedList<T>SelectMany(Func<T, bool> func)
{
    var newList = new CustomLinkedList<T>();
    
    var current = Head;
    while (current != null)
    {
        if (func(current.Data)) newList.AddEnd(current.Data);
        current = current.Next;
    }

    return newList;
}
```
</br>
<center> <b>Usage:</b> </center>
<br>

```csharp
var numbers = new CustomLinkedList<int>(new[] {1, 2, 3, 4, 5, 6});
// get odd numbers from the linked list
var oddNumbers = list.SelectMany(e => e % 2 != 0); 
// action for every element
oddNumbers.ForEach(e => print(e)) // 1, 3, 5
```

Obviously Linq already does this sorta thing but I always thought it was magic until I implemented it. 
### Stack and queue
Honestly nothing interesting here. It was all pretty basic. 
I just used a linked list under the hood to make my life easier.

### Hashmap/Dictionary
Full Source: [gist](https://gist.github.com/Macawls/1f561aaca221f3868967e43a9125e660)

Awwww snapp this one is my favourite. Its soo friggin cool 🤓, also lowkey the cheatcode to every leetcode problem. 
<br> I love this [dude](https://youtu.be/FhNJ6aikTVI), he explained it so well.

![](smol.jpg)

There are quite a few approaches but I decided to go with how Java implements it with a starting size of 16 and a load factor of 0.75f because it's quite a nice middleground.
For resolving collisions I'm using [seperate chaining](https://www.geeksforgeeks.org/hashing-set-2-separate-chaining/).

Interestingly in Java, when the map reaches a certain threshold, it switches the linked list with a self balancing BST. So worst case O(n) key retrieval becomes O(log n). Smart mofos.

<br>Learnt: Obvs how a hashmap works internally but also creating an indexer which I didn't know I could do. 

```csharp
public object this[TKey key]
        {
            get{} // logic in here
            set{} // logic in here
        }
```
</br>
<center> <b>Usage:</b> </center>
<br>

```csharp
var map = new CustomHashmap<string, int>();
map.Add("Bob", 1);
map["Bob"] = 10;
var myNumber = map["Bob"] // 10
```
## Architecture and Systems in the Game

Alright so I got tired of the singleton nonsense. Gave me so many issues all the damn time.
I'm still lowkey using it, but in a different way using the [service locator](https://www.geeksforgeeks.org/service-locator-pattern/) pattern. 

So pretty much, I have these prefabs in the game which act as *services*. 
None of them care about persistent data, they sort of act like static helpers. 

So I have:  
* **Scene Service** for loading scenes
* **Audio Service** for manaing music
* **Dialogue Service** for dialogue stuff

The services themselves are responsible for registration, which allows them to be accessed elsewhere via their class type.
```csharp
void Awake()
{
    ServiceLocator.Register(this);
}
```
Accessing from another class is as follows:
```csharp
void Start()
{
    ServiceLocator.Get<AudioService>()
    .PlayMusic(newClip: "Never gonna give you up", shouldLoop: true);
    
    // or cache the ref if the class uses it alot
    var audio = ServiceLocator.Get<AudioService>();
}
```

So here's the problem, these services are prefabs because I need them to act like a gameobject. For example the audio service has a bunch of audio sources as children, the dialogue has its own UI and the scene loader has its own UI.

So what I did was, I **inject** all of them into any scene in the project when im playtesting in the editor and they get put under [DontDestroyOnLoad](https://docs.unity3d.com/ScriptReference/Object.DontDestroyOnLoad.html).

In the actual build, they all get dumped into a preload scene.

```csharp
    public static class Bootstrapper
    {
        private static readonly GameSystems GameSystems;
        
        static Bootstrapper()
        {
            ServiceLocator.Initialize();
            GameSystems = Resources.LoadAll<GameSystems>("").First();
        }
        
        
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        private static void Bootstrap()
        {
            SpawnPersistentSystems();
        }
        
        private static void SpawnPersistentSystems()
        {
            var list = GameSystems.prefabs;
            
            if (list.IsEmpty())
            {
                Debug.Log($"No game systems present");
                return;
            }
            
            var parent = new GameObject {
                name = "[GameSystems]"
            };

            list.ForEach(e => Object.Instantiate(e, parent.transform));
            Object.DontDestroyOnLoad(parent);
        }
    }
```
Aigh't that's all I wanna share for now :D
