---
layout: page
title: 松饼 C++ 代码规范补充说明页
permalink: /docs/cpp-note/
---

© 2017 - 2018 Rolevax，保留所有权利。

返回[松饼 C++ 代码规范](/docs/cpp/)页面

## <a name="stairs"></a>对「简单阶梯形」与「简单锯齿形」的定义 

「简单阶梯形」的基本定义：缩进层级逐行加一。

```
// 简单阶梯形
if (hungry())
    eat(pancake);

// 简单阶梯形
while (hungry())
    for (i = 0; i < 10; i++)
        if (isGood(pancake))
            eat(pancake);

// 只有最里面的if是简单阶梯形，其余的都必须加大括号
while (hungry()) {
    for (i = 0; i < 10; i++) {
        drink(tea);
        if (isGood(pancake))
            eat(pancake);
    }
}
```

补充：
- 条件必须只占一行。只要条件占据多行，就不是简单阶梯形。
- 带有`else`的`if`不属于简单阶梯形。

「简单锯齿形」的基本定义：缩进层级逐行交替增减的`if`语句。

```
// 简单锯齿形
if (hungry())
    eat(pancake);
else
    drink(tea);

// 简单锯齿形
if (superHungry())
    bigEat(pancake);
else if (hungry())
    eat(pancake);
else
    drink(tea);

// 不是简单锯齿形
// 除了简单阶梯形的for部分以外，都必须加大括号
if (superHungry()) {
    for (int i = 0; i < 10; i++)
        eat(pancake);
} else if (hungry()) {
    eat(pancake);
} else {
    drink(tea);
}
```

补充：
- 条件必须只占一行。只要条件占据多行，就不是简单锯齿形。


