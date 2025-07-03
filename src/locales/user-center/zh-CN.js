export default {
  title: '用户中心',
  header: {
    logout: '退出登录',
  },
  userInfo: {
    nickname: '昵称',
    username: '用户名',
    userId: '用户ID',
    loginTime: '登录时间',
    lastLogin: '上次登录',
    notLoggedIn: '未登录，请先登录',
    goLogin: '去登录',
  },
  actions: {
    updateUserInfo: '更新用户信息',
    checkToken: '检查Token状态',
    clearAllData: '清空所有数据',
  },
  navigation: {
    backToLogin: '返回登录页',
  },
  message: {
    userInfoUpdated: '用户信息已更新！',
    updatedSuffix: '(已更新)',
    tokenStatus: 'Token: {token}',
    noToken: '未找到Token',
    confirmClearData: '确定要清空所有数据吗？',
    dataCleared: '所有数据已清空！',
    confirmLogout: '确定要退出登录吗？',
    loggedOut: '已退出登录！',
  },
}
