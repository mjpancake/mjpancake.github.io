---
layout: page
title: 松饼社区ID激活考试
permalink: /exam/
---

### 说明

- 共{{ site.data.qs | size }}道单选题，预计30分钟
- 全对及格，错一挂科
- 原则上只有能独立通过考试的人才具备入坑资质。
  - 向他人索要、泄露答案均属作弊行为，是社区打击封锁的对象。
  - 挂科的情况下，为阻碍暴力枚举过关，只会告诉错了几道题，不会告诉具体题号。
  - 尝试3次以上仍未过关者建议放弃入坑。

---

### 单选题

<script>
function onSubmit() {
	var form = document.getElementById("form");

	var username = form.username.value;
	if (!username) {
		hint("请填写用户名");
		return;
	}

	var password = form.password.value;
	if (!password) {
		hint("请填写密码");
		return;
	}

	var answers = "";
	for (var i = 1; i <= {{ site.data.qs | size }}; i++) {
		var answer = form["q" + i].value;
		if (!answer) {
			hint("请回答第" + i + "题");
			return;
		}
		answers += answer;
	}

	var cs = JSON.stringify({
		Username: username,
		Password: password,
		Answers: answers
	});
	send(cs);
}

function hint(str) {
	var hint = document.getElementById("hint");
	hint.innerHTML = str;
}

function send(msg) {
	var submit = document.getElementById("submit");
	submit.disabled = true;
	hint("正在提交...");

	var url = "http://127.0.0.1:8080/account/activate";
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var sc = JSON.parse(xmlhttp.responseText);
			if (sc.Error) {
				hint("激活失败 " + sc.Error);
				submit.disabled = false;
			} else {
				// TODO redirect
				hint("激活成功");
			}
		} else {
			hint("出现网络错误，激活失败 " + xmlhttp.readyState + " " + xmlhttp.status);
			submit.disabled = false;
		}
	};
	xmlhttp.send(msg);
}
</script>

<form id="form" action="javascript:onSubmit()">
	<ol>
		{% for q in site.data.qs %}
		<li>
			{{ q.q }}<br />
			<label>
				<input type="radio" name="q{{ forloop.index }}" value="a" />
				A) {{ q.a }} <br />
			</label>
			<label>
				<input type="radio" name="q{{ forloop.index }}" value="b" />
				B) {{ q.b }} <br />
			</label>
			<label>
				<input type="radio" name="q{{ forloop.index }}" value="c" />
				C) {{ q.c }} <br />
			</label>
			<label>
				<input type="radio" name="q{{ forloop.index }}" value="d" />
				D) {{ q.d }} <br />
			</label>
		</li>
		{% endfor %}
	</ol>

	<table>
	<tr><td>待激活ID：</td><td><input type="text" name="username" value="" /></td></tr>
	<tr><td>密码：</td><td><input type="password" name="password" value="" /></td></tr>
	<tr><td></td><td><input type="submit" id="submit" value="---- 交卷 ----" /></td></tr>
	<tr><td></td><td><h3 id="hint" /></td></tr>
	</table>
</form>


