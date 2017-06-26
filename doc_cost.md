---
layout: page
title: 零食时髦表
permalink: /docs/cost/
---

## 目录

<ul>
{% for girl in site.data.girls %}
{% if girl.costs %}
  <li><a href="#{{ girl.id }}">{{ girl.name }}</a></li>
{% endif %}
{% endfor %}
</ul>

<br />

## 正片
----
{% for girl in site.data.girls %}
{% if girl.costs %}
<h3><a name="{{ girl.id }}"></a>{{ girl.name }}</h3>
<h4>零食收获条件</h4>
<ul>
{% for gain in girl.gains %}
<li>{{ gain }}</li>
{% endfor %}
</ul>
<h4>时髦消耗条件</h4>
<ul>
{% for cost in girl.costs %}
<li>{{ cost }}</li>
{% endfor %}
</ul>
----
{% endif %}
{% endfor %}


