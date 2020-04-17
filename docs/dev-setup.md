---
layout: page
title: 搭建开发环境
permalink: /docs/dev-setup/
---

## 索引

根据使用的平台和开发的目标选读：

- [在 Linux 上开发`libsaki`或`mjpancake`](#linux-client)
- [在 Windows 上开发`libsaki`或`mjpancake`](#windows-client)
- [在 macOS 上开发`libsaki`或`mjpancake`](#macos-client)
- [开发 Android 客户端](#android)
- [开发`ih`](#ih)
- [生成单个 exe 文件](#exe)

{% capture client-cond %}
理论上，只要满足以下所有条件，就可以进行开发：

- 有一个完整支持 C++17 的编译器
- 装有最新版 Qt
{% endcapture %}

{% capture install-qt %}
1. 下载并安装 Qt 5.14.2 开源版
    - 下载地址：[镜像][qt-mirror]{:target="_blank"}
                或 [官网][qt]{:target="_blank"}
    - 大陆网络环境下推荐使用镜像
{% endcapture %}

{% capture create-fork %}
1. 从 [`mjpancake`][mjpancake]{:target="_blank"}
   以及 [`libsaki`][libsaki]{:target="_blank"} 创建 fork 
1. 通过以下命令克隆仓库：（替换掉`your-username`）
    - `git clone --recursive https://github.com/your-username/mjpancake.git`
{% endcapture %}

{% capture client-end %}
环境搭建好以后，
用 Qt Creator 打开代码目录下的`mjpancake.pro`项目，
点击左下角的 Build 按钮进行编译。
编译成功通过则说明环境搭建完成。

首次编译时可能会报出有关 QML 的语法错误，
此系静态分析器的问题所致，不影响程序的运行时行为，可无视。

首次接触`libsaki`代码的，
建议阅读[Libsaki代码导读](/docs/libsaki/)，快速了解整体设计。
{% endcapture %}

## <a name="linux-client"></a> 在 Linux 上开发 libsaki 或 mjpancake

{{ client-cond }}

具体步骤：

1. 安装 7.x 或以上的 G++{{ install-qt }}{{ create-fork }}{{ client-end }}


##  <a name="windows-client"></a>在 Windows 上开发 libsaki 或 mjpancake

{{ client-cond }}

具体步骤：

1. 安装 [mingw-w64][mingw-w64]{:target="_blank"}
           <a name="_"></a>
    - 安装路径不能带空格
    - 安装时选择「最新版, i686, posix, dwarf」
{{ install-qt }}    - 安装时勾选 MinGW 组件
{{ create-fork }}
1. 打开 Qt Creator，「工具」->「选项」，
   将 C 与 C++ 的编译器都改成 mingw-w64 的，如下图。

![配置mingw-w64]({{ "/assets/mingw.png" | absolute_url }})

{{ client-end }}

## <a name="macos-client"></a>在 macOS 上开发 libsaki 或 mjpancake

1. 通过 AppStore 安装最新版 Xcode{{ install-qt }}
{{ create-fork }}
{{ client-end }}

## <a name="android"></a>开发 Android 客户端

Qt 官方建议使用 Android NDK r10e，
然而 r10e 自带的 G++ 编不过 Libsaki。
我们的解决方案是使用最新的 NDK 里的 Clang，
目前看来好像还没踩到什么坑。

此外，我们还需要让 Qt 集成 OpenSSL。
目前（2018年11月），
通过 NDK 里的 Clang 编译 OpenSSL 不是人干的事（不信你试试x），
所以我们最好下一个 prebuilt 的版本。

1. 安装最新的 NDK
2. 下载通过 NDK 编译的 armeabi 架构的 OpenSSL 1.1.1 静态库
2. 下载 Qt 源码
3. 通过 NDK 里的 Clang 编译 Qt，并静态链接 OpenSSL（需要几个小时）
4. 通过这个新编译出的 Qt 构建`mjpancake.pro`

## <a name="ih"></a>开发 ih

`ih`的开发环境和运行环境都被做成了 Docker 镜像，
因此需要安装的东西只有 Docker 和 Docker Compose。

- 第一步：安装 [Docker][docker]{:target="_blank"}
          和 [Docker Compose][docker-compose]{:target="_blank"}
- 第二步：从`ih`创建fork
    - 进入[`ih`][ih]{:target="_blank"}页面，点右上角的fork
- 第三步：克隆仓库：（替换掉`your-username`）
    - `git clone https://github.com/your-username/ih.git`

编译和运行都只需要一行命令，见[`ih`][ih]里的`README.md`。

## <a name="exe"></a>生成单个 exe 文件

通过以下步骤，可生成单个 exe 的 Windows 客户端：

1. 安装 MinGW-w64
2. 通过 MinGW-w64 编译 OpenSSL，并静态链接 libz
3. 通过 MinGW-w64 开启静态库选项编译 Qt，并静态链接 OpenSSL
4. 去打三个半庄x
5. 使用新编译出的 Qt 构建 `mjpancake.pro`
 
看起来简单，实际上里面全是坑，需要很强的耐心。

[libsaki]: https://github.com/rolevax/libsaki
[mjpancake]: https://github.com/rolevax/mjpancake
[ih]: https://github.com/rolevax/ih
[pages]: https://github.com/mjpancake/mjpancake.github.io

[mingw-w64]: https://mingw-w64.org/doku.php/download/mingw-builds
[git-win]: https://git-for-windows.github.io/
[qt]: https://www.qt.io
[qt-mirror]: https://mirrors.tuna.tsinghua.edu.cn/qt/archive/qt/5.14/5.14.2/

[docker]: https://docs.docker.com/engine/installation/
[docker-compose]: https://docs.docker.com/compose/install/

