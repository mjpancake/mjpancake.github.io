---
layout: page
title: 能力表
permalink: /docs/girl/
---

以下正文中带（\*）的能力尚未实现，旨在提前放出制作计划以供讨论。

## 索引

<p>
{% for girl in site.data.girls %}
<a style="white-space:nowrap" href="#{{ girl.id }}">{{ girl.name }}</a>
{% endfor %}
</p>

## 正片

<table>
{% for girl in site.data.girls %}
<tr>
<td>{{ girl.name }}</td>
<td>
 <a name="{{ girl.id }}"></a>
 {% for skill in girl.skills %}
 {{ skill.name }}
 <ul>
 {% for desc in skill.descs %}
  <li>
  {{ desc.content }}
  {% if desc.subdescs %}
  <ul>
  {% for subdesc in desc.subdescs %}<li>{{ subdesc }}</li>{% endfor %}
  </ul>
  {% endif %}
  </li>
 {% endfor %}
 </ul>
 {% endfor %}
</td>
</tr>
{% endfor %}
</table>

