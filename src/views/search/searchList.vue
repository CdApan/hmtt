 <template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <WenZhang
          v-for="obj in searchList"
          :key="obj.art_id"
          :list="obj"
          :isShow="false"
          @click.native="tz(obj.art_id)"
        ></WenZhang>
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchApi2 } from '@/api'
import WenZhang from '@/components/WenZhang.vue'

export default {
  name: 'SearchResult',
  data () {
    return {
      searchList: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  components: {
    WenZhang
  },
  async created () {
    const res = await searchApi2({
      page: this.page,
      q: this.$route.params.kw
    })
    this.searchList = res.data.data.results
  },
  methods: {
    async onLoad () {
      if (this.searchList.length > 0) {
        this.page++
        const res = await searchApi2({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.searchList = [...this.searchList, ...res.data.data.results]
        this.loading = false
      }
    },
    tz (id) {
      this.$router.push({
        path: `/detail?art_id=${id}`
      })
    }
  }
}
</script>

   <style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
.main {
  padding-top: 46px;
}
</style>
