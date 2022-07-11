import axios from '@/utils/request.js'

// 获取所有频道
export const getAll = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})

// 登录接口封装

export const loginApi = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 获取用户列表
export const getUserApi = () => axios({
  url: '/v1_0/user/channels'
})

// 获取文章新闻推荐
export const getArticlesApi = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  method: 'GET',
  params: {
    channel_id,
    timestamp
  }
})

// 不感兴趣文章接口

export const disLikes = ({ artId }) => axios({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})

// 举报文章接口
export const reportsApi = ({ artId, type }) => axios({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: artId,
    type: type,
    remark: '死数据'
  }
})

// 更新频道
export const updataApi = ({ channels }) => axios({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels
  }
})

// 删除频道
export const delApi = ({ artId }) => axios({
  url: `/v1_0/user/channels/${artId}`,
  method: 'DELETE'
})

// 搜索联想
export const searchApi = ({ keyWords }) => axios({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keyWords
  }
})

// 搜索结果
export const searchApi2 = ({ page = 1, per_page = 10, q }) => axios({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})

// 文章详情

export const articlesApi = ({ id }) => axios({
  url: `/v1_0/articles/${id}`
})

// 关注用户

export const followingsApi = ({ artId }) => axios({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: artId
  }
})
// 取关用户
export const nufollowingsApi = ({ artId }) => axios({
  url: `/v1_0/user/followings/${artId}`,
  method: 'DELETE'
})

// 点赞文章
export const likingsApi = ({ artId }) => axios({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})

// 取消点赞

export const unlikingsApi = ({ artId }) => axios({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'
})

// 获取评论或回复
export const commentsApi = ({ artId, offset = null, limit = 10 }) => axios({
  url: '/v1_0/comments',
  method: 'GET',
  params: {
    type: 'a',
    source: artId,
    offset,
    limit
  }
})

// 获取点赞

export const DianZhanApi = ({ userId }) => axios({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: userId
  }
})

// 取消点赞

export const unDianZhanApi = ({ artId }) => axios({
  url: `/v1_0/comment/likings/${artId}`,
  method: 'DELETE'
})

// 对文章或者评论进行评论
export const pinglunApi = ({ id, val, artId = null }) => axios({
  url: '/v1_0/comments',
  method: 'POST',
  data: {
    target: id,
    content: val,
    art_id: artId
  }
})

// 获取用户资料
export const UserZiLiaoApi = () => axios({
  url: '/v1_0/user/profile'
})

// 获取用户基本资料
export const UserApi = () => axios({
  url: '/v1_0/user'
})

// 上传头像接口
export const undataphotoApi = (fd) => axios({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd
})

// 修改个人资料
export const xiugaiApi = (obj) => axios({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  data: obj
})

// 刷新token

export const getNewToken = () => axios({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    Authorization: 'Bearer' + localStorage.getItem('refresh_token')
  }
})
