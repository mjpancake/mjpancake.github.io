---
layout: page
title: Pancake C++ Style Guide
permalink: /docs/cpp/
---

© 2017 Rolevax, All Rights Reserved.

All participants of `libsaki` and/or `mjpancake`
are expected to check through all the rules in this guide carefully.
Some of these rules are common and trivial, *yet some are not*.

You can reference to `libsaki` for an example
whenever you find a rule hard to understand.

## Meta

- This guide is basically a strict constraint. 
  However, in rare cases,
  the rules can be partially broken when things become weird under such rules. 
- This guide only regulates newly added code.
  Old code can be re-formatted when convenient.
- This guide may be updated with a notification in the Gitter room. 
  All the new rules take effect immediately as the page is uploaded. 
- Fallback to [Google's version](https://google.github.io/styleguide/cppguide.html)
  whenever this guide does not give an explicit constraint.

## General

- Zero-warning is required under debug build.
  - Unused variable warning is allowed under release build
  - A Warning caused by a compiler's bug is allowed in any build mode
    (such as [this one](http://stackoverflow.com/a/33306000))
- Basically the high level readability and the development efficiency
  is considered more important, 
  and the low level optimizations should only be taken to critical performance problems. 

## Comments

- Avoid commenting by making the code self-explainatory.
- Always mark ends of include guards and namespaces with comments.
- Use only `//` comments in committed code. `/* */` is reserved for debugging. 

## Naming

- Naming should basically base on English. 
  Mahjong terminologies, character names, and school names
  can be represented by Japanese Romaji. 
  Terminologies related to the Chinese GB Mahjong can be represented by Pinyin. 
- Use `UpperCamelCase` for class, struct, union, and enum type names. 
- Use `lowerCamelCase` for function and variable names. 
- Start non-public class member variables with `m`.
- Treat all-capital words as ordinary words in camel cases. 
  - Bad: `HTTP`
  - Good: `Http` (upper camel), `http` (lower camel)
- Use lower cases and digits within 7 characters for namespace names.
- Use capitals and underscores for enum values and constants.
- Shorter names and common abbreviations are approved. 
- Callback function naming:
  - Before something happen: `onDoSomething`;
  - After something happen: `onSomethingDone`
- Use only lower cases, `_`, and `.` for filenames. 
- File extension: header: `.h`, source: `.cpp`
- Nature of English can be sacrificed to beautify the alignment

```
// bad
quick_brown_fox.h
slow_white_fox.h

// good
fox_quick_brown.h
fox_slow_white.h
```

## Spacing, Indentation, and Line Break

- Use 4 spaces for indentation, no tabs. 
- Keep a space between a keyword and a `(`.
- Keep no space between a function identifier and a `(`.
- Keep a space between a token and a `{`.
- Surround most binary operators with spaces
  - Except `::`, `.`, `->`, `.*`, `->*`, `()`, `[]`, `(cast)`
- Stick Unary operators to their operands without spaces
  - Unless in some idioms like `while (i --> 0)`
- Stick Semicolons to the end of statement without spaces. 
- Keep space-paddings inside a pair of `{` and `}` that are in the same line.
- Append either a space or a line break after commas.
- Break, if necessary, a binary expression into two lines before the operator.
- Keep the `{` at the same line of `if`, `while`, `for`, `do while`,
  or lambda's capture and parameters.
- To break or not to break:
  - Break:`class\n{`, `struct\n{`, `union\n{`, `enum\n{`, `namespace\n{`, `void f()\n{`
  - No break: `if {`, `while {`, `for {`, `do {`, `[]() {`
- Append to the `#include` preamble with three empty lines. 
- Append the last non-empty line of the file with three empty lines.
- Keep all things three empty lines away from the beginning and ending of a namespace.

## Memory Management

- Memory management should be generally based on RAII. 
- Use a pointer only if a reference cannot be used instead.
- Always use a `std::unique_ptr` when a pointer takes the ownership.
- Re-design the code such that bare `delete` or `delete[]` is never needed. 
- Do not use non-const static class members.
- Do not use non-const static variable storage.

## Abandoned C++ features

- No RTTI
- No user defined exception
- No `goto`
- No `std::shared_ptr`
- No C++14 or C++17 (for portability)

## Container Preferences

- Use arrays and array-likes for small data regardless of big-O
  - Less than 1KiB is considered small
  - Use `std::array` for fix length arrays
  - Use `saki::util::Stactor` for variable length arrays
  - Raw C-style arrays are not used
- Linear search is preferred over binary search on small arrays
- Functional map/fold style is preferred over `for` loops

## Class Definition Formatting

- Mark overloading functions with the `overload` keyword.
- Omit `virtual` in overloading functions.
- Constructors taking one or more arguments should be prefixed by `explicit`
  unless they are meant to be non-explicit
- Prefer `= delete` over hiding by making `private`.

## Statement Formatting

- Do not squash multiple statements into one line.
- Declare one variable with one declaration statement.
  - Unless in some common idioms like `int i, j, k`
- Stick `*` and `&` to variables but not types.
  - Bad: `int* p`
  - Good: `int *p`
- Use brackets in the body of `if`, `for`, and `while`
  unless and only unless the two conditions are satisfied:
  1. The condition expression fits in one line;
  2. The statement body is either a single one-line statement,
	 or an `if`, `for`, or `while` statement without a bracketed body.
- Use brackets for all bodies in an `if...else if...else` block 
  as long as one of its body is bracketed. 
- When there is a `break`, `continue`, or `return` in the end of an `if` body, 
  the else-case is usually typed outside without being in an `else` block, 
  unless adding an `else` can make the whole block more aligned. 
- A fall-through in a `switch` statement
  should be commented by an `// fall through` exactly.
  - a group of adjacent labels in a `switch` statement is not addressed as a fall-through.
- A typical integer `for` condition should look like
  `(int i = 0; i < N; i++)`  (use `<` and postfix `++`)
- A typical iterator `for` condition should look like
  `(auto it = v.begin(); it != v.end(); ++it)`
  (use `auto`, `!=`, and prefix `++`)
- Avoid long function definition and/or deep indentation level.
  Break them into multiple short functions.
- Prefer `using` over `typedef`.

## Expression Formatting

- Always use `nullptr` for null pointers. Do not use `NULL` or `0`.
- Use `ptr != nullptr` or `ptr == nullptr` to check pointers' nullity.
  Do not use `ptr` or `!ptr`.
- Use `i != 0` or `i == 0` to check zero integers. Do not use `i` or `!i`.
- Directly use `b` or `!b` to check boolean conditions.
  Do not use `b == true` or `b == false`.
- Do not use Yoda conditions. 
- Do not rely on the precedence between `&&` and `||`
  - Bad: `a && b || c`
  - Good: `(a && b) || c`
- Do not rely on the precedence between bitwise operators and always use parenthesises.


## Other

- No non-ASCII character, even in string literals and comments.
- Wrap lines to 110 characters. Less than 80 is better.



