# Desktop 端 UI 设计规范（企业版）

## **版本** 2.0
## **主题** 科技蓝 · 企业风格 · 严谨规范

本文档为 EDUClaw 的"强制级" UI 规范，所有新增与修改界面必须符合本规范；色值、间距、组件样式禁止随意偏离。

---

## 一、设计定位与原则

### 1.1 设计定位
- **企业风格**：稳重、专业、可读性优先；避免娱乐化、高饱和与强对比装饰。
- **主色**：**科技蓝 #4659FF** 作为唯一主色，用于品牌、主操作、焦点、选中态与关键信息强调。
- **双主题**：完整支持浅色（Light）与深色（Dark），并通过「跟随系统」切换；实现方式为在`<html>`上设置`light`/`dark` class，Tailwind 使用`dark:`前缀。

### 1.2 强制原则
| 原则 | 要求 |
| :--- | :--- |
| **一致性** | 同一语义（如「主按钮」「页面背景」「边框」）在全应用内只使用规范给出的色值与类名。 |
| **双主题** | 所有背景、文字、边框、阴影必须同时提供 Light 与 Dark 两套，不得只写一套。 |
| **无硬编码** | 禁止在组件内写十六进制色值（除本规范明确给出的色值），一律使用 Tailwind 扩展色或 CSS 变量。 |
| **无障碍** | 可聚焦控件必须具备可见焦点环；图标按钮必须提供`aria-label` 或等效说明。 |

### 1.3 技术实现要点
- **样式方案**：Tailwind 工具类为主，复杂或复用可使用`/index.css`中的全局类（如`color-scheme-primary`、`modal-backdrop`）。
- **主题实现**：`themeService` 在`<html>`上切换`light`/`dark`，并设置`color-scheme`与全局背景/文字色。
- **暗色模式**：`tailwind.config.js` 中`darkMode:'class'`，不依赖`prefers-color-scheme` media alone。

---

## 二、色彩系统（科技蓝主题）

### 2.1 主色：科技蓝 #4659FF
主色用于：主按钮、链接、焦点环、导航选中态、关键图标与徽章、进度与加载指示。

| 语义 | 类名（建议 Tailwind 扩展色） | 色值 | 使用场景 |
| :--- | :--- | :--- | :--- |
| 主色（深基色） | `primary` | `#4659FF` | 主按钮填充、Logo、亮色模式下导航选中文字与边框 |
| 主色亮 | `primary-light` | `#6474FF` | 主按钮悬停、链接悬停、亮色下导航选中 |
| 主色更亮 | `primary-lighter` | `#EBEEFF` | 焦点环、输入框聚焦边框、徽章与轻量强调 |
| 主色淡色 | `primary-muted` | `rgba(70, 89, 255, 0.12)` | 新会话入口背景、选中项背景、标签背景 |

**阴影与主色联动**：
- 焦点/浮层：`0 8px 32px rgba(70, 89, 255, 0.18)`（浅色） / `0 8px 32px rgba(100, 116, 255, 0.25)`（深色）。
- 卡片悬浮：`0 12px 24px rgba(70, 89, 255, 0.12)`（浅色） / `0 12px 24px rgba(100, 116, 255, 0.2)`（深色）。

### 2.2 中性色（背景、边框、文字）
所有中性色需成对定义 Light / Dark，严禁只写一侧。

#### 浅色模式（Light）
| 用途 | 类名（示例） | 色值 | 说明 |
| :--- | :--- | :--- | :--- |
| 页面背景 | `bg-page` | `#F5F5F7` | 冷灰白，标准企业背景 |
| 卡片/面板 | `bg-surface` | `#FFFFFF` | 卡片、弹窗、面板 |
| 悬停/选中背景 | `bg-surface-hover` | `#EBEDEF` | 列表项、导航项悬停 |
| 弱区分区域 | `bg-surface-muted` | `#F3F4F6` | 侧栏、次要区域背景 |
| 内凹区域 | `bg-surface-inset` | `#EBEDEF` | 输入框、代码区、终端 |
| 默认边框 | `border-default` | `#E8E8EB` | 分割线、输入框、卡片描边 |
| 弱分割线 | `border-light` | `#EBEDF0` | 更轻的分割线 |
| 主文字 | `text-primary` | `#1F2329` | 正文、标题 |
| 次要文字 | `text-secondary` | `#646A73` | 说明、副标题 |
| 弱化文字 | `text-muted` | `#8F959E` | 占位、时间戳、标签 |

#### 深色模式（Dark）
| 用途 | 类名（示例） | 色值 | 说明 |
| :--- | :--- | :--- | :--- |
| 页面背景 | `dark:bg-page` | `#121212` | 深色模式页面背景 |
| 卡片/弹层 | `dark:bg-surface` | `#1E1E1E` | 卡片、弹窗背景 |
| 悬停/选中背景 | `dark:bg-surface-hover` | `#2A2A2A` | 列表、导航项悬停/选中 |
| 弱区分区域 | `dark:bg-surface-muted` | `#222222` | 侧栏背景 |
| 内凹区域 | `dark:bg-surface-inset` | `#141414` | 输入框、内容区 |
| 默认边框 | `dark:border-default` | `#333333` | 分割线、输入框边框 |
| 弱分割线 | `dark:border-light` | `#1F2329` | 更弱的分割线 |
| 主文字 | `dark:text-primary` | `#FFFFFF` | 正文、标题 |
| 次要文字 | `dark:text-secondary` | `#C9CDD4` | 说明、副标题 |
| 弱化文字 | `dark:text-muted` | `#86909C` | 占位、时间戳 |

### 2.3 语义色
| 语义 | 浅色 | 深色 |
| :--- | :--- | :--- |
| 危险/错误 | `red-500`、`red-600` | `red-400`、`red-900/20` | 删除确认、错误提示、违规提醒 |
| 警告 | `yellow-500`、`yellow-100` | `yellow-500`、`yellow-900/30` | 风险提示、流程提醒 |
| 成功 | `green-500`、`green-50` | `green-400`、`green-950/20` | 完成、通过、训练合格 |

### 2.4 使用约定
- 书写顺序：先 Light 再 Dark，例如：`bg-surface dark:bg-surface`
- 主色仅用于：主按钮、链接、焦点、导航选中、进度、强调标签；不用于大面积背景。
- 企业风格克制使用高饱和彩色，保持专业克制。

---

## 三、字体与排版

### 3.1 字体栈
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;

**重要**：字体栈必须按顺序完整包含以下字体：
- **系统字体**：-apple-system, BlinkMacSystemFont（macOS/iOS 系统）
- **跨平台字体**：'Segoe UI'（Windows）
- **中文字体（必须）**：
  - 'PingFang SC'（苹果系统默认中文字体）
  - 'Hiragino Sans GB'（Mac 中文）
  - 'Microsoft YaHei'（Windows 微软雅黑）
- **通用字体**：'Helvetica Neue', Helvetica, Arial, sans-serif

- 正文：`font-synthesis: none`，`text-rendering: optimizeLegibility`，`-webkit-font-smoothing: antialiased`。
- 等宽（代码、终端）：`'SF Mono', 'Fira Code', Menlo, Monaco, 'Courier New', monospace`。

### 3.2 字号与字重（严谨层级）
| 层级 | 类名/约定 | 字重 | 用途 |
| :--- | :--- | :--- | :--- |
| 页面主标题 | `text-2xl` / `text-3xl` | `font-semibold`（600） | 页面顶部标题、文档 H1 |
| 区块标题 | `text-lg` / `text-xl` | `font-semibold` | 区块标题、模态框、文档 H2 |
| 小节标题 | `text-base` / `text-lg` | `font-semibold` | 文档 H3、卡片标题 |
| 正文 | `text-sm` / `text-base` | `font-normal`（400） | 列表、表单、说明文字 |
| 辅助/标签 | `text-xs` / `text-sm` | `font-normal` 或 `font-medium` | 时间戳、表头、导航分组标签 |
| 小标签/角标 | `text-[10px]` / `text-[11px]` | `uppercase` + `tracking-wider` | 分类角标、步骤标签 |

- 按钮内文：`text-sm` + `font-medium`。
- 企业风格标题不使用过重字重，以 600 为主。

### 3.3 行高与段落
- 根元素：`line-height:1.6`。
- 长文/文档：`leading-relaxed`（约 1.625）。
- 紧凑列表/按钮：默认或`leading-normal`。

---

## 四、圆角与阴影

### 4.1 圆角（统一尺度）
| 用途 | 类名 | 建议数值 | 场景 |
| :--- | :--- | :--- | :--- |
| 小控件 | `rounded-lg` | `8px` | 按钮、输入框、下拉项、列表项 |
| 卡片/弹层 | `rounded-xl` / `rounded-2xl` | `12px / 16px` | 主内容区、模态框、Toast |
| 圆形 | `rounded-full` | `50%` | 头像、图标容器、状态点 |
| 标签/徽章 | `rounded-md` | `6px` | 行内标签、步骤数字 |

- 企业风格避免使用 24px 以上超大圆角。

### 4.2 阴影（与主色联动）
- **subtle**：`0 1px 2px rgba(0,0,0,0.05)` — 列表项、轻平浮起。
- **card**：`0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` — 卡片默认。
- **elevated**：`0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.04)` — 浮起面板。
- **modal**：`0 8px 30px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)` — 模态框。
- **popover**：`0 4px 20px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.05)` — Tooltip、Popover。
- **focus（主色）**：浅色 `0 8px 32px rgba(70, 89, 255, 0.18)`，深色 `0 8px 32px rgba(100, 116, 255, 0.25)`。

---

## 五、间距与布局

### 5.1 间距尺度（8px 网格）
- 基础单位 8px，常用：`8px`、`16px`、`24px`、`32px`
- 紧凑场景允许：4px（仅用于按钮/输入框内边距）
- 表单/项：`px-3 py-2` 或 `px-4 py-2.5`。
- 卡片/模态框：`px-6 py-4` 或 `p-6`。
- 按钮组：`gap-2` / `gap-3`。

### 5.2 主布局结构（企业标准）
- **根布局**：`h-screen overflow-hidden flex flex-col`，背景使用页面背景色。
- **侧栏**：展开宽度 `240px`，收起 `64px`；边框 `border-r border-default dark:border-default`；背景使用 `bg-surface-muted dark:bg-surface-muted`。
- **内容区**：`flex:1 min-h-0 p-4 overflow-y-auto`，支持滚动与自适应。

### 5.3 顶栏与面包屑
- 顶栏高度 `56px`，`h-14`，`border-b border-default dark:border-default`。
- 面包屑：`text-sm`，当前页`font-semibold`，上级`text-secondary dark:text-secondary`。

---

## 六、组件规范（企业级）

### 6.1 按钮
**主按钮**
- 背景：`bg-primary`
- 文字：白色
- 圆角：`rounded-lg`
- 字体：`text-sm font-medium`
- 禁用：`disabled:opacity-50`
- 悬停：`hover:bg-primary-light`

**次按钮**
- 背景：`bg-surface dark:bg-surface`
- 边框：`border border-default dark:border-default`
- 文字：`text-primary`
- 悬停：`bg-surface-hover dark:bg-surface-hover`

**文字/图标按钮**
- 无边框，`text-secondary dark:text-secondary`，悬停背景与主色文字。

**危险按钮**
- 背景：`bg-red-500`，文字白色，`rounded-lg`。

### 6.2 输入框与选择器
- 背景：`bg-surface dark:bg-surface`
- 边框：`border border-default dark:border-default`
- 内边距：`px-4 py-2.5`
- 聚焦：`outline-none ring-2 ring-primary-lighter border-primary dark:ring-primary-light/20`
- 占位文字：`text-muted dark:text-muted`

### 6.3 模态框（Modal）
- 遮罩：`bg-black/40 backdrop-blur-md`
- 内容：`bg-surface dark:bg-surface rounded-xl shadow-modal p-6`
- 标题：`text-xl font-semibold`
- 底部按钮：`flex justify-end gap-3`

### 6.4 Toast
- 背景：`bg-surface dark:bg-surface backdrop-blur-md`
- 圆角：`rounded-2xl`
- 阴影：`shadow-xl`
- 内边距：`px-6 py-4`

### 6.5 列表
- 默认：`p-3 rounded-lg`
- 悬停/选中：`bg-surface-hover dark:bg-surface-hover`
- 标题：`text-sm font-medium`，辅助：`text-xs text-secondary dark:text-secondary`

### 6.6 工具提示（Tooltip）
- 圆角：`rounded-xl`
- 阴影：`shadow-xl`
- 内边距：`px-3.5 py-2.5`
- 文字：`text-[13px] leading-relaxed`

### 6.7 错误与警告条
- 错误：`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg`
- 警告：`bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg`

### 6.8 焦点与无障碍
- 所有可点击控件：`outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2 focus:ring-offset-page dark:focus:ring-offset-page`
- 图标按钮必须带 `aria-label`，命名规则：`动作+对象`，如 `aria-label="关闭弹窗"`

---

## 七、动画与过渡
- 入场：`fade-in`、`scale-in`，时长 0.2s ease-in-out。
- 过渡：按钮、卡片、浮层统一使用 `transition-all`。
- 加载：主色 #4659FF，骨架屏使用 `shimmer` 效果。
- 禁止：旋转、弹跳、闪烁等娱乐化动画。

---

## 八、图标与插图
- 图标库：Lucide React
- 尺寸：`16px`、`20px`、`24px` 三档
- 主色图标：`text-primary`
- 次要图标：`text-secondary dark:text-secondary`
- 禁用图标：`text-muted dark:text-muted`
- 风格统一：线性、简洁、克制。

---

## 九、平台与窗口
- 窗口控制按钮：`h-8 w-8 rounded-lg`，关闭按钮悬停为危险色。
- 拖拽区域：标题栏支持系统拖拽，区分平台样式。
- 禁止硬编码色值，全部使用规范变量。

---

## 十、滚动条与全局
- 滚动条宽度：6px
- 轨道：透明
- 滑块：灰色，悬停变深
- 圆角：`rounded-full`
- 全局：`overflow-hidden`，`min-width:320px`，`min-height:100vh`。

---

## 十一、Tailwind 配置建议
```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4659FF',
          light: '#6474FF',
          lighter: '#EBEEFF',
          muted: 'rgba(70, 89, 255, 0.12)'
        },
        page: {
          DEFAULT: '#F5F5F7',
          dark: '#121212'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#EBEDEF',
          muted: '#F3F4F6',
          inset: '#EBEDEF',
          dark: '#1E1E1E',
          darkHover: '#2A2A2A',
          darkMuted: '#222222',
          darkInset: '#141414'
        },
        border: {
          DEFAULT: '#E8E8EB',
          light: '#EBEDF0',
          dark: '#333333',
          darkLight: '#1F2329'
        },
        text: {
          primary: '#1F2329',
          secondary: '#646A73',
          muted: '#8F959E',
          darkPrimary: '#FFFFFF',
          darkSecondary: '#C9CDD4',
          darkMuted: '#86909C'
        }
      },
      boxShadow: {
        'focus-light': '0 8px 32px rgba(70, 89, 255, 0.18)',
        'focus-dark': '0 8px 32px rgba(100, 116, 255, 0.25)',
        'card-hover-light': '0 12px 24px rgba(70, 89, 255, 0.12)',
        'card-hover-dark': '0 12px 24px rgba(100, 116, 255, 0.2)'
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '20px',
        '3xl': '24px',
        'label-xs': '11px'
      }
    }
  }
}

---

## 十二、参考来源与索引
- 参考项目：企业级B端UI规范、AI平台通用设计体系
- 全局样式：`index.css`
- 主题配置：`tailwind.config.js`
- 布局组件：`Sidebar.tsx`、`Layout.tsx`、`Modal.tsx`

---

## 十三、多端与扩展
- 新组件必须遵循规范：色值、圆角、间距、交互状态。
- 合规、权限、风控模块必须使用规范语义色。
- 全平台保持视觉统一：Web、桌面端、管理后台。

---

**文档版本：2.0｜企业级 EDUClaw 平台｜参考飞浆 ｜地址aistudio.baidu.com｜企业科技蓝主题｜设计文档