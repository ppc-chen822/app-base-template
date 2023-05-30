<template>
  <view>
    <u-cell-group>
      <u-cell
        v-for="(item, index) in list"
        :key="index"
        :isLink="true"
        :title="item.version"
        :label="item.date"
        @click="checkVersion(item)"
      />
    </u-cell-group>

    <u-popup
      :show="popupShow"
      round="5"
      mode="center"
      closeable
      @close="popupShow = false"
    >
      <view class="desc-content">
        <view class="list-con">
          <view v-for="(item, index) in desc" :key="index" class="desc-item">
            {{ item }}
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        desc: '',
        popupShow: false,
        list: [
          {
					  version: '小程序-基础端 V1.0.0',
					  date: '2023-05-30',
					  desc: [
					    `1. 初始化项目基础`,
					  ]
					}
        ]
      }
    },
    methods: {
      checkVersion({ desc }) {
        if(desc.length > 0) {
          this.desc = desc
          this.popupShow = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .desc-content{
    padding: 30rpx 36rpx;
    max-height: 480rpx;
    width: 480rpx;
    margin-top: 50rpx;
    .list-con{
      overflow-y: auto;
      height: 100%;
      .desc-item{
        font-size: 28rpx;
        margin-bottom: 20rpx;
        color: #3c3c3c;
        line-height: 46rpx;
      }
    }
  }
</style>
