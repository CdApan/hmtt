<template>
  <div>
    <keep-alive exclude="ShouSuo,SearchResult,CommentList,UserEdit,WZxiangqing">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getAll } from '@/api/index.js'

export default {
  async created () {
    try {
      await getAll()
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style></style>
