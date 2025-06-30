<script setup>
import { ref } from 'vue'
import { GlobalState } from './utils/storage.js'

const loading = ref(false)
const loginForm = ref({
  username: '',
  password: '',
})

// 模拟登录
const handleLogin = async () => {
  loading.value = true

  try {
    // 模拟 API 请求延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 模拟登录成功
    const userData = {
      id: 1,
      username: loginForm.value.username,
      nickname: '用户' + loginForm.value.username,
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      loginTime: new Date().toISOString(),
    }

    const token = 'mock_token_' + Date.now()

    // 保存到全局状态
    GlobalState.setUser(userData)
    GlobalState.setToken(token)
    GlobalState.setSessionData('lastLogin', userData.loginTime)

    alert('登录成功！用户信息已保存到全局状态')

    // 清空表单
    loginForm.value = { username: '', password: '' }
  } catch (error) {
    alert('登录失败：' + error.message)
  } finally {
    loading.value = false
  }
}

// 跳转到用户中心
const goToUserCenter = () => {
  // 在 MPA 中使用 window.location 跳转
  window.location.href = '/user-center.html'
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            v-model="loginForm.username"
            type="text"
            placeholder="用户名"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            required
          />
        </div>
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div class="page-link">
        <button @click="goToUserCenter" class="link-btn">前往用户中心</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.login-btn {
  width: 100%;
  padding: 15px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:hover {
  background: #5a6fd8;
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.page-link {
  text-align: center;
  margin-top: 20px;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
}

.link-btn:hover {
  color: #5a6fd8;
}
</style>
