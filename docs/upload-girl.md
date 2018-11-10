---
layout: page
title: 人物包投稿
permalink: /docs/upload-girl/
---

<script>
function onSubmit() {
    var form = document.getElementById("form");
    var obj = {
        name: form.name.value,
        uploader: form.uploader.value,
        repo: form.username.value + "/" + form.repo.value,
        desc: form.desc.value
    };
    var output = document.getElementById("output");
    var json = JSON.stringify(obj, null, 2);
    output.innerHTML = "迷之回复：<br />" +
                       "<pre>" + new Option(json).innerHTML + "</pre>";
}
</script>

本文介绍如何上传、分享松饼原创人物包。

## 先决条件

原创人物的下载与上传都是以「人物包」为单位的。

- 一个人物包里可以有任意多个人物
- 一个用户可以投稿多个人物包
- 一个人物包对应一个 GitHub 代码库

投稿人物包，要先拥有 GitHub 账号，并掌握上传代码等基本操作。
这种基于 GitHub 的上传方式的设计出于以下几个目的：

- 设立一定的门槛，确保 UP 主至少有会用 GitHub 的水平
- 便于 UP 主们直接通过 GitHub 合作交流
- 直接具备 Git 版本控制的一切好处

## 创建人物包代码库

假如你已经通过松饼人物编辑器做了一堆原创人物，
现在想把其中几个做成人物包分享给大家，
那么就可以按照以下步骤操作：

1. 在 GitHub 上创建一个代码库
    - 权限为 public，对所有人可见
    - 建议加个`README.md`，里面写人物的技能介绍
2. 把想要上传的人物上传到新代码库的根目录下
    - 原创人物的本地保存位置：
        - Windows: `C:\Users\用户名\AppData\Local\mjpancake\edit`
        - Linux: `~/.config/mjpancake/edit`
        - macOS: `~/Library/Preferences/mjpancake/edit`
        - Android/iOS: 手机搞开发，不存在的x
    - 每个人物对应两个文件
        - 一个`.girl.json`文件和一个`.girl.lua`文件
        - `.girl.json`文件包含人物的名字、头像等基本信息，该文件必须上传
        - `.girl.lua`文件包含人物的技能，可上传可不上传，不上传则成京狗
3. 登记新创建的代码库（见下文）

## 登记人物包代码库

首先，填写以下表格并点击「生成迷之回复」。

<form id="form" action="javascript:onSubmit()">
  <table>
    <tr>
      <td>人物包名称：</td>
      <td><input type="text" name="name" value="" /></td>
      <td>可以随便起</td>
    </tr>
    <tr>
      <td>UP主昵称：</td>
      <td><input type="text" name="uploader" value="" /></td>
      <td>可以随便起</td>
    </tr>
    <tr>
      <td>GitHub 用户名：</td>
      <td><input type="text" name="username" value="" /></td>
      <td>是英文小写的那个 ID，不是昵称，不是邮箱</td>
    </tr>
    <tr>
      <td>GitHub 代码库名：</td>
      <td><input type="text" name="repo" value="" /></td>
      <td>刚才新建的 repository 名称</td>
    </tr>
    <tr>
      <td>人物包简介：</td>
      <td><input type="text" name="desc" value="" /></td>
      <td>简单安利一下</td>
    </tr>
    <tr>
      <td></td>
      <td><input type="submit" id="submit" value="生成迷之回复" /></td>
    </tr>
  </table>
</form>

<div id="output"></div>

生成迷之回复后，将其复制下来，回复到
[这里](https://github.com/rolevax/libsaki/issues/51){:target="_blank"}，
<a name="_"></a>
即可完成登记。

登记后，打开松饼麻雀「人物下载」页面，新人物包就应该出现在列表中了，
同时其状态应为「可下载」。

## 更新人物包

直接更新与该人物包对应的 GitHub 代码库即可，无需再次登记。
代码库更新后，松饼「人物下载」页面中的状态应立即变为「可更新」。

## 河蟹机制

出现以下情况时，登记的人物包可能会被取消登记，
情节严重者拉黑：

1. 人物包含有常识性的不河蟹内容
2. 人物包被用于除分享人物以外的奇怪用途
3. 人物包内容意义不明
4. 人物包内容引起麻学家强♂烈不适
5. 发现刷 star、屠屏、马甲屠屏、冒充他人等作弊行为
6. 未按照相应的 license 使用他人代码
7. 被喵打嫌弃

