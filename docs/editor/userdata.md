---
layout: page
title: userdata
permalink: /docs/editor/userdata/
---

「松饼人物编辑器：从入门到欧耶」系列教程（五）

## 上一讲的习题参考答案

1) 狗带（你慢慢记忆力良好x）  
2) 不符合多数人的习惯，所谓「清晰」也是主观的  
3) 一种可能的实现：

```lua
function make(unit)
  local sum = unit
  return function()
    print(sum)
    sum = sum .. unit
  end
end

ao = make("嗷")
ao()
ao()
ao()
```
<br />

## 使用松饼 userdata

自从第二讲以来，好久没做人物技能了，一直都在写诗什么的x 

为了尽快切入我们的核心主题 —— 人物技能，
这里我们要掌握基本的松饼 userdata 的用法。

先回忆一下 Lua 中的七种数据类型:

- number
- string
- boolean
- table
- function
- userdata
- nil

其中我们没有直接用过的就剩 table 和 userdata 了。
table 的用法以后再说，这里先看 userdata。 

userdata 与其它的类型有一点区别。
其它的类型，都是 Lua 语言自带的，
而 userdata 则是由应用（大环境）添加的。
在松饼大环境下，userdata 就是麻将牌、牌山、牌桌这些东西。
尽管同样是 Lua 语言，由于应用不同，使用 userdata 的方式也略有差异。
为方便说明，下文中的 userdata 将特指松饼中的 userdata。

<br />

## 麻将牌 T34

松饼中有两种代表麻将牌的类型：`T34`与`T37`。
区别在于后者将赤宝牌与普通的数牌 5 视为不同的类型。
这里我们先看更常用的`T34`。

写下`local i = 1`，就创建了一个 number 变量`i`；
写下`local s = "xxx"`，就创建了一个 string 类型的`s`；
写下`local b = true`，就创建了一个 boolean 类型的变量`b`。
类似地，我们可以通过如下写法，创建一个「麻将牌」类型的变量`t`：

```lua
local t = T34.new("1s")
```

你会发现，创建麻将牌的写法，
比创建 number, string, boolean 的写法要麻烦得多。
这是理所当然的，毕竟麻将牌不是 Lua 的亲儿子，
而是由松饼加进去的 userdata 类型。

松饼对 userdata 类型进行了细化，
将其分为`T34`, `Mount`, `Who`, `Game`等具体的类型，
每个类型都有不同的用处，比如`T34`代表麻将牌，`Mount`代表牌山等等。
我们先了解一下`T34`的用法。

上面的例子中，`t`是一个`T34`类型的变量，其值为「一索」。
`T34.new`其实就是一个函数，
通过一个 string 类型的参数（上面的例子中的`"1s"`）指定想要创建的牌。
这个 string 应该由两个字符组成，
第一个字符代表牌的数值，第二个字符代表牌的花色，
比如`"1s"`, `"7p"`, `"5m"`等等。
在松饼中，万子、饼子、索子、风牌、三元牌分别用
`m`, `p`, `s`, `f`, `y` 表示。
风牌的数值为东1、南2、西3、北4；三元牌的数值为白1、发2、中3。
比如，下面的代码创建了代表二饼和白板的变量`t1`与`t2`：

```lua
local t1 = T34.new("2p")
local t2 = T34.new("1y")
```

至于`T34`和`new`中间的那个点「`.`」是个什么鬼，我们以后再解释。

<br />

## 身份 Who

几乎所有的技能都是「对人」的。
比如「谁听牌我坑谁」，「自己加速、他家减速」，「专坑下家二十年」等等。
要想在代码中表达这个「谁」的概念，就要用到`Who`这个 userdata 类型。

`Who`和`T34`有一点区别：
`T34`可以通过`T34.new`函数来创建，
而`Who`无法在 Lua 里凭空创建，
只能使用已经由系统创建好的的变量。
其实我们已经用过好几次`who`类型的变量了 ——
之前在`ondraw`函数中常用的`who`和`self`变量就都是`Who`类型的。
每当系统在调用`ondraw`之前，都会设置好这两个全局变量：

```lua
function ondraw()
  if who ~= self then
    return
  end

  print("哇！")
end
```

上面的写法是一种很常见的摸牌挂套路。
首先，通过`who ~= self`判断`who`与`self`是否「不相等」。
`~=`与`==`的作用刚好相反，在两侧不相等时得`true`，相等时得`false`。
若`who`不等于`self`，则提前返回 ——
这就导致了`ondraw`后半部分的代码只会在`who`为`self`的情况下执行，
使得该技能只会影响自己的进张。

`self`表示自己，那自己的下家、对家、上家又怎么表示呢？

松饼提供了三个函数：`Who.right`, `Who.cross`, `Who.left`，
分别可用于求出一个`Who`类型变量的下家、对家、或上家 ——
只要把作为基准的`Who`变量作为参数传入即可：

```lua
function ondraw()
  if who ~= Who.right(self) then
    return
  end

  print("坑坑坑坑坑")
end
```

三狗测试知以上人物在下家摸牌时输出「坑坑坑坑坑」。

<br />

## 方法调用

下面的两种写法作用是相同的：

```lua
Who.right(self)    -- 写法1
self:right()       -- 写法2
```

这两种写法都表示「自己的下家」。
「写法 2」只是「写法 1」的简略版本，没什么深奥的区别。
这种带冒号的写法，
等同于把冒号前面的 userdata 作为第一个参数传入冒号后面的函数。
冒号后面的函数名，指代的是与这种 userdata 配套使用的那个函数 ——
在上面的例子中，`self:right()`中的`right`实际代表`Who.right`。

与某种 userdata 类型配套使用的函数，也叫作「方法」。
不同的类型，有不同的方法。
可以说，正是因为方法的不同，才使得类型得以不同。
食物可以吃，可以煮；衣服可以穿，可以脱。
因为可以吃，可以煮，所以才称得上是食物；
因为可以穿，可以脱，所以才称得上是衣服。

至于每一种类型具体都有哪些方法，
可在需要时参考 [API 文档](/docs/editor/api/)，无须刻意记忆。

<br />

## 基本牌山干涉

(TODO)
[mount](/docs/libsaki/mount/)
1. examples `lighta`
2. simple logging

<br />

## 练习题

1) 预测各家摸牌前的输出：
```lua
function ondraw()
  print(who:right():right() == self:left())
end
```

自己摸牌前输出（ ），
下家摸牌前输出（ ），
对家摸牌前输出（ ），
上家摸牌前输出（ ）。

下一讲：[控制流](/docs/editor/flow/)

