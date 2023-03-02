<template>
  <view class="business-process-content">
    
    <!-- 顶部tabs(粘性布局) -->
    <u-sticky bgColor="#fff">
      <view class="tabs-content">
        <u-tabs
          :list="tabsList"
          :inactiveStyle="tabsStyle"
          :activeStyle="tabsStyle"
          :lineColor="`url(${lineBg}) 100% 100%`"
          lineWidth="130rpx"
          lineHeight="20rpx"
          @change="tabsChange"
        />
      </view>
    </u-sticky>

    <view class="process-content">
      <ongoing ref="ongoing" />
    </view>

  </view>
</template>

<script>
import ongoing from './ongoing.vue'
export default {
  components: { ongoing },
  data() {
    return {
      lineBg: `${this.imgUrl}/business/process/line.png`,
      tabsIndex: 0,
      tabsList: [{
        name: '办理中',
      },{
        name: '已通过',
      },{
        name: '已驳回',
      }],
      tabsStyle: {
        fontSize: '32rpx',
        color: '#383838',
        fontWeight: 'bold',
        letterSpacing: '1rpx'
      },
    }
  },
  onReachBottom() {
    console.log('滑动到底 加载更多');
    this.$refs.ongoing.loadMore(this.tabsIndex)
  },
  methods: {
    // 切换办事类型(0办理中, 1已通过, 2已驳回)
    tabsChange({ index }) {
      this.tabsIndex = index
      setTimeout(() => {
        this.$refs.ongoing.total = 0
        this.$refs.ongoing.ongoingList = []
        this.$refs.ongoing.queryObj.current = 1
        this.$refs.ongoing.getOngoingFun(index)
      }, 50);
    }
  }
}
</script>

<style>
  page{
    background: #f6f6f6;
  }
  ::v-deep .u-tabs__wrapper__nav__line{
    border-radius: 0 !important;
    bottom: 10px !important;
    margin-left: -10rpx;
  }
</style>
<style lang="scss" scoped>
  .business-process-content{
    .tabs-content{
      padding: 20rpx;
    }
    .process-content{
      padding: 20rpx 34rpx;
    }
  }
</style>