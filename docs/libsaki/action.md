---
layout: page
title: 行动
permalink: /docs/libsaki/action/
---

## Action 类的组成

Libsaki 中，我们把切牌、吃碰等操作统称为*行动（Action）*。
`Action`定义在`libsaki/unit/action.h`，一个`Action`对象代表一次行动输入。

`Action`包含三个字段：
1. 区分行动类型的`ActCode mAct`
2. 一个`int`和`unsigned`组成的union
3. 一个`T34`和`T37`组成的union

`Action`是一个相当小，相当吝啬的类，不过还没有吝啬到用位运算的程度，
所以结果就是一堆union…… 不管了，反正能用就行x

总的来说一个`Action`就是一个`ActCode`加最多两个参数。

## Action Code

`ActCode`用于区分行动的类别。
不同类别的行动，需要的参数也不同。

|------------------|-----------------|-------------|
| 枚举值           | 意义            | 需要参数    |
|-----------------:|----------------:|------------:|
| `NOTHING`        | 零值，占位      |             |
| `PASS`           | 跳过鸣牌或食和  |             |
| `SWAP_OUT`       | 手切            | `T37`切哪张 |
| `SPIN_OUT`       | 自摸切          |             |
| `SWAP_RIICHI`    | 手切立直        | `T37`切哪张 | 
| `SPIN_RIICHI`    | 自摸切立直      |             |
| `CHII_AS_LEFT`   | 吃（1+23）      | `int`晒赤数，`T37`吃后打牌 |
| `CHII_AS_MIDDLE` | 吃（2+13）      | `int`晒赤数，`T37`吃后打牌 |
| `CHII_AS_RIGHT`  | 吃（3+12）      | `int`晒赤数，`T37`吃后打牌 |
| `PON`            | 碰              | `int`晒赤数，`T37`碰后打牌 |
| `DAIMINKAN`      | 大明杠          |  |
| `ANKAN`          | 暗杠            | `T34`所杠牌种类 |
| `KAKAN`          | 加杠            | `int`碰的下标 |
| `TSUMO`          | 自摸和          |  |
| `RON`            | 食和            |  |
| `RYUUKYOKU`      | 九种九牌流局    |  |
| `END_TABLE`      | 宣告一桌结束    |  |
| `NEXT_ROUND`     | 宣告一桌续行    |  |
| `DICE`           | 掷骰子   |  |
| `IRS_CHECK`      | 发动选项型局中技能   | `unsigned`选项结果 |
| `IRS_CLICK`      | 发动点击型局中技能   |  |

这里有几个词需要解释一下：

- Swap：Libsaki 内部手切一律叫 swap。
- Spin：职业雀士打牌的视频中，经常看到自摸牌橫放到手牌上方后，
        因为磁铁打转一周（spin），
        然后就顺着旋转把这张牌摸切出去的场面。
        因此 Libsaki 内部自摸切一律叫 spin。
- IRS：In-Round Skill 的缩写，代表「局中技能」。
       将来可能还会有局外技能（Out-of-Round Skill），
       例如赤土的情报收集。
- 晒赤数：从手牌向副露中晒出的赤牌个数  
  例如，手牌中有 005p，有人打出一张 5p，
  这时可以用两张 0p 去碰，也可以用一张 0p 和一张 5p 去碰。
  这两种操作的晒赤数分别为 2 和 1。

