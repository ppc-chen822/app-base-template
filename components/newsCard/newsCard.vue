<template>
  <view class="news-card-content" @click="viewDetail">
    <multi-photo-news v-if="initNewsType(news.content.articleCover) === 'multiP'" :news="news" />
    <single-photo-news v-if="initNewsType(news.content.articleCover) === 'singleP'" :news="news" />
    <video-news v-if="initNewsType(news.content.articleCover) === 'videoNews'" :news="news" />
  </view>
</template>

<script>
import multiPhotoNews from './multiPhotoNews.vue'
import singlePhotoNews from './singlePhotoNews.vue'
import videoNews from './videoNews.vue'
export default {
  components: { multiPhotoNews, singlePhotoNews, videoNews },
  props: {
    // newsType: {
    //   type: String,
    //   default: 'singleP',
    // },
    news: {
      type: Object,
      default: ()=>{},
    }
  },
  data() {
    return{

    }
  },
  methods: {
    // 查看详情
    viewDetail() {
      const { news: { id } } = this
      uni.navigateTo({ url: `/pages/index/threeOpen/newsDetail?id=${id}` })
    },
    initNewsType(imgList) {
      if(imgList && imgList.length === 1) {
        if(imgList[0].includes('mp4')){
          return 'videoNews'
        }else{
          return 'singleP'
        }
      }else{
        return 'multiP'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-card-content{

  }
</style>