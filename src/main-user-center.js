import { createApp } from 'vue'
import './style.css'
import UserCenter from './UserCenter.vue'
import { createI18nInstance } from './utils/i18n.js'

// 导入用户中心页面的语言资源
import zhCN from './locales/user-center/zh-CN.js'
import enUS from './locales/user-center/en-US.js'

// 创建i18n实例（仅包含用户中心页面需要的语言资源）
const i18n = createI18nInstance({
  'zh-CN': zhCN,
  'en-US': enUS,
})

// 创建Vue应用并使用i18n
const app = createApp(UserCenter)
app.use(i18n)
app.mount('#app')
