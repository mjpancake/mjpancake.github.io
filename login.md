---
layout: page
title: 蹬鹿
permalink: /login/
---

<script src="/js/teru.js"></script>

<script>
function onSubmit() {
    var form = document.getElementById("form");

    var username = form.username.value;
    if (!username) {
        hint("请填写用户名");
        return;
    }

    username = username.trim();

    if (!(1 <= username.length && username.length <= 16)) {
        hint("用户名长度超标");
        return;
    }

    var password = form.password.value;
    if (!password) {
        hint("请填写密码");
        return;
    }

    if (password.length < 8) {
        hint("密码长度不够");
        return;
    }

    var cs = JSON.stringify({
        Username: username,
        Password: password
    });

    var submit = document.getElementById("submit");
    submit.disabled = true;
    hint("正在蹬鹿...");

    teru.send("POST", "/account/auth", cs, function(sc) {
        if (sc.Error) {
            hint("蹬鹿失败 " + sc.Error);
            submit.disabled = false;
        } else {
			// prevent showing anything while redirecting
			document.getElementById("hint").style.displayed = "none";

            teru.onLoggedIn(sc);
        }
    });
}

function hint(str) {
    var hint = document.getElementById("hint");
    hint.innerHTML = str;
}
</script>

<style>
table td, table td * {
  vertical-align: top;
}
</style>


<form id="form" action="javascript:onSubmit()">
  <table>
    <tr>
      <td>用户名：</td>
      <td><input type="text" name="username" value="" /></td>
    </tr>
    <tr>
      <td>密码：</td>
      <td><input type="password" name="password" value="" /></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit" value="---- 蹬鹿 ----" /></td>
    </tr>
    <tr>
      <td></td>
      <td><h3 id="hint" /></td>
    </tr>
  </table>
</form>

老版本的联机对战ID就是松饼社区ID，现在仍可继续使用，
已经有ID的无需再注册。

啥？没有ID？[注册](/signup/)


