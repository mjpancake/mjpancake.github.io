---
layout: page
title: 牌桌内身份标识
permalink: /docs/libsaki/who/
---

## C++ 类 “Who” 的由来
 
松饼只关心四麻，短期内不考虑添加三麻。
因此，一桌上总会有4人。
在松饼的早期代码中，我们用 0 ~ 3 四个整数分别代表四家，
并把4个整数频繁地用于数组下标，以分别访问4家数据。

后来我们发现，代表四家的这四个整数有一套自己的常用运算：
比如求出对家是谁，求出某人掷出某点数的骰子后庄家是谁等等。
所以我们把这个区分身份用的整数封装成了一个类，
带来了易用性的同时也增加了类型安全性。

`Who`定义在`libsaki/unit/who.h`

## 用法

不带参数的`Who()`可以构造一个不代表任何人的身份标识。

```
Who who;
bool b1 = who.nobody();   // b1值为true
bool b2 = who.somebody(); // b2值为false
```

`Who(0)`代表牌桌上的第0个人，以此类推。
`index()`方法可以返回这个身份标识对应的数组下标。

```
Who who(2);
int i = who.index();      // i值为2
bool b1 = who.nobody();   // b1值为false
bool b2 = who.somebody(); // b2值为true
```

`right()`, `cross()`, `left()`方法分别计算一个身份标识的下家、对家、上家。

```
Who a(1);
Who b = a.right();
Who c = a.cross();
Who d = a.left();  // 此时d.index()返回0
```

如果没理解为什么上面的例子里`d.index()`为 0，看代码。

emmmm.... 这个类也没啥好解释的。

