<template>
  <view class="page-container">
    
    <view class="login-content">
      <view class="title">
        修改密码
      </view>

      <!-- 修改密码表单 -->
      <view class="form-content">
        <u-form
          labelPosition="top"
          labelWidth="120px"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          :labelStyle="labelStyle"
        >
          <u-form-item label="旧密码" prop="oldPassword">
            <u-input v-model="loginForm.oldPassword" placeholder="请输入旧密码" shape="circle" type="password" customStyle="background: #f5f5f5; border-color: #f5f5f5 !important;" clearable />
          </u-form-item>
          <u-form-item label="新密码" prop="newPassword">
            <u-input v-model="loginForm.newPassword" placeholder="请输入密码" shape="circle" type="password" customStyle="background: #f5f5f5; border-color: #f5f5f5 !important;" clearable />
          </u-form-item>
          <u-form-item label="重复新密码" prop="confirmPassword">
            <u-input v-model="loginForm.confirmPassword" placeholder="请再次输入新密码" shape="circle" type="password" customStyle="background: #f5f5f5; border-color: #f5f5f5 !important;" clearable />
          </u-form-item>
        </u-form>
        <u-button :customStyle="loginBtnStyle" text="修改密码" shape="circle" @click="updateHandle"></u-button>
      </view>

    </view>
  </view>
</template>

<script>
import { updatePasswordApi } from '@/api/common.js'
  export default {
    data() {
      return {
        loginForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            {
              required: true, 
              message: '请输入旧密码',
              trigger: ['change','blur'],
            }
          ],
          newPassword: [
            {
              required: true,
              message: '请输入新设置的密码',
              trigger: ['blur', 'change']
            },{
              min: 6,
              max: 14,
              message: '长度在6-14个字符之间'
            }
          ],
          confirmPassword:[
            {
              required: true,
              message: '请再次输入新设置的密码',
              trigger: ['blur', 'change']
            },{
              validator: (rule, value, callback) => {
                return value === this.loginForm.newPassword
              },
              message: '两次输入的密码不一样'
            },
          ]
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
          marginTop: "80rpx",
          fontSize: "36rpx !important",
        }
      };
    },
    methods: {
      // 手机号登录
      updateHandle() {
        this.$refs.loginForm.validate().then(res => {
          console.log(this.loginForm);
          this.updatePasswordFun()
        })
      },
      // 修改密码
      updatePasswordFun(data) {
        const { oldPassword, newPassword } = this.loginForm
        const params = {
          oldPassword, newPassword
        }
        updatePasswordApi(params).then(() => {
          uni.showToast({
            type: 'success',
            title: '修改成功!'
          })
          setTimeout(() => {
            uni.reLaunch({
              url: `/pages/login/login?cleanToken=${true}`
            });
          }, 2000);
        }).catch(err => {
          this.$message.warning(err)
        })
      },
    }
  }
</script>

<style>
  page{
    background: #f6f6f6;
  }
</style>
<style lang="scss" scoped>
  .page-container{
    height: 100vh;
    padding-top: 100rpx;
    .login-content{
      background: #ffffff;
      border-radius: 20px;
      
      width: 90%;
      margin: 0rpx auto;
      .title{
        color: $mainColor;
        font-size: 48rpx;
        font-weight: 700;
        padding: 60rpx 54rpx;
      }
      .form-content{
        padding: 0rpx 50rpx 40rpx;
      }
    }
  }
</style>
