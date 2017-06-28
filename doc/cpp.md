---
layout: page
title: Pancake Mahjong C++ Coding Convention
permalink: /docs/cpp/
---

© 2017 Rolevax, All Rights Reserved.

## Meta

- This convention is basically a strict constraint. 
  However, in rare cases,
  the rules can be partially broken when things become weird under such rules. 
- This convention only regulates newly added code.
  Old code need to be re-formatted only if it is to be changed.
- This convention may be updated with a notification in the Gitter room. 
  All the new rules take effect immediately as the page is uploaded. 
- This convention does not uniquely define an automatic code formatting program. 
  All the cases that is not covered by this convention can be applied with arbitrary code style. 

## General

- Zero-warning is required under debug build.
  - Unused variable warning is allowed under release build
  - Warnings caused by bugs are allowed in any build mode
    (such as [this one](http://stackoverflow.com/a/33306000))
- Basically the high level readability and the development efficiency
  is considered more important, 
  and the low level optimizations should only be taken to critical performance problems. 

## Naming

- Naming should basically base on English. 
  Mahjong terminologies, character names, and school names
  can be represented by Japanese Romaji. 
  Terminologies related to the Chinese GB Mahjong can be represented by Pinyin. 
- Use `UpperCamelCase` for class, struct, and enum names. 
- Use `lowerCamelCase` for function and variable names. 
- Originally all-capitalized words are treated as ordinary words in camel cases. 
  - Disallowed: `HTTP`
  - Preferred: `Http` (upper camel), `http` (lower camel)
- Enums and constants are all-capitalized with necessary underscores. 
- Use only lower cases, `_`, and `.` in filenames. 
- File extension: header: `.h`, source: `.cpp`
- Shorter names and common abbreviations are approved. 
- Callback function naming: before something happen: `onDoSth`;
  after something happen: `onSthDone`
- Natural language's grammar can be sacrificed to beautify the alignment

```
// ugly
QuickBrownFox
SlowWhiteFox

// better
FoxQuickBrown
FoxSlowWhite
```

## Spacing, Indentation, and Line Break

- Always use 4 spaces for indentation, no tabs. 
- Always insert a space between a keyword and a `(`.
- Do not insert any space between a function identifier and a `(`.
- Always insert a space between a token and a `{`.
- Most of the binary operators, except `::`, `.`, `->`, `.*`, `->*`, `()`, `[]`, `(cast)`, 
  should be surrounded with spaces.
- Unary operators are stuck to their operands without spaces
  - Unless in some idioms like `while (i --> 0)`
- Semicolons are stuck to the statement without spaces. 
- All token succeeds `{` in the same line should be prefixed by a space. 
- All token precedes `}` in the same line should be suffixed by a space. 
- All commas are suffixed by spaces or line breaks.
- When a binary operator expression is broken into two lines,
  the line break should precede the operator.
- The `{` in an `if`, `while`, `for`, `do while` statement does not start at a new line. 
- The `{` in a declaration of function, class, struct, union, and enumeration always starts at a new line.
  (possibly with preceding indentations)
- The `{` in a namespace always starts at a new line.
- The `{` in a lambda expression does not start at a new line. 
- The number of adjacent line spacing can only be one or three. 
- The `#include` block should be appended by three empty lines. 
- The last non-empty line of the file should be appended by three empty lines.
- The namespace block should have both pending and margin of three empty lines. 
- `#include` lines should be adjecent if and only if they are from same library. 

## Memory Management

- Memory management should be generally based on RAII. 
- Basically a pointer can be introduced only when both of the two conditions are satisfied: 
    1. Cannot use a reference
    2. Need polymorphism

  An example can be element types in a template container of abstract classes
- Always use a `std::unique_ptr` when a pointer takes the ownership.
- Re-design the code such that manual `delete` and `delete[]` is never needed. 
- Usage of raw pointers should be extremely reduced. Currently they are used only in three cases:
    1. Return type of a virtual copy function
    2. Return type of an abstract factory function
    3. Handler of an observer

## Abandoned C++ features

- No RTTI
- No user defined exception
- No `goto`
- No `std::shared_ptr`
- No C++14 or C++17 (for portability)

## Think Again's

- Think again before introducing a template.
- Think again before introducing a macro.
- Think again before introducing a namespace scope (global) variable.
- Think again before using multi-threading.
- Think again before using compiler black magics.
- Think again before using type casts, especially implicit ones.
- Think again before using `unsigned`, or any integral type but `int`.

## Container Preferences

- Use arrays and array-likes for small data
  - Less than 1KiB is considered small
  - Use `std::array` for fix length arrays
  - Use `saki::util::Stactor` for variable length arrays
  - Raw C-style arrays are not used
- Linear search is preferred over binary search on small arrays
- Functional map/fold style is preferred over `for` loops

## Class Definition Formatting

- Declaration of an overriding virtual function should always be suffixed by `override`
- Declaration of an overriding virtual function should never be prefixed by `virtual`
- Constructors taking one or more arguments should be prefixed by `explicit`
  unless they are meant to be non-explicit
- The four compiler-generated special member functions should be explicitly declared as
  ` = default`, ` = delete` or user-defined, unless it is too trivial (such as POD)

## Statement Formatting

- One line should contain at most one statement. 
- One declaration statement should declare one variable.
  - Unless in some common idioms like `int i, j, k`
- In declarators of pointers and references,
  `*` and `&` should stick to the variables but not the type names.
  - Disallowed: `int* p`
  - Approved: `int *p`
- Use brackets in the body of `if`, `for`, and `while`
  unless and only unless the two conditions are satisfied:
  1. The condition expression fits in one line;
  2. The statement body is either a single one-line statement,
	 or an `if`, `for`, or `while` statement without a bracketed body.
- For an `if/else if/.../else` block, all the other sub-blocks should use a bracketed body
  if one of the block has a bracketed body. 
- When there is a `break`, `continue`, or `return` in an `if` body, 
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

## Expression Formatting

- Always use `nullptr` for null pointers. Do not use `NULL` or `0`.
- Use `ptr != nullptr` or `ptr == nullptr` to check pointers' nullity.
  Do not use `ptr` or `!ptr`.
- Use `i != 0` or `i == 0` to check zero integers. Do not use `i` or `!i`.
- Directly use `b` or `!b` to check boolean conditions.
  Do not use `b == true` or `b == false`.
- Do not use Yoda conditions. 


## Other

- No non-ASCII character, even in string literals and comments
- One line should not be too long.
  Less than 80 characters is good, and 110 characters is the hard limit.
- Use only `//` for explaining comments. `/* */` is reserved for debugging. 



