---
layout: page
title: 松饼Git使用规范
permalink: /docs/git/
---

## 提交消息规范

提交消息不符合规范的提交无法被合并。

- [CM-1] 英语
- [CM-2] 适当省略冠词
- [CM-3] 首字母小写
- [CM-4] 句尾无句号
- [CM-5] 动词原形开头，命令式句型
  - 正面例子：add sm combo skill
  - 反面例子1：sm combo skill
  - 反面例子2：added sm combo skill
  - 反面例子3：adds sm combo skill
- [CM-6] 不要绕弯
  - 正面例子：solve xxxx
  - 反面例子1：make the problem of xxxx solved
  - 反面例子2：provide a solution to xxxx
- [CM-7] 消息用来描述人改了什么，而不是程序干了什么
  - 正面例子：add user input validation
  - 反面例子：validate user input
- [CM-8] 记录内容变化，而不是文件变化
  - 正面例子：add +-0 skill to saki
  - 反面例子：update girls_kiyosumi.cpp
- [CM-9] 消息应独立自足，不完全依赖于外部引用
  - 正面例子：add +-0 skill to saki
  - 反面例子：complete task 8123

已上传的提交消息可通过`git rebase -i upstream/develop`和`git push -f`修改

## 合并相关规范

- [MG-1] 使用单线历史避免复杂的分支关系。
         每当新分支与最新的`upstream/develop`出现分歧时，
         应当使用rebase便新新分支可通过fast-forward合并到`develop`上


