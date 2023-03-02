<template>
  <view class="isDown">
    <u-divider :text="text" textSize="26rpx" textColor="#999999" lineColor="#D7D7D7"></u-divider>
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '已经到底了~'
    },
  },
}
</script>

<style>
  .isDown{
    padding: 0 100rpx 50rpx;
  }
</style>