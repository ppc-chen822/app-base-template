<template>
  <view
    v-if="show"
    class="skeleton-container"
    :class="{'noPadding': itemNum === 1, 'hasPadding': hasPad}"
    :style="{background: bgColor}"
  >
    <view
      class="skeleton-con"
      v-for="(item, index) in itemNum" :key="index"
    >
      <u-skeleton
        :rows="rows"
        :title="title"
        :avatar="avatar"
        :avatarSize="avatarSize"
        :avatarShape="avatarShape"
        loading
      />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: 'transparent'
    },
    list: {
      type: Object | Array,
    },
    itemNum: {
      type: Number,
      default: 1
    },
    rows: {
      type: String || Number,
      default: '3'
    },
    title: {
      type: Boolean,
      default: true
    },
    avatar: {
      type: Boolean,
      default: false
    },
    avatarSize: {
      type: String || Number,
      default: '32'
    },
    avatarShape: {
      type: String,
      default: 'circle'
    },
    hasPad: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      show: true
    }
  },
  watch: {
    list(newList) {
      this.show = newList && newList.length === 0
    }
  }
}
</script>

<style lang="less" scoped>
  .skeleton-container{
    // background: #f6f6f6;
    padding: 30rpx 0;
    border-radius: 20rpx;
    .skeleton-con{
      background: #ffffff;
      padding: 30rpx;
      margin-bottom: 30rpx;
      border-radius: 20rpx;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  .noPadding{
    padding: 0 !important;
  }
  .hasPadding{
    padding: 30rpx;
  }
</style>