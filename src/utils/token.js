// 此文件专门用于token方法
const key = 'it-heima'

// 存储token
export const setToken = (token) => localStorage.setItem(key, token)

// 获取token
export const getToken = () => localStorage.getItem(key)

// 删除token
export const remToken = () => localStorage.removeItem(key)
