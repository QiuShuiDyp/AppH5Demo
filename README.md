# Vue 3 + Vite MPA 多页面应用 Demo

## 📖 项目简介

基于 **Vue 3 + Vite** 构建的多页面应用（MPA）架构 Demo，包含登录页面和用户中心页面。每个页面独立打包、独立入口，适合在 App 中作为 WebView 页面单独调用或跳转。

## ✨ 功能特性

- 🎯 **MPA 多页面架构**：每个页面独立打包，便于 App WebView 集成
- 🔐 **登录功能**：模拟用户登录，支持表单验证
- 👤 **用户中心**：展示用户信息，支持状态管理
- 💾 **跨页面状态管理**：基于 localStorage + sessionStorage 实现
- 🔄 **实时状态同步**：通过 storage 事件实现跨页面状态同步
- 📱 **移动端适配**：响应式设计，适合移动端 WebView
- ⚡ **快速构建**：基于 Vite 5，构建速度极快

## 🛠 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite 5
- **开发语言**：JavaScript ES6+
- **样式方案**：原生 CSS (Scoped)
- **状态管理**：localStorage + sessionStorage
- **包管理器**：pnpm

## 📁 项目结构

```
AppH5Demo/
├── public/                     # 静态资源目录
│   └── vite.svg               # 图标文件
├── src/                       # 源码目录
│   ├── components/            # 公共组件
│   │   └── HelloWorld.vue     # 示例组件
│   ├── utils/                 # 工具函数
│   │   └── storage.js         # 全局状态管理工具
│   ├── assets/               # 资源文件
│   ├── Login.vue             # 登录页面组件
│   ├── UserCenter.vue        # 用户中心页面组件
│   ├── main-login.js         # 登录页入口文件
│   ├── main-user-center.js   # 用户中心页入口文件
│   └── style.css             # 全局样式
├── dist/                     # 构建输出目录
│   ├── assets/               # 静态资源
│   ├── login.html            # 登录页（独立）
│   └── user-center.html      # 用户中心页（独立）
├── login.html                # 登录页入口 HTML
├── user-center.html          # 用户中心页入口 HTML
├── vite.config.js           # Vite 配置文件
└── package.json             # 项目配置文件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐) 或 npm/yarn

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式

```bash
# 启动开发服务器
pnpm run dev

# 访问页面
# 登录页：http://localhost:5173/login.html
# 用户中心：http://localhost:5173/user-center.html
```

### 构建生产版本

```bash
# 构建项目
pnpm run build

# 预览构建结果
pnpm run preview
```

## 🏗 MPA 架构说明

### 多页面配置

项目采用 MPA（Multi-Page Application）架构，在 `vite.config.js` 中配置多个入口：

```javascript
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'login.html'),
        userCenter: resolve(__dirname, 'user-center.html'),
      },
    },
  },
})
```

### 页面入口

每个页面都有独立的入口文件：

- **登录页**：`login.html` → `src/main-login.js` → `src/Login.vue`
- **用户中心**：`user-center.html` → `src/main-user-center.js` → `src/UserCenter.vue`

### 构建结果

构建后每个页面生成独立的文件：

```
dist/
├── login.html              # 登录页入口
├── user-center.html        # 用户中心页入口
└── assets/
    ├── login-[hash].js     # 登录页 JS
    ├── login-[hash].css    # 登录页样式
    ├── userCenter-[hash].js # 用户中心 JS
    └── userCenter-[hash].css # 用户中心样式
```

## 🔄 跨页面状态管理

### 全局状态工具

使用 `src/utils/storage.js` 实现跨页面状态管理：

```javascript
import { GlobalState } from './utils/storage.js'

// 保存用户信息
GlobalState.setUser(userData)
GlobalState.setToken(token)

// 获取用户信息
const user = GlobalState.getUser()
const token = GlobalState.getToken()
```

### 实时状态同步

通过 `storage` 事件监听其他页面的状态变化：

```javascript
import { useStorageWatcher } from './utils/storage.js'

const unwatchStorage = useStorageWatcher((changes) => {
  if (changes.key === 'user') {
    // 用户信息发生变化，重新加载
    loadUserData()
  }
})
```

### 状态管理方案

- **localStorage**：持久化用户信息、Token 等
- **sessionStorage**：临时会话数据
- **storage 事件**：跨页面实时同步

## 🏗 MPA vs SPA 架构对比

### 🎯 MPA（多页面应用）优势

#### 👍 适合 App WebView 的优势

1. **资源隔离性强**：每个页面独立打包，避免无关代码加载
2. **内存占用更低**：单页面加载，释放后内存可完全回收
3. **加载速度快**：首屏加载只需当前页面资源，无需整个应用
4. **崩溃影响小**：单页面崩溃不影响其他页面
5. **版本控制灵活**：可以独立更新某个页面而不影响其他功能

#### 👍 技术优势

- **SEO 友好**：每个页面都有独立的 HTML，搜索引擎友好
- **构建产物小**：按页面拆分，避免单个 bundle 过大
- **缓存策略优**：可以针对不同页面设置不同的缓存策略
- **部署灵活**：支持页面级别的增量部署
- **调试简单**：问题定位更精确，日志更清晰

### 🚫 MPA 相对劣势

- **页面跳转慢**：需要重新加载整个页面
- **状态管理复杂**：跨页面状态需要额外处理（localStorage 等）
- **公共资源重复**：Vue、工具库等可能在多个页面重复加载
- **用户体验略差**：页面切换有白屏闪烁

### 📊 SPA（单页面应用）对比

#### 👍 SPA 优势

- **用户体验好**：页面切换无刷新，流畅度高
- **状态管理简单**：全局状态在内存中，易于管理
- **公共资源复用**：框架和工具库只加载一次
- **前后端分离**：API 驱动，前后端职责清晰

#### 👎 SPA 在 App WebView 中的劣势

- **首屏加载慢**：需要加载整个应用的资源
- **内存占用高**：所有页面组件都在内存中
- **单点故障风险**：一个错误可能影响整个应用
- **包体积大**：所有功能打包在一起，bundle 体积较大
- **WebView 兼容性**：路由管理在 WebView 中可能有兼容性问题

### 🎯 为什么 MPA 更适合 App WebView？

#### 1. **资源管理更精确**

```
SPA: App 加载一个大的 bundle（包含所有页面）
MPA: App 只加载当前需要的页面资源
```

#### 2. **内存管理更优**

```
SPA: 所有页面组件常驻内存
MPA: 页面关闭后内存完全释放
```

#### 3. **业务解耦更彻底**

```
SPA: 页面间紧耦合，共享运行时状态
MPA: 页面间松耦合，通过存储共享状态
```

#### 4. **版本迭代更灵活**

```
SPA: 更新一个功能需要发布整个应用
MPA: 可以单独更新某个页面功能
```

### 📱 App WebView 集成场景

在移动 App 中，WebView 通常用于：

- **特定功能页面**：如登录、用户中心、活动页等
- **业务模块**：每个模块相对独立
- **快速迭代**：Web 页面更新比 App 发版更快

这些场景下，MPA 的**独立性、轻量化、可维护性**优势更加明显。

### 💡 选择建议

| 场景                 | 推荐架构 | 原因                         |
| -------------------- | -------- | ---------------------------- |
| App WebView 内嵌页面 | **MPA**  | 资源隔离、内存友好、加载快速 |
| 独立 Web 应用        | **SPA**  | 用户体验好、状态管理简单     |
| 混合开发             | **MPA**  | 与原生页面切换更自然         |
| 复杂单页应用         | **SPA**  | 交互复杂、状态联动多         |

## 📱 App WebView 集成

### 集成方式

在 App 中可以直接加载对应的 HTML 文件：

```javascript
// 加载登录页
webView.loadUrl('file:///android_asset/dist/login.html')

// 加载用户中心
webView.loadUrl('file:///android_asset/dist/user-center.html')
```

## 🎨 页面功能

### 登录页 (`/login.html`)

- ✅ 用户名密码登录
- ✅ 表单验证
- ✅ 登录状态保存
- ✅ 页面跳转功能

### 用户中心 (`/user-center.html`)

- ✅ 用户信息展示
- ✅ 状态实时同步
- ✅ 用户信息更新
- ✅ 退出登录功能
- ✅ Token 状态检查

## 🔧 自定义配置

### 添加新页面

1. 创建 HTML 入口文件（如 `about.html`）
2. 创建 JS 入口文件（如 `src/main-about.js`）
3. 创建 Vue 组件（如 `src/About.vue`）
4. 在 `vite.config.js` 中添加入口配置

### 修改构建配置

编辑 `vite.config.js` 文件，可以修改：

- 构建输出目录
- 静态资源处理
- 代理配置
- 插件配置

## 📦 部署

### 静态部署

构建后的 `dist` 目录可以直接部署到任何静态文件服务器：

```bash
# 构建项目
pnpm run build

# 部署 dist 目录到服务器
# 确保服务器支持 HTML5 History 模式（如果需要）
```

### App 集成部署

1. 将 `dist` 目录打包到 App 资源中
2. 配置 WebView 加载本地文件
3. 确保 localStorage 权限正常

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 许可证

[MIT License](LICENSE)

## 📧 联系方式

如有问题或建议，请通过以下方式联系：

- Issue：[项目 Issues](https://github.com/your-username/AppH5Demo/issues)
- Email：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
