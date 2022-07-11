<template>
     <div class="user-edit-container">
       <!-- Header 区域 -->
       <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

       <!-- 用户资料 -->
       <van-cell-group class="action-card">
         <van-cell title="头像" is-link center>
           <template #default>
             <van-image @click="imgck" round class="avatar" :src="userObj.photo"/>
             <!-- file 选择框 -->
           <input
                  type="file"
                  ref="iptFile"
                  v-show="false"
                  accept="image/*"
                  @change="onFileChange"
                  />
           </template>
         </van-cell>
         <van-cell title="名称" is-link :value="userObj.name" @click="minzi"  />
         <van-cell title="生日" is-link :value="userObj.birthday" @click="shengri" />
       </van-cell-group>
       <van-dialog v-model="show" title="标题"
       :before-close="fn"
       show-cancel-button>
 <input v-fofo v-model="inputname" />
</van-dialog>

<van-popup round v-model="popupshow" position="bottom" :style="{ height: '50%' }">
<van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="gaishijian"
  @cancel="cancelFn"
/>
</van-popup>
     </div>
   </template>

<script>
import { UserZiLiaoApi, undataphotoApi, xiugaiApi } from '@/api'
import { timess } from '@/utils/data'

export default {
  name: 'UserEdit',
  data () {
    return {
      userObj: {},
      show: false,
      inputname: '',
      popupshow: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(2021, 0, 17)
    }
  },
  async created () {
    const res = await UserZiLiaoApi()
    this.userObj = res.data.data
  },
  methods: {
    async onFileChange (e) {
      if (e.target.files.length === 0) return
      const theFd = new FormData()
      theFd.append('photo', e.target.files[0])
      const res = await undataphotoApi(theFd)
      this.userObj.photo = res.data.data.photo
    },
    imgck () {
      this.$refs.iptFile.click()
    },
    minzi () {
      this.show = true
      this.inputname = this.userObj.name
    },
    async fn (action, done) {
      if (action === 'confirm') {
        const reg = /^[\u4e00-\u9fa5\w]{4,7}$/
        if (reg.test(this.inputname) === true) {
          const res = await xiugaiApi({
            name: this.inputname
          })
          console.log(res)
          if (res.status === 200) {
            this.userObj.name = this.inputname
          } else {
            this.$toast.fail('修改名字失败')
          }
          done()
        } else {
          this.$toast.fail('用户名格式错误')
          done(false)
        }
      } else {
        done()
      }
    },
    shengri () {
      this.popupshow = true
      this.currentDate = new Date(this.userObj.birthday)
    },
    cancelFn () {
      this.popupshow = false
    },
    async gaishijian () {
      await xiugaiApi({
        birthday: timess(this.currentDate)
      })
      this.userObj.birthday = timess(this.currentDate)
      this.cancelFn()
    }
  }
}
</script>

   <style lang="less" scoped>
   .user-edit-container {
     padding-top: 92px;
     .avatar {
       width: 50px;
       height: 50px;
     }
   }
   /deep/ .van-dialog__content{
    text-align: center;
    input {
        padding: 0;
        outline: none;
        border: none;
        text-align: center;
    }
   }
   </style>
