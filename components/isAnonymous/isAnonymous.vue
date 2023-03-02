<template>
  <view class="input-tip">
    <u-checkbox-group v-model="anonymous">
      <u-checkbox shape="circle" name="匿名" label="匿名" />
    </u-checkbox-group>
    <view v-show="anonymous.length > 0" class="anonymous-tip">
      您提的意见会以匿名的形式展示
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      anonymous: [],
    }
  },
  computed: {
    isAnonymous() {
      return this.anonymous.length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-tip{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .anonymous-tip{
      color: rgba(166, 166, 166, 1);
      font-size: 26rpx;
    }
  }
</style>