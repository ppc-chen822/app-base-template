<template>
  <view class="basicInfo-container">

    <!-- 基本信息 -->
    <view class="content" v-if="!loading">
      <view class="title">
        <common-title title="基本信息" />
      </view>

      <u-cell-group :border="hasBorder">
        <u-cell :border="hasBorder" title="真实姓名" :value="userObj.realName" />
        <u-cell :border="hasBorder" title="联系方式" :value="userObj.phone" />
        <u-cell :border="hasBorder" title="身份证号" :value="userObj.idCard" />
        <u-cell :border="hasBorder" title="用户名" :value="userObj.username" />
        <!-- <u-cell :border="hasBorder" title="个性签名" :value="userObj.remark" /> -->
      </u-cell-group>
    </view>

    <u-loading-page :loading="loading" />
  </view>
</template>

<script>
import commonTitle from '@/components/commonTitle/commonTitle.vue'

export default {
  components: { commonTitle },
  data() {
    return {
      loading: false,
      hasBorder: false,
      disabled: true,
      userObj: uni.getStorageSync('userInfo'),

    }
  },
}
</script>


<style>
  page{
    background: #f6f6f6;
  }
  .placeholderClass{
    color: #808080;
    font-size: 26rpx;
  }
</style>
<style lang="scss" scoped>
  .basicInfo-container{
    padding: 34rpx;
    .content{
      padding: 34rpx 0;
      background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(235, 244, 255, 1) 100%);
      border-radius: 20rpx;
      margin-bottom: 40rpx;
      .title{
        padding-left: 30rpx;
      }
    }

    .tool{
      margin-top: 90rpx;
    }

    .value{
      max-width: 400rpx;
      color: #606266;
      text-align: right;
    }
  }
</style>