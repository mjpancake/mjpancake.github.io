---
layout: page
title: 控制流
permalink: /docs/editor/flow/
---

「松饼人物编辑器：从入门到欧耶」系列教程（六）

## 上一讲的习题参考答案

1)

自己摸牌前输出（false），
下家摸牌前输出（true），
对家摸牌前输出（false），
上家摸牌前输出（false）。

2)

`on_draw`应为`ondraw`，
`self.right()`应为`self:right()`，
`T34:new`应为`T34.new`，
`3m`应为`"3m"`，
`Mount:lighta`应为`mount:lighta`。


3)

变量`t`的定义出现过早，
`who == self`的判断也是多余的。

4)

```lua
function ondraw()
  if who ~= self then
    return
  end

  local t = T34.new("1m")
  mount:lighta(t, 100)
end
```

5) 一种可能的实现：

```lua
function ondraw()
  local t = nil

  if who == self then
    t = T34.new("1m")
  else
    t = T34.new("1p")
  end

  mount:lighta(t, 1000)
end
```

6) 方法有很多，比如：

- 在`lighta`的上一行打日志，确认每家摸牌前`t`的值
- 三狗战后观察牌谱

7)

```lua
function ondraw()
  if who ~= self then
    return
  end

  local t = T34.new(game:getselfwind(self) .. "f")
  mount:lighta(t, 2333)
end
```

8)

```lua
function ondraw()
  if who ~= self then
    return
  end

  local dealer = game:getdealer()
  if dealer == self then
    mount:lighta(T34.new("1p"), 2333)
  else
    mount:lighta(T34.new(game:getroundwind() .. "f"), 2333)
  end
end
```

9) 

```lua
function ondraw()
  if who ~= self then
    return
  end

  mount:lighta(T34.new(game:getselfwind(self:right()) .. "f"), 2333)
end
```

10) 

```lua
function ondraw()
  if who ~= self then
    return
  end

  local hand = game:gethand(self)
  count2drag8(hand, mount, "m")
  count2drag8(hand, mount, "p")
  count2drag8(hand, mount, "s")
end

function count2drag8(hand, mount, suit)
  local two = T34.new(2 .. suit)
  if hand:ct(two) > 0 then
    local eight = T34.new(8 .. suit)
    mount:lighta(eight, 2333)
  end
end
```

11) 

```lua
function ondraw()
  if who ~= self then
    return
  end

  local extra = game:getextraround()
  if extra < 9 then
    local begin = extra % 3 + 1
    drag(mount, begin)
  end
end

function drag(mount, begin)
  local head = T34.new(begin .. "m")
  local middle = T34.new((begin + 3) .. "m")
  local tail = T34.new((begin + 6) .. "m")

  mount:lighta(head, 2333)
  mount:lighta(middle, 2333)
  mount:lighta(tail, 2333)
end
```

分离出`drag`函数的目的是为了防止`ondraw`太长不易读。

12) 办法很多，比如：

- 并非采用`game:getextraround()`获取真实的本场数，
  而是直接「假装」目前为某本场，并测试后续的逻辑。
    - 例如在上面的答案中，可用`local extra = 3`测试三本场时的表现
- 与容易连庄的角色同场测试

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
      print("鄙视下家")
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

## 逻辑运算

我们可以用`and`, `or`, `not`运算来做出一些更复杂的判断条件。
例如，下面的代码会在摸牌人是自己，「并且」自风为西时输出「哇！」：

```lua
function ondraw()
  if who == self and game:getselfwin(self) == 3 then
    print("哇！")
  end
end
```

再比如，下面的代码会在摸牌人是自己，「或者」摸牌人是对家时输出「哇！」：

```lua
function ondraw()
  if who == self or who == self:cross() then
    print("哇！")
  end
end
```

`and`的字面意思是「与」，`or`的字面意思是「或」，
钽它们的具体求值方式有点特别。
`and`的求值方式是：左手边为假则返回左手边，否则返回右手边；
`or`的求值方式是：左手边为真则返回左手边，否则返回右手边。
无论是`and`还是`or`，都会先计算左手边，再计算右手边；
如果计算的过程中发现结果就是左手边，那么右手边就不会被计算。
这种规则在实现了「与」和「或」的字面意义的同时，
给予了人们「皮一下」的空间。
例如，以下表达式可以在`a`和`b`都是 number 类型的情况下，
求出`a`和`b`之间的较大值：
```lua
a > b and a or b
```

要理解上面的表达式，首先要明白运算符之间的优先级。
在 Lua 中，像`>`, `<`, `==`这种判断「关系」的运算，
优先级都高于`and`, `or`这种「逻辑」运算；
而`and`的优先级又高于`or`。因此，上面的表达式等同于：
```lua
((a > b) and a) or b
```

所以首先从`a > b`开始计算：

- 如果`a > b`结果为`true`，表达式等同于`(true and a) or b`
  - 因为`and`左手边为真，`and`表达式的结果就是右手边，表达式等同于`a or b`
  - 接下来，`or`的左手边是真，因此`or`的结果为左手边`a`
    - 之前讲过，只有`false`和`nil`是假，所以 number 类型的`a`永远都是真
  - 于是，`a`大于`b`时整个表达式的结果就是`a`
- 如果`a > b`结果为`false`，表达式等同于`(false and a) or b`
  - 因为`and`左手边为假，`and`表达式的结果就是左手边，表达式等同于`false or b`
  - 接下来，`or`的左手边是假，因此`or`的结果为右手边`b`
  - 于是，`a`不大于`b`时整个表达式的结果就是`b`

在 Lua 中，这种「条件`and`结果1`or`结果2」的写法是很常见的。

<br />

## 练习题（第一组）

1) 上例中的「摸牌人是自己或对家」的条件能否写成下面的样子？为什么？

```lua
function ondraw()
  if who == (self or self:cross()) then
    print("哇！")
  end
end
```

2) 判断以下表达式真假：
```lua
nil == "nil" or nil
nil == ("nil" and nil)
1 + 1 == 2 or nil
1 + 1 ~= (2 or nil)
(0 and true) and T34.new("3y") or false
```

3) 实现技能：

- 如果谁的手里都没有场风，技能无效果
- 如果刚好有一家的手里有场风，就给他塞白板
- 如果多家手里有场风，给按照摸牌顺序离自己最近的一家塞白板
- 上述逻辑中，塞白板的目标不排除自己

上面的需求写得很啰嗦，
但需求啰嗦不代表代码也一定要复杂。
我们需要尽可能把同样的事情理解得更精辟一些。

<br />

## for 循环

下面我们要做一个万子染手挂。
原理很简单，就是容易摸到各种万子。

```lua
function ondraw()
  if who ~= self then
    return
  end

  mount:lighta(T34.new("1m"), 100)
  mount:lighta(T34.new("2m"), 100)
  mount:lighta(T34.new("3m"), 100)
  mount:lighta(T34.new("4m"), 100)
  mount:lighta(T34.new("5m"), 100)
  mount:lighta(T34.new("6m"), 100)
  mount:lighta(T34.new("7m"), 100)
  mount:lighta(T34.new("8m"), 100)
  mount:lighta(T34.new("9m"), 100)
end
```

太鬼畜了。这是病，得治。所以，循环大法好。

```lua
function ondraw()
  if who ~= self then
    return
  end

  for i = 1, 9 do
    mount:lighta(T34.new(i .. "m"), 100)
  end
end
```

如此一改，所做的事情没有变，但代码质量很高了。

这里的`i`是一个变量。
变量名本是可以随便起的，不叫`i`，叫`cat`, `dog`都可以，
但习惯上循环里面一般都用`i`。
后面的`1, 9`的意思是说，
`i`最初一次循环时是`1`，最后一次循环时会是`9`。
每循环一次，`i`都会自增 1。

循环变量`i`虽然不带`local`字样，但也是一个局部变量，
只在`for`循环内部有效。

除了`for`循环外，Lua 还有`while`和`repeat`循环，
可支持更多样的循环条件。
因为在人物技能里用得不多，就不介绍了。

<br />

## 练习题（第二组）

3) 实现技能：

- 若手里有 (K)m  且无 (K+1)m，则容易摸到 (K+1)m
  - 即：有 1m 时招 2m，有 2m 时招 3m，以此类推
  - 0 < K < 9
- 若手里有 9m  且无 1m，则容易摸到 1m

4) 实现技能：

- 容易在第 N 巡摸到数值为 N 的数牌
  - 第 1 巡容易摸 1m, 1p, 1s；第 2 巡容易摸 2m, 2p, 2s……
- N < 0 或 N > 9 时，技能无效果
- 为方便起见，此处「巡数」单指摸牌次数，不考虑鸣牌
- 庄家的跳牌视为第 0 巡，闲家的第一次摸牌为第 1 巡

下一讲：[表](/docs/editor/table/)

