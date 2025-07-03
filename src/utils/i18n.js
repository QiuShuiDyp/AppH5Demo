import { createI18n } from 'vue-i18n'

/**
 * 创建i18n实例
 * @param {Object} messages 语言资源对象
 * @param {string} defaultLocale 默认语言
 * @returns {Object} i18n实例
 */
export function createI18nInstance(messages, defaultLocale = 'zh-CN') {
  // 从localStorage获取用户选择的语言，如果没有则使用默认语言
  const savedLocale = localStorage.getItem('app-locale')
  const locale =
    savedLocale && messages[savedLocale] ? savedLocale : defaultLocale

  return createI18n({
    locale,
    fallbackLocale: defaultLocale,
    messages,
    legacy: false, // 使用Composition API模式
    globalInjection: true, // 全局注入$t函数
  })
}

/**
 * 切换语言
 * @param {Object} i18n i18n实例
 * @param {string} locale 目标语言
 */
export function switchLocale(i18n, locale) {
  if (i18n.global.availableLocales.includes(locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem('app-locale', locale)
  }
}

/**
 * 获取当前语言
 * @param {Object} i18n i18n实例
 * @returns {string} 当前语言
 */
export function getCurrentLocale(i18n) {
  return i18n.global.locale.value
}

/**
 * 获取可用语言列表
 * @param {Object} i18n i18n实例
 * @returns {Array} 可用语言列表
 */
export function getAvailableLocales(i18n) {
  return i18n.global.availableLocales
}
