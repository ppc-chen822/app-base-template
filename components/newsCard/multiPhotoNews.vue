<template>
  <view class="multi-photo-news">
    <u-text
      :text="news.content.articleTitle"
      :lines="2"
      size="32rpx"
      color="#222222"
      lineHeight="48rpx"
    />
    <view class="photo-content">
      <u-image
        v-for="photo in imgs"
        :key="photo"
        :src="photo"
        mode="aspectFill"
        radius="10rpx"
        width="200rpx"
        height="150rpx"
      />
      <view v-if="imgs.length === 2" style="width: 200rpx;"></view>
    </view>
    <u-line color="#E5E5E5" margin="30rpx 0 0" :hairline="false"></u-line>
  </view>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      default: ()=>{},
    }
  },
  data() {
    return{
    }
  },
  computed: {
    imgs() {
      const { news } = this
      if(news.content.articleCover && news.content.articleCover.length > 3) {
        return news.content.articleCover.slice(0,3)
      }else{
        return news.content.articleCover
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .multi-photo-news{
    padding: 30rpx 20rpx 0;
    .photo-content{
      display: flex;
      justify-content: flex-start;
      justify-content: space-between;
      align-items: center;
      margin-top: 18rpx;
    }
  }
</style>