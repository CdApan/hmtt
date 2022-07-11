<template>
<div>
     <!-- 一条文章单元格 -->
     <van-cell>
       <!-- 标题区域的插槽 -->
       <template #title>
         <div class="title-box">
           <!-- 标题 -->
           <span>{{ list.title }}</span>
           <img v-if="list.cover.type === 1" :src="list.cover.images[0]" class="thumb">
         </div>
         <div v-if="list.cover.type > 1" class="thumb-box">
           <img  v-for="(obj,index) in list.cover.images" :src="obj" :key="index" class="thumb">
         </div>
       </template>
       <!-- label 区域的插槽 -->
       <template #label>
         <div class="label-box">
           <div>
             <span>{{ list.aut_name }}</span>
             <span>{{ list.comm_count }}评论</span>
             <span>{{ timer(list.pubdate) }}</span>
           </div>
           <!-- 反馈按钮 -->
           <van-icon name="cross" @click.stop="show = true" v-if="isShow" />
         </div>
       </template>
     </van-cell>
     <van-action-sheet v-model="show" :actions="actions" @select="onSelect" get-container="body"
     :cancel-text="btText"
     @cancel="cancelFn"
     @closed="fn"
     />
     </div>
   </template>

<script>
import { timeAgo } from '@/utils/data'
import { firstActions, secondActions } from '@/api/report'
export default {
  props: {
    list: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      btText: '取消'
    }
  },
  methods: {
    timer: timeAgo,
    onSelect (action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.btText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLick', this.list.art_id)
        this.show = false
      } else {
        this.$emit('reports', this.list.art_id, action.value, action.name)
        this.show = false
      }
    },
    cancelFn () {
      if (this.btText === '返回') {
        this.show = true
        this.actions = firstActions
        this.btText = '取消'
      }
    },
    fn () {
      this.actions = firstActions
      this.btText = '取消'
    }
  }
}
</script>

   <style scoped lang="less">
   /* 标题样式 */
   .title-box {
     display: flex;
     justify-content: space-between;
     align-items: flex-start;
   }

   /* label描述样式 */
   .label-box {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }

   /* 文章信息span */
   .label-box span{
       margin: 0 3px;
       &:first-child{
           margin-left: 0;
       }
   }
    .thumb {
     width: 113px;
     height: 70px;
     background-color: #f8f8f8;
     object-fit: cover;
   }

   /* 三图, 图片容器 */
   .thumb-box {
     display: flex;
     justify-content: space-between;
   }
   </style>
