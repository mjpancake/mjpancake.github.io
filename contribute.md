---
layout: page
title: 贡献
permalink: /contribute/
---

## 贡献度排行

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

松饼作为非商业项目，能发展到今天归功于各路人才的无偿协作。
若想让松饼继续发展下去，请积极做出贡献。

做贡献的流程非常简单——
只要拥有松饼社区ID，就可以随时领取任务，将其完成并结算“贡献度”。
贡献度在联机对战中有一定的作用，具体规则如下：

- 贡献度是“每周零食”的发放基准，贡献度越高，每周能领取的“零食”就越多
- 少女出场联机对战需消耗零食，零食不足时只能选京狗
- 联机对战与零食系统预计在0.9.1版本上线，贡献度系统现已上线
- 暂定“每周领取零食量 = 50 x 贡献度”
- 暂定“零食屯积上限 = 160 x 贡献度”
- 暂定零食消耗：
    - 四喜、茶杯 2000~2600零食/半庄
    - 乳和、暖姐 2900~5200零食/半庄
    - 夕哥、军师 5800~6400零食/半庄
    - 怜、淡 7700~8000零食/半庄
    - 照、衣 9600~12000零食/半庄
    - 尼曼、锻神 16000~48000零食/半庄

任务分为两种：循环任务和单次任务。

## 循环任务

循环任务，就是可以反复完成的任务，每完成一次结算一次贡献度。
领取方式与验收方式各不相同，详见以下说明。

### 循环任务A：高质量反馈

- 任务内容：按照[规范](/feedback/)，提供高质量的意见/建议/报错
- 获得贡献度：10~200/次
- 任务通过条件：回复完全符合规范

### 循环任务B：报错搬运

- 概要：将Q群中看到的bug报告发到发布贴
- 获得贡献度：50/次
- 回贴格式：替换掉以下模板中尖括号部分
```
[Q群报错搬运]
ID: <用于结算贡献度的松饼ID>
群聊截图：<群聊现场的截图>
```

### 循环任务C：建议搬运

- 概要：将Q群中看到的意见/建议发到发布贴
- 获得贡献度：0~40/次
- 回贴格式：替换掉以下模板中尖括号部分
```
[Q群建议搬运]
ID: <用于结算贡献度的松饼ID>
改哪里：<转述整理该建议想根修改的地方>
怎么改：<转述整理该建议想把修改对象改成什么样子>
为什么改：<转述整理该建议的依据>
群聊截图：<群聊现场的截图>
```
贡献度变化根据搬运质量衡量，
“改哪里”、“怎么改”、“为什么改”、“截图”各占10点。

### 循环任务D：下载分流

- 概要：为松饼安装包提供网盘、群文件等可选下载方式
- 获得贡献度：100/次
- 任务领取方式：直接开始搬运操作即可，无需事先说明
- 任务验收方式：提交网盘链接，或简单告知群文件已上传
    - 提交方式 QQ: 1493690468
      或 [Gitter]({{ site.data.link.gitter-rolevax }})
- 验收通过条件：
    - 上传文件准确无误；文件名合理，下载方便
    - 同时提供松饼Windows版与Android版（只传一种版本的无法通过验收）
    - 上传文件为最新版（搬运旧版无法通过验收）
    - 与他人的搬运成果不重复
     （通过[更新公告]({{ site.data.link.releases }})确认已有的网盘链接。
       若显示“准备中”则表明还没有人上传）

### 循环任务E：群管理

- 概要：成为松饼QQ群管理员，对违规群员禁言或踢群
- 获得贡献度：50~100/次
- 如何成为管理员：私聊群主，回答一组笔试题
- 任务验收方式：进行禁言/踢人操作后，截图事发现场上下文，QQ内发给群主
- 验收通过条件：没什么大毛病基本都会通过验收
- 备注：禁言基准时长为10分钟，根据严重程度自行微调

## 单次任务

单次任务是解决特定问题的任务，
相比循环任务，可获得更为丰厚的贡献度。

- 前往[松饼众包平台](/crowd/)领取单次任务。

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

