---
layout: page
title: 已认证常见缩写
permalink: /docs/abbr/
---

下表中包括的都是可以在代码中随意使用的缩写。
不包括的就不一定了，有可能能用也有可能不能用。

建议使用「Ctrl + F」搜索。

<table>
<tr>
  <th>缩写</th>
  <th>全称</th>
  <th>解释</th>
</tr>
{% assign sorted-abbr = site.data.abbr | sort: 'abbr' %}
{% for abbr in sorted-abbr %}
<tr>
  <td>{{ abbr.abbr }}</td>
  <td>{{ abbr.full }}</td>
  <td>{{ abbr.desc | markdownify }}</td>
</tr>
{% endfor %}
</table>

