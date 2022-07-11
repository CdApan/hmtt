 <template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        @input="inputFn"
        v-model.trim="kw"
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @search="searchFn"
      />
    </div>
    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div class="sugg-item"
      v-for="(obj,index) in list" :key="index"
      v-html="lightFn(obj,kw)"
      @click="fn(obj)"
      >
      </div>
    </div>
    <!-- 搜索历史 -->
   <div class="search-history" v-else>
       <!-- 标题 -->
       <van-cell title="搜索历史">
           <!-- 使用 right-icon 插槽来自定义右侧图标 -->
           <template #right-icon>
  <van-icon name="delete" class="search-icon" @click="dell" />
           </template>
       </van-cell>
       <!-- 历史列表 -->
       <div class="history-list">
           <span
           @click="fn2(obj)"
           v-for="(obj,index) in history " :key="index" class="history-item">{{ obj }}</span>
       </div>
   </div>
  </div>
</template>

<script>
import { searchApi } from '@/api/index'

export default {
  name: 'ShouSuo',
  data () {
    return {
      kw: '', // 搜索关键字,
      timer: '',
      list: [],
      history: JSON.parse(localStorage.getItem('search')) || [] // 搜索历史
    }
  },
  methods: {
    inputFn () {
      clearInterval(this.timer)
      if (this.kw === '') {
        this.list = []
      } else {
        this.timer = setInterval(async () => {
          if (this.kw.length === 0) return
          const res = await searchApi({ keyWords: this.kw })
          this.list = res.data.data.options
          clearInterval(this.timer)
        }, 300)
      }
    },
    lightFn (string, targe) {
      if (string === null) return
      const re = new RegExp(targe, 'ig')
      return string.replace(re, (match) => {
        return `<span style="color: red;">${match}</span>`
      })
    },
    searchFn () {
      if (this.kw !== '') {
        this.$router.push({
          path: `searchList/${this.kw}`
        })
        this.history.push(this.kw)
        const theSet = new Set(this.history)
        const arr = Array.from(theSet)
        localStorage.setItem('search', JSON.stringify(arr))
      }
    },
    fn (obj) {
      this.$router.push({
        path: `searchList/${obj}`
      })
      this.history.push(obj)
      const theSet = new Set(this.history)
      const arr = Array.from(theSet)
      localStorage.setItem('search', JSON.stringify(arr))
    },
    fn2 (obj) {
      this.$router.push({
        path: `searchList/${obj}`
      })
    },
    dell () {
      localStorage.removeItem('search')
      this.history = []
    }
  }
}
</script>

   <style scoped lang="less">
.search-header {
  height: 92px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
 .sugg-item {
      padding: 0 15px;
      border-bottom: 1px solid #f8f8f8;
      font-size: 14px;
      line-height: 50px;
      // 实现省略号的三行代码
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
     /**搜索历史 */
   .search-icon {
     font-size: 16px;
     line-height: inherit;
   }

   .history-list {
     padding: 0 10px;
     .history-item {
       display: inline-block;
       font-size: 12px;
       padding: 8px 14px;
       background-color: #efefef;
       margin: 10px 8px 0px 8px;
       border-radius: 10px;
     }
   }
</style>
