<template>
  <view class="single-photo-news">

    <view class="content">
      <view class="left">
        <u--text :text="news.content.articleTitle" :lines="2" size="32rpx" color="#222222" lineHeight="48rpx" />
        <u--text
          :text="news.content.articleDate"
          size="26rpx"
          prefixIcon="clock"
          color="#999999"
          lineHeight="120rpx"
          iconStyle="margin-right: 10rpx"
        />
      </view>
      <view class="photo-content">
        <u--image
          v-for="photo in news.content.articleCover"
          :key="photo"
          :src="photo"
          mode="aspectFill"
          radius="10rpx"
          width="220rpx"
          height="166rpx"
        />
      </view>
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
  }
}
</script>

<style lang="scss" scoped>
  .single-photo-news{
    padding: 30rpx 20rpx 0;
    .content{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .left{
        height: 166rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
      }
      .photo-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 18rpx;
      }
    }
  }
</style>