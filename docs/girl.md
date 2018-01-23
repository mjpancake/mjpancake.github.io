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

<br />

## 正片
----
{% for girl in site.data.girls %}
<h3><a name="{{ girl.id }}"></a>{{ girl.name }}</h3>
{% for skill in girl.skills %}
<h4> {{ skill.name }} </h4>
<ul>
{% for desc in skill.descs %}
<li>{{ desc.content }}
{% if desc.subdescs %}
<ul>
{% for subdesc in desc.subdescs %}
<li>{{ subdesc }}</li>
{% endfor %}
</ul></li>
{% else %}
</li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}
----
{% endfor %}


