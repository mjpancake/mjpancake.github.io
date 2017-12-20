---
layout: page
title: Libsaki Tutorial
permalink: /en/docs/libsaki/
---

## General

These pages introduce the code details
of the Pancake Mahjong core library, *Libsaki*.

*Please carefully check through the [Pancake C++ Style Guide](/docs/cpp/)
before taking any change to the code.* 

This library is written in plain C++ without any third party library. 

## Layering

The architecture of Libsaki is based on a layered approach.

| Level | Layer Name                      | Related Directory |
| :---: | :-----------------------------: | :---------------: |
| 6     | Application Layer               | `/app`            |
| 5     | Operation and Observation Layer | `/table`          |
| 4     | Skill Interfering Layer         | `/girl`           |
| 3     | Standard Mahjong Layer          | `/table`          |
| 2     | Hand/Form Layer                 | `/form`           |
| 1     | Base Unit Layer                 | `/unit`           |

<br />

It is recommended to read the following detailed documents
**together with their correspending source code**.
(We don't use doxygen since it is painful
 to rebuild a C++ project due to every comment change)

1. Base Unit Layer
  - [Mahjong Tiles `T34` and `T37`](/docs/libsaki/tile/)
  - [Player Identities `Who`](/docs/libsaki/who/)

2. Hand/Form Layer
  - [Multiset for Tiles `TileCount`](/docs/libsaki/tilecount/)
  - [Status of One's Hand `Hand`](/docs/libsaki/hand/)
  - [The Mountain System `Mount`](/docs/libsaki/mount/)

3. Standard Mahjong Layer
  - [Main Mahjong Logic `Table`](/docs/libsaki/table/)

4. Skill Interfering Layer
  - [Character Skills `Girl`](/docs/libsaki/girl/)
  - [Tile Dealing System `Princess`](/docs/libsaki/princess/)

5. Operation and Observation Layer
  - (TODO)

6. Application Layer
  - (TODO)

