<template>
  <div>
 <!-- 顶部导航 -->
    <van-nav-bar
  title="黑马头条-登录"
/>
 <!-- 顶部导航 -->
 <!-- 登录表单 -->
 <van-form @submit="onSubmit">
  <van-field
    v-model="user.mobile"
    name="mobile"
    label="手机号"
    placeholder="请输入手机号"
    :rules="[{ required: true, message: '请填写手机号' },
    {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ ,message: '请填写正确手机号'}]"
    required
  />
  <van-field
    v-model="user.code"
    type="password"
    name="code"
    label="验证码"
    placeholder="请输入验证码"
    :rules="[{ required: true, message: '请输入验证码' },
    {pattern:/^[0-9]{6}$/ ,message: '请输入正确验证码'}]"
    required
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
 <!-- 登录表单 -->
  </div>
</template>

<script>
import { loginApi } from '@/api/index.js'
import { setToken } from '@/utils/token.js'

export default {
  data () {
    return {
      user: {
        mobile: '',
        code: '' // 246810万能验证码
      }
    }
  },
  methods: {
    async onSubmit (values) {
      this.$toast.loading({
        mask: true,
        message: '登录中',
        duration: 5000
      })

      try {
        const res = await loginApi(values)
        this.$toast.success('登录成功')
        setToken(res.data.data.token)
        localStorage.setItem('refresh_token', res.data.data.refresh_token)
        this.$router.replace({
          path: '/Bubar/ShouYe'
        })
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    }
  }

}
</script>

<style scoped lang="less">
// .van-nav-bar {
//   background-color: #007bff;
//   color: white;
// }
// /deep/ .van-nav-bar__title {
//   color: white;
// }
</style>
