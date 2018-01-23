---
layout: page
title: 一堆麻将牌
permalink: /docs/libsaki/tilecount/
---

`libsaki/form/tile_count.h`定义了一个类`TileCount`。
`TileCount`是`T37`的一个多集（multiset），记录每种牌有几张。
`TileCount`有很多用途，可用于表示手牌，也可以用于表示牌山。
不过牌河是表示不了的，因为`TileCount`不记录牌之间的先后顺序。

<br />

## 构造函数

| Prototype                          | Explanation                   |
| :--------------------------------- | :---------------------------- |
| `TileCount()`                      | 一个空集                      |
| `TileCount(AkadoraCount)`          | 包含136张牌的集合，赤牌数可定 |
| `TileCount(std::initializer_list)` | 从已有数据创建                |

<br />

## 计数、添加、删除

通过`ct(T34)`或`ct(const T37&)`可查看某种牌在集合里有几张。
两者的区别见下面的例子：

```
// 创建一个集合，里面有一张0p, 一张5p
TileCount count({ T37(Suit::P, 0), T37(Suit::P, 5) });

T34 p(Suit::P, 5);
T37 p5(Suit::P, 5);
T37 p0(Suit::P, 0);

int i1 = count.ct(p);  // i1 == 2
int i2 = count.ct(p5); // i2 == 1
int i3 = count.ct(p0); // i3 == 1
```

通过`inc(const T37 &t, int delta)`方法可修改集合中一种牌的个数。
`delta`为正数即为添加，为负数即为去除。
注意`inc`的参数只能是`T37`，不能是`T34`
——虽然查个数时可以概括，但增删时必须清楚地表明增删的到底是赤牌还是黑牌。

<br />

## 向听数计算

前文提到，`TileCount`可用于表示手牌。
当`TileCount`表示手牌时，可以通过成员方法计算向听数。

Libsaki 中我们用 *step* 一词代表向听数。
`TileCount`中有一系列关于向听数计算的方法：

| 方法                 | 用途                         |
| :------------------- | :--------------------------- |
| `step4(int barkCt)`  | 指定副露数，求四面子向听数   |
| `step7()`            | 假设门前清，求七对子向听数   |
| `step13()`           | 假设门前清，求国士向听数     |
| `step(int barkCt)`   | min(step4, step7, step13)    |
| `step7Gb()`          | 国标七对子向听数，允许四归一 |
| `stepGb(int barkCt)` | min(step4, step7Gb, step13)  |

Libsaki 内部我们用 *bark* 一词统称吃、碰、大明杠、暗杠、加杠。
（本应该叫 call，但容易和 function call 弄混）

向听数为 0 代表形式听牌或纯空听，向听数为 -1 代表和牌。

四面子形的向听数计算采用的是暴力搜索算法，耗时为毫秒级。

<br />

## 有效牌计算

代码内部通过`effA`表示一类有效牌（降低向听数），
用`effB`表示二类有效牌（改良），
用`effC`表示三类有效牌（改良增多）。

`hasEffA`系列方法判断某张牌是否为当前手牌的一类有效牌。
`effA`可以列举出所有的一类有效牌。
后面的`4`, `7`, `13`等后缀意义与`step`系列相同。

<br />

## 其它方法

`TileCount`里的其它方法都不是很常用，不必一一了解。

