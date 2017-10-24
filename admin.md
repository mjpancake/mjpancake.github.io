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

function onSubmitTask() {
    var form = document.getElementById("form-task");

    var token = form["token"].value;
    if (!token) {
        hint("missing token");
        return;
    }

    var taskId = parseInt(form["task-id"].value);
    if (!taskId) {
        hint("Task ID not a number");
        return;
    }

    function upsertTask() {
		var title = form["title"].value;
		if (!title) {
			hint("missing title");
			return;
		}

		var content = form["content"].value;
		if (!content) {
			hint("missing content");
			return;
		}

		var cPoint = parseInt(form["c-point"].value);
		if (!cPoint) {
			hint("C Point not a number");
			return;
		}

		var cs = JSON.stringify({
			Token: token,
			Task: {
				Id: taskId,
				Title: title,
				Content: content,
				CPoint: cPoint,
			}
		});

		form.submit.disabled = true;
		hint("正在提交...");

		teru.send("POST", "/admin/upsert-task", cs, function(sc) {
			if (sc.Error) {
				hint("Error: " + sc.Error);
			} else {
				hint("OK: Task Upserted");
			}

			form.submit.disabled = false;
		});
    }

    var op = form["op"].value;
    switch (op) {
    case "upsert":
        upsertTask();
        return;
    case "retrieve":
		form.submit.disabled = true;
		teru.send("GET", "/task/" + taskId, "", function(sc) {
			if (sc.Error) {
				hint("Error: " + sc.Error);
            } else {
                form["title"].value = sc.Task.Title;
                form["content"].value = sc.Task.Content;
                form["c-point"].value = sc.Task.CPoint;
            }

			form.submit.disabled = false;
		});
        return;
    case "delete":
		form.submit.disabled = true;
		teru.send("POST", "/admin/delete-task", "", function(sc) {
			if (sc.Error) {
				hint("Error: " + sc.Error);
            } else {
                hint("Successfully Deleted");
            }

			form.submit.disabled = false;
		});
        return;
    default:
        return;
    }
}

function onSubmitTaskCheck() {
    var form = document.getElementById("form-task-check");

    var token = form["token"].value;
    if (!token) {
        hint("missing token");
        return;
    }

    var taskId = parseInt(form["task-id"].value);
    if (!taskId) {
        hint("Task ID not a number");
        return;
    }

	var cs = JSON.stringify({
		Token: token,
		TaskId: taskId,
		Op: form["op"].value, 
	});

	form.submit.disabled = true;
	hint("正在提交...");

	teru.send("POST", "/admin/check-task", cs, function(sc) {
		if (sc.Error) {
			hint("Error: " + sc.Error);
		} else {
			hint("OK: Task Checked");
		}

		form.submit.disabled = false;
	});
}

function hint(str) {
    var hint = document.getElementById("hint");
    hint.innerHTML = str;
    hint.scrollIntoView(false);
}
</script>

<style>
table td, table td * {
  vertical-align: top;
}
</style>

<h3 id="hint"></h3>

## C Point

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

---

## Task

<form id="form-task" action="javascript:onSubmitTask()">
  <table>
    <tr>
      <td>Token: </td>
      <td><input type="text" name="token" value="" /></td>
    </tr>
    <tr>
      <td>Task ID: </td>
      <td><input type="text" name="task-id" value="" /></td>
    </tr>
    <tr>
      <td>Title: </td>
      <td><input type="text" name="title" value="" /></td>
    </tr>
    <tr>
      <td>Content: </td>
      <td><textarea name="content" rows="20" cols="80"></textarea></td>
    </tr>
    <tr>
      <td>C Point: </td>
      <td><input type="text" name="c-point" value="" /></td>
    </tr>
    <tr>
      <td>Op: </td>
      <td>
        <label><input type="radio" name="op" value="upsert" checked />Upsert</label>
        <label><input type="radio" name="op" value="retrieve" />Retrieve</label>
        <label><input type="radio" name="op" value="delete" />Delete</label>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit-task" value="--- Submit ---" /></td>
    </tr>
  </table>
</form>

---

## Check Task

<form id="form-task-check" action="javascript:onSubmitTaskCheck()">
  <table>
    <tr>
      <td>Token: </td>
      <td><input type="text" name="token" value="" /></td>
    </tr>
    <tr>
      <td>Task ID: </td>
      <td><input type="text" name="task-id" value="" /></td>
    </tr>
    <tr>
      <td>Op: </td>
      <td>
        <label><input type="radio" name="op" value="accept" checked />Accept</label>
        <label><input type="radio" name="op" value="expect" />Expect</label>
        <label><input type="radio" name="op" value="fire" />Fire</label>
        <label><input type="radio" name="op" value="fire-doing" />Fire-Doing</label>
      </td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit-task" value="--- Judge ---" /></td>
    </tr>
  </table>
</form>

