---
layout: page
title: Pancake QML Style Guide
permalink: /docs/qml/
---

© 2017 Rolevax, All Rights Reserved.

All participants of `mjpancake`
are expected to check through all the rules in this guide carefully.
Some of these rules are uncommon.

## Meta

- [MT-1] This guide is basically a strict constraint. 
  However, in rare cases,
  the rules can be partially broken when styling become weird under such rules. 
- [MT-2] This guide only regulates newly added code.
  Old code can be re-formatted when convenient.
- [MT-3] This guide may be updated with a notification in the Gitter room. 
  All the new rules take effect immediately as the page is uploaded. 
  whenever this guide does not give an explicit constraint.

## General

- [GN-1] Zero-warning is required.
- [GN-2] Basically high level readability and development efficiency
  is considered more important, 
  and low level optimizations should only be taken to critical performance problems. 

## Comments

- {CM-1] Avoid commenting, by making the code self-explainatory.
- [CM-2] Use only `//` comments in committed code. `/* */` is reserved for debugging. 
- [CM-3] Do not delete code by commenting-out, and just erase them instead.

## Naming

- [NM-1] Base naming on English. 
         Mahjong terminologies, character names, and school names
         can be represented by Japanese Romaji. 
         Terminologies related to the Chinese GB Mahjong
         can be represented by Pinyin. 
- [NM-2] Use camel cases basically and follow the common QML practice.
- [NM-3] Start "internal" function and property names with a `_`
- [NM-4] Treat all-capital words as ordinary words in camel cases. 
  - Bad: `HTTP`
  - Good: `Http` (upper camel), `http` (lower camel)
- [NM-5] Shorter names and common abbreviations are approved. 
- [NM-6] Nature of English can be sacrificed to beautify the alignment

```
// bad
QuickBrownFox.qml
SlowWhiteFox.qml

// good
FoxQuickBrown.qml
FoxSlowWhite.qml
```

## Spacing, Indentation, and Line Break

- [SP-1] Use 4 spaces for indentation, no tabs. 
- [SP-2] Keep a space between a keyword (except `function`) and a `(`.
- [SP-3] Keep no space between a function identifier
         (or the keyword `function`) and a `(`.
- [SP-4] Keep a space between a token and a `{`.
- [SP-5] Surround most binary operators with spaces
  - Except `.`, `()`, `[]`
- [SP-6] Stick Unary operators to their operands without spaces
  - Unless in some idioms like `while (i --> 0)`
- [SP-7] Add Semicolons to the end of single Javascript statements. 
- [SP-8] Keep space-paddings inside a pair of `{` and `}` that are in the same line.
- [SP-9] Append either a space or a line break after commas.
- [SP-10] Break, if necessary, a binary expression into two lines after the operator.
- [SP-11] Do not add linebreaks before `{`.

## Item Definition Formatting

- [CL-1] Put `id` (if any) at the first line inside a bracket.

## Statement Formatting

- [SM-1] Do not squash multiple statements into one line.
- [SM-2] When there is a `break`, `continue`, or `return` in the end of an `if` body, 
  the else-case is usually typed outside without being in an `else` block, 
  unless adding an `else` can make the whole block align better. 
- [SM-3] A fall-through in a `switch` statement
  should be commented by an `// fall through` exactly.
  - a group of adjacent labels in a `switch` statement is not addressed as a fall-through.
- [SM-4] Avoid long (more than one page) function definition
          and/or deep indentation level.

## Expression Formatting

- [EX-1] Avoid Javascript's WTF features.
- [EX-2] Do not use Yoda conditions. 
- [EX-3] Do not rely on the precedence between `&&` and `||`
  - Bad: `a && b || c`
  - Good: `(a && b) || c`


## Other

- [OT-1] Wrap lines to 110 characters. Less than 80 is better.



