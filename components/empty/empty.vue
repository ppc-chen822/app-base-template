<template>
  <view class="empty-content">
    <u-empty
      :mode="mode"
      :text="text"
    />
  </view>
</template>

<script>
export default {
   props: {
    mode: {
      type: String,
      default: 'data'
    },
    text: {
      type: String,
      default: ''
    }
  },
}
</script>

<style>
  .empty-content{
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>