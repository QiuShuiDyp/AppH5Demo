<template>
  <div class="user-center">
    <div class="header">
      <h1>用户中心</h1>
      <button @click="logout" class="logout-btn">退出登录</button>
    </div>

    <div v-if="user" class="user-info">
      <div class="avatar">
        <img :src="user.avatar" :alt="user.nickname" />
      </div>
      <div class="info">
        <h3>{{ user.nickname }}</h3>
        <p>用户名：{{ user.username }}</p>
        <p>用户ID：{{ user.id }}</p>
        <p>登录时间：{{ formatTime(user.loginTime) }}</p>
        <p v-if="lastLogin">上次登录：{{ formatTime(lastLogin) }}</p>
      </div>
    </div>

    <div v-else class="no-user">
      <p>未登录，请先登录</p>
      <button @click="goToLogin" class="login-link">去登录</button>
    </div>

    <div class="actions">
      <button @click="updateUserInfo" class="action-btn">更新用户信息</button>
      <button @click="checkToken" class="action-btn">检查Token状态</button>
      <button @click="clearAllData" class="action-btn danger">
        清空所有数据
      </button>
    </div>

    <div class="page-link">
      <button @click="goToLogin" class="link-btn">返回登录页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { GlobalState, useStorageWatcher } from './utils/storage.js'

const user = ref(null)
const lastLogin = ref(null)

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
    nickname: user.value.nickname + '(已更新)',
    updateTime: new Date().toISOString(),
  }

  GlobalState.setUser(updatedUser)
  loadUserData()
  alert('用户信息已更新！')
}

// 检查Token状态
const checkToken = () => {
  const token = GlobalState.getToken()
  alert(token ? `Token: ${token}` : '未找到Token')
}

// 清空所有数据
const clearAllData = () => {
  if (confirm('确定要清空所有数据吗？')) {
    GlobalState.clearAll()
    loadUserData()
    alert('所有数据已清空！')
  }
}

// 退出登录
const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    GlobalState.clearUser()
    GlobalState.clearToken()
    loadUserData()
    alert('已退出登录！')
  }
}

// 跳转到登录页
const goToLogin = () => {
  window.location.href = '/login.html'
}

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  return new Date(timeStr).toLocaleString('zh-CN')
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
