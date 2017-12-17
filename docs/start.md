---
layout: page
title: 如何开始参与开发
permalink: /docs/start/
---

本文介绍如何开始参与开发松饼。

不怕神对手，只怕猪队友——我们希望所有的项目参与者都能认真读完本文。

<br />

## 1. 关于Git

松饼项目的所有参与者都必须熟悉Git。
如果没听说过什么是Git，请依次走完以下教程：

1. 入门（必修）：[廖雪峰的Git教程][lxf]{:target="_blank"}
2. 巩固（必修）：[Atlassian的Git教程][at-git]{:target="_blank"}
3. 进阶（必修）：[Atlassian的Git进阶教程][at-git-adv]{:target="_blank"}
4. 深入（选修）：[Pro Git][pro-git]{:target="_blank"}

“必修”教程必须全部看完，否则下面的内容会难以理解，将来也无法沟通。

<br />

## 2. 松饼是用什么做出来的

“松饼”总共包含四个项目：核心库、客户端、服务器、主站。

![松饼项目组成]({{ "/assets/projs.png" | absolute_url }})

### 2.1. 核心库`libsaki`

核心库`libsaki`包含了所有的麻将与技能逻辑。
整体上来看，其输入为打牌操作，输出为牌桌上应当出现的现象。
添加角色、调整技能等操作都是通过修改核心库`libsaki`完成的。

GitHub仓库地址：[`rolevax/libsaki`][libsaki]

### 2.2. 客户端`mjpancake`

客户端`mjpancake`大体上有三个功能：单机麻将、联机麻将、各类小工具。

单机麻将就是`libsaki`的一个前端。
读取用户输入，传给`libsaki`，再将`libsaki`的输出画到界面上。
`libsaki`是`mjpancake`的一个Git子模块。
如果不知道什么是“Git子模块”，请阅读[ Pro Git ][pro-git]的相关章节。

联机麻将在架构上和单机麻将是类似的，只是把`libsaki`的位置替换成网络收发。
读取用户输入，传给服务器，再将服务器返回的东西画到界面上。

各类小工具就是一些附加的东西，理论上互不依赖，可以随意增删。

GitHub仓库地址：[`rolevax/mjpancake`][mjpancake]

### 2.3. 服务器`ih`

和客户端一样，服务器也包含`libsaki`子模块，可以看作是`libsaki`的一个前端。
服务器做的事情，就是把客户端通过网络发来的输入传给`libsaki`，
再将`libsaki`的输出发给四个客户端。

GitHub仓库地址：[`rolevax/ih`][ih]

### 2.4. 主站`mjpancake.github.io`

主站整体上是由Jekyll生成的静态页面。
其中动态内容由`ih`提供，调用方式为AJAX/RESTful。

GitHub仓库地址：[`mjpancake/mjpancake.github.io`][pages]

<br />

## 3. 搭建开发环境

### 3.1. 客户端或核心库的环境搭建

1. 下载并安装Qt 5.9.3 开源版
    - Windows, macOS: 到[官网][qt]{:target="_blank"}下载
        - 大陆网络环境下Qt官网可能奇慢无比，
          可使用[科大镜像](qt-mirror){:target="_blank"}代替
        - Windows安装时要记得勾选MinGW组件
    - Linux: 包管理大法
        - 官方源Qt不到5.9的发行版自行折腾
2. 从`mjpancake`和`libsaki`创建fork （为将来方便，两个都fork）
    - 进入[`mjpancake`][mjpancake]{:target="_blank"}页面，点右上角的fork
    - 进入[`libsaki`][libsaki]{:target="_blank"}页面，点右上角的fork
3. 通过以下命令克隆仓库并配置`upstream`远端：（替换掉`your-username`）
    - `git clone --recursive https://github.com/your-username/mjpancake.git`
    - `cd mjpancake`
    - `git remote add upstream https://github.com/rolevax/mjpancake.git`
    - `cd libsaki`
    - `git remote rename origin upstream`
    - `git remote add origin https://github.com/your-username/libsaki.git`

在以后的交流中，我们会假定`origin`与`upstream`都是用上述命令配出来的。

环境搭建好以后，
用Qt Creator打开代码目录下的`mjpancake.pro`项目，
点击左下角的Build按钮进行编译。
编译成功通过则说明环境搭建完成。

`libsaki`和`mjpancake`之间不存在必须同步更新的关系。
众包平台上的任务通常只需要修改`mjpancake`和`libsaki`中的一个，
不会出现两者都需要提交的情况。

首次接触`libsaki`代码的，
建议阅读[Libsaki代码导读](/docs/libsaki/)，快速了解整体设计。

### 3.2. 服务器开发环境搭建

(TODO)

<br />

## 4. 工作流程

原则上每个人同时只做一件事——前一件事验收通过后，才能开始做下一件事。

下面以“为魔王添加正负零技能”为例，介绍整个工作流程：

- 第一步，在众包平台上领取“为魔王添加正负零能力”任务
    - 如果众包平台上没有这个任务，有三种选择：
        1. 联系喵打，要求增加这个任务
        2. 联系喵打，表明想绕过众包平台，以匿名形式进行该修改
        3. 跳出此流程，自行修改，将修改结果发布为MOD，或不发布
- 第二步，联系喵打，讨论并确立修改方案
    - 如果众包平台上的任务描述里已经详细写好如何修改，可略过这一步
    - 联系方式：[Gitter]({{ site.data.link.gitter-rolevax }}){:target="_blank"}
- 第三步，从对应仓库切出新分支
    - 现在是以”添加正负零技能“为例，所以在与之相关的`libsaki`仓库中操作
    - 首先同步一下最新代码
        - `git fetch upstream`
    - 然后创建分支
        - `git checkout -b plus-minus-zero upstream/develop`
- 第四步，写代码实现正负零，测试结果，直到达到事先和喵打定好的目标
    - 中途遇到任何问题，可通过Gitter找喵打
- 第五步，整理代码风格，准备提交
    - 根据[松饼C++规范](/docs/cpp/)整理改动过的代码
    - 虽然规范里说了一大堆，总结起来只有一点：和周围的代码保持画风一致
        - 只要没有太明显的画风出入，多半也没啥问题
- 第六步，提交并上传
    - 提交：`git commit -am "add +-0 skill"`
        - 提交消息是有规范的，见[松饼Git提交消息规范](/docs/git/)
    - 上传：`git push -u origin plus-minus-zero`
- 第七步，在GitHub上创建Pull Request
    - 合并目标是`rolevax`下的`develop`分支
    - 创建后，等待review
- 第八步，根据review结果改进代码，提交上传并等待再次review
    - 提交：`git commit -am "improve +-0 skill"`
    - 上传：`git push`
    - 新提交会追加到原先的PR后面，不用开新的PR
- 第九步，重复第八步直到分支被合并
- 第十步，在众包平台上通知验收，更新贡献度



[lxf]: https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
[at-git]: https://www.atlassian.com/git/tutorials/setting-up-a-repository
[at-git-adv]: https://www.atlassian.com/git/tutorials/advanced-overview
[pro-git]: https://git-scm.com/book/zh/v2

[libsaki]: https://github.com/rolevax/libsaki
[mjpancake]: https://github.com/rolevax/mjpancake
[ih]: https://github.com/rolevax/ih
[pages]: https://github.com/mjpancake/mjpancake.github.io

[git-win]: https://git-for-windows.github.io/
[qt]: www.qt.io
[qt-mirror]: http://mirrors.ustc.edu.cn/qtproject/archive/qt/5.9/5.9.3/

