---
layout: page
title: 人物编辑 API 文档
permalink: /docs/editor/api/
---

本页包含松饼人物编辑器目前为止的全部接口。
推荐使用「Ctrl + F」进行查找。

## 回调函数

在顶级 chunck 中以特定的名字定义函数，
即可在对应时刻执行指定的逻辑。

这些函数都不需要参数，
必要的数据可从特定的全局变量中获取。

|-------|--------|--------|
|函数名|调用时机|可用全局变量|
|-------|--------|--------|
|`ondraw`|摸牌之前|`game`, `mount`, `who`, `rinshan` |
|-------|--------|--------|

## 全局变量

为了免除在写回调时记忆参数顺序的麻烦，
我们使用名字固定的全局变量提供必要的数据。
可以把这些全局变量的名字当成关键字看待。

在一个回调函数的内部，
并非所有的全局变量都是可用的。
上面的「回调函数」表中列举了在哪些回调中可使用哪些全局变量。

|-------|--------|--------|
|变量名  |类型|简介|
|--------|--------|--------|
|`game`|userdata `Game`|当前牌桌数据|
|`mount`|userdata `Mount`|牌山|
|`who`|userdata `Who`|事件关系人|
|`rinshan`|boolean|下一张摸牌是否为岭上牌|
|`self`|userdata `Who`|本角色，在所有回调中可用|
|--------|--------|--------|

## 可用的 Lua 标准库与内建函数

为了防止世界被破坏，为了维护世界的和平，
松饼中能用的 Lua 标准库与内建函数是原版 Lua 的一个子集。

能用的部分：

- `table`中的所有函数
- `string`中的所有函数
- `math`中除去`math.random`和`math.randomseed`以外的所有函数
- `pairs`, `ipairs`
- `print`

将来可能会放宽限制，支持更多的标准库成员。

## 各 userdata 接口

{% for class in site.data.lua-api %}
<h3>{{ class.name }}</h3>
<table>
<tr>
  <th>成员</th>
  <th colspan="2">用法</th>
</tr>
{% for member in class.members %}
<tr>
  <td rowspan="4">{{ member.name | markdownify }}</td>
  <td colspan="2">{{ member.syntax | markdownify }}</td>
</tr>
<tr>
  <td>参数类型</td>
  <td>
    {% assign ps = member.params[0] %}
    {% assign tail = member.params | shift %}
    {% for p in tail %}{% assign ps = ps | append: ", " | append: p %}{% endfor %}
    {{ ps | markdownify }}
  </td>
</tr>
<tr>
  <td>返回值类型</td>
  <td>
    {% assign rs = member.returns[0] %}
    {% assign tail = member.returns | shift %}
    {% for r in tail %}{% assign rs = rs | append: ", " | append: r %}{% endfor %}
    {{ rs | markdownify }}
  </td>
</tr>
<tr>
  <td colspan="2">{{ member.desc | markdownify }}</td>
</tr>
{% endfor %}
</table>
{% endfor %}

