<template>
  <view class="multi-photo-news">
    <u-text :text="news.content.articleTitle" :lines="1" size="32rpx" color="#222222" lineHeight="48rpx" />
    <view class="photo-content">
      <video
        id="video"
        :src="news.content.articleCover[0]"
        enable-danmu
        danmu-btn
        controls
        style="width: 100%; height: 366rpx;"
      />
        <!-- :danmu-list="danmuList" -->
      <!-- @error="videoErrorCallback" -->
    </view>
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
  }
}
</script>

<style lang="scss" scoped>
  .multi-photo-news{
    padding: 30rpx 20rpx;
    .photo-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 18rpx;
    }
  }
</style>