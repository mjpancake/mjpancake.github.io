---
layout: page
title: 参与
permalink: /contribute/
---

## 贡献度排行

<div id="loading">
    <div style="width:45px;height:45px">
        <div id="spinner" style="position:relative"></div>
    </div>
</div>

<table id="c-points">
    <th>
        <td>松饼ID</td>
        <td>贡献度</td>
    </th>
</table>

<br />

---

<br />

只要拥有松饼社区 ID，
就可以通过 [Bug 反馈](/feedback/) 或 [众包任务](/crowd/)
获得“贡献度”。
贡献度是零食的领取基准，每周领取零食量 = 50 x 贡献度。

<script src="/js/teru.js"></script>
<script src="/js/spin.min.js"></script>

<script>
var spinner = new Spinner();

function setSpin(value) {
    var loading = document.getElementById("loading");

	if (value) {
        spinner.spin();
		document.getElementById("spinner").appendChild(spinner.el);
		loading.style.display = "block";
    } else {
        spinner.stop();
		loading.style.display = "none";
    }
}

function renderTable(sc) {
    var table = document.getElementById('c-points');

    if (sc.Entries) {
        for (var i = 0; i < sc.Entries.length; i++) {
            var row1 = table.insertRow(i + 1);

            var row1col1 = row1.insertCell(0);
            row1col1.innerHTML = "" + (i + 1);

            var row1col2 = row1.insertCell(1);
            row1col2.innerHTML = sc.Entries[i].Username;

            var row1col3 = row1.insertCell(2);
            row1col3.align = "right";
            row1col3.innerHTML = sc.Entries[i].CPoint;
        }
    }

	setSpin(false);
}

setSpin(true);
teru.send("GET", "/account/c-points", "", renderTable);
</script>

