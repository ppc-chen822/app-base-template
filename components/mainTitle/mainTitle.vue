<template>
  <view class="main-title">
     <view class="title-content">
      <view class="line" :style="{background: color}"></view>
      <text class="title">{{ title }}</text>
    </view> 
    <view v-if="hasMore && url" class="more" :style="{color: color}" @click="navigate">更多</view>
  </view>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#2E6EF0'
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    methods: {
      navigate() {
        const { url } = this
        uni.navigateTo({ url })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-content{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .line{
        width: 8rpx;
        height: 40rpx;
        border-radius: 4rpx;
        margin-right: 11rpx;
      }
      .title{
        font-size: 36rpx;
        font-weight: 800;
        color: #222222;
        letter-spacing: 2rpx;
      }
    }
    .more{
      font-size: 28rpx;
      font-weight: 500;
     }
  }
</style>