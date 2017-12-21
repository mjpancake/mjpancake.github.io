---
layout: page
title: 搭建开发环境
permalink: /docs/dev-setup/
---

## 概述

所有的松饼项目都可以在 Linux, Windows, macOS 上开发。

如果没啥特殊情况，强烈建议按照以下流程搭建环境。
我们的开发环境对现有系统应该没有污染性。
不按照以下步骤搭环境的，后果自负。

<br />

## 客户端或核心库的环境搭建

1. 下载并安装 Qt 5.10.0 开源版
    - Windows, macOS:
      到 [镜像][qt-mirror]{:target="_blank"} 或 [官网][qt]{:target="_blank"} 下载
        - 大陆网络环境下推荐使用镜像
        - Windows 安装时要记得勾选 MinGW 组件
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
用 Qt Creator 打开代码目录下的`mjpancake.pro`项目，
点击左下角的Build按钮进行编译。
编译成功通过则说明环境搭建完成。

`libsaki`和`mjpancake`之间不存在必须同步更新的关系。
众包平台上的任务通常只需要修改`mjpancake`和`libsaki`中的一个，
不会出现两者都需要提交的情况。

首次接触`libsaki`代码的，
建议阅读[Libsaki代码导读](/docs/libsaki/)，快速了解整体设计。

<br />

## 服务器开发环境搭建

`ih`的开发环境和运行环境都被做成了 Docker 镜像，
因此需要安装的东西只有 Docker 和 Docker Compose。

- 第一步：安装 [Docker][docker]{:target="_blank"}
          和 [Docker Compose][docker-compose]{:target="_blank"}
- 第二步：从`ih`创建fork
    - 进入[`ih`][ih]{:target="_blank"}页面，点右上角的fork
- 第三步：克隆仓库并配置`upstream`远端：（替换掉`your-username`）
    - `git clone https://github.com/your-username/ih.git`
    - `cd ih`
    - `git remote add upstream https://github.com/rolevax/ih.git`

在以后的交流中，我们会假定`origin`与`upstream`都是用上述命令配出来的。

编译和运行都只需要一行命令，见[`ih`][ih]里的`README.md`。

[libsaki]: https://github.com/rolevax/libsaki
[mjpancake]: https://github.com/rolevax/mjpancake
[ih]: https://github.com/rolevax/ih
[pages]: https://github.com/mjpancake/mjpancake.github.io

[git-win]: https://git-for-windows.github.io/
[qt]: www.qt.io
[qt-mirror]: http://mirrors.ustc.edu.cn/qtproject/archive/qt/5.10/5.10.0/

[docker]: https://docs.docker.com/engine/installation/
[docker-compose]: https://docs.docker.com/compose/install/

