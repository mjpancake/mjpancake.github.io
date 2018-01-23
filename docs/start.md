---
layout: page
title: 如何开始参与开发
permalink: /docs/start/
---

本文介绍如何开始参与开发松饼。

不怕神对手，只怕猪队友——我们希望所有的项目参与者都能认真读完本文。

<br />

## 1. 关于Git

松饼开发者必须熟悉Git。
如果没听说过、或不熟悉Git，可参考以下教程：

1. 入门（必修）：[廖雪峰的Git教程][lxf]{:target="_blank"}
  （学习时长：一至三天）
3. 巩固补充（必修）：[Ruheng的Git教程][git-adv]{:target="_blank"}
  （学习时长：一至三天）
4. 深入（选修）：[Pro Git （中文版）][pro-git]{:target="_blank"}
  （学习时长：长期）

<br />

## 2. 关于 Gitter

松饼开发者之间通过 Gitter 交流。

Gitter 是一个聊天工具，可私信可群聊。
由于支持 Markdown 语法，并且可以和各类开发工具联动，
所以很适合有关编程的讨论。
Gitter 有网页版、桌面版、手机版，基本上什么系统都支持。

- 松饼 Gitter 群链接：
  [mjpancake]({{ site.data.link.gitter }}){:target="_blank"}
- 喵打 Gitter 私信链接：
  [rolevax]({{ site.data.link.gitter-rolevax }}){:target="_blank"}

<br />

## 3. 松饼是用什么做出来的

「松饼」总共包含四个项目：核心库、客户端、服务器、主站。
四个项目关系如图。

![松饼项目组成]({{ "/assets/projs.png" | absolute_url }})

大多数人关心的麻将、技能部分对应的是核心库`libsaki`。

GitHub 地址：

- [`rolevax/libsaki`][libsaki]
- [`rolevax/mjpancake`][mjpancake]
- [`rolevax/ih`][ih]
- [`mjpancake/mjpancake.github.io`][pages]

<br />

## 4. 开发环境的搭建步骤

见 [搭建开发环境](/docs/dev-setup/) 页面。

<br />

## 5. 工作流程

下面以「为咲添加正负零技能」为例，介绍整个工作流程：

- 第一步，创建新分支
    - `git fetch upstream`
    - `git checkout -b plus-minus-zero upstream/develop`
- 第二步，写代码，测试结果
    - 根据[松饼C++规范](/docs/cpp/)整理改动过的代码
- 第三步，提交并上传
    - `git commit -am "add +-0 skill"`
    - `git push -u origin plus-minus-zero`
    - 提交消息是有规范的，见[松饼Git提交消息规范](/docs/git/)
- 第四步，创建 pull request 并等待 review
    - 合并目标是`develop`分支
- 第五步，根据 review 结果改进代码，提交上传并等待再次 review
    - `git commit -am "improve +-0 skill"`
    - `git push`
- 重复第五步直到分支被合并



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


