<template>
  <u-popup :show="popupShow" round="10" mode="bottom" closeable @close="popupShow = false">
    <view class="authImg-content">

      <view
        class="slide-block"
        :style="{
          top: authObj.y * 2 + 100 + 'rpx',
          left: slideLeft + 'rpx'
        }"
      >
        <u-image
          :showLoading="true"
          :src="'data:image/jpg;base64,' + authObj.sliceImg"
          :width="slideW * 2 + 'rpx'"
          :height="slideH * 2 + 'rpx'"
        />
      </view>

      <view class="bg-block"> 
        <u-image
          :showLoading="true"
          :src="'data:image/jpg;base64,' + authObj.bgImg"
          :width="originW * 2 + 'rpx'"
          :height="originH * 2 + 'rpx'"
        />
      </view>

      <view class="slider-con">
        <view class="silder-outer">
          <view class="slider-inner">
            <u-slider
              v-model="slideLength"
              :activeColor="sliderColor"
              :inactiveColor="sliderColor"
              :blockColor="slideLength === 0 ? '#fff' : $mainColor"
              blockSize="28"
              @change="finalChange"
            />
          </view>
        </view>
      </view>
      <view class="slider-text">
        向右拖动滑块填充拼图
      </view>
      
    </view>
  </u-popup>
</template>


<script>
import { getLoginImgApi, auditLoginApi } from '@/api/common'
export default {
  data() {
    return {
      popupShow: false,
      // 360 * 180
      // 底图尺寸
      originH: 180,
      originW: 360,

      // 滑块图尺寸
      slideH: 64,
      slideW: 64,

      slideLength: 0,
      sliderColor: 'transparent',
      authObj: {},
    }
  },
  computed: {
    slideLeft() {
      const { originW, slideLength } = this
      return (originW * 2)*(slideLength * 0.01)
    }
  },
  methods: {
    // 打开弹框
    show() {
      this.slideLength = 0
      this.popupShow = true
      this.getLoginImgFun()
    },
    // 滑块停止滑动
    finalChange() {
      const { authObj, originW, slideLength } = this
      let params = {
        token: authObj.token,
        x: parseInt(originW * (slideLength * 0.01)) - 5
      }
      this.auditLoginFun(params)
    },
    // =============== API ===============
    // 获取登录验证图
    getLoginImgFun() {
      getLoginImgApi().then((res) => {
        this.authObj = res.data
      }).catch(err => {
        console.log(err);
      })
    },

    // 验证 验证图是否到位
    auditLoginFun(params) {
      uni.showLoading({ title: '验证中' });
      auditLoginApi(params).then((res) => {
        this.popupShow = false
        this.$emit('success', params)
        uni.hideLoading();
      }).catch(err => {
        console.log(err)
        this.slideLength = 0
        uni.$u.toast('验证失败，请重新验证')
        uni.hideLoading();
        if(err.data.code === 712) {
          this.getLoginImgFun()
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .authImg-content{
    margin-top: 100rpx;
    .slide-block{
      position: absolute;
      left: 0;
      z-index: 2;
    }
    .bg-block{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .slider-con{
      margin: 30rpx;
      margin-bottom: 0;
      .silder-outer{
        background: #e9e9e9;
        
        .slider-inner{
          position: relative;
          z-index: 10;
          border-radius: 10rpx;
        }
      }
    }
    .slider-text{
      position: relative;
      /* #ifdef MP-WEIXIN */
      top: -55rpx;
      /* #endif */

      /* #ifdef H5 */
      top: -58rpx;
      /* #endif */
      text-align: center;
      color: #45494c;
      font-size: 28rpx;
      z-index: 1;
    }
  }
</style>