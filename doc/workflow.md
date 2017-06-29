---
layout: page
title: 项目介绍与工作流程
permalink: /docs/workflow/
---

## <a name="intro"></a>项目介绍

松饼麻雀为开源项目，以开放、分享为原则，
鼓励所有人积极讨论，参与制作，形成挂力学研究社区。
在松饼社区，参与越多、贡献越多，受尊重的程度也会越高。

社区中不存在用户与开发者的分别——
因为这里没有专职的开发者，每一名开发者都源自用户，既服务于其它用户，也服务于自己。
社区长期以来一直都在从玩家中发掘开发者，人数多多益善，从而适应日渐增长的开发需求。

松饼的开发本属志愿性无偿工作。
作为象征性的奖励，开发者会获得大量的稀有道具"饮料"。

松饼麻雀的多数组件采用MIT协议发布，Qt客户端采用LGPLv3协议发布。
改造定制，发布MOD，搭建私服都是没有问题的。
若基于松饼进行二次开发，建议（非强制）注明"基于松饼麻雀"字样并附以主站链接。

松饼项目采用Git管理，
相关仓库在GibHub组织[`mjpancake`](https://github.com/mjpancake)中维护
- [`mjpancake/libsaki`](https://github.com/mjpancake/libsaki)
  挂力学实现库，一切的核心，在服务器和客户端中作为submodule使用
- [`mjpancake/mjpancake`](https://github.com/mjpancake/mjpancake)
  客户端
- [`mjpancake/inhigh`](https://github.com/mjpancake/inhigh)
  服务器
- [`mjpancake/mjpancake.github.io`](https://github.com/mjpancake/mjpancake.github.io)
  静态主站

## 工作流程

开发流程大体上采取"悬赏—揭榜"制度。
该制度以GitHub的Issue Tracker作为悬赏布告板，发布项目中待解决的问题，并标明悬赏饮料额度。
有意解决悬赏问题的，先进行"揭榜"操作，再完成任务，从而获得饮料。

### 先决条件

参与制作之前需要集齐以下先决条件：
1. 熟悉Git命令，尤其是`rebase`
1. 拥有GitHub账号
1. 不穿胖次

### 具体工作流程

1. __加入制作组__  
   在[Gitter聊天室]({{ site.data.link.gitter }})私信以下内容给`rolevax`
   ```
   <your-github-username>申请加入制作组
   ```
   根据情况替换尖括号部分，例如：
   ```
   abc233申请加入制作组
   ```
   通常会在24小时内处理。
2. __申请写入权限__  
   成为`mjpancake`成员后，
   参考[项目介绍](#intro)，确认感兴趣的仓库，申请该仓库的写入权限。
   申请时在[Gitter聊天室]({{ site.data.link.gitter }})私信以下内容给`rolevax`
   ```
   <your-github-username>申请<repo-name>写入权限
   ```
   根据情况替换尖括号部分，例如：
   ```
   abc233申请libsaki写入权限
   ```
   通常会在24小时内处理。
3. __揭榜__  
   找到想做的悬赏issue，将该issue的assignee改成自己。Assignee被修改即视为揭榜完成。  
   如果想做的内容未包含在悬赏issue当中，
   可先走[有奖反馈](/feedback/)流程，等到对应issue被添加，再进行揭榜
   （反馈与开发工作的饮料奖励重复计算，互不影响）
4. __正片开始__  
   Assignee修改完成后即可开始喵作，参考[Git工作流](#git)
5. __返回第3步__  

### 特殊情况处理
1. 已经有assignee的issue是已经有人在做的，无法揭榜
1. 制作太慢，或质量不达标，该任务会被收回，重新变回可揭榜状态
1. 遇到任何问题，在[Gitter]({{ site.data.link.gitter }})房间提问
    - 为了让后人乘凉，建议公开提问，不建议私信

### <a name="git"></a>Git工作流

概要：
- 项目整体处于实验阶段，默认分支为`develop`，不设`master`分支
- 所有的改动都需要先提交到新建的分支上，再通过pull request进行review及合并
- 利用写入权限，直接将新建分支上推到源仓库以便互舔，不必fork到自己的账户下
- 采用单线提交历史，活用rebase，全程只允许fast-forward合并

分支名规范：
- `issue/%d`，其中`%d`替换成悬赏issue的号码，例如`issue/233`

提交消息规范：
- 英语
- 祈使句
- 首字母小写
- 句尾无句号
- 开头单词必须是一个简单有力的实义动词原形，
  例如`add`, `delete`, `update`, `change`, `fix`, `enhance`, `refactor`,
  `optimize`, `adapt`, `use`, `apply`等；
  不使用`make`, `let`, `do`等偏委婉的动词

示例流程（以`libsaki`仓库143号issue为例）：
1. 下载 `git clone git@github.com:mjpancake/libsaki.git`
1. 新建分支 `cd libsaki; git checkout -b issue/143`
1. 喵改代码
1. 提交 `git commit -a`
1. 衍合到上流最新提交 `git pull --rebase origin develop`
1. 上推 `git push --set-upstream origin issue/143`
1. 前往GitHub创建pull request，等待审查结果

