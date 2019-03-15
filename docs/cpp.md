---
layout: page
title: 松饼 C++ 代码规范
permalink: /docs/cpp/
---

© 2017 - 2018 Rolevax，保留所有权利。

## 元规范

- [MT-1] 严格遵守本规范。极少数情况下，如果规范导致问题，可暂时打破规范。
- [MT-2] 本规范仅约束新增的代码。
- [MT-3] 本规范可能随时更新，更新随 Gitter 群聊内通知生效。

## 通用

- [GN-1] 保持在最新稳定版 G++ 及 Clang++ 下编译 0 警告。
    - 警告选项：`-Weverything -Wno-c++98-compat -Wno-c++98-compat-pedantic -Wno-unused-macros -Wno-newline-eof -Wno-exit-time-destructors -Wno-global-constructors -Wno-gnu-zero-variadic-macro-arguments -Wno-documentation -Wno-shadow -Wno-switch-enum -Wno-missing-prototypes -Wno-used-but-marked-unused -Wno-padded -Wno-covered-switch-default`
- [GN-2] 代码可维护性比性能重要，除非性能影响实际体验。
- [GN-3] 提交代码前用最新稳定版 Uncrustify 统一代码风格。
    - 配置文件：`mjpancake/uncrustify.cfg`。
    - 下文所列出的规范都是 Uncrustify 未涉及的，需要手动修改。
- [GN-4] 提交代码前用最新稳定版 Clang-Tidy 检查并修正代码问题。
    - 配置选项：`-*,bugprone-*,cppcoreguidelines-c-copy-assignment-signature,cppcoreguidelines-interfaces-global-init,cppcoreguidelines-no-malloc,cppcoreguidelines-pro-bounds-constant-array-index,cppcoreguidelines-pro-bounds-pointer-arithmetic,cppcoreguidelines-pro-type-*,cppcoreguidelines-slicing,cppcoreguidelines-special-member-functions,misc-*,modernize-*,performance-*,readability-avoid-const-params-in-decls,readability-container-size-empty,readability-delete-null-pointer,readability-deleted-default,readability-else-after-return,readability-function-size,readability-identifier-naming,readability-implicit-bool-conversion,readability-inconsistent-declaration-parameter-name,readability-misleading-indentation,readability-misplaced-array-index,readability-named-parameter,readability-non-const-parameter,readability-redundant-*,readability-simplify-boolean-expr,readability-static-*,readability-uniqueptr-delete-release`

## 注释

- [CM-1] 通过自解释性代码避免过于啰唆的注释。
- [CM-2] 仅使用 `//` 注释，禁用`/* */`注释。
- [CM-3] 删除代码时直接删除，禁止通过注释屏蔽代码。

## 命名

- [NM-1] 一般情况下，基于英文命名。
    - 日本麻将术语基于日文罗马音。
    - 国标麻将术语基于拼音。
    - 人名、校名、地名基于对应的国家或地区的拼写方式。
- [NM-2] 命名的大小写、符号等拼写风格与上下文保持一致。
- [NM-3] 命名的时态、语态、词性、词序等语法风格与上下文保持一致。
- [NM-4] 鼓励使用短命名与[常见的缩写](/docs/abbr/)。
- [NM-5] 命名需带有自解释性，或符合惯例；禁止使用毫无无意义的命名。

## 内存管理与类型系统

- [MM-1] 减少动态分配，禁止出现 Java 式指针泛滥。
- [MM-2] 不拥有对象所有权时，优先考虑使用引用（包括「输出」参数）。
- [MM-3] 禁止使用裸露的`new`或`delete`。
- [MM-4] 简化对象生命周期，慎用`std::shared_ptr<T>`。
- [MM-5] 禁用 C 风格数组。（用`std::array`代替）
- [MM-6] `unsigned`专门用于位运算及标准库兼容，禁止表达「非负整数」语义。

## 禁用的 C++ 特性

- [AB-1] 禁用 RTTI。
    - 可使用类型枚举等替代方案。
- [AB-2] 禁用异常。
    - 将「错误」视为业务的重要组成部分，不要从语言层上特别对待。
    - 标准库或第三方库抛出的异常应尽早处理或直接无视。
- [AB-3] 禁用 `goto`。
    - 需要一次性跳出多重嵌套时，通过拆分函数等方式重新组织逻辑。
    - 需要做统一的收尾处理时，使用局部变量的析构函数。

## 类定义格式

- [CL-1] 先声明成员函数，后声明非静态成员变量。
    - 静态成员变量、嵌套类等声明的顺序不受限制。
- [CL-2] 以`public`->`protected`->`private`排序所有成员函数声明。
- [CL-3] 以`public`->`protected`->`private`排序所有非静态成员变量声明。

## 语句风格

- [SM-1] 禁止将多条语句挤进一行。
- [SM-2] 一条声明语句最多声明一个变量。
- [SM-3] 大括号的用法：
    - `do while`和`switch`语句体必须加大括号。
    - 构成[简单阶梯形](/docs/cpp-note#stairs)的
      `if`, `for`, `while`语句体禁止加大括号。
    - 构成[简单锯齿形](/docs/cpp-note#stairs)的
      `if`语句体禁止加大括号
    - 既不构成简单阶梯形，也不构成简单锯齿形的`if`, `for`, `while`
      语句体必须加大括号。
- [SM-4] 避免超长函数定义和超深缩进结构。
- [SM-5] 尽量使用`using`替代`typedef`。
- [SM-6] 要`const int *p`，不要`int const *p`.
- [SM-7] 禁止重造`find`, `accumulate`等标准库算法。

## 表达式风格

- [EX-1] 用`nullptr`表示空指针，禁用`NULL`或`0`。
- [EX-2] 用`true`和`false`表示布尔常量，禁用`1`或`0`。
- [EX-3] 用`i != 0`或`i == 0`检测整数0，禁用`i`或`!i`。
- [EX-4] 用`b`或`!b`检测布尔表达式，禁用`b == true`或`b == false`。
- [EX-5] 禁用 Yoda 大法。（例如`3 == b`）
- [EX-6] 禁止依赖`&&`与`||`之间的优先级。
  - 不要：`a && b || c`
  - 要：`(a && b) || c`
- [EX-7] 禁止依赖位运算之间的优先级。
- [EX-8] 除非有意表达 2 的 n 次幂，禁止使用移位运算代替乘除运算。
- [EX-9] 禁止利用整数与浮点数之间的隐式转型。

## 其它

- [OT-1] C++文件中禁用非ASCII字符。
- [OT-2] 单行字符上限110，鼓励截到80字符以内。



