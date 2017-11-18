---
layout: page
title: Pancake C++ Style Guide
permalink: /docs/cpp/
---

© 2017 Rolevax, All Rights Reserved.

All participants of `libsaki` and/or `mjpancake`
are expected to check through all the rules in this guide carefully.
Some of these rules are uncommon.

You can reference to `libsaki` for an example
whenever you find a rule hard to understand.

## Meta

- [MT-1] This guide is basically a strict constraint. 
  However, in rare cases,
  the rules can be partially broken when styling become weird under such rules. 
- [MT-2] This guide only regulates newly added code.
  Old code can be re-formatted when convenient.
- [MT-3] This guide may be updated with a notification in the Gitter room. 
  All the new rules take effect immediately as the page is uploaded. 
- [MT-4] Fallback to [Google's version](https://google.github.io/styleguide/cppguide.html)
  whenever this guide does not give an explicit constraint.

## General

- [GN-1] Zero-warning is required under debug build.
  - Unused variable warnings are allowed under release build
  - Warnings caused by compiler's bugs are allowed under any build mode
    (such as [this one](http://stackoverflow.com/a/33306000))
- [GN-2] Basically high level readability and development efficiency
  is considered more important, 
  and low level optimizations should only be taken to critical performance problems. 

## Comments

- {CM-1] Avoid commenting, by making the code self-explainatory.
- [CM-2] Always mark ends of include guards and namespaces with comments.
- [CM-3] Use only `//` comments in committed code. `/* */` is reserved for debugging. 
- [CM-4] Do not delete code by commenting-out, and just erase them instead.

## Naming

- [NM-1] Base naming on English. 
         Mahjong terminologies, character names, and school names
         can be represented by Japanese Romaji. 
         Terminologies related to the Chinese GB Mahjong
         can be represented by Pinyin. 
- [NM-2] Use `UpperCamelCase` for class, struct, union, and enum type names. 
- [NM-3] Use `lowerCamelCase` for function and variable names. 
- [NM-4] Start non-public class member variables with `m`.
- [NM-5] Treat all-capital words as ordinary words in camel cases. 
  - Bad: `HTTP`
  - Good: `Http` (upper camel), `http` (lower camel)
- [NM-6] Use lower cases and digits within 7 characters for namespace names.
- [NM-7] Use capitals and underscores for enum values and constants.
- [NM-8] Shorter names and common abbreviations are approved. 
- [NM-9] Callback function naming:
  - Before something happen: `onDoSomething`;
  - After something happen: `onSomethingDone`
- [NM-10] Use only lower cases, `_`, and `.` for filenames. 
- [NM-11] File extension: header: `.h`, source: `.cpp`
- [NM-12] Nature of English can be sacrificed to beautify the alignment

```
// bad
quick_brown_fox.h
slow_white_fox.h

// good
fox_quick_brown.h
fox_slow_white.h
```

## Spacing, Indentation, and Line Break

- [SP-1] Use 4 spaces for indentation, no tabs. 
- [SP-2] Keep a space between a keyword and a `(`.
- [SP-3] Keep no space between a function identifier and a `(`.
- [SP-4] Keep a space between a token and a `{`.
- [SP-5] Surround most binary operators with spaces
  - Except `::`, `.`, `->`, `.*`, `->*`, `()`, `[]`, `(cast)`
- [SP-6] Stick Unary operators to their operands without spaces
  - Unless in some idioms like `while (i --> 0)`
- [SP-7] Stick Semicolons to the end of statement without spaces. 
- [SP-8] Keep space-paddings inside a pair of `{` and `}` that are in the same line.
- [SP-9] Append either a space or a line break after commas.
- [SP-10] Break, if necessary, a binary expression into two lines before the operator.
- [SP-11] Keep the `{` at the same line of `if`, `while`, `for`, `do while`,
  or lambda's capture and parameters.
- [SP-12] To break or not to break:
  - Break:`class\n{`, `struct\n{`, `union\n{`, `enum\n{`, `namespace\n{`, `void f()\n{`
  - No break: `if {`, `while {`, `for {`, `do {`, `[]() {`
- [SP-13] Append three empty lines after the `#include` preamble block. 
- [SP-14] Append three empty lines to the last non-empty line of the file.
- [SP-15] Keep all things three empty lines away from the beginning and ending of a namespace.
- [SP-16] Eliminate empty lines before a closing `}` that does not belong to a namespace.
- [SP-17] Append a space to a line whose only non-space character is a `}`
          unless the line is the last line in a block.

## Memory Management

- [MM-1] Memory management should be generally based on RAII. 
- [MM-2] Use a pointer only if a reference cannot be used instead.
- [MM-3] Always use a `std::unique_ptr` when a pointer takes the ownership.
- [MM-4] Re-design the code such that bare `delete` or `delete[]` is never needed. 
- [MM-5] Do not use non-const static class members.
- [MM-6] Do not use non-const static variable storage.

## Abandoned C++ features

- [AB-1] No RTTI
- [AB-2] No user defined exception
- [AB-3] No `goto`
- [AB-4] No `std::shared_ptr`
- [AB-5] No C++14 or C++17 (for portability)

## Container Preferences

- [CP-1] Use arrays and array-likes for small data regardless of big-O.
  - Less than 1KiB is considered small.
  - Use `std::array` for fix length arrays.
  - Use `saki::util::Stactor` for variable length arrays.
  - Do not use Raw C-style arrays.
- [CP-2] Linear search is preferred over binary search on small arrays.
- [CP-3] Functional map/fold style is preferred over `for` loops.

## Class Definition Formatting

- [CL-1] Mark overloading functions with the `overload` keyword.
- [CL-2] Omit `virtual` in overloading functions.
- [CL-3] Constructors taking one or more arguments should be prefixed by `explicit`
  unless they are meant to be non-explicit.
- [CL-4] Prefer `= delete` over hiding by making `private`.
- [CL-5] Place all member functions above all non-static member fields.
- [CL-6] Order member functions by `public`->`protected`->`private` order.
- [CL-7] Order non-static member fields by `public`->`protected`->`private` order.

## Statement Formatting

- [SM-1] Do not squash multiple statements into one line.
- [SM-2] Declare one variable with one declaration statement.
  - Unless in some common idioms like `int i, j, k`
- [SM-3] Stick `*` and `&` to variables but not types.
  - Bad: `int* p`
  - Good: `int *p`
- [SM-4] Use brackets in the body of `if`, `for`, and `while`
  if (but not only if) at least one of the following conditions are satisfied:
  1. The condition expression takes more than one line;
  2. The statement body has more than one statement;
  3. The statement body is one `if`, `for`, or `while` block with
     a bracketed body.
- [SM-5] Use brackets for all bodies in an `if...else if...else` block 
  as long as one of its body should be bracketed according to SM-4. 
- [SM-6] Do not use brackets in the body of `if`, `for`, and `while`
  if no bracket is required according to SM-4 and SM-5.
- [SM-7] When there is a `break`, `continue`, or `return` in the end of an `if` body, 
  the else-case is usually typed outside without being in an `else` block, 
  unless adding an `else` can make the whole block align better. 
- [SM-8] A fall-through in a `switch` statement
  should be commented by an `// fall through` exactly.
  - a group of adjacent labels in a `switch` statement is not addressed as a fall-through.
- [SM-9] A typical integer `for` condition should look like
  `(int i = 0; i < N; i++)`  (use `<` and postfix `++`)
- [SM-10] A typical iterator `for` condition should look like
  `(auto it = v.begin(); it != v.end(); ++it)`
  (use `auto`, `!=`, and prefix `++`)
- [SM-11] Avoid long (more than one page) function definition
          and/or deep indentation level.
- [SM-12] Prefer `using` over `typedef`.

## Expression Formatting

- [EX-1] Always use `nullptr` for null pointers. Do not use `NULL` or `0`.
- [EX-2] Use `ptr != nullptr` or `ptr == nullptr` to check pointers' nullity.
  Do not use `ptr` or `!ptr`.
- [EX-3] Use `i != 0` or `i == 0` to check zero integers. Do not use `i` or `!i`.
- [EX-4] Directly use `b` or `!b` to check boolean conditions.
  Do not use `b == true` or `b == false`.
- [EX-5] Do not use Yoda conditions. 
- [EX-6] Do not rely on the precedence between `&&` and `||`
  - Bad: `a && b || c`
  - Good: `(a && b) || c`
- [EX-7] Do not rely on the precedence between bitwise operators and always use parenthesises.


## Other

- [OT-1] Do not use any non-ASCII character, even in string literals and comments.
- [OT-2] Wrap lines to 110 characters. Less than 80 is better.



