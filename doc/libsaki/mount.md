---
layout: page
title: The Dual-Space Quantum Mountain System
permalink: /docs/libsaki/mount/
---

The mounntain system can be regarded as the core part of an unscientific mahjong game.
Currently, in v0.8.3, we use the one called *Dual-Space Quantum Mountain System (DSQMS)*,
whose key feature is a binarily divided tile source space where each space is polarized before generating a tile
according to a distortable probability distribution. 

The DSQMS consists of three parts: the existence mechanism, the dual-space mechanism, 
and the early collapse mechanism. 

## Terminologies

- Mountain: the walls of tiles on the table
- Scientific: without characters' skills
- Magical: with characters' skills

## The Existence Mechanism

In a scientific case, the probability of drawing a tile depends on its residual in the maintain. 
The effect of a magical skill can be regarded as a distortion to the scientific probability distribution.
We treat the mountain basically as a queue of objects of probability distributions, 
thus each tile-drawing becomes a queue pop plus a random number generation. 

To facilitate the implementation, we use integer values to analogize the probability values. 
Such integer numbers are called *existence* of tiles. 
Basically, a bigger existence yields a bigger probability, 
and a negative existence means that the tile cannot be drawn.
Most of the skills are implemented by an addition or subtraction operation to the
existence values such that the effects from different skills can be implied as
a simple linear addition of those existence changes. 

Existence values have the following characteristics:

- Existence values are bound to a kind of tile, which is independent from the picker of the tile;
- Every kind of tile has 10 of existence in a scientific condition.

In details, existence works as follow:

1. Divide all remaining tiles into *pos* and *neg* according to the sign of their existence;
2. If pos is empty, pop the tile in neg having maximal existence；
3. Otherwise, randomly pop in pos, with a probability distribution described by the existence distribution.

Therefore, "relative" skills that collects some tiles mildly
can be implemented by adding existence to those collection tile;
and "absolute" skills that prevent other player from gaining some tiles
can be implemented by subtracting existence from those protected tiles. 

In both addition and subtraction, a greater change to the existence yields a greater effect,
thus we define "power" of a skill as the magnitude of the change of the existence caused by that skill.
We use *millikoromo (mk)* as the unit of skill power, and then the unit of existence is also mk. 

### Example

Suppose we have this mountain status:

| Tile | Count | Existence |
| --- | --- | --- |
| 7p | 2 | 20mk |
| 8p | 3 | 30mk |
| 9p | 2 | 20mk |


In a scientific case, the probablity of drawing a 8p is 3/7,
computed from "30mk / (20mk + 30mk + 20mk)".

Now a skill adds 100mk to 8p, thus the mountain status becomes:

| Tile | Count | Existence |
| --- | --- | --- |
| 7p | 2 | 20mk |
| 8p | 3 | 130mk |
| 9p | 2 | 20mk |

Then the probablity of drawing a 8p is 13/17,
computed from "130mk / (20mk + 130mk + 20mk)".

In another case, if a skill subtracted 100mk from 8p, the maintain will become:

| Tile | Count | Existence |
| --- | --- | --- |
| 7p | 2 | 20mk |
| 8p | 3 | -70mk |
| 9p | 2 | 20mk |

And now the probability of drawing 8p is zero since its existence is negative;
and both the probability of 7p and 9p become 1/2 as they have same existence.

See `mount.cpp:popPolar()` for more details. 

## Dual-Space mechanism

To facilitate the expression, we divide skills into two categories:
*local skills* and *global skills*.
Local skills are context independent, and immediately terminates
after taking effect at one time point. 
Global skills highly relies on the state of the mountain,
and its possibility of success depends on whether some preparation
is well-done before some critical time point. 

The existence mechanism introduced above can handle all local skills,
but as it is not considering residual of tiles in the mountain, 
it cannot handle global skills.
To implement global skills, we use the *dual-space* mechanism.

Under the dual-space mechanism, the mountain is divided into two spaces:
the normal space (A space) and the protected space (B space).

When no skill affects the mountain, all the tiles are in the A space,
and each kind of tile in the A space has an existence of "remaining number * 10mk",
For example, if there are three 7p in the mountain, without any skill,
all the three 7p are in the A space, and the existence of 7p in A space is 30mk.

Global skills can *load* tiles from space A to space B.
This is just like investing money into a fund, and those money is kind of unspendable.
Without skills, nobody can draw tiles from the B space, 
and whenever someone want to withdraw B space tiles,
she can add existence value to that kind of tile in the B space.

Before every tile-drawing, the sum of existence of the two spaces
are calculated separately, and one space is randomly chosen by the ratio of
the two sums. Afterwards, the chosen space works under the existence mechanism
and a tile will be randomly popped. 

Two things are achieved by the dual-space mechanism:
1. Some skills can preserve some tiles for future use ahead of time;
2. Those tile-preserving skills can still compete in a same space
thus no absolute precedence needs to be defined explicitly.

See `mount.cpp:popDistro(Distro &distroA, Distro &distroB)` for more details.

## Early Collapse Mechanism

The early collapse mechanism implements the *law of mountain invariance*
It simply fix a tile on a position in the maintain
to make it escape from all the probability rules.

"Collapse" means the tile is never in a superpositional quantum state
but collapsed into a unchangeable fact.
In the code, we use the object *Erwin*
to denote an uncertain tile since it is kind of like an Erwin Schrodinger's cat.

See `mount.cpp:popFrom()` for more details.





