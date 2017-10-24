---
layout: page
title: 松饼众包平台
permalink: /crowd/
---

<script src="/js/teru.js"></script>
<script src="/js/markdown.min.js"></script>
<script src="/js/spin.min.js"></script>

<style>
table {
    border-collapse: collapse;
}

table, th, td {
    border: 1px solid black;
}

th, td {
    padding-left: 15px;
    padding-right: 15px;
}
</style>

<div id="loading">
    <div style="width:45px;height:45px">
        <div id="spinner" style="position:relative"></div>
    </div>
    <h4 id="hint-text"></h4>
</div>

<div id="curr-user">
</div>

---

<div id="forms" style="display:none">
	<h2>可领取任务</h2>
	<table id="table-todo">
		<th>
			<td>任务说明</td>
		</th>
	</table>

	<br />

	<h2>进行中任务</h2>
	<table id="table-doing">
		<th>
			<td>任务说明</td>
		</th>
	</table>

	<br />

	<h2>待验收任务</h2>
	<table id="table-check">
		<th>
			<td>任务说明</td>
		</th>
	</table>

	<br />

	<h2>近期活动记录</h2>
	<ul id="waters">
	</ul>
</div>

<script>
var spinner = new Spinner();
var user = null;

function hint(text, hideForm = true, spin = true) {
    var loading = document.getElementById("loading");
    loading.style.display = "block";
    document.getElementById("hint-text").innerHTML = text;
	document.getElementById("forms").style.display = (hideForm ? "none" : "block");

    if (spin) {
        spinner.spin();
		document.getElementById("spinner").appendChild(spinner.el);
    } else {
        spinner.stop();
    }
}

function onTaskOpResp(sc) {
    var text = sc.Error ? "操作失败: " + sc.Error : "操作成功！";
    text += '<br /><a href="javascript:reloadForms()">刷新任务列表</a>'
	hint(text, true, false);
}

function clearTables() {
    var tables = ["table-todo", "table-doing", "table-check"];
    for (var i in tables) {
        var table = document.getElementById(tables[i]);
		var rows = table.rows;
		var i = rows.length;
		while (--i) {
			table.deleteRow(i);
		}
    }
}

function addTodo(task) {
    var table = document.getElementById('table-todo');

    var row1 = table.insertRow(table.rows.length);

    var row1col1 = row1.insertCell(0);
    row1col1.innerHTML = "" + task.Id;
    row1col1.setAttribute("rowspan", "3");

    var row1col2 = row1.insertCell(1);
    row1col2.innerHTML = task.Title;

    var row2 = table.insertRow(table.rows.length);
    var row2col1 = row2.insertCell(0);
    row2col1.innerHTML = markdown.toHTML(task.Content);

    var row3 = table.insertRow(table.rows.length);
    var row3col1 = row3.insertCell(0);
    row3col1.innerHTML = "贡献度：" + task.CPoint + " ";
    var call = 'hint("正在处理……");teru.send("POST", "/task/start/' +
        task.Id + '", "", onTaskOpResp)';
	var a = document.createElement("a");         
	a.innerHTML = "接受任务";           
    a.href = 'javascript:' + call;
	row3col1.appendChild(a); 
}

function addDoing(task) {
    var table = document.getElementById('table-doing');

    var row1 = table.insertRow(table.rows.length);

    var row1col1 = row1.insertCell(0);
    row1col1.innerHTML = "" + task.Id;
    row1col1.setAttribute("rowspan", "3");

    var row1col2 = row1.insertCell(1);
    row1col2.innerHTML = task.Title;

    var row2 = table.insertRow(table.rows.length);
    var row2col1 = row2.insertCell(0);
    row2col1.innerHTML = markdown.toHTML(task.Content);

    var row3 = table.insertRow(table.rows.length);
    var row3col1 = row3.insertCell(0);
    var cPointA = task.Assignee.CPoint;
    var cPointB = task.Assignee.CPoint + task.CPoint;
    row3col1.innerHTML = "贡献者：" + task.Assignee.Username +
        "<br />预计贡献度变化：" + cPointA + "&#8594;" + cPointB +
        " (+" + task.CPoint + ")";

    if (task.Assignee.Id == user.Id) {
        row3col1.innerHTML += "<br />已完成？";
		var call = 'hint("正在处理……");teru.send("POST", "/task/pr/' +
			task.Id + '", "", onTaskOpResp)';
		var a = document.createElement("a");         
		a.innerHTML = "通知验收";           
		a.href = 'javascript:' + call;
		row3col1.appendChild(a); 
    }
}

function addCheck(task) {
    var table = document.getElementById('table-check');

    var row1 = table.insertRow(table.rows.length);

    var row1col1 = row1.insertCell(0);
    row1col1.innerHTML = "" + task.Id;
    row1col1.setAttribute("rowspan", "3");

    var row1col2 = row1.insertCell(1);
    row1col2.innerHTML = task.Title;

    var row2 = table.insertRow(table.rows.length);
    var row2col1 = row2.insertCell(0);
    row2col1.innerHTML = markdown.toHTML(task.Content);

    var row3 = table.insertRow(table.rows.length);
    var row3col1 = row3.insertCell(0);
    var cPointA = task.Assignee.CPoint;
    var cPointB = task.Assignee.CPoint + task.CPoint;
    row3col1.innerHTML = "贡献者：" + task.Assignee.Username +
        "<br />预计贡献度变化：" + cPointA + "&#8594;" + cPointB +
        " (+" + task.CPoint + ")";
}

function renderTable(sc) {
    if (sc.Error) {
        hint(sc.Error, false, false);
        return;
    }

    if (sc.Tasks) {
        clearTables();
        for (var i = 0; i < sc.Tasks.length; i++) {
            var task = sc.Tasks[i];
            switch (task.State) {
            case 0:
                addTodo(task);
                break;
            case 1:
                addDoing(task);
                break;
            case 2:
                addCheck(task);
                break;
            default:
                break;
            }
        }
    }

    if (sc.Waters) {
        var ul = document.getElementById("waters");             
		while (ul.hasChildNodes()) {
			ul.removeChild(ul.lastChild);
		}

        for (var i in sc.Waters) {
            var li = document.createElement("li");         
            li.innerHTML = sc.Waters[i];           
            ul.appendChild(li); 
        }
    }

    hint("", false, false);
}

function reloadForms() {
    hint("正在喵载数据……");
    teru.send("GET", "/task/", "", renderTable);
}

hint("正在登录…<br />若登录时间过长，请尝试梯子", true, true);
teru.makeSureLoggedIn(function() {
    user = teru.getUser();
	var curr = document.getElementById("curr-user");
	curr.innerHTML = "当前登录ID: " + user.Username + 
        ' <a href="/login/">切换帐号</a>';
    reloadForms();
});
</script>

