---
layout: page
title: 麻将逻辑
permalink: /docs/libsaki/table/
---

麻将逻辑位于`libsaki/table`目录，
其中最主要的是`table.h`中定义的`Table`类。

`Table`内部的变量、函数的命名用到了一些日语，
但不会日语也不影响`Table`代码的阅读，遇到生词 Google 搜一下就行了。

<br />

##  Table 的基本用法

打开`table.h`，映入眼帘的是`TablePrivate`。
往下撸，会看到`class Table : private TablePrivate`。
为了让拷贝构造函数写起来无遗漏，
所有的可以默认拷贝的成员都放到了`TablePrivate`里。
其实绝大部分`Table`的数据成员也都在这里了。
这些成员大多数都是见名知义的，剩下的不直白的后文会有说明。

`Table`的成员函数大多数都是`const`的，用于查看牌桌当前状态。
而用于改变牌桌当前状态的成员函数只有`start`和`action`。
用状态机的角度看，属于 Moore Machine。

`start`用于开始一桌。
「一桌」的长度由`Rule`中的`roundLimit`决定，单位为局数。
例如东风战`roundLimit`就是 4，东南战`roundLimit`就是 8。
`start`只能在生命周期的开头被调用一次，
将来可能会被合并到构造函数当中。

`action`用于输入一家的操作，没什么好解释的。

也就是说，`Table`的基本用法如下：
```
Table table;
table.start();

while (没结束) {
    各种数据 = table.getXxxx(....); // 尽情调用各种const成员函数

    处理(各种数据); // 拿到牌桌数据，爱干嘛干嘛

    table.action(...); // 输入一个操作，更新牌桌状态 
}
```

`libsaki/table/table_tester`是用于测试`Table`的一个类，
里面的`TableTester::run()`是一个 4 个 AI 对打的简单例子。

有 UI 的单机游戏大概是这样的：
```
on场景初始化()
{
    table = new Table(...);
}

on点击按钮()
{
    table.action(...);
    AI计算(...);
    UI刷新(...);
}
```

联机服务器大概是这样的：
```
on网络请求()
{
    if (开始新桌) {
        table = new Table(...);
        table.start()
    } else if (打牌操作) {
        table.action(...);
    }

    同步给客户端(...);
}
```

`Table`不是线程安全的，通常只从一个线程访问。

<br />

## 行动选项集 Choices

想知道当前牌局中「谁」可以「干什么」，调用`Table::getChoices(Who)`，
他的返回值是个`Choices`。

`libsaki/table/choices.h`定义了`Choices`类，
用于记录一个操作者可以选择的行动的选项，
比如都能切哪些牌，能否立直，能否鸣牌等等。

在早期的松饼代码中，行动选项集就是一个简单的集合，
里面记录了可选的`Action`。但后来发现，
无论使用`set`, `bitset`, `vector`还是别的什么，都有很多不方便的地方。
其根本原因在于麻将的选项集里的`Action`不是可以任意组合的，
而是有一定的规律的——为了体现这个规律，我们需要自己实现一个记法。

所谓的「规律」，主要指以下这些：
- 可以掷骰子的时候肯定不能切牌
- 摸打的时候，只要不是立直宣言，就肯定能自摸切
- 可以切牌的时候肯定不能鸣牌
- 别人可以切牌的时候自己肯定不能切牌
- ……

通过以上规律可以总结出，行动选项是有状态的。
在 Libsaki 里，我们区分 6 个状态：
- `WATCH` 没轮到自己，什么也干不了
- `IRS_CHECK` 弹出主动技能操作面板，需要发动主动技能
- `DICE` 该掷骰子了
- `DRAWN` 摸完牌，该打牌了
- `BARK` 别人打出可以鸣牌/食和的牌，该选择要还是跳过
- `END` 一局结束，该点击进入下一局的按钮了

在摸完牌后，除了打牌，可能还会有立直、暗杠、自摸、九九等选项。
这些「摸牌后可以干什么」的信息保存在`mModeDrawn`里。
类似地，「别人打完牌可以干什么」的信息存在`mModeBark`里，
「一局结束后可以干什么」存在`mModeEnd`里。
由于这三个 struct 中只会有一个在同一时刻有用，
我们把它们做成了一个 union。

通过`Choices`里的`drawn()`和`bark()`
可以随时取出摸牌后或他家打牌后的行动选项数据。

就像`Action`和`Choices`一样，Libsaki 中对于 trivially-copyable 的小对象，
倾向于使用「类型枚举 + union」的方式实现「或」类型。

<br />

## 有节操的视角 TableView

AI 计算或 UI 渲染可通过`Table`里的各种`get`方法随意获取信息，
包括对手的手牌，这是很没节操的。

为了防止写 AI 或 UI 时手滑获得透视能力，
可以借助`TableView`。有了`TableView`，就只能看到该看到的东西。

使用`Table::getView(who)`即可获得一个`TableView`。

`TableView`是一个抽象接口。
Libsaki 的内置 AI 实现`Ai`是基于`TableView`观测牌桌的，
因此数据源可以不拘泥于`Table` —— 可以是假想的牌桌，甚至是松饼以外的麻将。

<br />

## 通过 TableObserver 观察牌桌

通过实现接口`TableObserver`，可以捕捉到`Table`中发生的各种事件。
`TableObserver`定义在`libsaki/table/table_observer.h`。

`TableEvent`参数提供的是一些临时性的上下文，
而持久性的数据可通过`Table`里的那些`const`方法随时获取。

各种`TableEvent`的发生时机时机如下：

|---------------------|----------------------|
| 参数类名            | 发生时机             |
|---------------------|----------------------|
| `TableStarted`      | 一桌开始后           |
| `FirstDealerChosen` | 起家决定后           |
| `RoundStarted`      | 一局开始后           |
| `Cleaned`           | 牌桌被清理后         |
| `Diced`             | 掷骰子后             |
| `Dealt`             | 配牌后               |
| `Flipped`           | 新宝牌指示牌被翻出后 |
| `Drawn`             | 摸牌后               |
| `Discarded`         | 打牌后               |
| `RiichiCalled`      | 立直宣言后           |
| `RiichiEstablished` | 立直通过后           |
| `Barked`            | 鸣牌后               |
| `RoundEnded`        | 一局结束后           |
| `PointsChanged`     | 分数变动后           |
| `TableEnded`        | 一桌结束后           |
| `PoppedUp`          | 感知类能力信息弹出后 |
|---------------------|----------------------|

<br />

目前实现了`TableObserver`接口的地方有：
- 技能接口类`Girl`
- 客户端UI显示
- 牌谱记录器
- 未来视牌山副本记录器
- 服务端联机对战消息发送
- 服务端技术统计

将来可能有更多地方用到`TableObserver`。

不想写 type-switch 时，可以用`TableObserverDispatched`。

<br />

## 环境提供器 TableEnv

当前时间、今夜月相、星空可见度、鹤姬从白水取得的钥匙、
由晖子当天是否已使用左手等信息需要由外部提供，
而且是平台相关的。
所以有了这么个接口。

<br />

## 局的记法

「局」用整数表示。0 表示东一局，1 表示东二局，以此类推。
代码内部把局称为`round`。

本场也用整数表示，0 表示 0 本场，1 表示 1 本场，以此类推。
Libsaki 内部不区分连庄本场与流局本场（不过 UI 上是区分的），
也不区分流局场棒与连庄场棒（因为没有八连庄等规则）。
代码内部把本场称为`extraRound`。

<br />

## 焦点牌与焦点

焦点牌指当前时点下唯一可能被食和的牌。
具体定义如下：
- 配牌后，庄家还没有打牌或暗杠时，不存在焦点牌
- 有人打牌后，这张被打出的牌成为焦点牌
- 有人加杠后，加上去的牌成为焦点牌
- 有人暗杠后，暗杠中的任意一张牌成为焦点牌

大多数情况下，焦点牌就是最近被打出的一张牌。

焦点牌与打出（或杠出）焦点牌的人统称为焦点。
代码内部把焦点称为`focus`，使用得很频繁。

<br />

## IRS 代理

`Table`本身只处理打牌、鸣牌、和牌等常规操作，
对于 IRS 是一无所知的。
每当`Table::action()`收到 IRS 操作，
都会转发给`Girl`进行处理。这个过程叫 *IRS 代理*。

我们会在`Girl`的说明文档中继续解释有关 IRS 代理的细节。

