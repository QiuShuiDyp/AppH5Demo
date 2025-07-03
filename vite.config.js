import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 定义所有可用的入口点
const allEntries = {
  login: resolve(__dirname, 'login.html'),
  userCenter: resolve(__dirname, 'user-center.html'),
}

// 根据环境变量决定构建哪些页面
function getEntries() {
  const buildPages = process.env.BUILD_PAGES

  if (buildPages) {
    const pages = buildPages.split(',').map((p) => p.trim())
    const entries = {}

    pages.forEach((page) => {
      if (allEntries[page]) {
        entries[page] = allEntries[page]
      } else {
        console.warn(`⚠️  页面 "${page}" 不存在，跳过构建`)
      }
    })

    if (Object.keys(entries).length === 0) {
      console.warn('⚠️  没有找到有效的页面，构建所有页面')
      return allEntries
    }

    console.log(`✅ 构建页面: ${Object.keys(entries).join(', ')}`)
    return entries
  }

  console.log('✅ 构建所有页面')
  return allEntries
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: getEntries(),
    },
  },
})
