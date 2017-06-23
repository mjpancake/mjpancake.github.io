---
layout: home
title: "松饼社区主站"
---

### 松饼麻雀简介

「松饼」是一个Saki麻将软件，主要特性如下：

- 独有黑科技，技能还原度远超同类作品
- 支持Windows, macOS, GNU/Linux, Android, iOS
- 可联机对战
- 牌谱、统计、练习、计算等周边工具一应俱全
- 完整实现本篇规则与慕篇规则；支持自定义规则
- 长期更新，不断完善，跟进最新漫画进度
- 免费开源

---
<br />

### 松饼社区简介

松饼麻雀的发展由「松饼社区」推动。
松饼社区由三部分组成：

- 一般讨论社区 = 天麻贴吧[松饼发布贴]({{ site.data.link.tie }})  
松饼「一般讨论」社区用于吸♀收提问、意见、建议、考据、研究、分析、bug反馈。
- 约桌社区 = QQ群 253708512  
松饼「约桌」社区用于集齐四人，互相伤♀害。
- 技术社区 = [Gitter]({{ site.data.link.gitter }})  
松饼「技术」社区用于制作人员之间的讨论，
详见[如何参与制作](/contribute/)

---
<br />

### 新手上路

为确保社区质量，松饼目前设有一定的入坑门槛，新账号须通过考试方能激活。

入坑步骤：
1. 熟读Saki
2. 掌握日麻基础
3. [没有账号 -> 喵击这里注册](/signup/)
4. [注册完毕 -> 喵击这里开始激活考试](/exam/)
5. 吃掉[食用者文档](/docs/)
6. 加入约桌企鹅群 253708512
7. 从[更新公告](#news)中下载最新客户端
8. 登录松饼麻雀，选择初始少女
9. 打麻将，掉节操
10. 参照[有奖反馈规则](/feedback/)，把感想、意见、bug发到[发布贴]({{ site.data.link.tie }})
11. 返回第⑨步

---
<br />

### <a name="news" />更新公告（内含客户端下载地址）
<ul class="post-list">
{% for post in site.posts limit:10 %}
  <li>
	{% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %}
	<span class="post-meta">{{ post.date | date: date_format }}</span>

	<h2>
	  <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
	</h2>
  </li>
{% endfor %}
</ul>


