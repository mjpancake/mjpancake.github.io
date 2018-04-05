---
layout: page
title: 函数
permalink: /docs/editor/func/
---

「松饼人物编辑器：从入门到欧耶」系列教程（三）

## 上一讲的习题参考答案

1) `a`, `b`, `c`满天飞，滥用隐式类型转换（等等）  
2) 合法：`doge`, 非法：`good-doge`  
3) number, string, nil, boolean  
4) `false`

<br />

## 函数

函数是确保代码可维护性的重要手段之一。

所谓「可维护」，就是指改起来方便。
代码改起来方不方便，可以决定项目的生死。

举一个粟子：

```lua
print("我爽美如画x")
print("我爽画中仙x")
print("我爽总冠军x")
print("我爽裱三家x")
```

三狗测试，见输出的一首好湿。
好湿啊好湿，我永远喜欢狮子原爽.jpg。

后来不知怎么回事，从爽厨变成了魔法少女厨，
所以修改了代码：

```lua
print("军师美如画x")
print("军师画中仙x")
print("军师总冠军x")
print("我爽裱三家x")
```

结果不小心漏改了最后一行，
输出前三句都是军师，最后一句成了我爽，这就尴尬了。

怎么办？

- 把代码改过来不就得了？
    - 那么下次要是又变成了龙华厨，岂不是要再冒一次漏改的风险？
- 下次再改的时候小心点不就得了？
    - 你慢慢小心x
- 我永远喜欢末原恭子.jpg，下次不会再改了x
    - 你慢慢永远喜欢x

所以函数大法好。有了函数，这代码就好改了：

```lua
function poetize(name)
  print(name .. "美如画x")
  print(name .. "画中仙x")
  print(name .. "总冠军x")
  print(name .. "裱三家x")
end

poetize("军师")
```

这样一来，下次改吹龙华的时候，只需改一处，
剩下的都不用动。

函数不但好改，而且还可以反复使用：

```lua
function poetize(name)
  print(name .. "美如画x")
  print(name .. "画中仙x")
  print(name .. "总冠军x")
  print(name .. "裱三家x")
end

poetize("我爽")
poetize("军师")
poetize("龙华")
poetize("姬子")
```

三狗测试，见以上代码又吹我爽，又吹军师，又吹龙华，又吹姬子。
如果不用函数，这么一波吹下来，得写上大量的重复代码，
不旦写着麻烦，将来改起来也麻烦。
所以，函数大法好。
多用函数，简化代码，延年益寿，岂不美哉x

<br />

## 代码详解

```lua
function poetize(name)
  print(name .. "美如画x")
  print(name .. "画中仙x")
  print(name .. "总冠军x")
  print(name .. "裱三家x")
end

poetize("军师")
```

这段代码定义了一个叫`poetize`的函数，
然后以`"军师"`为参数调用了一下它。

- 定义函数时，先写`function`，再写函数名，
  再写「参数列表」，再写定义的内容，最后写`end`。
  所谓「参数列表」，就是一个括号，里面写上任意个变量名。
  本例中我们只写了一个`name`变量。
- 调用函数时，先写函数名，再加个括号，
  括号里填上参数就行了。

函数有多个参数时，用逗号分隔：

```lua
function poetize(name, suffix)
  print(name .. "美如画" .. suffix)
  print(name .. "画中仙" .. suffix)
  print(name .. "总冠军" .. suffix)
  print(name .. "裱三家" .. suffix)
end

poetize("军师", "x")
poetize("军师", "!")
```

<br />

## 返回值

函数是可以「返回」值的。
「返回」的意思是说，哪儿来的回哪儿去。

```lua
function f(x)
  return x .. x
end

function g(x)
  y = f(x) .. "美如画"
  return y .. "!"
end

print(g("我爽"))
```

三狗测试，见输出「我爽我爽美如画!」。
这个「我爽我爽美如画!」是怎么算出来的呢？

首先，这个输出肯定是从`print`那里出来的，
也就是说，那个`g("我爽")`的值就是`"我爽我爽美如画!"`。
那么`g("我爽")`的值又为什么是`"我爽我爽美如画!"`?

这得看`g`这个函数是怎么定义的。

(TODO)

<br />

## 局部变量

