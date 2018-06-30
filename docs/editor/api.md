---
layout: page
title: 人物编辑 API 文档
permalink: /docs/editor/api/
---

本页包含松饼人物编辑器目前为止的全部接口。
推荐使用「Ctrl + F」进行查找。

## 索引

- [回调函数](#callback)
- [可用的 Lua 标准库与内建函数](#std)
- [各 userdata 接口](#userdata)
- [Game Event 表结构](#event)
- [与 C++ 接口的关系](#cpp)

## <a name="callback"></a>回调函数

在顶级 chunck 中以特定的名字定义函数，
即可在对应时刻执行指定的逻辑。

这些函数都不需要参数，
必要的数据可从特定的全局变量中获取。

<table>
 <tr>
  <th>函数名</th>
  <th>作用</th>
 </tr>
{% for cb in site.data.lua-callbacks %}
 <tr>
  <td rowspan="2"><code>{{ cb.name }}</code></td>
  <td>{{ cb.desc | markdownify | remove: "<p>" | remove: "</p>" }}</td>
 </tr>
 <tr>
  <td>
   可用全局变量：
   <ul>
{% for param in cb.params %}
    <li><code>{{ param.name }}</code>
     <ul>
      <li>类型：{{ param.type | markdownify | remove: "<p>" | remove: "</p>" }}</li>
      <li>{{ param.desc | markdownify | remove: "<p>" | remove: "</p>" }}</li>
     </ul>
    </li>
{% endfor %}
    <li><code>self</code>
     <ul>
      <li>类型：userdata <code>Who</code></li>
      <li>本角色</li>
     </ul>
    </li>
   </ul>
  </td>
 </tr>
{% endfor %}
</table>

## <a name="std"></a>可用的 Lua 标准库与内建函数

为了防止世界被破坏，
松饼中只能使用一部分的 Lua 标准库与内建函数。

能用的部分：

- `table`中的所有函数
- `string`中的所有函数
- `math`中除去`math.random`和`math.randomseed`以外的所有函数
- `pairs`, `ipairs`
- `print`
- `tostring`

将来可能会放宽限制，支持更多的标准库成员。

## <a name="userdata"></a>各 userdata 接口

{% for class in site.data.lua-api %}
<h3>{{ class.name }}</h3>
<table>
<tr>
  <th>成员</th>
  <th colspan="2">用法</th>
</tr>
{% for member in class.members %}
<tr>
  <td rowspan="4">{{ member.name | markdownify|remove:"<p>"|remove:"</p>" }}</td>
  <td colspan="2">{{ member.syntax | markdownify|remove:"<p>"|remove:"</p>" }}</td>
</tr>
<tr>
  <td>参数类型</td>
  <td>
    {% assign ps = member.params[0] %}
    {% assign tail = member.params | shift %}
    {% for p in tail %}{% assign ps = ps | append: ", " | append: p %}{% endfor %}
    {{ ps | markdownify | remove: "<p>" | remove: "</p>" }}
  </td>
</tr>
<tr>
  <td>返回值类型</td>
  <td>
    {% assign rs = member.returns[0] %}
    {% assign tail = member.returns | shift %}
    {% for r in tail %}{% assign rs = rs | append: ", " | append: r %}{% endfor %}
    {{ rs | markdownify | remove: "<p>" | remove: "</p>" }}
  </td>
</tr>
<tr>
  <td colspan="2">
    {{ member.desc | markdownify | remove: "<p>" | remove: "</p>" }}
  </td>
</tr>
{% endfor %}
</table>
{% endfor %}

## <a name="event"></a>Game Event 表结构

`ongameevent`中使用的`event`变量类型为 table，
包含`type`和`args`两个字段。
`type`字段为 string 类型，表示事件的类别；
`args`字段为 table 类型，根据`type`的不同含有不同的字段。

(文档准备中。目前可通过自行`pairs`遍历查看`args`内容。)

## <a name="cpp"></a>与 C++ 接口的关系

松饼的 Lua 接口与 C++ 接口之间存在以下关联与区别：

- C++ 里的`Table`在 Lua 中一律改称`Game`
- C++ 接口基于驼峰命名，Lua 的命名方式参照标准库，全小写且无分隔
  （userdata 类名首字母大写）
- C++ 以 assert 或 UB 处理傻逼逻辑，Lua 则会报运行时错误
  （Lua 代码导致松饼主程序崩溃的情况属于 bug）

