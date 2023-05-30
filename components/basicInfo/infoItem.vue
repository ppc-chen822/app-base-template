<template>
  <view class="infoItem-content">
    <view class="title"> {{ title }} </view>
    <view class="info" :class="{ blue: isBright }">
      <template v-if="isBoolean">
        <u-tag v-if="info" text="是" type="success" size="mini" />
        <u-tag v-if="!info" text="否" type="warning" size="mini" />
      </template>

      <template v-else-if="isBlock">
        <u-tag :text="info" :type="blockType" size="mini" :bgColor="tagColor" :borderColor="tagColor" />
      </template>
      <template v-else-if="multipleText.length !== 0">
        <view class="tags">
          <view class="tags-item" v-for="(item, index) in multipleText" :key="index">
            <u-tag :text="item" size="mini" />
          </view>
        </view>
      </template>

      <template v-else-if="isImg">
        <u-image
          :showLoading="true"
          :src="info"
          width="80px"
          height="80px"
          radius="10rpx"
          @click="preview"
        />
      </template>
      <template v-else-if="isRightArrow">
        <u-text
          :text="info"
          suffixIcon="arrow-right"
          :iconStyle="{color: '#222', fontSize: '32rpx', marginLeft: '4rpx', marginTop: '2rpx'}"
          @click="rightArrowClick"
        />
      </template>
      <template v-else>
        {{ info }}
      </template>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: "",
    info: "",
    isBright: false,
    isBoolean: false,
    isBlock: false,
    isImg: false,
    isRightArrow: false,
    tagColor: {
      type: String,
      default: ''
    },
    blockType: {
      type: String,
      default: "primary",
    },
    multipleText: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 预览图片
    preview() {
      const { info } = this
      uni.previewImage({
        urls: [info],
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.infoItem-content {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  font-size: 30rpx;
  font-weight: 500;
  color: #222222;
  padding: 20rpx 33rpx;
  border-bottom: 1rpx solid #f6f6f6;
  .title {
    max-width: 70%;
  }
  .info {
    max-width: 70%;
    text-align: right;
  }
  .tags{
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    .tags-item{
      margin-left: 20rpx;
      margin-bottom: 10rpx;
    }
  }
  .blue {
    color: #227aff;
    // text-decoration: underline;
  }
}
</style>