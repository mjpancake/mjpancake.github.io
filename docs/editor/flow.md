---
layout: page
title: 控制流
permalink: /docs/editor/flow/
---

「松饼人物编辑器：从入门到欧耶」系列教程（六）

## 上一讲的习题参考答案

<br />

## 多级 if 嵌套

回顾一下第一讲中，自己摸牌输出「哇！」，
别人摸牌输出「emmm...」的那个例子：

```lua
function ondraw()
  if who == self then
    print("哇！")
  else
    print("emmm...")
  end
end
```

现在我们把这个例子扩展一下，
让它在下家摸牌的输出「鄙视下家」，其余的不变：

```lua
function ondraw()
  if who == self then
    print("哇！")
  else
    if who == self:right() then
      print("鄙视下定")
    else
      print("emmm...")
    end
  end
end
```
这段代码的意思是：

- 如果摸牌的人是自己：
    - 输出「哇！」
- 否则：
    - 如果摸牌的人是自己的下家：
        - 输出「鄙视下家」
    - 否则：
        - 输出「emmm...」

就像上面的例子所展示的一样，`if`里面可以嵌套`if`。
我们不妨再套一层，让它在对家摸牌时输出「嫌弃对家x」。

```lua
function ondraw()
  if who == self then
    print("哇！")
  else
    if who == self:right() then
      print("鄙视下定")
    else
      if who == self:cross() then
        print("嫌弃对家x")
      else
        print("emmm...")
      end
    end
  end
end
```

道理很简单，就是一级一级地判断 ——
但是这画风太鬼畜了，看着就晕，尤其是最后的`end`四连，简直洗脑x

好在 Lua 提供了一种方便的写法 —— `elseif`：

```lua
function ondraw()
  if who == self then
    print("哇！")
  elseif who == self:right() then
    print("鄙视下定")
  elseif who == self:cross() then
    print("嫌弃对家x")
  else
    print("emmm...")
  end
end
```

通过`elseif`，代码的逻辑没有变，但看起来舒服了很多，也避免了鬼畜的`end`四连。

虽然我们已经用过很过次`ondraw`函数和`if`语句了，
但里面的很多东西其实都没讲清楚，下面详细补充一下。

<br />

## 解释器的工作方式

先解释一下松饼 Lua 解释器的工作方式。

每一个角色都运行在独立的环境里，
它们之间无法直接通过共享全局变量来串通。

在一桌开始时，系统会把在场人物的 Lua 文件都运行一遍，
这个过程我们姑且称为「初始化」。
在初始化期间，代码可以定义一些全局函数，准备一些全局变量。
这个时候也可以定义局部变量，搞一些计算 ——
初始化结束后，全局变量会被保留。

想要实现摸牌挂，就要定义`ondraw`全局变量，其类型为函数。
过后，每当有人摸牌时，解释器都会在摸牌之前先调用`ondraw`。

`ondraw`的定义内部可使用`who`，`self`等全局变量。
这些变量是由系统从外部直接塞进来的，拿来用就行了。

<br />

## if 的工作方式

最简单的`if`语句长这个样子：

```lua
if 条件 then
  语句1
  语句2
  语句3
  ...
end
```

「条件」的求值结果为「真」，则执行里面的那堆语句（称做「语句体」），
「条件」为「假」时则会跳过语句体，执行`end`后面的代码。

if 语句可以有 else 部分和/或 elseif 部分：

```lua
if 条件1 then
  语句体1
elseif 条件2 then
  语句体2
elseif 条件3 then
  语句体3
else
  语句体N
end
```

这种情况下，会先计算「条件1」。
「条件1」为「真」，则执行「语句体1」。
「条件1」为「假」，则继续计算「条件2」，以此类推。
这里需要注意的是计算的顺序。如果前面的条件为「真」，
后面的条件就不会被计算。

每一个语句体都会开启一个新的局部变量的作用域（即「块」）。

在 Lua 中，boolean 类型的`false`，和 nil 类型的`nil`是「假」，
其余的任何类型的任何值都是「真」。
这意味着 number 类型的`0`，string 类型的`""`也都是「真」。

<br />

## for 循环

<br />

## while 和 repeat 循环

<br />

## 逻辑运算

<br />

## 练习题

1) 判断以下表达式真假：
```lua
nil == "nil" or nil
nil == ("nil" and nil)
1 + 1 == 2 or nil
1 + 1 ~= (2 or nil)
(0 and true) and T34.new("3y") or false
```

下一讲：[表](/docs/editor/table/)

