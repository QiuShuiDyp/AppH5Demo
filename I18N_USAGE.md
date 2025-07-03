# 国际化（i18n）使用说明

## 概述

本项目已集成了 Vue I18n 国际化功能，支持按页面分离的语言资源加载。每个页面只加载自己需要的语言文件，实现了按需加载的目标。

## 支持的语言

- 中文（zh-CN）
- 英文（en-US）

## 项目结构

```
src/
├── locales/                    # 多语言资源目录
│   ├── login/                  # 登录页面的语言资源
│   │   ├── zh-CN.js           # 登录页面中文资源
│   │   └── en-US.js           # 登录页面英文资源
│   └── user-center/            # 用户中心页面的语言资源
│       ├── zh-CN.js           # 用户中心中文资源
│       └── en-US.js           # 用户中心英文资源
├── utils/
│   └── i18n.js                # i18n配置工具函数
├── main-login.js              # 登录页面入口（含登录页面i18n配置）
├── main-user-center.js        # 用户中心页面入口（含用户中心i18n配置）
├── Login.vue                  # 登录页面组件
└── UserCenter.vue             # 用户中心页面组件
```

## 功能特点

### 1. 按页面分离的语言资源

每个页面都有自己独立的语言资源文件，只加载当前页面需要的语言内容：

- **登录页面**：只加载 `src/locales/login/` 目录下的语言文件
- **用户中心页面**：只加载 `src/locales/user-center/` 目录下的语言文件

### 2. 语言切换功能

- 每个页面都有独立的语言切换按钮
- 语言选择会保存到 localStorage 中
- 页面刷新后会记住用户的语言选择

### 3. 实时语言切换

- 点击语言切换按钮后，页面内容会立即切换语言
- 时间格式也会根据语言进行本地化显示

## 使用方法

### 1. 在 Vue 组件中使用

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 使用翻译函数
const message = t('message.loginSuccess')

// 带参数的翻译
const errorMessage = t('message.loginFailed', { error: 'Network Error' })

// 切换语言
const switchLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <button @click="switchLanguage">
      {{ locale === 'zh-CN' ? 'EN' : '中文' }}
    </button>
  </div>
</template>
```

### 2. 添加新的语言资源

如果需要添加新的文本，请在对应页面的语言文件中添加：

**登录页面示例（src/locales/login/zh-CN.js）：**

```javascript
export default {
  title: '用户登录',
  form: {
    username: '用户名',
    password: '密码',
    loginButton: '登录',
  },
  // 添加新的文本
  newFeature: {
    title: '新功能标题',
    description: '新功能描述',
  },
}
```

### 3. 添加新页面的 i18n 支持

如果需要为新页面添加 i18n 支持：

1. 创建语言资源文件：

   ```
   src/locales/new-page/zh-CN.js
   src/locales/new-page/en-US.js
   ```

2. 在页面入口文件中配置 i18n：

   ```javascript
   import { createApp } from 'vue'
   import NewPage from './NewPage.vue'
   import { createI18nInstance } from './utils/i18n.js'

   import zhCN from './locales/new-page/zh-CN.js'
   import enUS from './locales/new-page/en-US.js'

   const i18n = createI18nInstance({
     'zh-CN': zhCN,
     'en-US': enUS,
   })

   const app = createApp(NewPage)
   app.use(i18n)
   app.mount('#app')
   ```

3. 在组件中使用 i18n 功能

## 语言资源文件结构

推荐的语言资源文件结构：

```javascript
export default {
  title: '页面标题',
  form: {
    // 表单相关文本
    username: '用户名',
    password: '密码',
    submit: '提交',
  },
  message: {
    // 消息提示文本
    success: '操作成功',
    error: '操作失败：{error}',
  },
  navigation: {
    // 导航相关文本
    back: '返回',
    next: '下一步',
  },
  actions: {
    // 操作按钮文本
    save: '保存',
    delete: '删除',
    edit: '编辑',
  },
}
```

## 开发建议

1. **保持结构一致**：各语言版本的文件应保持相同的结构
2. **使用有意义的键名**：使用描述性的键名，如 `form.username` 而不是 `text1`
3. **参数化消息**：对于需要动态内容的消息，使用参数化翻译
4. **测试所有语言**：确保所有语言版本都能正常工作

## 注意事项

- 语言切换后会自动保存到 localStorage
- 页面刷新时会自动加载用户之前选择的语言
- 如果 localStorage 中保存的语言不存在，会自动回退到默认语言（zh-CN）
- 时间格式会根据当前语言进行本地化显示
