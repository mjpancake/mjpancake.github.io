---
layout: page
title: 能力表
permalink: /docs/girl/
---

带（\*）的能力尚未实现。

## 目录

<ul>
{% for girl in site.data.girls %}
  <li><a href="#{{ girl.id }}">{{ girl.name }}</a></li>
{% endfor %}
</ul>

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


