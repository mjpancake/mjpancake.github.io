---
layout: page
title: "The Multiset for Tiles: TileCount"
permalink: /docs/libsaki/tilecount/
---

`tilecount.h` and `tilecount.cpp` defines the `TileCount` class. 
This class is basically an array of 34 `int`s, recording number of tiles of each id34.
The array member is simply named as `c`, means counting. 
In addition to `c`, there is another array of 3 `int`s called `mAka5s`, which records number of akadora of M, P, and S respectively. (Thus `mAka5s[static_cast<int>(Suit::M)]` gets the number of 0m in this set)

To clarify, `c` records both black and red tiles for number-5's. Therefore `c[4]` will never be less than `mAka5s[0]`, `c[13]` will never be less than `mAka5s[1]`, and `c[22]` will never be less than `mAka5s[2]`.

The element values of `c` and `mAka5s` typically range in 0 ~ 4. Although using a `char` type for array elements (or some super crazy bit masks) may save a lot of memory space, we are too lazy to change unless there occurs a super big difference shown by some scientific benchmark test. 

## Constructors

| Prototype                          | Explanation                                             |
| :--------------------------------- | :------------------------------------------------------ |
| `TileCount()`                      | An empty set with no tile                               |
| `TileCount(AkadoraCount)`          | A set of 136 tiles with specified akadora configuration |
| `TileCount(std::initializer_list)` | A set of specified tiles                                |
| `TileCount(std::vector)`           | A set of specified tiles                                |

## Counting and Modifying

The `ct(T34)`, `ct(const T37&)` methods return the number of specified tiles in the set. 
Other methods prefixed by `ct` is also pretty trivial. 
The `ct(T34)` summarizes black and red number-5 tiles and `ct(const T37 &)` strictly
distinguishes them. 
For example, if there are 055p in the set, `ct(T34(Suit::P, 5))` returns 3
and `ct(T37(Suit::P, 5))` returns 2. 

The `inc(const T37 &t, int delta)` method puts or removes tiles from the set. 
A positive `delta` increases the number of `t`, and a negative `delta` decreases it. 
Note that there is no `inc(T34 t, int delta)` because `T34` represents only "logical"
tiles but not a puttable/removable tile entity. We must explicitly distinguish black/red
number-5 tiles when we transfer them from or to a set. 

## Step Calculation

Within the project, we use the term *step* to mean *shanten-number*. 
We have separated method to calculate different types of steps.

| Prototype            | Explanation |
| :------------------- | :---------- |
| `step4(int barkCt)`  | 4-melds shanten number with specified bark count |
| `step7()`            | 7-pairs shanten number |
| `step13()`           | 13-orphans shanten number |
| `step(int barkCt)`   | min(step4, step7, step13) |
| `step7Gb()`          | 7-pairs shanten number allowing duplicate pairs |
| `stepGb(int barkCt)` | min(step4, step7Gb, step13) |

Within this project, we use the term *bark* to mean a meld call (chii, pon, daiminkan, ankan, kakan), 
and the word "call" is avoided since it confuses as it can also mean a function call.  

Those step-methods can return 0 to mean formal ready hands or -1 to mean formal winning hands. 

(TODO)

[<< Back to Home](https://github.com/mjpancake/libsaki/wiki/Home)
