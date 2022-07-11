<template>
  <div>
    <!-- 核心挂载点 -->

    <div class="home_container">
           <!-- 二级路由页面 -->
<keep-alive>
  <router-view></router-view>
</keep-alive>

       </div>
    <!-- 底部导航 -->
    <div>
      <van-tabbar v-model="active" route>
        <van-tabbar-item to="/Bubar/ShouYe" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/Bubar/WoDe2" icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuBar',
  data () {
    return {
      active: 0
    }
  }
}
</script>

 <style scoped lang="less">
   /* 内容底部内边距(把内容往上挤压, 防止内部被底部导航挡住) */
   .home_container {
     padding-bottom: 50px;
   }
   /* 底部导航上边框 */
   .van-tabbar {
     border-top: 1px solid #f8f8f8;
   }
   </style>
