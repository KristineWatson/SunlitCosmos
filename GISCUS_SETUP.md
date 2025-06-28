# Giscus 评论系统设置指南

## 什么是 Giscus？

Giscus 是一个基于 GitHub Discussions 的评论系统，让访客可以在你的网站上留下评论和反应。它是开源的、无跟踪、无广告、永久免费，并且无需数据库。

## 设置步骤

### 1. 准备 GitHub 仓库

1. **确保你的仓库是公开的** - 访客需要能够查看 discussions
2. **启用 Discussions 功能**：
   - 进入你的 GitHub 仓库
   - 点击 "Settings" 标签
   - 在左侧菜单中找到 "Features"
   - 勾选 "Discussions" 选项
   - 点击 "Save changes"

### 2. 安装 Giscus App

1. 访问 [Giscus App 安装页面](https://github.com/apps/giscus)
2. 点击 "Install"
3. 选择你要安装的仓库（你的网站仓库）
4. 完成安装

### 3. 获取配置信息

访问 [https://giscus.app/zh-CN](https://giscus.app/zh-CN) 并填写以下信息：

#### 仓库信息
- **仓库**：选择你的公开 GitHub 仓库
- **仓库 ID**：系统会自动显示

#### Discussion 分类
- **Discussion 分类**：选择 "Announcements"（推荐）
- **分类 ID**：系统会自动显示

#### 页面映射
- **页面 ↔️ discussion 映射关系**：选择 "Discussion 的标题包含页面的 `pathname`"
- **使用严格的标题匹配**：保持未勾选

#### 特性设置
- **启用主帖子上的反应**：勾选
- **输出 discussion 的元数据**：不勾选
- **将评论框放在评论上方**：不勾选
- **懒加载评论**：可选

#### 主题
- **主题**：选择 "用户偏好的色彩方案"

### 4. 更新配置文件

将获取到的信息更新到 `hugo.toml` 文件中：

```toml
[params.comments.giscus]
  # 替换为你的实际仓库信息
  repo = "your-github-username/your-repo-name"
  repoID = "your-actual-repo-id"
  category = "Announcements"
  categoryID = "your-actual-category-id"
  mapping = "pathname"
  strict = 0
  reactionsEnabled = 1
  emitMetadata = 0
  inputPosition = "bottom"
  lang = "zh-CN"
  lightTheme = "light"
  darkTheme = "dark_dimmed"
```

### 5. 测试评论系统

1. 重新启动 Hugo 服务器
2. 访问你的网站
3. 在文章页面底部应该能看到评论区域
4. 尝试发表一条评论进行测试

## 配置说明

### 映射关系选项
- `pathname`：使用页面路径（推荐）
- `url`：使用完整 URL
- `title`：使用页面标题
- `og:title`：使用 Open Graph 标题
- `specific`：使用特定字符串
- `number`：使用特定 discussion 编号

### 主题选项
- `light`：亮色主题
- `dark`：暗色主题
- `dark_dimmed`：暗色主题（GitHub 风格）
- `preferred_color_scheme`：跟随系统偏好

### 语言选项
- `zh-CN`：简体中文
- `en`：英文
- 其他支持的语言...

## 故障排除

### 评论不显示
1. 检查仓库是否为公开
2. 确认 Discussions 功能已启用
3. 验证 Giscus App 已正确安装
4. 检查配置信息是否正确

### 权限问题
1. 确保 Giscus App 有访问仓库的权限
2. 检查仓库设置中的 App 权限

### 主题不匹配
1. 检查 `lightTheme` 和 `darkTheme` 设置
2. 确认网站的颜色方案切换正常工作

## 自定义样式

你可以通过 CSS 自定义评论区域的样式：

```css
/* 自定义 giscus 容器样式 */
.giscus {
  margin-top: 2rem;
  border-top: 1px solid var(--border);
  padding-top: 2rem;
}

/* 自定义 giscus iframe 样式 */
.giscus-frame {
  border-radius: 8px;
}
```

## 更多信息

- [Giscus 官方文档](https://github.com/giscus/giscus)
- [GitHub Discussions 文档](https://docs.github.com/en/discussions)
- [Stack 主题评论系统文档](https://stack.jimmycai.com/guide/writing/posts.html#comments) 