+++
author = "Josh"
title = "Minimax Algorithm Adventures, FP and OOP (post in progress)"
date = "2023-04-15"
description = "dev stuff 🦆"
tags = [
    "learning",
    "development"
]
categories = [
    "Educational"
]
image = "thumb.png"
+++
<!--more-->

## Functional and Object-Oriented Programming

I took a massive break from touching the Unity Engine and I recently got back into using it.
In general, even if I'm not actively working on any project, I like to keep learning so I'm always consuming a bunch of tech/programming content.

<p align="center">
  <img src="ducko.png" alt="" width="300px"/>
</p>
I saw that many people had criticisms about OOP and I was unable to grasp them immediately. Stuff like

* Very strong adverse opinions on inheritance
* Memory and performance overhead
* Premature abstraction approaches
* Mutability being public enemy #1



\
**That bugged me 😒💢**
\
\
Why couldn't I understand them? My guess was:

* I didn't have enough experience with other programming paradigms
* I needed more experience solving problems in different ways
* I needed to explore using more languages

On the last point about using other languages, I only have experience in JS, Python and C#, with most of my experience being in C#. None of these languages sort of *force* you or *lean* more towards a specific paradigm, at least not like idiomatic, functional languages like F# or Rust for example.


C# is my bae 😍. Microsoft added more functional type of features of the years, we're currently at C# 11. 
* C# 3.0 lambda expressions/anonymous funcs/delegates
* C# 3.5 extension methods
* C# 6.0 pattern matching
* C# 7.0 tuples, local funcs

So naturally, I found myself going down the rabbit hole of understanding FP. 

<p align="center">
  <img src="https://i.imgur.com/mGzGS9G.jpg" alt="" width=""/>
</p>

### Whats the difference? 
Most university courses on programming will teach you OOP. The reason is that it's a very popular paradigm and it's been around for a long time, around since the 70s. C++ and Java really popularized it.

Design patterns are pretty much the backbone of OOP.

My favourites are
* Strategy - Absolutely goated 🐐👑
* Observer - coupling
* State - behavior
* Builder - intuitive as fuck
* Command - abstraction

I mostly do gamedev, so I suppose thats why these are my favourites.

<p align="center">
  <img src="cat.jpg" alt="" width="350px"/>
</p>

Once, I started to learn about FP, I realized that it's a completely different way of thinking about programming. It's not just a different way of writing code, it's a different way approaching a problem.

### TicTacToe w/Minimax Algo and what I've learned with FP

It was so refreshing to take a break from using Unity 🤗

![Tic Tac Toe Console App (Click to expand)](tttconsole.PNG)

Unity primarily uses a component-based architecture, so different components attached onto game-objects would allow for functionality, thats the gist of it. It was so nice to retreat back into fundamentals. With console applications its so beautiful. Data actually flows *down(dependency inversion)* and not all over the place at runtime with messages.

```csharp
var config = new Configuration();
var board = new Board();

var players = new Players
{
    First = new ("One", TileType.X, new MinimaxStrategy(true)), 
    Second = new ("Two", TileType.O, new PromptStrategy(config))
};

var game = new Game(board, players, config);
var view = new View(game);

view.Enable();
game.Run();

AppDomain.CurrentDomain.ProcessExit += (_, _) =>
{
    view.Disable();
};
```

In this case, I wanted to explore FP and pretty much would use structs all over the place. I wanted to see how far I could go with it. I ended up with a pretty clean solution with a mix of OOP and FP.

The main objects, the **game** and **map** needs to be mutated. It only made sense to me. So for the general architecture, game emitted events that the view would listen to.

#### Game Loop
```csharp
public void Run()
{
    Begin?.Invoke(Players);

    while (GameStatus.State == GameState.InProgress)
    {
        foreach (var player in Players)
        {
            GameStatus = PlayTurn(player);

            if (GameStatus.State == GameState.InProgress) continue;
            End?.Invoke(GameStatus.State, GameStatus.Winner);
            break;
        }
        
        if (GameStatus.State == GameState.InProgress)
        {
            RoundEnd?.Invoke(Players, CurrentRound);
        }
    }
}
```
#### Handling Turns
```csharp
private GameStatus PlayTurn(Player player)
{
    bool success;
    do
    { 
        TurnBegin?.Invoke(player, CurrentTurn);
        var desiredPosition = player.Strategy.GetMove(Board);
        Board.Update(desiredPosition, player.TileType, out success);

        if (success)
        {
            _mTurnHistory.Push(new Turn
            {
                Player = player,
                TurnNumber = CurrentTurn,
                PlayPosition = desiredPosition
            });
            
            continue;
        }

        InvalidInput?.Invoke(player);
        
    } while (!success);
    
    TurnComplete?.Invoke(player, CurrentTurn);
    CurrentTurn += 1;
    
    if (Board.Tiles.CheckWinner(player.TileType))
    {
        return GameStatus.Victor(player);
    }
    
    return Board.Tiles.IsDraw() ? GameStatus.Draw : GameStatus.InProgress;
}
```
#### Representing The Game Status

```csharp
public readonly struct GameStatus
{ 
    public GameState State { get; private init; }
    public Option<Player> Winner { get; private init; }
    public static GameStatus InProgress => new()
    {
        State = GameState.InProgress,
        Winner = Option<Player>.None
    };
    public static GameStatus Draw => new()
    {
        State = GameState.Draw,
        Winner = Option<Player>.None
    };
    
    public static GameStatus Victor(Player player) => new()
    {
        State = GameState.Winner,
        Winner = Option<Player>.Some(player)
    };
}
```
I completely avoided nulls and used ```Option<T>``` instead, which is a type that can either be ```Some(T)``` or ```None```. It's a very elegant way of handling values that may or may not be there since putting it behind a facade forces you to handle them.



#### Extensibility
Using the strategy pattern, it was pretty easy to add different ways of playing the game. Currently, there's only Random, Minimax, and Prompt.

```csharp
public interface IPlayerStrategy
{
    string DisplayName { get; }
    string Description { get; }
    (int x, int y) GetMove(Board board);
}
```

With mainly using structs, I went absolutely ham with extension methods. I realized its so much easier to compose functions together. To add functionality, I didn't have to go to the definition of the actual type and create an instance method. I could just add a shiton of extensions which is beautiful because those methods have no way of mutating the state in an unpredictable way and its also intuitive with dot syntax.

For example,

```csharp
public static Players SwitchPlayOrder(this Players players)
{
    foreach (var player in players)
    {
        if (player.Strategy is MinimaxStrategy miniMax)
        {
            player.UpdateStrategy(miniMax.SwitchMaximizer());
        }
    }
    
    players.First.UpdateTileType(players.First.TileType.GetOpposite());
    players.Second.UpdateTileType(players.Second.TileType.GetOpposite());

    return new Players
    {
        First = players.Second,
        Second = players.First
    };
}
```

