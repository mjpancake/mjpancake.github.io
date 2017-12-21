---
layout: page
title: 麻将逻辑
permalink: /docs/libsaki/table/
---

麻将逻辑位于`libsaki/table`目录，
其中最主要的是`table.h`中定义的`Table`类。

<br />

## 从零开始写出 Table 类

本小节以从零开始，一步步添加代码的方式解释`Table`类的设计与实现。
每个阶段的解释都围绕一段类似 C++ 的伪代码展开。

### 第一阶段：基本流程

整个打麻将的流程大概是这样的：

```
while (还没结束) {
    读取一家输入();
    if (所有被激活的操作者都输入了) {
        处理输入();
        激活下一批操作者();
    }
}
```

解释两个词：“操作者”与”激活“。

”操作者“是人类用户与AI的统称。每一桌麻将都必定有4个操作者。
在代码内部，操作者叫`TableOperator`。
`Table`内部不区分人类和AI，只跟`TableOperator`直接交互。

“激活“指的是”激活操作面板“。
麻将是一种回合制的东西，
而回合的交替并非按照固定的顺序循环（因为可以鸣牌），
而且同一时刻可以操作的人可以有多个（比如双响）。
所以“轮到谁操作”应该是由麻将逻辑内部决定的。

目前松饼暂时不支持“撤回激活”
（比如天凤里的“还没点吃，就被人碰，于是吃的按钮消失“），
只能等到所有的被激活者都响应了以后才开始做处理。
在代码内部，激活叫`activate`。

### 第二阶段：解耦输入

```
// Libsaki 外部代码
while (还没结束) {
    Who who = 读取输入者();
    Action act = 读取输入();
    action(who, act);
}
```

```
// Libsaki 内部代码
void action(Who who, const Action &act) {
    if (所有被激活的操作者都输入了) {
        处理输入();
        激活下一批操作者();
    }
}
```

以上两段伪代码和第一阶段有两点区别：
1. 将读取输入部分移到了 Libsaki 外部  
   如此一来，Libsaki 就不用管输入的方式，只需要专心管麻将逻辑。
2. 主循环挪到了 Libsaki 外部  
   于是外部可以随意控制输入的频率与时机。

### 第三阶段：Table 类

```
// Libsaki 外部代码
Table table;
while (还没结束) {
    Who who = 读取输入者();
    Action act = 读取一家输入();
    table.action(who, act);
}
```

```
// Libsaki 内部代码
class Table
{
public:
    void action(Who who, const Action &act)
    {
        if (所有被激活的操作者都输入了) {
            处理输入();
            激活下一批操作者();
        }
    }

private:
    Mount mMount;                 // 牌山
    std::array<River, 4> mRivers; // 四家牌河
    std::array<Hand, 4> mHands;   // 四家手牌
}
```

牌桌是有状态的（牌山、牌河、手牌），
所以我们把牌桌逻辑做成了一个类。

### 第四阶段：TableOperator 类

```
// Libsaki 外部代码

class Ui : public TableOperator // 人类操作者，从UI界面读操作
{
public:
    Ui(Who self) : mSelf(self) {}

    void onActivated(Table &table) override
    {
        Action act = 读取用户输入的操作();
        table.action(mSelf, act);
    }

private:
    Who mSelf;
};

class Ai : public TableOperator // AI操作者，计算得出操作
{
public:
    AI(Who self) : mSelf(self) {}

    void onActivated(Table &table) override
    {
        Action act = 计算得出操作();
        table.action(mSelf, act);
    }

private:
    Who mSelf;
};

Ui ui(Who(0));
Ai ai1(Who(1)), ai2(Who(2)), ai3(Who(3));
std::array<TableOperator *, 4> { &ui, &ai1, &ai2, &ai3 };
Table table(operators);
table.start();
```

```
// Libsaki 内部代码
class Table
{
public:
    Table(const std::array<TableOperator*, 4> &operators)
        : mOperators(operators)
    {
    }

    void start()
    {
        mOperators[起家.index()].onActivated();
    }

    void action(Who who, const Action &act)
    {
        if (所有被激活的操作者都输入了) {
            处理输入();
            for (TableOperator *op : mOperators)
                if (应该激活这个op)
                    op->onActivated(*this);
        }
    }

private:
    std::array<TableOperator *, 4> mOperators;
    ...
}
```

操作者需要知道自己有没有被激活，所以我们通过`onActivated`进行通知。

外部代码仍可决定输入是同步的还是异步的。
操作者不必在`onActivated`内部立刻做出`action`，
可以先让`onActivated`返回，之后再调用`table.action()`。

如果4个操作者都是同步输入的（都在`onActivated()`内部立即调用`action`），
`action`和`onActivated`会一直互相递归调用下去，直到一个半庄/东风结束。
在使用 Libsaki 京狗 AI 的情况下，这个计算量是秒级的。

### 第五阶段：现有源代码

通过以上四个阶段，`Table`的大体结构和用法也解释得差不多了，
剩下的都是细节。之后的小节会对这些细节分类说明。

<br />

## 有节操的视角 TableView

在`TableOperator::onActivated`被调用之后，
操作者可以通过`Table`里的各种`get`方法随意获取信息，
包括对手的手牌，这是很没节操的。

为了防止写 AI 或 UI 时手滑获得透视能力，
可以借助`TableView`。有了`TableView`，就只能看到该看到的东西。

使用`Table::getView(who)`即可获得一个`TableView`。

<br />

## 行动选项集 Choices

`libsaki/table/choices.h`定义了`Choices`类，
用于记录一个操作者可以选择的行动的选项，
比如都能切哪些牌，能否立直，能否鸣牌等等。

在早期的松饼代码中，行动选项集就是一个简单的集合，
里面记录了可选的`Action`。但后来发现，
无论使用`set`, `bitset`, `vector`还是别的什么，都有很多不方便的地方。
其根本原因在于麻将的选项集里的`Action`不是可以任意组合的，
而是有一定的规律的——为了体现这个规律，我们需要自己实现一个记法。

所谓的“规律”，主要指以下这些：
- 可以掷骰子的时候肯定不能切牌
- 可以切牌的时候，只要不是立直宣言，就肯定能自摸切
- 可以切牌的时候肯定不能鸣牌
- 别人可以切牌的时候自己肯定不能切牌
- ……

通过以上规律可以总结出，行动选项是有状态的。
在 Libsaki 里，我们区分 6 个状态：
- `WATCH` 没轮到自己，什么也干不了
- `CUT` 弹出主动技能操作面板，需要选择是否发动主动技能
- `DICE` 该掷骰子了
- `DRAWN` 摸完牌，该打牌了
- `BARK` 别人打出可以鸣牌/食和的牌，该选择要还是跳过
- `END` 一局结束，该点击进入下一局的按钮了

在摸完牌后，除了打牌，可能还会有立直、暗杠、自摸、九九等选项。
这些“摸牌后可以干什么”的信息保存在`mModeDrawn`里。
类似地，“别人打完牌可以干什么”的信息存在`mModeBark`里，
“一局结束后可以干什么”存在`mModeEnd`里。
由于这三个 struct 中只会有一个在同一时刻有用，
我们把它们做成了一个 union。

通过`Choices`里的`drawn()`和`bark()`
可以随时取出摸牌后或他家打牌后的行动选项数据。

就像`Action`和`Choices`一样，Libsaki 中对于小对象，
比起“继承 + 虚函数”，更倾向于使用“类型枚举 + union“的方式实现。

<br />

## 通过 TableObserver 观察牌桌

就像输入一样，输出也不是 Libsaki 的一部分，而是由外部代码实现的。
外部代码用于实现输出的接口类是`TableObserver`，
定义在`libsaki/table/table_observer.h`

`TableObserver`有一系列回调函数可以重写。
这些回调函数的参数提供的是一些临时性的上下文，
而持久性的数据可通过`Table`的`get`开头的一系列方法随时获取。

各个回调被调用的时机如下：

|-----------------------|----------------------|
| 函数名                | 被调用时机           |
|-----------------------|----------------------|
| `onTableStarted`      | 一桌开始后 |
| `onFirstDealerChosen` | 起家决定后 |
| `onRoundStarted`      | 一局开始后 |
| `onCleaned`           | 牌桌被清理后 |
| `onDiced`             | 掷骰子后 |
| `onDealt`             | 配牌后 |
| `onFlipped`           | 新宝牌指示牌被翻出后 |
| `onDrawn`             | 摸牌后 |
| `onDiscarded`         | 打牌后 |
| `onRiichiCalled`      | 立直宣言后 |
| `onRiichiEstablished` | 立直通过后 |
| `onBarked`            | 鸣牌后 |
| `onRoundEnded`        | 一局结束后 |
| `onPointsChanged`     | 分数变动后 |
| `onTableEnded`        | 一桌结束后           |
| `onPoppedUp`          | 感知类能力信息弹出后 |
|-----------------------|----------------------|

<br />

目前实现了`TableObserver`接口的地方有：
- 客户端UI显示
- 牌谱记录器
- 未来视牌山副本记录器
- 服务端联机对战消息发送
- 服务端技术统计

将来可能有更多地方用到`TableObserver`。

<br />

## Table 的构造函数

```
explicit Table(const std::array<int, 4> &points,
               const std::array<int, 4> &girlIds,
               const std::array<TableOperator *, 4> &operators,
               const std::vector<TableObserver *> &observers,
               Rule rule, Who tempDealer, const TableEnv &env);
```

- `points` 初始四家点数
- `girlIds` 四家角色ID
- `operators`, `observers` 见上文说明
- `rule` 规则配置
- `tempDealer` 假东（定座位抽到东的人，非起家）
- `env` 环境提供器（之后说明）

`Table`的另一个构造函数用于创建未来视副本，平时不用。

<br />

## 环境提供器 TableEnv

当前时间、今夜月相、星空可见度、白水取得的钥匙、
由晖子当天是否已使用左手等信息需要由外部提供，
而且是平台相关的。
所以有了这么个接口。

<br />

## 局的记法

“局”用整数表示。0 表示东一局，1 表示东二局，以此类推。
代码内部把局称为`round`。

本场也用整数表示，0 表示 0 本场，1 表示 1 本场，以此类推。
Libsaki 内部不区分连庄本场与流局本场（不过 UI 上是区分的），
也不区分流局场棒与连庄场棒（因为没有八连庄等规则）。
代码本部把本场称为`extraRound`。

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

## 行动转发

`Table`本身只处理打牌、鸣牌、和牌等常规操作，
对于技能是一无所知的。
每当`Table::action()`收到有关技能的操作（所有`IRS`开头的`ActCode`），
都会转发给`Girl`进行处理。这个过程叫*行动转发（Action Forwarding）*。

`Girl`在接到转发来的行动以后，可以做任何事，
并随意指定该操作者的下一次行动选择。
`Girl`有义务保证在收到行动转发以后妥善处理，
保证`Table`回归正轨。

我们会在`Girl`的说明文档中继续解释有关行动转发的细节。

