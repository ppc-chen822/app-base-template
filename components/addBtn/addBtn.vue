<template>
  <view class="addBtn" @click="add">
    <u-icon name="plus" color="#ffffff" bold size="24"></u-icon>
  </view>
</template>

<script>
export default {
  methods: {
    add() {
      this.$emit('addClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .addBtn{
    width: 100rpx;
    height: 100rpx;
    background: #2a82e4;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: fixed;
    z-index: 10;
    right: 40rpx;
    bottom: 200rpx;
  }
</style>