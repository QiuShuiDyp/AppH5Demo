import { createApp } from 'vue'
import './style.css'
import Login from './Login.vue'
import { createI18nInstance } from './utils/i18n.js'

// 导入登录页面的语言资源
import zhCN from './locales/login/zh-CN.js'
import enUS from './locales/login/en-US.js'

// 创建i18n实例（仅包含登录页面需要的语言资源）
const i18n = createI18nInstance({
  'zh-CN': zhCN,
  'en-US': enUS,
})

// 创建Vue应用并使用i18n
const app = createApp(Login)
app.use(i18n)
app.mount('#app')
