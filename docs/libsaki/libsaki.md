---
layout: page
title: Libsaki代码导读
permalink: /docs/libsaki/
---

## General

本系列页面介绍松饼麻雀核心库——Libsaki的代码细节。

*秀爱代码前必看[松饼C++代码规范](/docs/cpp/)。* 

Libsaki由C++写成，不依赖第三方库。

## 分层结构

Libsaki的架构分为7层：

| 层级 | 层名         | 相关目录 |
| :--: | :----------: | :------: |
| 6    | 应用层       | `/app`   |
| 5    | 操作与观察层 | `/table` |
| 4    | 能力干涉层   | `/girl`  |
| 3    | 标准麻将层   | `/table` |
| 2    | 手牌/役种层  | `/form`  |
| 1    | 基本单位层   | `/unit`  |

<br />

(TODO)

