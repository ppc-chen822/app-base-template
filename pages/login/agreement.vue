<template>
  <view class="input-tip">
    <u-checkbox-group v-model="anonymous">
      <u-checkbox shape="circle" name="匿名" label="我已阅读并同意" size="small" />
    </u-checkbox-group>
    <view class="anonymous-tip">
      <text class="link" @click="enterDetail('userServiceAgreementID')">用户协议</text>
      和
      <text class="link" @click="enterDetail('privacyPolicyID')">隐私政策</text>
    </view>
  </view>
</template>

<script>
import { getContentApi } from '@/api/common.js'
export default {
  data() {
    return {
      anonymous: [],
      userServiceAgreementID: '',
      privacyPolicyID: ''
    }
  },
  computed: {
    isAnonymous() {
      return this.anonymous.length > 0
    }
  },
  mounted() {
    this.getContentFun('userServiceAgreement')
    this.getContentFun('privacyPolicy')
  },
  methods: {
    enterDetail(id) {
      uni.navigateTo({ url: `/pages/index/threeOpen/newsDetail?id=${this[id]}` })
    },
    // 
    // =============== API ===============
    // 查询用户协议
    getContentFun(modelCode) {
      const params = {
        current: 1,
        size: 1,
        modelCode
      }
      getContentApi(params).then((res) => {
        console.log(res.data.records);
        this[modelCode+ 'ID'] = res.data.records[0].id
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .input-tip{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    .anonymous-tip{
      .link{
        color: #2980e3;
        margin: 0 5rpx;
      }
    }
  }
</style>