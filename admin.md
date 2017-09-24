---
layout: page
title: Admin
permalink: /admin/
---

<script src="/js/teru.js"></script>

<script>
function onSubmitCPoint() {
    var form = document.getElementById("form-c-point");

    var username = form.username.value;
    if (!username) {
        hint("no username");
        return;
    }

    username = username.trim();

    var token = form.token.value;
    if (!token) {
        hint("no token");
        return;
    }

    var delta = parseInt(form.delta.value);
    if (!delta) {
        hint("delta not a number");
        return;
    }

    var cs = JSON.stringify({
        Token: token,
        Username: username,
        CPointDelta: delta
    });

    form.submit.disabled = true;
    hint("正在提交...");

    teru.send("POST", "/admin/c-point", cs, function(sc) {
        if (sc.Error) {
            hint("Error: " + sc.Error);
        } else {
            hint("OK: C Point Updated");
        }

        form.submit.disabled = false;
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

<h3 id="hint"></h3>

<form id="form-c-point" action="javascript:onSubmitCPoint()">
  <table>
    <tr>
      <td>Token: </td>
      <td><input type="text" name="token" value="" /></td>
    </tr>
    <tr>
      <td>Username: </td>
      <td><input type="text" name="username" value="" /></td>
    </tr>
    <tr>
      <td>C Point Delta: </td>
      <td><input type="text" name="delta" value="" /></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" name="submit" value="Update C Point" /></td>
    </tr>
  </table>
</form>

<form id="form" action="javascript:onSubmit()">
  <table>
    <tr>
      <td>Task ID: </td>
      <td><input type="text" name="task-id" value="" /></td>
    </tr>
    <tr>
      <td>State: </td>
      <td><input type="text" name="task-state" value="" /></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit-task" value="Task" /></td>
    </tr>
    <tr>
      <td>Msg: </td>
      <td><input type="text" name="msg" value="" /></td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit-append" value="Append" /></td>
    </tr>
  </table>
</form>

