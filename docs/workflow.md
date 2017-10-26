---
layout: page
title: 改代码前必读
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

修改代码需要具备以下能力：

1. 够用的英文读写能力
1. 拥有GitHub账号，掌握基本Git操作
1. 一定的编程基础
  - 参考[项目介绍](#intro)确认需要学习的语言
1. 喜欢提问题
  - 有问题基本靠吼，遇到疑点时不要犹豫，
    尽管在[Gitter]({{ site.data.link.gitter }}){:target="_blank"}提问
1. 不穿胖次
  - 不穿胖次有助于减少bug

想参与，却发现自己尚需学习进步的，
可在[Gitter]({{ site.data.link.gitter }}){:target="_blank"}寻求帮助。
我们会给出不太离谱的资料或学习路线图。

<br />

## 核心库“Libsaki”改前必读

开发环境搭建：

- 下载并安装Git客户端
    - 如果不熟悉Git，为基于复制粘贴交流，强烈建议选择命令行客户端
- 下载并安装Qt 5.9.2
    - Windows和macOS用户到[官网](www.qt.io)下载
    - Windows上建议选择不依赖VS的MinGW版Qt
    - Linux用户直接通过包管理安装
- 将客户端项目`mjpancake`下载到本地
    - `git clone --recursive https:/github.com/rolevax/mjpancake.git`
    - 注意不是`libsaki`项目。`libsaki`项目本身不带测试，编译不出可执行文件
    - `mjpancake`带有作为submodule的`libsaki`，因此通过`--resursive`包含之

环境搭建好以后，
用Qt Creator打开代码目录下的`mjpancake.pro`项目，
点击左下角的Build按钮进行编译。
编译成功通过则说明环境搭建完成。

由于我们现在要改的是作为submodule的`libsaki`而不是`mjpancake`，
提交时请确保git操作是在libsaki文件夹内部执行的。

`libsaki`和`mjpancake`之间不存在必须同步更新的关系。
众包平台上的任务通常只需要修改`mjpancake`和`libsaki`中的一个，
不会出现两者都需要提交的情况。

动手修改代码前，请务必仔细确认[松饼C++代码规范](/docs/cpp/)。
不符合规范的代码无法通过审查。

首次接触Libsaki代码的，
建议阅读[Libsaki代码导读](/docs/libsaki/)，快速了解整体设计。

<br />

## 客户端“mjpancake”改前必读

开发环境搭建步骤同Libsaki。

<br />

## 主站“mjpancake.github.io”改前必读

主站整体上是一个Jekyll的GitHub Pages项目。
其中动态内容由另一个服务器项目（我们称之为`ih`）提供，
调用方式为AJAX/RESTful。

开发环境搭建：

- 参考官网，安装Ruby Bundler
- 如果所改内容涉及`ih`，参考官网，安装Docker和Docker Compose

静态页面服务器启动方式：`bundle exec jekyll serve`

`ih`启动方式见[`rolevax/ih`][ih]{:target="_blank"}项目。
修改`js/teru.js`中的地址可开启自攻自受，访问本地后端。

<br />

## 具体工作流程

### 概要
- 基本沿用普通的fork及pull request流程
    - 第一步：将对应仓库fork到自己的GitHub帐号下
    - 第二步：将fork出的仓库clone到本地
    - 第三步：在本地修改代码并进行充分的测试
    - 第四步：将修改push到远端，并创建pull request
- 采用单线提交历史，全程只允许fast-forward合并
    - 参考[Git Branching - Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing){:target="_blank"}
- 有问题可在[Gitter聊天室]({{ site.data.link.gitter }}){:target="_blank"}提问
    - 为方便后人乘凉，建议公开提问，不建议私信

### Git提交消息规范
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


