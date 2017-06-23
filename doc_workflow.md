---
layout: page
title: 项目介绍与工作流程
permalink: /docs/workflow/
---

### 项目介绍

- 松饼相关项目都在GibHub组织[`mjpancake`](https://github.com/mjpancake)里维护
- 制作组乃分库狂魔，分出了一堆repo
- `mjpancake/libsaki` 挂力学实现库，一切的核心，在服务器和客户端中作为submodule使用
- `mjpancake/mjpancake` 客户端
- 服务器用决赛4校的4个部长命名：
    - `mjpancake/hisa` TCP服务器，入口及日常逻辑
    - `mjpancake/arata` 牌桌逻辑服务器
    - `mjpancake/sumire` HTTP服务器，处理一次性事务
    - `mjpancake/satoha` DB封装

### 需要的姿势水平

为参与松饼项目，需要以下技能确保流畅的工作体验：
- 学过至少一门编程语言
- 常见的数据结构及算法
- 英文日常读写
- Git及GitHub的使用
- 借助Google自学

其余的都好说，但以上几项请在加入制作组之前自行搞定。

### 工作流程

1. 加入制作组  
   在[Gitter聊天室]({{ site.data.link.gitter }})私信以下内容给`rolevax`
   ```
   <your-github-username>申请加入制作组
   ```
   根据情况替换尖括号部分，例如：
   ```
   rolevax申请加入制作组
   ```
   通常会在24小时内处理。
1. 确定想做的事  
   能做的事有两种：发起新issue，完成现有issue。
   - 发起新issue：
       1. 按照[规范](/feedback/)在[发布贴]({{ site.data.link.tie }})回帖以领取松饼奖励
	   1. 在对应repo添加issue，描述内容为对发布贴回复内容的简要概括
	   1. 下面的步骤与"完成现有issue"相同
   - 完成现有issue：
       1. 如果没有对应repo的写权限，[申请一个](#write)
	   1. 将issue的assignee改成自己
	   1. (TODO)

### <a name="write"></a>申请仓库写权限

   在[Gitter聊天室]({{ site.data.link.gitter }})私信以下内容给`rolevax`
   ```
   <your-github-username>申请<repo-name>写权限
   ```
   根据情况替换尖括号部分，例如：
   ```
   rolevax申请libsaki写权限
   ```
   通常会在24小时内处理。

