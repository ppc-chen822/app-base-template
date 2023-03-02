<template>
  <view class="top-title">
    <text class="name">{{ name }}</text>
    提交的{{ type }}
  </view>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '--'
    },
    type: {
      type: String,
      default: '信息'
    }
  }
}
</script>

<style lang="scss" scoped>
  .top-title{
    height: 130rpx;
    line-height: 130rpx;
    background: #FFFFFF;
    font-size: 30rpx;
    color: #222222;
    padding-left: 30rpx;
    .name{
      font-size: 36rpx;
      font-weight: bold;  
      color: #227AFF;
      padding-right: 10rpx;
    }
  }
  .prove-info{
    background: #ffffff;
    margin-top: 20rpx;
  }
</style>