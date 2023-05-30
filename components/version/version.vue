<template>
  <view
    class="version-content"
    :style="{color: color}"
    @click="enterList"
  >
    {{ versionType[VERSION_TYPE].code }} {{ version }}
  </view>
</template>

<script>
import { VERSION, VERSION_TYPE } from '@/constant';
export default {
  props: {
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  data() {
    return {
      version: VERSION,
      VERSION_TYPE: VERSION_TYPE,
      versionType: [
        {
          name: '默认',
          code: 'Version'
        },{
          name: '内测版',
          code: 'alpha'
        },{
          name: '公测版',
          code: 'beta'
        },{
          name: '演示版',
          code: 'Demo'
        },{
          name: '试用版',
          code: 'Trial'
        },{
          name: '发行版',
          code: 'release'
        }
      ]
    }
  },
  methods: {
    enterList() {
      uni.navigateTo({ url: '/pages/common/versionList' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .version-content{
    position: absolute;
    text-align: center;
    bottom: 50rpx;
    font-size: 24rpx;
    width: 100%;
  }
</style>