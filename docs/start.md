---
layout: page
title: 如何开始参与开发
permalink: /docs/start/
---

本文介绍如何开始参与开发松饼。

不怕神对手，只怕猪队友——我们希望所有的项目参与者都能认真读完本文。

## 1. 关于 Git

松饼开发者必须熟悉Git。
如果没听说过、或不熟悉Git，可参考以下教程：

1. 入门（必修）：[廖雪峰的Git教程][lxf]{:target="_blank"}
  （学习时长：一至三天）
2. 巩固补充（必修）：[Ruheng的Git教程][git-adv]{:target="_blank"}
  （学习时长：一至三天）
3. 深入（选修）：[Pro Git （中文版）][pro-git]{:target="_blank"}
  （学习时长：长期）<a name="_"></a>

## 2. 关于 Gitter

松饼开发者之间通过 Gitter 交流。

Gitter 是一个聊天工具。
由于支持 Markdown 语法，并且可以和各类开发工具联动，
所以很适合有关编程的讨论。
Gitter 有网页版、桌面版、手机版，基本上什么系统都支持。

- 松饼 Gitter 群链接：
  [mjpancake]({{ site.data.link.gitter }}){:target="_blank"}

## 3. 项目构成

「松饼」总共包含四个项目：核心库、客户端、服务器、主站。
四个项目关系如图。

![松饼项目组成]({{ "/assets/projs.png" | absolute_url }})

大多数人关心的麻将、技能部分对应的是核心库`libsaki`。

GitHub 地址：

- [`rolevax/libsaki`][libsaki]
- [`rolevax/mjpancake`][mjpancake]
- [`rolevax/ih`][ih]
- [`mjpancake/mjpancake.github.io`][pages]

## 4. 开发环境的搭建步骤

见 [搭建开发环境](/docs/dev-setup/) 页面。

## 5. 大致工作流程与审查标准

- 第一步，从`develop`创建新分支
- 第二步，写代码，测试结果
- 第三步，提交并上传
- 第四步，创建合并至`devleop`分支的 pull request 并等待审查
- 第五步，根据审查结果修改代码，提交上传并等待再次审查
- 重复第五步直到分支被合并

明文审查标准：

- [松饼 C++ 代码规范](/docs/cpp/)
- [松饼 QML 代码规范](/docs/qml/)

除明文标准外，还会有基于常识的考虑要素。

[lxf]: https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
[git-adv]: https://www.jianshu.com/p/072587b47515
[pro-git]: https://git-scm.com/book/zh/v2

[libsaki]: https://github.com/rolevax/libsaki
[mjpancake]: https://github.com/rolevax/mjpancake
[ih]: https://github.com/rolevax/ih
[pages]: https://github.com/mjpancake/mjpancake.github.io

[git-win]: https://git-for-windows.github.io/
[qt]: www.qt.io
[qt-mirror]: http://mirrors.ustc.edu.cn/qtproject/archive/qt/5.10/5.10.0/

[docker]: https://docs.docker.com/engine/installation/
[docker-compose]: https://docs.docker.com/compose/install/


