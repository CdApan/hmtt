<template>
  <div class="main">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      offset="50"
    >
      <WenZhang @disLick="disLickFn" @reports="reportsFn" v-for="obj in list" :key="obj.art_id" :list="obj"  @click.native="tz(obj.art_id)"></WenZhang>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import WenZhang from '../../../components/WenZhang.vue'
import { getArticlesApi, disLikes, reportsApi } from '@/api'

export default {
  components: {
    WenZhang
  },
  props: {
    channelId: Number
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: new Date().getTime(),
      isLoading: false
    }
  },
  async created () {
    const res2 = await getArticlesApi({
      channel_id: this.channelId,
      timestamp: this.timestamp
    })
    console.log(res2)
    this.list = res2.data.data.results
    this.timestamp = res2.data.data.pre_timestamp
  },
  methods: {
    async onLoad () {
      if (this.list.length === 0) {
        this.loading = false
        return
      }
      const res2 = await getArticlesApi({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })
      this.list = [...this.list, ...res2.data.data.results]
      this.timestamp = res2.data.data.pre_timestamp
      this.loading = false
      if (res2.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.list = []
      this.timestamp = new Date().getTime()
      const res2 = await getArticlesApi({
        channel_id: this.channelId,
        timestamp: this.timestamp
      })
      this.list = res2.data.data.results
      this.timestamp = res2.data.data.pre_timestamp
      this.isLoading = false
    },
    async disLickFn (id) {
      try {
        await disLikes({ artId: id })
        this.$toast.success('反馈成功')
      } catch (err) {
        this.$toast.fail('请先登录')
      }
    },
    async reportsFn (id, type, value) {
      try {
        await reportsApi({
          artId: id,
          type: type
        })
        this.$toast.success(`举报--${value}成功`)
      } catch (err) {
        this.$toast.fail('请先登录')
      }
    },
    async tz (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
}
</style>
