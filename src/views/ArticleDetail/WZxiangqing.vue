 <template>
  <div class="main">
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{ obj.title }}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="obj.aut_name" :label="timeAgo(obj.pubdate)">
        <template #icon>
          <img :src="obj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button @click="guanZhu(true)" v-if="obj.is_followed" type="info" size="mini">已关注</van-button>
            <van-button @click="guanZhu(false)" v-else icon="plus" type="info" size="mini" plain
              >关注</van-button
            >
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="obj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small"
        v-if=" obj.attitude === 1"
        @click="dianzhan(true)"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small"
        v-else
         @click="dianzhan(false)"
          >点赞</van-button
        >
      </div>
    </div>
    <div>
      <CommentList></CommentList>
    </div>

  </div>
</template>

<script>
import {
  articlesApi, followingsApi, nufollowingsApi, likingsApi, unlikingsApi
} from '@/api'
import { timeAgo } from '@/utils/data'
import CommentList from './CommentList.vue'
export default {
  name: 'WZxiangqing',
  data () {
    return {
      obj: {}
    }
  },
  async created () {
    const res = await articlesApi({
      id: this.$route.query.art_id
    })
    console.log(res)
    this.obj = res.data.data
  },
  methods: {
    timeAgo,
    async guanZhu (bl) {
      if (bl === true) {
        try {
          await nufollowingsApi({
            artId: this.$route.query.art_id
          })
          this.$toast.success('取关成功')
          this.obj.is_followed = false
        } catch (err) {
          this.$toast.fail('取关失败')
        }
      }
      if (bl === false) {
        try {
          await followingsApi({
            artId: this.obj.art_id
          })
          this.$toast.success('关注成功')
          this.obj.is_followed = true
        } catch (err) {
          this.$toast.fail('关注失败')
        }
      }
    },
    async dianzhan (bl) {
      if (bl === true) {
        await unlikingsApi({
          artId: this.obj.art_id
        })
        this.obj.attitude = -1
        this.$toast.success('取消点赞')
      }
      if (bl === false) {
        await likingsApi({
          artId: this.obj.art_id
        })
        this.obj.attitude = 1
        this.$toast.success('点赞成功')
      }
    }
  },
  components: {
    CommentList
  }
}
</script>

   <style scoped lang="less">
   .main {
    padding-top: 46px;
   }
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
