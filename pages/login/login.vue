<template>
  <view class="page-container">
    <!-- <view class="bgImg"></view> -->
    <image class="loginBg" :src="bgImg" mode=""></image>
    
    <view class="login-content">
      <view class="title">{{ title }}</view>

      <!-- 登录表单 -->
      <view class="form-content">
        <view class="tips">
          为获得完整的使用，请登录后使用。
        </view>
        <u-form
          labelPosition="top"
          labelWidth="120px"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          :labelStyle="labelStyle"
        >
          <u-form-item label="用户名" prop="tel" ref="name">
            <u-input v-model="loginForm.tel" placeholder="请输入用户名/手机号/身份证号" shape="circle" type="text" customStyle="background: #f5f5f5; border-color: #f5f5f5 !important;" clearable />
          </u-form-item>
          <u-form-item label="密码" prop="password" ref="password">
            <u-input v-model="loginForm.password" placeholder="请输入密码" shape="circle" type="password" customStyle="background: #f5f5f5; border-color: #f5f5f5 !important;" clearable />
          </u-form-item>
        </u-form>

        <u-button :customStyle="loginBtnStyle" :loading="loading" :text="loading ? '登录中...' : '登录'" shape="circle" @click="loginHandle" />
      </view>
      <!-- 用户协议 -->
      <view class="agreement-content">
        <agreement ref="agreement" />
      </view>
    </view>
    <!-- 版本号 -->
    <version />
    <!-- 滑动验证码 -->
    <auth-img ref="authImg" @success="loginFun" />
  </view>
</template>

<script>
import agreement from './agreement.vue'
import AuthImg from './authImg.vue'
import { CLIENT_ID, CLIENT_SECRET } from '@/constant';
import { loginApi, getUserdetailApi } from '@/api/my'
export default {
  components: { agreement, AuthImg },
  onLoad(opt) {
    if(opt.cleanToken) {
      this.cleanToken(opt.overTime)
    }
  },
  data() {
    return {
      loading: false,
      bgImg: `${this.imgUrl}/login/loginBg1.png`,
      title: '数字乡村-基础项目',
      loginForm: {
        tel: '',
        password: ''
      },
      rules: {
        tel: [{
          required: true, 
          message: '请输入用户名/手机号/身份证号',
          trigger: ['change','blur'],
        }],
        password: {
          required: true,
          message: '请输入密码',
          trigger: ['blur', 'change']
        }
      },
      labelStyle: {
        color: '#808080',
        fontWeight: '500',
        fontSize: '32rpx'
      },
      loginBtnStyle: {
        background: this.$mainColor,
        color: "#ffffff",
        fontWeight: "bold",
        letterSpacing: "4rpx",
        marginTop: "50rpx",
        fontSize: "36rpx !important",
      }
    };
  },
  methods: {
    // 手机号登录
    loginHandle() {
      this.$refs.loginForm.validate().then(res => {
        const isAgree = this.$refs.agreement.isAnonymous
        if(!isAgree) {
          uni.$u.toast('请勾选同意《用户协议》和《隐私政策》')
          return
        }
        this.showSlider()
      })
    },
    // 打开滑动验证弹框
    showSlider() {
      this.$refs.authImg.show()
    },
    // 微信登录
    wechatLogin() {
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          console.log(loginRes.authResult);
        }
      })
    },

    // 清除登录信息
    cleanToken(overTime) {
      // uni.clearStorageSync()
      uni.removeStorageSync('userInfo');
      uni.removeStorageSync('dictMap');
      uni.removeStorageSync('watchObj');
      uni.removeStorageSync('watchCode');
      uni.removeStorageSync('refresh_token');

      uni.removeStorage({
        key: 'token',
        success: (res) => {
          uni.showToast({
            icon: 'none',
            title: overTime ? '登录已过期' : '已退出登录'
          })
        }
      });
    },

    // =============== API ===============
    loginFun(auditParams) {
      this.loading = true
      const { loginForm: { tel, password } } = this
      const params = {
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: 'all',
        username: tel,
        password: password,
        ...auditParams
      }
      loginApi(params).then((res) => {
        if(res && res.access_token){
          uni.setStorage({
            key: 'token',
            data: res.access_token,
            success: () => {
              // 登录成功并获取token后 查询用户信息和字典项
              this.getUserdetailFun()
            }
          });
          uni.setStorage({
            key: 'refresh_token',
            data: res.refresh_token,
          });
        }else{
          uni.$u.toast('登录失败')
          this.loading = false
        }
      }).catch(err => {
        this.loading = false
        uni.$u.toast(err.data ? err.data.msg : '登录失败')
      })
    },
    // 查询用户信息和字典项
    getUserdetailFun() {
      getUserdetailApi().then((res) => {
        console.log(res);
        const userInfo = {
          id: res.id,
          username: res.username,
          realName: res.realName,
          avatar: res.avatar,
          phone: res.phone,
          idCard: res.idCard,
          userOrgName: res.userOrgName,
          userOrgCode: res.userOrgCode,
        }
        // 保存用户信息
        uni.setStorageSync('userInfo', userInfo);
        // 保存字典项
        uni.setStorageSync('dictMap', res.dictMap);

        uni.showToast({
          title: '登录成功!',
          icon: 'success'
        });
        this.loading = false
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
      }).catch(err => {
        this.loading = false
        uni.$u.toast('登录失败，请稍后重试')
        console.log(err);
      })
    },

  }
}
</script>

<style lang="scss" scoped>
  .page-container{
    height: 100vh;
    background: linear-gradient(180deg, rgba(41, 128, 227, 1) 0%, rgba(42, 130, 228, 0.61) 100%);
    .loginBg{
      width: 100%;
      height: 100vw;
    }
    .login-content{
      background: #ffffff;
      border-radius: 20px;
      // height: 800rpx;
      width: 90%;
      margin: -420rpx auto;
      position: relative;
      z-index: 1;
      .title{
        color: $mainColor;
        font-size: 48rpx;
        font-weight: 700;
        padding: 60rpx 54rpx;
      }
      
      .form-content{
        padding: 0rpx 50rpx 40rpx;
      }
      .agreement-content{
        padding: 10rpx 0 40rpx;
      }
      .tips{
        padding-bottom: 20rpx;
        font-size: 26rpx;
        color: #6e6e6e;
      }
    }
  }
</style>
