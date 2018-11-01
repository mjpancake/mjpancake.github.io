---
layout: page
title: 表
permalink: /docs/editor/table/
---

「松饼人物编辑器：从入门到欧耶」系列教程（七）

## 上一讲的习题参考答案

(TODO)

<br />

## 表的基础语法

这一进介绍 Lua 中的 table 类型。table 就是表。
表是个什么鬼？表就是这个：

(TODO image)

就是用来存东西的。每个格子都有一把钥匙，有了钥匙，就可以存东西，取东西了。
这里的「钥匙」，术语叫「键」；存取的东西，术语叫「值」。

```lua
local t = {}
t["用户名"] = "喵打"
t["密码"] = "123456"
t["年龄"] = 17
t["可以啪啪"] = true
```

上面的代码，首先创建了一个空表`t` ——
一对空的大括号`{}`就是一个空表。
随后，在表`t`内分别以`"用户名"`, `"密码"`, `"年龄"`, `"可以啪啪"`为键，
储存了`"喵打"`, `"123456"`, `17`, `true`四个值。
正如上面的例子所展示的，表里的值可以是任意类型的。
表的键也可以是除了 nil 以外的任意类型，但用得最多的还是 string 和 number。
上面的例子中，我们只用了 string 类型的键。

从表里读取值的方法，也是用中括号：

```lua
local account = {}
account["password"] = "abc123"
print(account["passwordd"])
```

语感上，「表名 + 中括号」可以看作是一个变量名。

如果键是一个字符串字面值（就是双引号括起来的字符串常量），
那么就可以用一个方便的写法：

```lua
local account = {}
account.password = "abc123"
print(account.password)
```

上例中，`account.password`和`account["password"]`的意义是相同的。
这种中间加点的写法只适用于字符串字面值 ——
如果键的类型不是 string，或者不是字面值，就还是得用中括号：

```lua
local t = {}
local str = "home"

t["name"] = "dogs" -- 也可写成 t.name = "dogs"
t[0] = "doge"      -- 键不是 string，只能这么写
t[str] = "sky"     -- 键是个变量，不是字面值，只能这么写
```

读取一个表中不存在的键时，拿到的值是`nil`：
```lua
local t = {}
print(t.cat) -- t 是空表，所以 t.cat 是 nil
```

(TODO T34.new Who.right)

<br />

## 引用

我们已经知道，在 Lua 中，赋值就是复制。例如：

```lua
local a = 1
local b = a
a = 2
print(b)
```

上面的例子，输出 1，而不是 2。虽然`b`是从`a`来的，
但`b`是复制出来的一个副本，与`a`是独立的。
然而，对于表而言，情况略有不同：

```lua
local a = {}
local b = a
a.doge = 233
print(b.doge)
```

测试可见输出 233。我们修改的是`a`，却影响到了`b`。
这是因为，在 Lua 中，一个 table 类型变量，指代的不是表本身，
而是一个指向表的「引用」。

引用是个什么鬼？引用，就是狗链。
我们重新再看一遍上面的例子。首先：

```lua
local a = {}
```

这一行，我们创建了一个空表。
但需要注意的是，变量`a`并不这个空表变身，
而是拴住了这个空表的一条狗链。

```lua
local b = a
```

接下来，我们又创建了一个变量`b`。
赋值就是复制 —— 现在，`b`和`a`是两条独立的狗链，
但它们都拴着同一条狗。
划重点：两条狗链拴着同一条狗（场面自行脑补）。

```lua
a.doge = 233
print(b.doge)
```

在 Lua 中，对狗链进行表操作，就是对狗进行表操作。
`a.doge`指的是`a`这条狗链拴着的狗里的`doge`。`b.doge`同理。
因此，`a.doge`和`b.doge`指的就是同一块储存空间，因为这两条狗链拴着同一条狗。

除了 table 以外，userdata 和 function 类型的变量也都是狗链，而不是狗。
(TODO userdata, closure example)

(TODO more?)

<br />

## 相等判断

(TODO table key rule, userdata's == operator)

## 取代 if-else

## 动态分配

(TODO stat t34 in hand )

## 数组

(TODO a[1], a[2] vs a1, s2  )

## pairs, ipairs

(TODO effa  )

## 集合

(TODO key vs. value for set elem)

下一讲：[算法](/docs/editor/algo/)

