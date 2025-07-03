<template>
  <div class="user-center">
    <div class="header">
      <h1>{{ $t('title') }}</h1>
      <div class="header-actions">
        <button @click="toggleLanguage" class="language-btn">
          {{ currentLocale === 'zh-CN' ? 'EN' : '中文' }}
        </button>
        <button @click="logout" class="logout-btn">
          {{ $t('header.logout') }}
        </button>
      </div>
    </div>

    <div v-if="user" class="user-info">
      <div class="avatar">
        <img :src="user.avatar" :alt="user.nickname" />
      </div>
      <div class="info">
        <h3>{{ user.nickname }}</h3>
        <p>{{ $t('userInfo.username') }}：{{ user.username }}</p>
        <p>{{ $t('userInfo.userId') }}：{{ user.id }}</p>
        <p>{{ $t('userInfo.loginTime') }}：{{ formatTime(user.loginTime) }}</p>
        <p v-if="lastLogin">
          {{ $t('userInfo.lastLogin') }}：{{ formatTime(lastLogin) }}
        </p>
      </div>
    </div>

    <div v-else class="no-user">
      <p>{{ $t('userInfo.notLoggedIn') }}</p>
      <button @click="goToLogin" class="login-link">
        {{ $t('userInfo.goLogin') }}
      </button>
    </div>

    <div class="actions">
      <button @click="updateUserInfo" class="action-btn">
        {{ $t('actions.updateUserInfo') }}
      </button>
      <button @click="checkToken" class="action-btn">
        {{ $t('actions.checkToken') }}
      </button>
      <button @click="clearAllData" class="action-btn danger">
        {{ $t('actions.clearAllData') }}
      </button>
    </div>

    <div class="page-link">
      <button @click="goToLogin" class="link-btn">
        {{ $t('navigation.backToLogin') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalState, useStorageWatcher } from './utils/storage.js'

const { t, locale } = useI18n()

const user = ref(null)
const lastLogin = ref(null)
const currentLocale = ref(locale.value)

// 监听存储变化的清理函数
let unwatchStorage = null

onMounted(() => {
  // 加载用户数据
  loadUserData()

  // 监听跨页面状态变化
  unwatchStorage = useStorageWatcher((changes) => {
    console.log('存储发生变化:', changes)

    // 当用户信息发生变化时，重新加载
    if (changes.key === 'user') {
      loadUserData()
    }
  })
})

onUnmounted(() => {
  // 清理监听器
  if (unwatchStorage) {
    unwatchStorage()
  }
})

// 加载用户数据
const loadUserData = () => {
  user.value = GlobalState.getUser()
  lastLogin.value = GlobalState.getSessionData('lastLogin')
}

// 更新用户信息
const updateUserInfo = () => {
  if (!user.value) return

  const updatedUser = {
    ...user.value,
    nickname: user.value.nickname + t('message.updatedSuffix'),
    updateTime: new Date().toISOString(),
  }

  GlobalState.setUser(updatedUser)
  loadUserData()
  alert(t('message.userInfoUpdated'))
}

// 检查Token状态
const checkToken = () => {
  const token = GlobalState.getToken()
  alert(token ? t('message.tokenStatus', { token }) : t('message.noToken'))
}

// 清空所有数据
const clearAllData = () => {
  if (confirm(t('message.confirmClearData'))) {
    GlobalState.clearAll()
    loadUserData()
    alert(t('message.dataCleared'))
  }
}

// 退出登录
const logout = () => {
  if (confirm(t('message.confirmLogout'))) {
    GlobalState.clearUser()
    GlobalState.clearToken()
    loadUserData()
    alert(t('message.loggedOut'))
  }
}

// 跳转到登录页
const goToLogin = () => {
  window.location.href = '/login.html'
}

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  return new Date(timeStr).toLocaleString(
    currentLocale.value === 'zh-CN' ? 'zh-CN' : 'en-US'
  )
}

// 切换语言
const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  locale.value = newLocale
  currentLocale.value = newLocale
  localStorage.setItem('app-locale', newLocale)
}
</script>

<style scoped>
.user-center {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.language-btn {
  padding: 8px 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}

.language-btn:hover {
  background: #5a6fd8;
}

.logout-btn {
  padding: 8px 16px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #ff5252;
}

.user-info {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.info p {
  margin: 5px 0;
  color: #666;
}

.no-user {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.login-link {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.login-link:hover {
  background: #5a6fd8;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.action-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  min-width: 150px;
}

.action-btn:hover {
  background: #5a6fd8;
}

.action-btn.danger {
  background: #ff6b6b;
}

.action-btn.danger:hover {
  background: #ff5252;
}

.page-link {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  text-decoration: underline;
  cursor: pointer;
  font-size: 16px;
}

.link-btn:hover {
  color: #5a6fd8;
}
</style>
