<template>
  <view class="title-content">
    <view class="left">
      <view
        class="line"
        :class="{
          'blueLine': lineColor === 'blue',
          'redLine': lineColor === 'red'
        }"
      />
      <view class="title" :style="{fontSize: size}"> {{ title }} </view>
    </view>
    <view v-if="url" class="more" @click="goToPage">
      更多
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: 'blue'
    },
    size: {
      type: String,
      default: '32rpx'
    }
  },
  methods: {
    goToPage() {
      uni.navigateTo({ url: this.url })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .blueLine{
        background: linear-gradient(90deg, #9ccaff 0%, #2a82e4 100%);
      }
      .redLine{
        background: linear-gradient(90deg, rgba(242, 174, 174, 1) 0%, rgba(212, 48, 48, 1) 100%);
      }
      .line{
        width: 12rpx;
        height: 36rpx;
      }
      .title{
        margin-left: 22rpx;
        color: #383838;
        font-size: 32rpx;
        font-weight: 700;
      }
    }
    .more{
      font-size: 26rpx;
      color: #A6A6A6;
    }
  }
</style>