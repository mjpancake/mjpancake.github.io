---
layout: page
title: Libsaki Tutorial
permalink: /docs/libsaki/
---

## General

These pages introduce the code details
of the Pancake Mahjong core library, *Libsaki*.

*Please carefully check through the [coding convention](/docs/cpp/)
before taking any change to the code.* 

This library is written in plain C++ without any third party library. 
All the files are located in the root folder.

## Layering

The design of Libsaki is based on a layered approach.

| Level | Layer Name                      |
| :---: | :-----------------------------: |
| 7     | Application Layer               |
| 6     | Operation and Observation Layer |
| 5     | Skill Interfering Layer         |
| 4     | Standard Mahjong Layer          |
| 3     | Main Entity Layer               |
| 2     | Abstract Container Layer        |
| 1     | Base Unit Layer                 |

<br />
Detailed documentation for each layer in a bottom-up order:

1. Base Unit Layer
  - [Mahjong Tiles `T34` and `T37`](/docs/libsaki/tile/)
  - [Player Identities `Who`](/docs/libsaki/who/)

2. Abstract Container Layer
  - [Multiset for Tiles `TileCount`](/docs/libsaki/tilecount/)

3. Main Entity Layer
  - [Status of One's Hand `Hand`](/docs/libsaki/hand/)
  - [The Mountain System `Mount`](/docs/libsaki/mount/)

4. Standard Mahjong Layer
  - [Main Mahjong Logic `Table`](/docs/libsaki/table/)

5. Skill Interfering Layer
  - [Character Skills `Girl`](/docs/libsaki/girl/)
  - [Tile Dealing System `Princess`](/docs/libsaki/princess/)

6. Operation and Observation Layer
  - (TODO)

7. Application Layer
  - (TODO)

