---
layout: page
title: Mahjong Tile
permalink: /docs/libsaki/tile/
---

## Notation

A mahjong tile is always called a *tile*. 
Terms like "card", "pai", or "hai" are not used here. 

The two properties of a tile are called *suit* and *value* separately. 
Terms like "color", "set", or "number" are not used here. 

We use the letter *M*, *P*, and *S* to denote the three *number* suits, 
and use the letter *F* and *Y* to denote the wind and the dragon suits. 
The honor suits can be summarized as a letter *Z*. 
In details, all the 34 tiles are denoted as follow:

- 1m, 2m, 3m, 4m, 5m, 6m, 7m, 8m, 9m
- 1p, 2p, 3p, 4p, 5p, 6p, 7p, 8p, 9p
- 1s, 2s, 3s, 4s, 5s, 6s, 7s, 8s, 9s
- 1f, 2f, 3f, 4f
- 1y, 2y, 3y

The four F tiles are east, south, west, and north in order;
and the three Y tiles are white, green, and red in order. 
Both the F and Y notation are only used in the program code. 
They should be converted into their corresponding characters when displayed to the UI. 

Besides, we use *0m*, *0p*, and *0s* to denote *akadora*, 
the red-5 bonus tiles. 
To facilitate the expression, we call a number-5 tile which is not an akadora as a *black 5*.
The term 5m, 5p, and 5s can mean either all the number 5 tiles or only the black 5's,
and the meaning depends on its context. 



## C++ Classes for Tiles

`tile.h` defines two classes，`T34` and `T37`。

Generally, there are 34 kinds of tiles;
and if we consider akadoras as distinct tiles, there are 37 kinds of tiles in total. 
Such is the difference between `T34` and `T37`, the latter strictly distinguishes red and black 5's.

The class `T34` is simply a wrapper of an `int`, with some helper member functions attached. 
The class `T37` inherits `T34`, with an additional `bool mAkadora` field to denote whether it is an akadora. 

### T34

The only member filed of `T34` is the `int mId34`, whose value varies between 0 and 33, corresponding to 1m, 2m, 3m, ..., 3y. To get the suit or the value of a tile, call the `suit()` or the `val()` method on a `T34` object: 

```
T34 tile(0); // "0" represents 1m
Suit s = tile.suit(); // now "s" equals to Suit::M
int v = tile.val(); // now "v" equals to 1
```

Besides directly passing the integer, we can also construct a tile by telling its suit and value:
```
T34 ta(26);
T34 tb(Suit::S, 9);
assert(ta == tb);
```

There are two constructors taking suit and value as parameters: the `T34(Suit s, val v)` and the `T34(val v, Suit s)`. The difference is that the latter is a `constexpr`, which also has an alternative syntax (implemented by C++11 user defined literals):

```
using namespace tiles34;
T34 ta = 3_p; // same as T34(3, Suit::P)
T34 tb = 2_y; // same as T34(2, Suit::Y)
```

For syntactical convenience, we can also use the no-parameter `T34()` to construct a tile containing uninitialized garbage value. Such an object only performs as a placeholder and any method invocation on a garbage tile object may trigger assertion failure. 

Now as we can construct tiles, let's look at how to use them. 

The most frequently called method might be `T34::id34()`, which simply returns the wrapped `mId34`:
```
T34 t = 3_m;
int ti = t.id34(); // now "ti" equals to 2
```
The underlying idea of representing tiles by integers is to use those integers directly as array indices to facilitate container operations. Since there are only 34 kinds of tiles, using more complex data structures, such as a tree, can be considered an over-design which costs too many unnecessary pointers. The continuous integer representation make it possible to access elements in a tile container with constant time and also allows iterating across the container. 
Within the project, we frequently use the name `ti` the denote such a tile index. 

Most methods of `T34` are trivial and have short definitions, so reading the code directly can be the fastest way to understand what they do. Here let's highlight some "weird" ones:

- The operator `%`: expression `t1 % t2` checks if `t2` is the dora indicated by `t1`. Here the `%` sign is used since the indicator-dora relation is circularly periodic, just like the mod operation. 
- The operator `|`: expression `t1 | t2` checks if the operands are neighbors, in order. 8m and 9m are neighbors. 9m and 1m are not neighbors. 9m and 1p are not neighbors. 
- The operator `||`: expression `t1 || t2` checks if the operands sandwich a common neighbor, in order, such as 7m and 9m
- The operator `^`: expression `t1 ^ t2` check if the operands are *suji(筋)* tiles, in order, such as 1s and 4s. The exclusive-or sign is used since two tiles having suji-relation are kind of exclusive. 

BTW, we always use the term *indicator* to mean the dora-indicator(ドラ表示牌). Since the word is long, it is usually abbreviated as *indic*, or sometimes even *id*. 

### T37 

`T37` is the tile class strictly distinguishes red and black tiles. 
`T37` publicly inherits `T34`, however, neither of them contains any virtual method, even the destructor. 
The idea under this design is to encourage passing `T34` as values without considering the cost: actually it's just an `int`. We never use a pointer or a reference to a `T34`. A `T34` object is treated immutable, as all of its member method (except assignment) is declared as `const`. The client code of `T34` should be aware of that `T34` is just an integer wrapper and contains no virtual table. Besides, although `T37` is-a `T34`, we don't expect any dynamic binding behavior since that really causes a lot of logical trouble: `T34` and `T37` should always be carefully compared and chosen before being used. 

The constructors of `T37` is similar to those `T34`'s, except that some of them may take an extra parameter to tell whether the tile should be an akadora. 

Here we have one important point to note: we don't have a `T37` constructor which receives a `T34` as parameter. This design is deliberately made: we need `T34` -> `T37` conversion to be inconvenient as this is really a dangerous operation in many cases: it causes a lot of logic bugs since you are blindly assuming that there is no akadora. Whenever a `T34` needs to be converted to a `T37`, think again, be sure of what you are doing, and use the `T37(t34.id34())` form. 

On the contrary, `T37` -> `T34` conversion is relatively safe, and we can just do that by the C++ object slicing. 

There is another important point: the `==` operator is not overridden, thus `0_m == 5_m` returns `true`.
To check equality with considering red/black difference, use `T37::looksSame()`

Unlike `T34`, `T37`'s are typically passed by reference. This convention aims to distinguish `T34` and `T37` more explicitly (for human code readers) and has nothing to do with the machine efficiency. 

