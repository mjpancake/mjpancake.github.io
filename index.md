---
layout: home
title: "松饼社区主站"
---

## 松饼麻雀简介

「松饼」是一个Saki麻将软件，主要特性如下：

- 黑科技：技能还原度远超“某作”
- 跨平台：手机电脑都能用（Windows, macOS, GNU/Linux, Android, iOS）
- 技术向：配备牌谱与统计，不断附加各类周边工具
- 赶时髦：长期更新，跟进最新漫画进度
- 纯公益：免费且开源

松饼麻雀针对**熟读Saki**并具有一定**日麻基础**的同学制作。

**本作不适合日麻零基础新手。**
打好麻将很难，打好带能力的麻将更难； 盲目入坑只会死得不明不白。
零基础的同学若想入坑本作， 建议先学会正常的麻将，
并将技术练到至少强过七大姑八大姨为止。

松饼麻雀处于早期原型阶段，重点放在少女能力的开发和调整上。
相对地，界面相当简陋，且没有音效、立绘等视听体验， 对战模式也相对单一。
这些问题将来是否能得以解决取决于大家的支持。
“支持”的意思是说直接[参与制作](/contribute)——
虽然[提意见](/feedback)也算支持，但现在因为人手不够所以好主意再多也是空谈。

---
<br />

## 松饼社区简介

松饼麻雀的发展由「松饼社区」推动。
松饼社区由三部分组成：

- 一般讨论社区 = 天麻贴吧[松饼发布贴]({{ site.data.link.tie }})  
用于无限制吸♀收各类回复。
- 约桌社区 = QQ群 253708512  
用于集齐四人，互相伤♀害。
- 技术社区 = [Gitter]({{ site.data.link.gitter }})  
用于制作人员之间的讨论， 详见[如何参与制作](/contribute/)

---
<br />

## <a name="newbie"></a>新手上路

为确保社区质量，松饼目前设有一定的入坑门槛，新账号须通过考试方能激活。

入坑步骤：
1. 熟读Saki
2. 掌握日麻基础
3. [没有账号 -> 喵击这里注册](/signup/)
4. [注册完毕 -> 喵击这里开始激活考试](/exam/)
5. 吃掉[食用指南](/docs/)
6. 加入约桌企鹅群 253708512
7. 从[更新公告](#news)中下载最新客户端
8. 登录松饼麻雀
9. 打麻将，掉节操
10. 参照[有奖反馈规则](/feedback/)，把吐槽、建议、bug发到[发布贴]({{ site.data.link.tie }})
11. 返回第⑨步

---
<br />

## <a name="news" />更新公告（内含客户端下载地址）
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


