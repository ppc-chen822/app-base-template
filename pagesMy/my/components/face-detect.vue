<template>
  <view class="face-test-container" v-if="show">
    <view>
      <view class="detectInfo">
        <view class="confirmInfo">
          请确认{{ userName }}本人操作
        </view>

        <view class="detect-tip">
          {{ isSuccess ? "人脸检测成功！" : tipsText }}
        </view>
      </view>

      <view class="faceContent">
        <!-- #ifdef MP-WEIXIN -->
        <view class="face-con">
          <camera
            device-position="front"
            resolution="high"
            @stop="cameraError"
            @error="cameraError"
            style="
              width: 500rpx;
              height: 500rpx;
              border-radius: 50%;
              border: 12rpx solid rgba(42, 130, 228, 1);
            "
          />
        </view>
        <!-- #endif -->
      </view>
    </view>

    <view class="attention">
      <view class="title-content">
        <u-icon name="error-circle" color="#ffffff" size="35rpx" />
        <view class="title">注意事项</view>
      </view>

      <view class="attention-list">
        <view class="item" v-for="item in attentionList" :key="item.name">

          <view class="img-con">
            <image
              :src="item.bgImg"
              mode="scaleToFill"
              :style="{width: item.w, height: item.h}"
            />
          </view>

          <image
            :src="checkImg"
            mode="scaleToFill"
            style="width: 32rpx; height: 32rpx"
            class="checkedIcon"
          />
          <view class="name">{{item.name}}</view>
        </view>
      </view>
    </view>
      
  </view>
</template>

<script>
// 人脸检测
/**
 * @event {Function} photoChange 拍照完成事件
 * @event {Function} detectFailed 人脸检测失败
 * @event {Function} detectOver 人脸检测结束
 *
 * @method {Function} detectOver 人脸检测完成
 * @method {Function} initData 初始化人脸检测
 */
export default {
  name: "face-detect",
  data() {
    return {
      show: false,
      tipsText: "请保持正脸在扫描框中根据屏幕指示完成识别",
      isSuccess: false, //是否检测完成

      userName: uni.getStorageSync('userInfo').realName,

      checkImg: `${this.imgUrl}/my/faceAudit/check.png`,
      attentionList: [
        {
          name: '正对手机',
          bgImg: `${this.imgUrl}/my/faceAudit/a.png`,
          w: '54rpx',
          h: '76rpx'
        },{
          name: '光线充足',
          bgImg: `${this.imgUrl}/my/faceAudit/b.png`,
          w: '78rpx',
          h: '76rpx'
        },{
          name: '放慢动作',
          bgImg: `${this.imgUrl}/my/faceAudit/c.png`,
          w: '76rpx',
          h: '76rpx'
        }
      ]
    };
  },
  methods: {
    // 核验失败
    cameraError(e) {
      this.hideModal();
      this.$emit("detectFailed");
    },
    // 关闭
    hideModal() {
      wx.stopFaceDetect();
      this.show = false;
      this.tipsText = "检测不到人脸";
      this.isSuccess = false;
    },
    // 拍照
    takePhoto() {
      const context = uni.createCameraContext();
      context.takePhoto({
        quality: "normal",
        success: (res) => {
          uni.getNetworkType({
            success: (network) => {
              if (network.networkType != "none") {
                // 图片路径
                this.$emit("photoChange", res);
              } else {
                this.tipsText = "无网络，请确保网络为开启状态";
              }
            },
            fail: (error) => {
              this.tipsText = "当前网络异常，请稍后重试";
            },
          });
        },
      });
    },

    // 检测完成
    detectOver() {
      this.isSuccess = true;
      let t = setTimeout(() => {
        this.hideModal();
        clearTimeout(t);
        this.$emit("detectOver");
      }, 2000);
    },
    initData() {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting["scope.camera"]) {
            this.faceDetect();
          } else {
            wx.authorize({
              scope: "scope.camera",
              success: () => {
                this.faceDetect();
              },
              fail: (error) => {
                wx.showToast({ title: "授权失败", icon: "none" });
              },
            });
          }
        },
        fail: (error) => {
          wx.showToast({ title: "获取用户授权信息失败", icon: "none" });
        },
      });
    },
    // 初始化人脸检测
    faceDetect() {
      this.show = true;
      wx.initFaceDetect();
      const context = wx.createCameraContext();
      const listener = context.onCameraFrame((frame) => {
        wx.faceDetect({
          frameBuffer: frame.data,
          width: frame.width,
          height: frame.height,
          enablePoint: true,
          enableConf: true,
          enableAngle: true,
          enableMultiFace: true,
          success: (faceData) => {
            let face = faceData.faceInfo[0];

            console.log('俯仰角(点头)', face.angleArray.pitch)
            // console.log('偏航角（摇头）', face.angleArray.yaw)
            // console.log('翻滚角（左右倾）', face.angleArray.roll)
            if (faceData.x == -1 || faceData.y == -1) {
              this.tipsText = "检测不到人脸";
            }
            if (faceData.faceInfo.length > 1) {
              this.tipsText = "请保证只有一人做核验";
            } else {
              if (
                face.angleArray.pitch >= 0.3 ||
                face.angleArray.roll >= 0.1 ||
                face.angleArray.yaw >= 0.1
              ) {
                this.tipsText = "请平视摄像头";
              } else if (
                face.confArray.global <= 0.8 ||
                face.confArray.leftEye <= 0.8 ||
                face.confArray.mouth <= 0.8 ||
                face.confArray.nose <= 0.8 ||
                face.confArray.rightEye <= 0.8
              ) {
                this.tipsText = "请勿遮挡五官";
              } else {
                this.tipsText = "正在核验，请保持";
                this.takePhoto();
                wx.stopFaceDetect();
              }
            }
          },
          fail: (err) => {
            if (err.x == -1 || err.y == -1) {
              this.tipsText = "检测不到人脸";
            }
          },
        });
      });
      listener.start();
    },
  },
};
</script>

<style lang="scss" scoped>

.face-test-container{
  height: 100vh;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  
  .detectInfo {
    padding: 100rpx 0rpx;
    text-align: center;
    color: rgba(166, 166, 166, 1);
    font-size: 28rpx;
    .confirmInfo{
      color: rgba(0, 0, 0, 1);
      font-size: 36rpx;
      text-align: center;
      margin-bottom: 16rpx;
    }
  }

  .faceContent {
    display: flex;
    justify-content: center;
    align-items: center;
    .face-con{

    }
    .carema-con{
      border-radius: 50%;
      width: 400rpx;
      height: 400rpx;
      border: 12rpx solid rgba(42, 130, 228, 1);
    }
  }

  .attention{
    padding: 34rpx;
    margin-top: 170rpx;
    .title-content{
      width: 300rpx;
      height: 68rpx;
      padding: 0 20rpx 0;
      background: linear-gradient(90deg, rgba(42, 130, 228, 1) 0%, rgba(42, 130, 228, 0) 100%);
      border-radius: 8prx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: rgba(255, 255, 255, 1);
      font-size: 32rpx;
      .title{
        margin-left: 20rpx;
      }
    }
    .attention-list{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-top: 56rpx;
      .item{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .img-con{
          width: 110rpx;
          height: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(42, 130, 228, .2);
        }
        .checkedIcon{
          position: relative;
          top: -110rpx;
          left: 45rpx;
        }
        .name{
          color: rgba(56, 56, 56, 1);
          font-size: 28rpx;
          margin-top: -12rpx;
        }
      }
    }
  }
}
</style>