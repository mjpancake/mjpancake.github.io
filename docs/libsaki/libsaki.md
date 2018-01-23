---
layout: page
title: Libsaki 代码导读
permalink: /docs/libsaki/
---

## 概要

本系列文章介绍松饼麻雀核心库——Libsaki的代码细节。

*修改代码前必看[松饼C++代码规范](/docs/cpp/)。* 

Libsaki 由 C++ 写成，
依赖的第三方库都以源码形式位于代码树内，可直接无脑编译。

## 分层结构

Libsaki的架构分为5层：

| 层级 | 层名         | 相关目录 |
| :--: | :----------: | :------: |
| 5    | 应用层       | `/app`   |
| 4    | 能力干涉层   | `/girl`  |
| 3    | 标准麻将层   | `/table` |
| 2    | 手牌/役种层  | `/form`  |
| 1    | 基本单位层   | `/unit`  |

<br />

以下文档是有顺序的，请从上往下按顺序阅读。

1. 基本单位层
  - [麻将牌`T34`与`T37`](/docs/libsaki/tile/)
  - [牌桌内身份标识`Who`](/docs/libsaki/who/)
  - [行动`Action`](/docs/libsaki/action/)
  - [副露`Meld`](/docs/libsaki/meld/)

2. 手牌/役种层
  - [一堆麻将牌`TileCount`](/docs/libsaki/tilecount/)
  - [手牌`Hand`](/docs/libsaki/hand/)
  - [手役`Form`](/docs/libsaki/form/)

3. 标准麻将层
  - [牌山系统`Mount`](/docs/libsaki/mount/)
  - [麻将逻辑`Table`](/docs/libsaki/table/)

4. 能力干涉层
  - [角色能力`Girl`](/docs/libsaki/girl/)
  - [发牌姬`Princess`](/docs/libsaki/princess/)

5. 应用层
  - 牌谱`Replay`
  - 手役生成器`Gen`

