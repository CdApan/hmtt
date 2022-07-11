// 封装全局axios 请求
import TheAxios from 'axios'
import router from '@/router/index'
import { Toast } from 'vant'
import { getToken, remToken } from '@/utils/token'

const axios = TheAxios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    remToken()
    Toast.fail('身份过期')
    router.replace('/login')
  }
  return Promise.reject(error)
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) =>
  axios({
    url,
    method,
    params,
    data,
    headers
  })
