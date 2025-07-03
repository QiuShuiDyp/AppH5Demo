<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GlobalState } from './utils/storage.js'
import { switchLocale } from './utils/i18n.js'

const { t, locale } = useI18n()

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
      nickname: t('message.userPrefix') + loginForm.value.username,
      avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
      loginTime: new Date().toISOString(),
    }

    const token = 'mock_token_' + Date.now()

    // 保存到全局状态
    GlobalState.setUser(userData)
    GlobalState.setToken(token)
    GlobalState.setSessionData('lastLogin', userData.loginTime)

    alert(t('message.loginSuccess'))

    // 清空表单
    loginForm.value = { username: '', password: '' }
  } catch (error) {
    alert(t('message.loginFailed', { error: error.message }))
  } finally {
    loading.value = false
  }
}

// 跳转到用户中心
const goToUserCenter = () => {
  // 在 MPA 中使用 window.location 跳转
  window.location.href = '/user-center.html'
}

// 切换语言
const currentLocale = ref(locale.value)
const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  locale.value = newLocale
  currentLocale.value = newLocale
  localStorage.setItem('app-locale', newLocale)
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <div class="header">
        <h2>{{ $t('title') }}</h2>
        <button @click="toggleLanguage" class="language-btn">
          {{ currentLocale === 'zh-CN' ? 'EN' : '中文' }}
        </button>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            v-model="loginForm.username"
            type="text"
            :placeholder="$t('form.username')"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="loginForm.password"
            type="password"
            :placeholder="$t('form.password')"
            required
          />
        </div>
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? $t('form.loginButtonLoading') : $t('form.loginButton') }}
        </button>
      </form>
      <div class="page-link">
        <button @click="goToUserCenter" class="link-btn">
          {{ $t('navigation.goToUserCenter') }}
        </button>
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h2 {
  margin: 0;
  color: #333;
}

.language-btn {
  padding: 5px 10px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.language-btn:hover {
  background: #5a6fd8;
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
