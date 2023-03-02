<template>
  <view class="infoItem-content">
    <view class="title"> {{ title }} </view>
    <view
      class="info" 
      :class="{ 'blue': isBright }"
    > 
      {{ info }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: '',
    info: '',
    isBright: false
  }
}
</script>

<style lang="scss" scoped>
  .infoItem-content{
    display: flex;
    justify-content: space-between;
    // align-items: center;
    font-size: 30rpx;
    font-weight: 500;
    color: #222222;
    padding: 20rpx 33rpx;
    .info{
      max-width: 70%;
      text-align: right;
    }

    .blue{
      color: #227AFF;
      // text-decoration: underline;
    }
  }
</style>