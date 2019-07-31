---
layout: page
title: 表
permalink: /docs/editor/table/
---

「松饼人物编辑器：从入门到欧耶」系列教程（七）

## 上一讲的习题参考答案

1) 不能。根据`or`的求值规则，`self or self:cross()`就是`self`，
   如此一来只有自家摸牌时才能输出「哇！」。

2) 抄代码运行即可验证

3) 一种可能：
```lua
function has_tile(who, t)
  return game:gethand(who):ct(t) > 0 and who or nil
end

function ondraw()
  local round_wind = T34.new(game:getroundwind() .. "f")
  local target = has_tile(self, round_wind)
              or has_tile(self:right(), round_wind)
              or has_tile(self:cross(), round_wind)
              or has_tile(self:left(), round_wind)
  if who == target then
    mount:lighta(T34.new("1y"), 233)
  end
end
```

4) 一种可能：
```lua
function ondraw()
  if who ~= self then
    return
  end

  local ct = game:gethand(self):closed():ct("m")
  if 3 <= ct and ct <= 6 then
    mount:lighta(T34.new("1y"), 233)
  end
end
```
之所以在这个位置出这道题，是因为总有些人有滥用循环的倾向，
啥都想写个`for`。这是病，得治。

5) 一种可能：
```lua
function ondraw()
  if who ~= self then
    return
  end

  local closed = game:gethand(self):closed()

  local max_suit = "m"
  local max_count = closed:ct("m")
  local try_update_max = function(suit)
    local count = closed:ct(suit)
    if count > max_count then
      max_suit = suit
      max_count = count
    end
  end

  try_update_max("p")
  try_update_max("s")
  try_update_max("f")
  try_update_max("y")

  drag(mount, max_suit)
end

function drag(mount, suit)
  for i = 1,9 do
    mount:lighta(T34.new(i .. suit), 233)
  end
end
```
这段代码存在鬼畜的`try_update_max`四连。
如果感到不适就对了。用上接下来介绍的「表」，可以消除这个问题。

6) 一种可能：
```lua
function ondraw()
  if who ~= self then
    return
  end

  local hand = game:gethand(self)
  for i = 1,9 do
    local curr = T34.new(i .. "m")
    if hand:ct(curr) > 0 then
      local next = T34.new((i % 9 + 1) .. "m")
      mount:lighta(next, 233)
    end
  end
end
```

7) 一种可能：
```lua
function ondice()
  turn = game:getdealer() == self and 0 or 1
end

function ondraw()
  if who ~= self then
    return
  end

  if 1 <= turn and turn <= 9 then
    mount:lighta(T34.new(turn .. "m"), 233)
    mount:lighta(T34.new(turn .. "p"), 233)
    mount:lighta(T34.new(turn .. "s"), 233)
  end

  turn = turn + 1
end
```

<br />

## 表的基础语法

这一讲介绍 Lua 中的 table 类型。table 就是表。
表是个什么鬼？表就是这个：

![locker]({{ "/assets/locker.jpg" | absolute_url }})

就是用来存东西的。每个格子都有一把钥匙，有了钥匙，就可以存东西，取东西了。
这里的「钥匙」，术语叫「键」；存取的东西，术语叫「值」。

```lua
local t = {}
t["用户名"] = "喵打"
t["密码"] = "123456"
t["年龄"] = 17
t["写作业了"] = false
```

上面的代码，首先创建了一个空表`t` ——
一对空的大括号`{}`就是一个空表。
随后，在表`t`内分别以`"用户名"`, `"密码"`, `"年龄"`, `"写作业了"`为键，
储存了`"喵打"`, `"123456"`, `17`, `false`四个值。
正如上面的例子所展示的，表里的值可以是任意类型的。
表的键也可以是除了 nil 以外的任意类型，但用得最多的还是 string 和 number。
上面的例子中，我们只用了 string 类型的键。

从表里读取值的方法，也是用中括号：

```lua
local account = {}
account["password"] = "abc123"
print(account["password"])
```

如果键是一个字符串字面值（就是双引号括起来的字符串常量），
同时也是合法的变量名，
那么就可以用一个方便的写法：

```lua
local account = {}
account.password = "abc123"
print(account.password)
```

上例中，`account.password`和`account["password"]`的意义是相同的。
这种中间加点的写法只适用于字符串字面值 ——
如果键的类型不是 string，或者不是字面值，就还得用中括号：

```lua
local t = {}
local str = "home"

t["name"] = "dogs" -- 也可写成 t.name = "dogs"
t[0] = "doge"      -- 键不是 string，所以只能这么写
t[str] = "sky"     -- 键是个变量，不是字面值，所以只能这么写
t["卡"] = "翔"     -- 键不是合法变量名，所以只能这么写
```

读取一张表中不存在的键时，拿到的值是`nil`：
```lua
local t = {}
print(t.cat) -- t 是空表，所以 t.cat 是 nil
```

<br />

## 引用

我们已经知道，在 Lua 中，赋值就是复制。例如：

```lua
local cat = 1
local dog = cat
cat = 2
print(dog)
```

上面的例子，输出 1，而不是 2。虽然`dog`是从`cat`来的，
但`dog`是复制出来的一个副本，与`cat`是独立的。
修改`cat`，和`dog`没有任何关系。

然而，对于表而言，情况略有不同：

```lua
local zhoushuren = {}
local luxun = zhoushuren
zhoushuren.zhuabu = true
print(luxun.zhuabu)
```

测试可见输出 true。我们修改的是`zhoushuren`，却影响到了`luxun`。
这是因为，在 Lua 中，一个 table 类型变量，指代的不是表本身，
而是一个指向表的「引用」。

引用是个什么鬼？
我们重新再看一遍上面的例子。首先：

```lua
local zhoushuren = {}
```

这一行，我们创建了一个空表。
但需要注意的是，变量`zhoushuren`并不是这张表本身，
而是一个引用，是指代这张表的一个代号。

```lua
local luxun = zhoushuren
```

接下来，我们又创建了一个变量`luxun`，
并把`zhoushuren`赋值给了`luxun`。
对于引用来讲，它的值就是「引用了谁」。
因此，把一个引用赋值给另一个引用，
就是让这两个引用指向同一个对象。
现在，`luxun`和`zhoushuren`是两个不同的变量，
但它们都引用同一张表。

```lua
zhoushuren.zhuabu = true
print(luxun.zhuabu)
```

在这里，`zhoushuren.zhuabu`指的是`zhoushuren`所引用的表里的`zhuabu`。
而`luxun.zhuabu`指的是`luxun`所所引用的表里的`zhuabu`。
因为现在`zhoushuren`和`luxun`引用了同一张表，
所以`zhoushuren.zhuabu`和`luxun.zhuabu`指的就是同一块储存空间。
修改`zhoushuren.zhuabu`，就是修改`luxun.zhuabu`。

在 Lua 中，被引用的东西，称为「对象」。
table 是对象。
除了 table 以外，userdata 和 function 也都是对象。
table, userdata, function 类型的变量所储存的都是对象的引用，
而非对象本身。

也就是说，刚才发生在 table 上的事情，也会在 userdata 上发生。例如：
```lua
function ondraw()
  if who ~= self then
    return
  end

  local mount2 = mount
  mount2:lighta(T34.new("1m"), 1000)
end
```

上面的例子中，`mount2`和`mount`就是同一座牌山，
因为它们是 userdata，是引用。
对`mount2`进行操作，就是对`mount`进行操作。

那么，如果真的想要复制一份牌山，而不是复制引用，
该怎么办呢？凉拌。因为`Mount`类型不支持复制。
有些 userdata 支持复制，有些不支持。
如果想要复制 userdata，可在 [API 文档](/docs/editor/api/)
查找是否有相应的方法。
无论如何，对于 table, userdata, function 来讲，
赋值符号`=`只能复制引用，做不到复制对象本身。

上面看了复制 table 和 userdata 引用的例子。
为了防止误会，下面再举一个复制 function 引用的例子。

```lua
function make_bark()
  local bark_time = 1
  return function()
    print(bark_time)
    bark_time = bark_time + 1
  end
end

local bark = make_bark()
local bark2 = bark
bark()   -- 输出 1
bark2()  -- 输出 2，证明了 bark2 和 bark 是同一个闭包
```

「function 也是引用」这个知识点只对有上值的闭包有意义。
它意味看闭包无法（简单地）连同上值一起制作出独立的副本。

前面的例子都是围绕引用的赋值问题展开的。
除了赋值，函数参数与返回值的传递也存在同样的问题：

```lua
function change_number(n)
  n = 2
end

local a = 1
change_number(a)
print(a)
```
测试知最后`a`还是 1，因为修改的是副本，本体不受影响。
类似的代码到了表这里就不同了：
```lua
function change_table(t)
  t.n = 2
end

local a = {}
a.n = 1
change_table(a)
print(a.n)
```
测试知`a.n`被修改为 2。
原理和赋值一样：table, userdata, function 的名字代表的是引用，
传递参数就是复制，复制引用就是让两个引用指向同一对象。

<br />

## 相等判断

对于引用而言，相等判断，默认判断的是是否引用同一对象：

```lua
local a = {}
local b = {}
print(a == b)
```

测试知输出 false。`a`和`b`都是空表，为何不相等呢？
因为它们是引用类型。
虽然它们引用的都是空表，但不是同一张表，所以不相等。

不过对于`T34`而言，情况不同：

```lua
local a = T34.new("3s")
local b = T34.new("3s")
print(a == b)
```

`T34`是 userdata，所以也是引用类型。
每次调用`T34.new`，都会创建一个新的对象，
也就是`a`和`b`引用两个不同的对象。
然而相等判断却输出了 true。
这是因为，松饼修改了`T34`的`==`的默认行为，
由判断是否为同一对象改为判断花色与数值是否相同。

如果松饼修改了某个 userdata 的`==`的判断标准，
那么 API 文档中就一定有相关的说明。
也就是说，API 文档中没有提及`==`的判断标准的 userdata 类型，
都会按照 Lua 默认的「是否指向同一对象」来判断。

然而有一点需要注意。对表进行读写时，如果键是引用类型的，
键的匹配就会一律按照「引用同一对象」来判断，
无论这个类型的`==`是什么逻辑：

```lua
local a = T34.new("3s")
local b = T34.new("3s")
local t = {}
t[a] = "必须死"
t[b] = "就打这张"
print(t[a])
```

以上例子输出「必须死」。
虽然松饼修改了`T34`的相等判断标准，
使得`a == b`的结果是 true，
但表的访问不吃这一套，
仍然按照「同一对象」的基准进行值的查找与修改。
因此，除非想做一些特别的骚操作，
否则表键最好不用引用类型，只用 number 或 string。
比如，上面的例子可以改写成这样：

```lua
local a = T34.new("3s")
local b = T34.new("3s")
local t = {}
t[a:id34()] = "必须死"
t[b:id34()] = "就打这张"
print(t[a])
```

测试可知，改用返回 number 的`id34`后，输出「就打这张」。

<br />

## 序列

在 Lua 中，有一种特殊的表叫序列。
序列需要满足两个条件之一：

- 没有整数键
- 整数键连续

```lua
local t = {}    -- t 是序列
t[1] = "呵呵"   -- t 是序列
t[2] = "哈哈"   -- t 是序列
t[4] = "嘿嘿"   -- t 不是序列（整数键不连续，缺个3）
t[4] = nil      -- t 是序列（不连续元素被删除）
t["嘎"] = "吔"  -- t 是序列（非整数键不影响是不是序列）
```

在不同的学科、或者不同的编程语言中，
表、序列这些术语的定义会有区别，
而这些区别有时是致命的。
松饼的 API 文档对待这些术语相对谨慎，
说表就是 Lua 表，说序列就是 Lua 序列。
注意不要误解成其它学科或语言里的意思。
另外尤其要注意不要乱用「集合」这个词 ——
集合是另一种特殊的表，后文会详细解释。
如果张口就来，把表或者序列称作集合，是会被人吊起来啪啪啪的。

在一个序列前面加`#`，可得到序列的「边界」。
如果一个序列的键从 1 开始，并且不含非整数键，
那么所谓的「边界」，就是序列里元素的个数：

```lua
local t = {}
for i = 1, 100 do
  t[i] = "咕"
end

print(#t)
```

测试见输出 100，因为我们向`t`里放了 100 个咕，所以`#t`的值为 100。

「边界」的准确定义说起来比较啰嗦，就不解释了。
总之，对于一个序列，如果它的键是从 1 开始的连续整数，那么边界就是序列里的元素个数。
如果序列里掺杂了非整数键，或者不从 1 开始，边界就不一定等于个数，
这种情况求边界也没什么意义。
而对一个不是序列的表（整数键不连续）使用`#`，结果是玄学，完全无意义。

多数情况下，人们不会向一个序列里掺杂非整数键。
从下文开始，如无特别说明，我们默认「序列」都不掺杂非整数键，
并且键从 1 开始。
松饼 API 文档中所提及的序列，也都满足「不含非整数键」和「键从 1 开始」这两个特性。
这样一来，我们就可以随时通过`#`来得到它们的元素个数。

<br />

## pairs, ipairs

我们可以通过`for`和`pairs`遍历表里的键和值：

```lua
local account = {}
account["用户名"] = "喵打"
account["密码"] = "123456"
account["年龄"] = 17

for k, v in pairs(account) do
  print(k .. "好像是" .. v)
end
```

测试得输出：
```
密码好像是123456
年龄好像是17
用户名好像是喵打
```

以上代码中的`for`与上一讲的`for`不同，是另一种`for`。
上一讲的`for`，循环变量是个 number，在一个范围内变化。
这次的`for`，有两个循环变量`k`和`v`，在每一次循环中分别为键和值。
这个`for`要和`pairs`搭配使用。
`pairs`是 Lua 自带的一个函数，用途基本就是和`for`配合使用，以遍历一张表。

本例中，建表的顺序是用户名、密码、年龄，
但输出的顺序却是密码、年龄、用户名。
这是因为在 Lua 中，`pairs`遍历的顺序是未定义的。
啥叫未定义？就是爱咋咋地。
人家想用什么顺序，就用什么顺序，不服憋着。

除了`pairs`，Lua 还有一个`ipairs`，可以用来遍历序列：

```lua
local record = {}
record[1] = "飞两家"
record[2] = "飞三家"
record[3] = "被M哥副将飞人，鸽了"

for i, v in ipairs(record) do
  print(i .. "回战" .. v)
end
```

测试可得输出：

```
1回战飞两家
2回战飞三家
3回战被M哥副将飞人，鸽了
```

`ipairs`和`pairs`主要有两个不同点：

- `ipairs`通常只用于序列，`pairs`可用于任何表
- `ipairs`保证键的顺序从小到大，`pairs`的顺序未定义

利用`ipairs`，可以做一个典型的进张加速挂：

```lua
function ondraw()
  if who ~= self then
    return
  end

  for _, t in ipairs(game:gethand(self):effa()) do
    mount:lighta(t, 100)
  end
end
```

根据 [API 文档]({{ site.data.link.slate }})，
`game:gethand(self)`可以拿到一个`Hand`类型的 userdata，
代表自己的手牌。接着继续调用`Hand.effa`方法，获得这副牌的有效牌序列。
我们遍历了这个序列，达到了「每种有效牌加 100 毫兔」的效果，从而使进张加速。

在这个`for`的内部，我们只使用了值`t`，没有使用键`_`。
在 Lua 中，没有用到的变量，习惯上会以`_`命名。

<br />

## 表和序列的初始化

表可以在创建时放入一些初始值：

```lua
local t = {
  ["用户名"] = "喵打",
  ["密码"] = "123456",
  ["年龄"] = 17,
}
```

语法一目了然。值得一提的是，大括号里的最后一个逗号可加可不加。
也就是说，上面的代码也可以写成这样：

```lua
local t = {
  ["用户名"] = "喵打",
  ["密码"] = "123456",
  ["年龄"] = 17
}
```

在某些人看来，不加最后的逗号，看起来更自然。
但是加上最后的逗号有一个好处，就是你将来想在最后增加一项时，
不用费事地给倒数第二项后面补个逗号；
删掉最后一项时，也不用强迫症地删掉前面一项后面的逗号。

比起先建空表，再向里面加东西，直接在建表的同时加初始值，
理论上运算会更快一些。

如果键是一个字符串字面值，同时也是一个合法的变量名，
那么中括号和引号就可以省略了：

```lua
local t = {
  username = "喵打",
  password = "123456",
  age = 17
}
```

我们也可以在大括号里只写值，不写键，
这样就可以得到一个序列，并且键从 1 开始：

```lua
local record = {
  "飞两家",
  "飞三家",
  "被M哥副将飞人，鸽了",
}

for i, v in ipairs(record) do
  print(i .. "回战" .. v)
end
```

<br />

## 集合

我们可以用一张表去检测「有还是没有」：

```lua
local menu = {
  ["澳洲鲍鱼"] = true,
  ["一斤多的龙虾"] = true
}

function order(name)
  if menu[name] then
    print("这个可以有")
  else
    print("这个真没有")
  end
end

order("澳洲鲍鱼")
order("小野鸡炖蘑菇")
```

在上面的例子中，
我们利用了「不存在的键，对应的值为 nil」和「if 判断中 nil 为假」
这两条语法规则，达到了通过表来查询「有没有」的目的。
这种用来记录、判断「有没有」的表，通常叫「集合」。
集合的关键，在于我们要查的东西被做成了表的键，而不是值。
判断表里有没有某个键，是极其简单的：

```lua
if t[target] ~= nil then
  ...
end
```

而判断表里有没有某个值，就麻烦了：

```lua
for _, v in pairs(t) do
  if v == target then
    ...
  end
end
```

这不仅仅是代码长不长的问题，还涉及到性能。
查找一个键，等同于在教室里大喊一声「我需要你」，
马上就能有桃子冒出来；
而查找一个值，等同于一个一个地问教室里的每一个人「你是桃子吗」，
理论上效率更低。

当元素总量不大时，遍历查找可能比集合查找还快（因为省去了建立集合的代价）。
对于要不要建立集合的问题，
需要把性能是否重要、数据量大不大、以及代码写起来是否方便等因素都考虑在内。

<br />

## 标准库 table

Lua 提供了几个用来处理表的常用函数。
这些函数都被放到了一个名叫`table`的表里。

`table.concat`可以用来把一个序列连成一个字符串：

```lua
local yaku = {
  "立直", "一发", "自摸", "平和",
  "纯全", "三色", "一杯口", "抖拉三"
}

print(table.concat(yaku))
```

输出：
```
立直一发自摸平和纯全三色一杯口抖拉三
```

`table.insert`可以在序列的某个位置插入一个值：

```lua
local yaku = {
  "立直", "一发", "自摸",
  "纯全", "三色", "一杯口", "抖拉三"
}

table.insert(yaku, 4, "平和")
print(table.concat(yaku))
```

如果想在序列的末尾插入（爆菊），更常见的写法是直接利用边界：

```lua
local yaku = {
  "立直", "一发", "自摸", "平和",
  "纯全", "三色", "一杯口" 
}

yaku[#yaku + 1] = "抖拉三"
print(table.concat(yaku))
```

还有用来删除的`table.remove`，用来排序的`table.sort`等等，
就不一一介绍了，网上文章一大堆。

<br />

## 练习题

（施工中）

<br />

下一讲：（施工中）

