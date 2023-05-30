<template>
  <view>
    <!-- 顶部tabs(粘性布局) -->
    <u-sticky bgColor="#fff">
      <view class="tabs-content">
        <u-tabs
          :list="tabsList"
          :inactiveStyle="inactiveStyle"
          :activeStyle="tabsStyle"
          :lineColor="$mainColor"
          lineWidth="88rpx"
          lineHeight="6rpx"
          :scrollable="scrollable"
          :keyName="keyName"
          @change="tabsChange"
          :current="curTab"
        />
      </view>
    </u-sticky>
  </view>
</template>
<script>
export default {
  props: {

    tabsList: {
      type: Array,
      default: () => [],
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    keyName: {
      type: String,
      default: "name",
    },
    fontSize: {
      type: String | Number,
      default: "30",
    },
    curTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      lineBg: `${this.imgUrl}/business/process/line.png`,
      tabsStyle: {
        fontSize: this.fontSize + "rpx",
        color: this.$mainColor,
        fontWeight: "bold",
        letterSpacing: "1rpx",
      },

      inactiveStyle: {
        fontSize: this.fontSize + "rpx",
        color: "#333333",
        letterSpacing: "1rpx",
      },
    };
  },
  methods: {
    tabsChange({ index }) {
      this.$emit("tabsChange", index);
    },
  },
};
</script>
<style>
::v-deep .u-tabs__wrapper__nav__line {
  bottom: 13rpx !important;
}
</style>
<style lang="scss" scoped>
.tabs-content {
  // padding: 10rpx 0;
}
</style>