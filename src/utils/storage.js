// 全局状态管理工具
export const GlobalState = {
  // 用户信息 (持久化)
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  getUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  clearUser() {
    localStorage.removeItem('user')
  },

  // Token 管理 (持久化)
  setToken(token) {
    localStorage.setItem('token', token)
  },

  getToken() {
    return localStorage.getItem('token')
  },

  clearToken() {
    localStorage.removeItem('token')
  },

  // 临时状态 (会话级别)
  setSessionData(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data))
  },

  getSessionData(key) {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },

  clearSessionData(key) {
    sessionStorage.removeItem(key)
  },

  // 清空所有状态
  clearAll() {
    localStorage.clear()
    sessionStorage.clear()
  },
}

// 监听存储变化（跨页面实时同步）
export const useStorageWatcher = (callback) => {
  const handleStorageChange = (e) => {
    if (e.storageArea === localStorage) {
      callback({
        key: e.key,
        oldValue: e.oldValue,
        newValue: e.newValue,
      })
    }
  }

  window.addEventListener('storage', handleStorageChange)

  // 返回清理函数
  return () => {
    window.removeEventListener('storage', handleStorageChange)
  }
}
