---
layout: page
title: 注册
permalink: /signup/
---

<script src="/js/teru.js"></script>

<script>
function onSubmit() {
    var form = document.getElementById("form");

    var agree = form.agree.checked;
    if (!agree) {
        hint("请同意协议");
        return;
    }

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

    var password2 = form.password2.value;
    if (password !== password2) {
        hint("两次输入密码不一致");
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
    hint("正在提交...");

    teru.send("POST", "/account/create", cs, function(sc) {
        if (sc.Error) {
            hint("注册失败 " + sc.Error);
            submit.disabled = false;
        } else {
            // prevent showing anything while redirecting
            document.getElementById("hint").style.displayed = "none";
            window.location.href = "/signup-pass";
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

老版本的联机对战ID就是松饼社区ID，现在仍可继续使用，
已经有ID的无需再注册。

<form id="form" action="javascript:onSubmit()">
  <table>
    <tr>
      <td>用户名：</td>
      <td><input type="text" name="username" value="" /></td>
      <td>1~16字。既是登录名，也是显示名。</td>
    </tr>
    <tr>
      <td>密码：</td>
      <td><input type="password" name="password" value="" /></td>
      <td>至少8位。避免与重要帐号使用相同的密码。</td>
    </tr>
    <tr>
      <td>密码确认：</td>
      <td><input type="password" name="password2" value="" /></td>
    </tr>
    <tr>
      <td></td>
      <td>
        <label>
          <input type="checkbox" name="agree" />
          同意<a href="#license">松饼在线功能使用协议</a>
        </label>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit" value="---- 注册 ----" /></td>
    </tr>
    <tr>
      <td></td>
      <td><h3 id="hint" /></td>
    </tr>
  </table>
</form>

已有帐号？[蹬鹿](/login/)

---

## <a name="license"></a>松饼在线功能使用协议

1. 注册账号即视为同意本协议。若不同意，则不应当注册。
1. 松饼麻雀处于删档测试阶段，平台有权随意改动任何数据。
1. 平台对产品和服务不提供任何质量保证。
   出现故障，不保证修复；出现损失，无义务赔偿。
1. 平台不提供任何隐私或安全的保障，用户须自行承担数据泄漏的风险。
1. 平台有权随时无理由暂停或终止一切运维。
