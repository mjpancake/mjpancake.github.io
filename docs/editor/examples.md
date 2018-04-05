---
layout: page
title: 人物编辑范例
permalink: /docs/editor/examples/
---

（本文施工中，最后更新于 2018年 5月 30日）

## 索引

<p>
{% for girl in site.data.lua-girls %}
<a style="white-space:nowrap" href="#{{ girl.id }}">{{ girl.name }}</a>
{% endfor %}
</p>

<br />

## 正片

<table>
<tr>
<th>人物</th><th>代码</th><th>注解</th>
</tr>
{% for girl in site.data.lua-girls %}
<tr>
<td><a name="{{ girl.id }}"></a>{{ girl.name }}</td>
<td>
  <a href="{{ site.data.link.lua-girl }}/{{ girl.code }}" target="_blank">代码</a>
</td>
<td><p>{{ girl.desc | markdownify }}</p></td>
</tr>
{% endfor %}
</table>


<br />



