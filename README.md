# 学术个人主页模板

这是一个简洁、美观，由 Markdown 驱动的 GitHub Pages 学术个人主页模板。

本模板适合学生、研究人员、实验室成员和学术开发者快速搭建个人主页。项目完全由静态 `HTML + CSS + JavaScript` 构成，不需要构建工具，也不绑定任何前端框架。你只需要修改 `content/` 目录里的 Markdown 文件和 `content/config.json`，就可以完成主页内容维护。

Markdown 默认通过 CDN 加载 Marked.js 在浏览器端渲染。如果 CDN 不可用，项目内置了一个轻量 fallback，可支持常见 Markdown 语法。

## 功能特性

- 内容优先使用 Markdown 维护
- 左侧固定个人信息栏
- 桌面端与移动端自适应布局
- 内置时间线、研究方向卡片、论文列表、项目卡片、荣誉列表、联系方式等栏目类型
- 无需构建步骤，直接部署到 GitHub Pages
- MIT 开源协议

## 目录结构

```text
.
├── content
│   ├── about.md
│   ├── config.json
│   ├── contact.md
│   ├── honors.md
│   ├── news.md
│   ├── projects.md
│   ├── publications.md
│   └── research.md
├── static
│   ├── assets
│   │   ├── favicon.ico
│   │   └── img
│   │       └── avatar.svg
│   ├── css
│   │   └── main.css
│   └── js
│       └── main.js
├── index.html
├── LICENSE
└── README.md
```

## 快速开始：Fork 本模板

### 1. Fork 仓库

在 GitHub 页面点击 **Fork**，将本模板复制到你自己的账号下。

### 2. 重命名仓库

如果你想创建个人 GitHub Pages 主页，请将 fork 后的仓库重命名为：

```text
<你的 GitHub 用户名>.github.io
```

例如你的 GitHub 用户名是 `alice`，仓库名就应该是：

```text
alice.github.io
```

这样你的主页地址就是：

```text
https://alice.github.io/
```

如果你保留其他仓库名，GitHub Pages 会将它作为项目主页发布，地址通常是：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```

### 3. 修改个人信息配置

打开：

```text
content/config.json
```

重点修改这些字段：

```json
{
  "site": {
    "title": "Your Name | Academic Homepage",
    "description": "Your academic homepage",
    "author": "Your Name"
  },
  "profile": {
    "avatar": "static/assets/img/avatar.svg",
    "name": "Your Name",
    "nameLocal": "你的姓名",
    "role": "Your Academic Role",
    "affiliation": [
      "Department or School",
      "University or Organization"
    ]
  }
}
```

你也可以在 `sections` 数组里调整栏目顺序、栏目名称，或者添加/删除栏目。

### 4. 修改 Markdown 内容

主要内容都在 `content/` 目录中：

```text
content/about.md          个人简介
content/news.md           新闻动态 / 时间线
content/research.md       研究方向卡片
content/publications.md   论文列表
content/projects.md       项目经历
content/honors.md         荣誉奖项
content/contact.md        联系方式
```

对于研究方向、论文、项目这类卡片式栏目，每一个 `### 标题` 都会生成一个新的卡片。


### 5. 替换头像

默认头像文件是：

```text
static/assets/img/avatar.svg
```

你可以替换成自己的头像，支持 `.png`、`.jpg`、`.jpeg`、`.webp`、`.svg` 等格式。

如果你修改了文件名，请同步修改 `content/config.json` 中的：

```json
"avatar": "static/assets/img/avatar.svg"
```

### 6. 开启 GitHub Pages

在你的仓库中：

1. 进入 **Settings**
2. 点击 **Pages**
3. 在 **Build and deployment** 中，将 **Source** 设置为 `Deploy from a branch`
4. Branch 选择 `main`
5. Folder 选择 `/ (root)`
6. 点击 **Save**

GitHub Pages 通常会在几分钟内完成部署。

## 栏目类型

`content/config.json` 中的 `type` 字段控制每个 Markdown 文件如何渲染。

```text
hero          首页大简介区域
timeline      带日期的新闻时间线
research      研究方向卡片网格
publications  论文列表
projects      项目卡片列表
honors        荣誉列表
contact       联系方式卡片
plain         普通 Markdown 卡片
```

## 删除或新增栏目

### 删除栏目

打开：

```text
content/config.json
```

删除 `sections` 数组中对应的栏目配置即可。

注意保持 JSON 逗号格式合法。

### 新增栏目

1. 在 `content/` 中新建一个 Markdown 文件
2. 在 `content/config.json` 的 `sections` 数组中添加对应配置

示例：

```json
{
  "id": "teaching",
  "title": "Teaching",
  "subtitle": "教学",
  "file": "content/teaching.md",
  "type": "plain"
}
```

然后新建：

```text
content/teaching.md
```

并写入你的内容。

## 自定义样式

如果你想修改颜色、字体、间距、卡片样式、侧边栏宽度或响应式布局，请编辑：

```text
static/css/main.css
```

常用颜色变量在文件顶部：

```css
:root {
  --bg: #f4f7fa;
  --panel: #ffffff;
  --text: #223040;
  --muted: #647384;
  --blue: #2b8fdc;
}
```

## 常见问题

### 修改后 GitHub Pages 没有立刻变化怎么办？

通常需要等待 1-5 分钟。如果另一个浏览器能看到新版本，而当前浏览器不能看到，多半是缓存问题。可以尝试：

```text
F12，点击 Network ，选中 Disable cache ，然后按 F5 进行刷新即可
```

## 开源协议

本项目基于 MIT License 开源。
