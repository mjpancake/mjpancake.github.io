---
layout: page
title: 项目介绍与工作流程
permalink: /docs/workflow/
---

## <a name="intro"></a>项目介绍

松饼麻雀为开源项目，以开放、分享为原则。

松饼的多数组件采用MIT协议发布，Qt客户端采用LGPLv3协议发布。
改造定制，发布MOD，搭建私服都是没有问题的。
若基于松饼进行二次开发，建议（非强制）注明“基于松饼麻雀”字样并附以主站链接。

松饼项目采用Git管理，托管在GitHub上。

| 仓库                | 地址   | 语言/框架 |
| ------------------- | ------ | --------- |
| 核心库    | [`rolevax/libsaki`][libsaki]{:target="_blank"} | C++ |
| 客户端    | [`rolevax/mjpancake`][mjpancake]{:target="_blank"} | C++, QML, Javascript |
| 服务器（运维暂停中）| [`rolevax/ih`][ih]{:target="_blank"} | Go, SQL |
| 静态主站  | [`mjpancake/mjpancake.github.io`][pages]{:target="_blank"} | Jekyll |

[libsaki]: https://github.com/rolevax/libsaki
[mjpancake]: https://github.com/rolevax/mjpancake
[ih]: https://github.com/rolevax/ih
[pages]: https://github.com/mjpancake/mjpancake.github.io

<br />

## 先决条件

参与制作之前需要集齐以下先决条件：
1. 英文读写能力
  - 能看懂[这个](/docs/cpp/)就差不多了
1. 拥有GitHub账号
  - 如果没听说过Git及GitHub，可自行搜索学习，网上教程多如牛毛
1. 一定的编程基础
  - 如果没有相关基础，可自行搜索学习，网上教程多如牛毛
  - 参考[项目介绍](#intro)确认需要学习的语言
1. 熟悉项目源码
  - 可通过[开发者文档](/docs/)快速了解整体设计
  - 有问题基本靠吼，遇到疑点时不要犹豫，
    尽管在[Gitter]({{ site.data.link.gitter }}){:target="_blank"}提问
  - 目前文档只写到了一半，剩下的一半会根据大家实际问出的疑点定向完善
1. 不穿胖次
  - 不穿胖次有助于减少bug

## 具体工作流程

### 概要
- 基本沿用普通的fork及pull request流程
- 改动需提交到从`develop`分出的新分支上，再通过pull request合回`develop`分支
- 采用单线提交历史，全程只允许fast-forward合并
  - 参考[Git Branching - Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing){:target="_blank"}
- 有问题可在[Gitter聊天室]({{ site.data.link.gitter }}){:target="_blank"}提问
  - 为方便后人乘凉，建议公开提问，不建议私信

### 分支名规范
- 分支名以`new/`，`bug/`，或`etc/`为前缀
  - `new/`：更新内容，无论是用户看得到的还是看不到的
  - `bug/`：漏洞修复
  - `etc/`：其它类型，如重构
  - 在`new/`和`bug/`间犹豫时，选择`new/`
  - 在`new/`和`etc/`间犹豫时，选择`new/`
  - 在`bug/`和`etc/`间犹豫时，选择`bug/`
- 前缀以后的部分只允许小写字母、数字与中划线“`-`”（不允许下划线“`_`”）

### 提交消息规范
- 英语
- 适当省略冠词
- 首字母小写
- 句尾无句号
- 祈使句
  - 正面例子：add sm combo skill
  - 反面例子1：sm combo skill
  - 反面例子2：added sm combo skill
  - 反面例子3：adds sm combo skill
- 不要绕弯
  - 正面例子：solve xxxx
  - 反面例子1：make the problem of xxxx solved
  - 反面例子2：provide a solution to xxxx
- 消息用来描述人改了什么，而不是程序干了什么
  - 正面例子：add user input validation
  - 反面例子：validate user input

