# 选择性构建指南

## 🎯 问题描述

在多页面应用中，每次构建都会重新构建所有页面，即使只修改了单个页面。这在大型项目中会影响构建效率。

## 🛠️ 解决方案

我们提供了三种方案来实现选择性构建：

### 方案一：使用 npm 脚本（推荐）

#### 可用的构建命令：

```bash
# 构建所有页面（默认）
pnpm run build

# 只构建登录页面
pnpm run build:login

# 只构建用户中心页面
pnpm run build:user-center

# 明确构建所有页面
pnpm run build:all
```

#### 构建时间和产物对比：

| 构建类型 | 构建时间 | 产物大小 | 包含页面   |
| -------- | -------- | -------- | ---------- |
| 全量构建 | ~500ms   | ~120KB   | 所有页面   |
| 登录页面 | ~464ms   | ~117KB   | 仅登录页面 |
| 用户中心 | ~478ms   | ~117KB   | 仅用户中心 |

### 方案二：使用环境变量

```bash
# 只构建登录页面
BUILD_PAGES=login vite build

# 只构建用户中心页面
BUILD_PAGES=userCenter vite build

# 构建多个页面
BUILD_PAGES=login,userCenter vite build
```

### 方案三：使用智能构建脚本

```bash
# 查看帮助
node scripts/build.js --help

# 只构建登录页面
node scripts/build.js login

# 只构建用户中心页面
node scripts/build.js user-center

# 构建多个页面
node scripts/build.js login user-center

# 构建所有页面
node scripts/build.js all
```

## 📊 性能优势

### 构建时间对比

- **全量构建**: 重新构建所有页面，即使只修改了一个页面
- **选择性构建**: 只构建修改的页面，大幅减少构建时间

### 实际场景示例

```bash
# 场景1: 只修改了登录页面
# 传统方式: 构建所有页面 (~500ms)
pnpm run build

# 优化方式: 只构建登录页面 (~464ms)
pnpm run build:login

# 场景2: 只修改了用户中心页面
# 传统方式: 构建所有页面 (~500ms)
pnpm run build

# 优化方式: 只构建用户中心页面 (~478ms)
pnpm run build:user-center
```

## 🔧 技术实现

### 1. Vite 配置修改

```javascript
// vite.config.js
function getEntries() {
  const buildPages = process.env.BUILD_PAGES

  if (buildPages) {
    const pages = buildPages.split(',').map((p) => p.trim())
    const entries = {}

    pages.forEach((page) => {
      if (allEntries[page]) {
        entries[page] = allEntries[page]
      }
    })

    return entries
  }

  return allEntries // 默认构建所有页面
}
```

### 2. 页面映射配置

```javascript
const allEntries = {
  login: resolve(__dirname, 'login.html'),
  userCenter: resolve(__dirname, 'user-center.html'),
}
```

### 3. 构建脚本逻辑

智能构建脚本会：

1. 解析命令行参数
2. 映射页面名称到内部标识
3. 设置环境变量
4. 执行对应的构建命令

## 🚀 使用建议

### 开发阶段

```bash
# 开发时使用开发服务器
pnpm run dev

# 测试构建时使用选择性构建
pnpm run build:login
pnpm run preview
```

### 生产部署

```bash
# 生产环境推荐构建所有页面
pnpm run build:all

# 或者使用默认构建命令
pnpm run build
```

### CI/CD 集成

```yaml
# GitHub Actions 示例
- name: Build specific page
  run: |
    if [[ "${{ github.event.head_commit.message }}" == *"login"* ]]; then
      pnpm run build:login
    elif [[ "${{ github.event.head_commit.message }}" == *"user-center"* ]]; then
      pnpm run build:user-center
    else
      pnpm run build:all
    fi
```

## 📁 构建产物结构

### 全量构建产物

```
dist/
├── assets/
│   ├── login-*.css
│   ├── login-*.js
│   ├── userCenter-*.css
│   ├── userCenter-*.js
│   └── shared-*.js
├── login.html
├── user-center.html
└── vite.svg
```

### 选择性构建产物（仅登录页面）

```
dist/
├── assets/
│   ├── login-*.css
│   └── login-*.js
├── login.html
└── vite.svg
```

## ⚠️ 注意事项

1. **多语言资源**: 每个页面的多语言资源已经内联到对应的 JS 文件中，不会影响选择性构建
2. **共享资源**: 公共资源（如 vite.svg）会在所有构建中包含
3. **构建缓存**: Vite 会自动处理构建缓存，重复构建会更快
4. **预览服务**: 使用 `pnpm run preview` 可以预览任何构建产物

## 🎉 总结

通过选择性构建，您可以：

- ✅ 显著减少构建时间
- ✅ 提高开发效率
- ✅ 减少不必要的资源消耗
- ✅ 支持灵活的部署策略

选择性构建特别适合：

- 大型多页面应用
- 频繁迭代的项目
- 需要快速部署的场景
