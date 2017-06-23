---
layout: page
title: 松饼社区ID激活考试
permalink: /exam/
---

### 说明

- 共{{ site.data.qs | size }}道单选题，预计30分钟
- 全对及格，错一挂科

---

### 单选题

<form>
	<ol>
		{% for q in site.data.qs %}
		<li>
			{{ q.q }}<br />
			<label>
				<input type="radio" name="q{{ forloop.index }}" value="a" />
				A) {{ q.a }} <br />
			</label>
			<label>
				<input type="radio" name="q{{ forloop.index }}" />
				B) {{ q.b }} <br />
			</label>
			<label>
				<input type="radio" name="q{{ forloop.index }}" />
				C) {{ q.c }} <br />
			</label>
			<label>
				<input type="radio" name="q{{ forloop.index }}" />
				D) {{ q.d }} <br />
			</label>
		</li>
		{% endfor %}
	</ol>

	<table>
	<tr><td>待激活ID：</td><td><input type="text" value="" /></td></tr>
	<tr><td>密码：</td><td><input type="password" value="" /></td></tr>
	<tr><td></td><td><input type="submit" value="---- 交卷 ----" /></td></tr>
	</table>

</form>


