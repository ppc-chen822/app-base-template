<template>
  <!-- 签名弹框 -->
  <view class="sign-content">
    <view class="content">
      <view class="tip">
        <u-icon name="info-circle-fill" color="#2979ff" size="20" />
        <view class="tip-text">请在下方框内书写您的签字</view>
      </view>
      <view class="inner-content">
        <l-signature disableScroll :beforeDelay="100" ref="signatureRef" />
      </view>

      <view class="tools-con">
        <view class="btn">
          <u-button text="返回" type="error" @click="hide" />
        </view>
        <view class="btn">
          <u-button text="清空重写" type="warning" @click="clear" />
        </view>
        <view class="btn">
          <u-button :loading="loading" loading-text="保存中..." text="保存签字" type="primary" @click="saveSign" />
        </view>
      </view>
      <upload-fun ref="upload" @uploadSuccess="uploadSuccessFun" />
    </view>
  </view>
</template>

<script>
import uploadFun from "@/components/upload/uploadFun.vue";
import { base64ToPath } from './index.js'
export default {
  components: { uploadFun },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    // 关闭签名版
    hide() {
      this.$emit("hide");
    },
    // 清除手写板内容[按钮]
    clear() {
      this.$refs.signatureRef.clear();
    },
    // 保存手写签名[按钮]
    saveSign() {
      this.$refs.signatureRef.canvasToTempFilePath({
        success: (res) => {
          // 生成图片的临时路径
          // app | H5 | 微信小程序 生成的是base64
          const { tempFilePath, isEmpty } = res

          // 判断是否为空画板
          if(isEmpty) {
            uni.$u.toast('签名板为空，请签名!')
            return
          }
          this.loading = true
          // base64转临时路径
          base64ToPath(tempFilePath).then(finalPath => {
            console.log(finalPath);
            // 获取图片的size
            uni.getFileInfo({
              filePath: finalPath,
              success: (res) => {
                const fileData = {
                  url: finalPath,
                  size: res.size,
                };
                // 上传图片操作
                this.$refs.upload.afterRead(fileData)
              },
              fail: (err) => {
                uni.$u.toast('上传失败，请稍后重试')
                console.log(err);
              }
            })
          }).catch(error => {
            uni.$u.toast('上传失败，请稍后重试')
            console.error(error)
          })


        },
      });
    },

    // 签名上传成功
    uploadSuccessFun(data) {
      console.log(data);
      this.loading = false
      this.$emit('signSuccess', data)
    }


  },
};
</script>

<style lang="scss" scoped>
.sign-content {
  height: 100vh;
  width: 100%;
  position: fixed;

  .content {
    padding: 34rpx 30rpx;
    .tip {
      margin-bottom: 20rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .tip-text {
        color: #978f8f;
        margin-left: 10rpx;
        font-size: 28rpx;
      }
    }
    .inner-content {
      background: #ffffff;
      border: 1px solid #ddd;
      height: 400rpx;
      width: 100%;
    }
    .tools-con {
      margin-top: 40rpx;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      .btn {
        margin: 20rpx 0;
      }
    }
  }
}
</style>