+++
author = "Josh"
title = "My First Unity Project"
date = "2022-04-20"
description = "Gamedev yaaaay"
toc = true
tags = [
    "development",
    "unity"
]
categories = [
    "programming"
]
image = "thumb.jpg"
+++
<!--more-->

## Intro

So, it wasn't my **first** Unity project but it was my first one for University. I had a ton of fun making it. 
We were restricted to Unity but if I could I would have probably used Godot. 
It's one part of a three part project so I'll continue to add updates. Its meant to be an Endless Runner type game.
I'll be able to make the repository public once the project is complete.

You can try the WebGL build here. I would suggest using a chromium browser to run it. 

**https://macawls.dev/Endless-Runner-Unity/**

## Development
I remember a while back I had issues with vscode and Unity on linux. The experience just wasn't polished. Dotnet is okay-ish on linux. I usually use Microsoft's [bash](https://dot.net/v1/dotnet-install.sh) script to install it.  

It didn't really feel like Unity and vscode were communicating properly. Sometimes when I switched back to the editor and my project wouldn't recompile. Getting intellisense for Unity in vscode is also a hassle. Had to go back to Windows unfortunately. I couldn't afford to run into any issues, rather not take the chance for University.

I tried Rider for the first time and **HOLY**. It was great. Really loved it. No issues, no hassle. I managed to get it for free through Github's Student Pack so I didn't have to pay a dime. Definitely the best IDE for Unity, hands down. 


## Learning
So I learnt a bunch of stuff in C# and understanding how Unity works. 
So, most scripts you have will inherit from MonoBehaviour, which adds functionality to controlling how things behave in the scene. So most commonly you'll have event functions like 

```csharp
Awake()  // once on initialisation, references to components here 
Start()  // kind of the same thing as awake but not really, only ever called once
Update() // every frame
```
Game Objects sort of have a life-cycle and functions are called in this [order](https://docs.unity3d.com/Manual/ExecutionOrder.html).

### Problem
You gotta be smart about doing things willy nilly, else you'll run into performance issues pretty quickly. 

So, I had an object spawner script on every 'tile' that was being made in the scene. It made sense to me to have every tile deal with spawning objects on itself so that the objects would be children of that tile. If the objects were children, it meant that when the tile was deleted, the children would die with it, so I wouldn't have to deal with deleting objects.

Problem was, there were around 15 tiles at every given time in the game to make it "endless". Now, having 15 tiles each have references to the objects that need to be spawned and have **that object** be deleted and instantiated every x seconds absolutely tanked performance. Keep in mind this script contained the logic for randomly spawning objects as well.

I dropped from 300 fps to around 70/90 fps.

I can't explain why this was happening from a technical standpoint because frankly I don't and I was learning. 
My guess is it was an issue with garbage collection, memory and just so many references all over the place.

I fixed it by having a **single** object spawner script and my fps went back to around 270 fps. This time, the objects weren't the children of the tile. 

#### Object Spawner script 
```csharp
private void Start()
{
    InvokeRepeating(nameof(SpawnObjectsInRandomLane), GameManager.Instance.PathManager.startTime, GameManager.Instance.PathManager.timeToDestroy);
}
    
private void SpawnRandomObject(float xPosition, bool spawnPickUp)
{
    // zPos changes after every invoke repeating call(in Path Manager)
    var zPos = GameManager.Instance.PathManager.ZTilePos;
    var obstacle = ReturnRandomObstacle();
            
    // For now, the spawn height is zero because when obstacles are made in blender the origin is set to the bottom of the object
    //var spawnHeight = obstacle.GetComponent<MeshFilter>().sharedMesh.bounds.extents.y;
            
    Instantiate(obstacle, new Vector3(xPosition, 0, zPos), Quaternion.identity);

    // PickUps are spawned above the obstacle
    if (spawnPickUp)
        Instantiate(ReturnRandomPickUp(), new Vector3(xPosition, pickUpSpawnHeight, zPos), Quaternion.identity);
}
```

In line 9, getting the zPos from PathManager is pretty ugly to be honest but it sufficed for the prototype.

PathManager and Obstacle Spawner had the exact same InvokeRepating call in Start(), I wanted to "sync" them, thats why I passed in those values but eish. It is very ugly. 

![](bugs.jpg)

### New Stuff I learnt in C#
Okay so mainly two things, **Singletons** and **Delegates**.

#### Singletons
Singletons are cool. How they work is you can only have once instance of that class at any time and because of DontDestroyOnLoad(), it persists between scenes.

This is my GameManager script. 

```csharp
private void Awake()
{
    if (Instance != null && Instance != this)
        Destroy(this);
    Instance = this;
    DontDestroyOnLoad(gameObject);
        
    Controls = GetComponentInChildren<Controls>();
    PlayerCooldowns = GetComponentInChildren<PlayerCooldowns>();
    PathManager = GetComponentInChildren<PathManager>();
    PlayerInfo = GetComponentInChildren<PlayerInfo>();
    ObstacleSpawner = GetComponentInChildren<ObstacleSpawner>();
}
```

Now, I went kind crazy with it here because of all the components attached. Which is definitely gonna give me a headache later.
On the one hand, its really easy to grab anything you want like this because its global. 

```csharp
 GameManager.Instance.<blah blah blah>
```
But it's really going to get messy later. To restart the game, I had to destroy it in addition to loading the scene.

#### Delegates
OKAY THIS. This shit is the holy grail of game dev. It took a while to wrap my head around events, but once it clicked, it just unlocked so many more possibilities. 

![](doorbell.jpg)

```csharp
private void Awake()
{
    if (Instance != null && Instance != this)
        Destroy(this);
    Instance = this;
    DontDestroyOnLoad(gameObject);
}

public void PlayerDeath() => OnPlayerDeath?.Invoke();
public void GameStart() => OnGameStart?.Invoke();
public void GamePause() => OnGamePause?.Invoke();
public void ResumeGame() => OnGameResume?.Invoke();
public void GameRestart() => OnGameRestart?.Invoke();
```

So how it works is, I have an EventsManager singleton. When I invoke an event by saying, 
```chsarp
    Events.Manager.Instance.PlayerDeath()
```

Methods in other classes that are assigned to that event, will run. Which just decouples everything. Its soo gooood. Really glad I have a basic understanding of it now.

### Thoughts on Unity
Unity makes getting a game done fairly easy because there's a plethora of resources online.
Although, there's a big difference between being in tutorial hell and actually understanding how to design and make a game, especially a **good** one. 

Game dev is pretty damn difficult. I was feeling insanely burnt out but it was fun regardless.

All the objects for the game were made in Blender, except the character which I got from here 

{{< youtube jKErxSUx54Q >}} 