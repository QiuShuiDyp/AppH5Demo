import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { resolve } from 'path'

// 定义页面映射
const pageMap = {
  login: 'login',
  'user-center': 'userCenter',
  userCenter: 'userCenter',
  user: 'userCenter',
  all: 'all',
}

// 获取命令行参数
const args = process.argv.slice(2)
const pages = args.length > 0 ? args : ['all']

// 解析页面参数
const resolvedPages = []
pages.forEach((page) => {
  if (pageMap[page]) {
    if (page === 'all') {
      resolvedPages.push('all')
    } else {
      resolvedPages.push(pageMap[page])
    }
  } else {
    console.warn(`⚠️  未知页面: ${page}`)
    console.log(
      '可用页面:',
      Object.keys(pageMap)
        .filter((p) => p !== 'all')
        .join(', ')
    )
  }
})

// 执行构建
try {
  console.log('🚀 开始构建...')

  if (resolvedPages.includes('all') || resolvedPages.length === 0) {
    console.log('📦 构建所有页面')
    execSync('vite build', { stdio: 'inherit' })
  } else {
    const buildPages = [...new Set(resolvedPages)].join(',')
    console.log(`📦 构建页面: ${buildPages}`)
    execSync(`BUILD_PAGES=${buildPages} vite build`, { stdio: 'inherit' })
  }

  console.log('✅ 构建完成!')
} catch (error) {
  console.error('❌ 构建失败:', error.message)
  process.exit(1)
}

// 显示使用帮助
function showHelp() {
  console.log(`
📖 使用方法:
  node scripts/build.js [页面名称...]

🌟 可用页面:
  login              构建登录页面
  user-center        构建用户中心页面
  userCenter         构建用户中心页面（别名）
  user               构建用户中心页面（别名）
  all                构建所有页面（默认）

📚 示例:
  node scripts/build.js login                    # 只构建登录页面
  node scripts/build.js user-center              # 只构建用户中心页面
  node scripts/build.js login user-center        # 构建登录页面和用户中心页面
  node scripts/build.js all                      # 构建所有页面
  node scripts/build.js                          # 构建所有页面（默认）
`)
}

// 如果请求帮助
if (args.includes('--help') || args.includes('-h')) {
  showHelp()
  process.exit(0)
}
