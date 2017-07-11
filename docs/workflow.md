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
作为象征性的奖励，开发者会获得大量的稀有道具"榴莲汁"。

松饼麻雀的多数组件采用MIT协议发布，Qt客户端采用LGPLv3协议发布。
改造定制，发布MOD，搭建私服都是没有问题的。
若基于松饼进行二次开发，建议（非强制）注明"基于松饼麻雀"字样并附以主站链接。

松饼项目采用Git管理，
相关仓库在GibHub组织[`mjpancake`](https://github.com/mjpancake)中维护

| 核心库   | [`mjpancake/libsaki`][libsaki] |
| 客户端   | [`mjpancake/mjpancake`][mjpancake] |
| 服务器   | [`mjpancake/ih`][ih] |
| 静态主站 | [`mjpancake/mjpancake.github.io`][pages] |

[libsaki]: https://github.com/mjpancake/libsaki
[mjpancake]: https://github.com/mjpancake/mjpancake
[ih]: https://github.com/mjpancake/ih
[pages]: https://github.com/mjpancake/mjpancake.github.io

<br />

## 工作流程

开发流程大体上采取"悬赏—揭榜"制度。
该制度以GitHub的Issue Tracker作为悬赏布告板，
发布项目中待解决的问题，并标明悬赏榴莲汁额度。
有意解决悬赏问题的，先进行"揭榜"操作，再完成任务，从而获得榴莲汁。

社区希望开发者能够作为member长期驻扎在`mjpancake`组织当中，
深入了解项目并成为主力，日常性维护项目。
当然针对某个特定问题的一次性参与也是欢迎的。

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
   尖括号部分替换为自己的GitHub用户名，例如：
   ```
   abc233申请加入制作组
   ```
   通常会在24小时内处理。
   加入成功后该GitHub账号会成为`mjpancake`组织的member。
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
   找到想做的悬赏issue，将该issue的assignee改成自己。Assignee被修改即视为揭榜完成
   - 所谓“悬赏issue”指由名为`rolevax`的用户发布的，标题中注有榴莲汁额度的issue
     - 不是`rolevax`发布的，或标题中未标明榴莲汁的，不是悬赏issue
   - 如果想做的内容未包含在悬赏issue当中，
     可先走[有奖反馈](/feedback/)流程，等到对应悬赏issue被添加，再进行揭榜
   - 反馈与开发工作的榴莲汁奖励重复计算，互不影响
   - 一个issue对应一个人的工作量。
     已经有assignee的issue是已经有人在做的，无法揭榜
4. __正片开始__  
   Assignee修改完成后即可开始喵作，参考[Git工作流](#git)
   - 遇到任何问题，在[Gitter]({{ site.data.link.gitter }})房间提问
     - 为了让后人乘凉，建议公开提问，不建议私信
   - 多数任务的实际工作量都在5小时以内，期望揭榜者在一周以内完成
     - 未在一周以内完成，任务会被收回
	 - 任务被收回意味着无法领取全额悬赏，将视完成度获得少量（或零）榴莲汁
	 - 被收回的任务可由任何人重新揭榜
5. __完成__  
   完成任务，获得榴莲汁，返回第3步

### <a name="git"></a>Git工作流

概要：
- 项目整体处于实验阶段，默认分支为`develop`，不设`master`分支
- 所有的改动都需要先提交到新建的分支上，再通过pull request合回`develop`分支
- 利用写入权限，直接将新建分支上推到源仓库以便互舔，不必fork到自己的账户下
- 采用单线提交历史，活用rebase，全程只允许fast-forward合并

分支名规范：
- 分支名以`forward/`或`bug/`为前缀
  - 凡是不属于修改bug的，无论是新功能还是改良，都算作forward
- 前缀以后的部分尽量采用单个单词。使用多个单词时，以中划线`-`分隔。

提交消息规范：
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
- 消息用来描述人改了什么，而不是程序于了什么
  - 正面例子：add user input validation
  - 反面例子：validate user input

