<template>
  <view class="loading-content"
    :style="{height: height}"
  >
    <u-loading-icon
      :text="text"
      :vertical="true"
      mode="semicircle"
      :size="size"
    />
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '加载中...'
    },
    size: {
      type: String,
      default: '30'
    },
    height: {
      type: String,
      default: '80vh'
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style>
  /* height: 80vh; */
  .loading-content{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>