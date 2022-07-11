<template>
  <div>
    <div>
      <!-- 顶部栏 -->
      <van-nav-bar fixed>
        <template #left>
          <img src="../../components/toutiao_logo.png" class="logo" />
        </template>
        <template #right>
          <van-icon name="search" size="0.67rem" color="white" @click="searchFn" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 滑动导航栏 -->
    <div class="main">
      <van-tabs v-model="channelId" sticky offset-top="1.226667rem" animated  @change="getNowList">
        <van-tab :title="obj.name"
        v-for="obj in userList" :key="obj.id"
        :name="obj.id"
        >
        <WenZhangList :channelId="channelId"></WenZhangList>
        </van-tab>
      </van-tabs>
       <van-icon name="plus"  @click="showPopup" size="0.37333334rem" class="moreChannels"/>
    </div>
    <van-popup class="van-popup-hezi" v-model="show" get-container="body">
    <BianJi @gb="gb" :userArr=" userList" :unList="shaiXuan" @tj="tj" @del="del" v-model="channelId"></BianJi>
    </van-popup>
  </div>
</template>

<script>
import { getUserApi, getAll, updataApi, delApi } from '@/api'
import WenZhangList from './components/WenZhangList.vue'
import BianJi from './BianJi.vue'

export default {
  data () {
    return {
      channelId: 0,
      userList: [],
      // ArticlesList: []
      show: false,
      allList: []
    }
  },
  async created () {
    try {
      const res = await getUserApi()
      console.log(res)
      this.userList = res.data.data.channels

      const res2 = await getAll()
      console.log(res2)
      this.allList = res2.data.data.channels
      // this.getNowList()
    } catch (err) {
      console.log(err)
    }
  },
  components: {
    WenZhangList,
    BianJi
  },
  methods: {
    getNowList () {
      // const res2 = await getArticlesApi({ channel_id: this.channelId, timestamp: (new Date()).getTime() })
      // console.log(res2)
      // this.ArticlesList = res2.data.data.results
    },
    showPopup () {
      this.show = true
    },
    gb () {
      this.show = false
    },
    async tj (obj) {
      this.userList.push(obj)
      try {
        const res = await updataApi({
          channels: this.userList
        })
        console.log(res)
      } catch (error) {
        console.log('未知错误')
      }
    },
    async del (userobj) {
      const index = this.userList.findIndex(obj => obj.id === userobj.id)
      this.userList.splice(index, 1)
      const res = await delApi({ artId: userobj.id })
      console.log(res)
    },
    searchFn () {
      this.$router.push('/search')
    }
  },
  computed: {
    shaiXuan () {
      const newArr = this.allList.filter(maxObj => {
        const index = this.userList.findIndex(smaObj => {
          return smaObj.id === maxObj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })

      return newArr
    }
  }
}
</script>

  <style scoped lang="less">
.logo {
  width: 200px;
  height: 60px;
}
.main {
  padding-top: 46px;
  padding-bottom: 20px;
}

   /deep/ .van-tabs__wrap {
     padding-right: 30px;
     background-color: #fff;
   }
   // 设置小图标的样式
   .moreChannels {
     position: fixed;
     top: 120px;
     right: 8px;
     z-index: 999;
   }
.van-popup-hezi{
    width: 100vw;
    height: 100vh;
   }
</style>
