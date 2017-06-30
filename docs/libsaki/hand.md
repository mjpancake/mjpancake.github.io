---
layout: page
title: Hand Status
permalink: /docs/libsaki/hand/
---

`Hand` consists of three parts: *closed*, *barks*, and *drawn*.
- *Closed* consists of 1, 4, 7, 10, or 13 tiles, representing the closed part of one's hand.
Its underlying data structure is a `TileCount`
- *Barks* consist of any number of chii, pon, daiminkan, ankan, and kakan. 
Its underlying data structure is a `std::vector<M37>`, where `M37` is an object for a bark. 
- *Drawn* can be zero or one of a single tile, implemented by a `T37`.

The class `Hand` have a bunch of `check` method, and some modifying method like `chii` and `pon`. 
Their meaning and usage are straightforward. 

The class `HandDream` represents a future state of a hand, which is mainly used by AI modules. 

(TODO)
