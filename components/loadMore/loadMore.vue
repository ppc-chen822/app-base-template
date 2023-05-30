<template>
  <view class="loadmore" :class="{'hasPB': hasPB}">
    <u-loadmore
      loadingIcon="semicircle"
      :status="status"
      :loadmoreText="loadmoreText"
      :nomoreText="nomoreText"
      :color="color"
      :marginTop="marginTop"
      :marginBottom="marginBottom"
      :fontSize="fontSize"
      :isDot="isDot"
      @loadmore="loadmoreFun"
    />
  </view>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: ''
    },
    loadmoreText: {
      type: String,
      default: '加载更多'
    },
    nomoreText: {
      type: String,
      default: '没有更多了'
    },
    hasPB: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#606266'
    },
    marginTop: {
      type: String,
      default: '10'
    },
    marginBottom: {
      type: String,
      default: '10'
    },
    fontSize: {
      type: String,
      default: '14'
    },
    isDot: {
      type: Boolean,
      default: false
    },

  },
  methods: {
    loadmoreFun() {
      this.$emit('loadMore')
    }
  }
}
</script>


<style lang="scss" scoped>
  .loadmore{
    // padding-bottom: 50rpx;
  }
  .hasPB{
    padding-bottom: 20rpx;
  }
</style>