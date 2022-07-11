<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list" :class="{ 'art-cmt-container-1': isShowInput,
    'art-cmt-container-2': !isShowInput
    }">
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :immediate-check="false"
  offset="50"
>
      <!-- 评论的 Item 项 -->
      <div class="cmt-item" v-for="obj in ComList" :key="obj.com_id" >
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img :src="obj.aut_photo" alt="" class="avatar" />
            <span class="uname">{{ obj.aut_name}}</span>
          </div>
          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <van-icon @click="xihuan(true,obj)" v-if="obj.is_liking" name="like" size="16" color="red" />
            <van-icon @click="xihuan(false,obj)"  v-else name="like-o" size="16" color="gray" />
          </div>
        </div>
        <!-- 主体区域 -->
        <div class="cmt-body">
          {{ obj.content }}
        </div>
        <!-- 尾部区域 -->
        <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
      </div>
</van-list>
    </div>

     <!-- 底部添加评论区域 - 1 -->
   <div class="add-cmt-box van-hairline--top" v-if="isShowInput === true">
       <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
       <div class="ipt-cmt-div" @click="togoFn">发表评论</div>
       <div class="icon-box">
           <van-badge :content="totalCount === 0 ? '': totalCount" max="99">
               <van-icon name="comment-o" size="0.53333334rem" @click="hd" />
           </van-badge>
           <van-icon name="star-o" size="0.53333334rem" />
           <van-icon name="share-o" size="0.53333334rem" />
       </div>
   </div>

   <!-- 底部添加评论区域 - 2 -->
   <div class="cmt-box van-hairline--top" v-else>
       <textarea v-fofo
       @blur="blurFn"
       v-model.trim="kw"
       @keydown.enter.prevent="fbe"
       placeholder="友善评论、理性发言、阳光心灵"></textarea>
       <van-button :disabled="kw.length === 0"  type="default"  @click="fb">发布</van-button>
   </div>

  </div>
</template>

<script>
import { commentsApi, DianZhanApi, unDianZhanApi, pinglunApi } from '@/api'
import { timeAgo } from '@/utils/data'

export default {
  name: 'CommentList',
  data () {
    return {
      offset: null,
      ComList: [],
      isShowInput: true,
      totalCount: 0,
      kw: '',
      loading: false,
      finished: false,
      lastId: null
    }
  },
  async created () {
    const res = await commentsApi({
      artId: this.$route.query.art_id
    })
    console.log(res)
    this.ComList = res.data.data.results
    this.totalCount = res.data.data.total_count
    this.lastId = res.data.data.last_id
    if (res.data.data.results.length === 0) {
      this.finished = true
    }
  },
  methods: {
    timeAgo,
    async xihuan (bl, obj) {
      if (bl === true) {
        obj.is_liking = false
        await unDianZhanApi({
          artId: obj.com_id
        })
      }
      if (bl === false) {
        obj.is_liking = true
        await DianZhanApi({
          userId: obj.com_id
        })
      }
    },
    togoFn () {
      this.isShowInput = false
    },
    hd () {
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    },
    blurFn () {
      setTimeout(() => {
        this.isShowInput = true
      }, 0)
    },
    async fb () {
      try {
        await pinglunApi({
          id: this.$route.query.art_id,
          val: this.kw
        })
        const res = await commentsApi({
          artId: this.$route.query.art_id
        })
        this.ComList = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.kw = ''
        this.hd()
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    },
    fbe () {
      this.fb()
    },
    async  onLoad () {
      if (this.ComList.length === 0) {
        this.loading = false
        return
      }
      const res = await commentsApi({
        artId: this.$route.query.art_id,
        offset: this.lastId
      })
      this.ComList = [...this.ComList, ...res.data.data.results]
      this.lastId = res.data.data.last_id
      this.loading = false
      if (res.data.data.last_id === null) {
        this.finished = true
      }
    }
  }
}
</script>

   <style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
/*美化 - 文章详情 - 底部的评论页面 */
   // 外层容器
   .art-cmt-container-1 {
     padding-bottom: 46px;
   }
   .art-cmt-container-2 {
     padding-bottom: 90px;
   }

   // 发布评论的盒子 - 1
   .add-cmt-box {
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     box-sizing: border-box;
     background-color: white;
     display: flex;
     justify-content: space-between;
     align-items: center;
     height: 46px;
     line-height: 46px;
     padding-left: 10px;
     .ipt-cmt-div {
       flex: 1;
       border: 1px solid #efefef;
       border-radius: 15px;
       height: 30px;
       font-size: 12px;
       line-height: 30px;
       padding-left: 15px;
       margin-left: 10px;
       background-color: #f8f8f8;
     }
     .icon-box {
       width: 40%;
       display: flex;
       justify-content: space-evenly;
       line-height: 0;
     }
   }

   .child {
     width: 20px;
     height: 20px;
     background: #f2f3f5;
   }

   // 发布评论的盒子 - 2
   .cmt-box {
     position: fixed;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 80px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     font-size: 12px;
     padding-left: 10px;
     box-sizing: border-box;
     background-color: white;
     textarea {
       flex: 1;
       height: 66%;
       border: 1px solid #efefef;
       background-color: #f8f8f8;
       resize: none;
       border-radius: 6px;
       padding: 5px;
     }
     .van-button {
       height: 100%;
       border: none;
     }
   }
</style>
