<template>
  <view class="shortcut-card-content">

    <view class="content">
      <commonTitle :title="shortcutObj.title" :url="shortcutObj.url" />
      <view class="shortcut-list">
        <template v-for="item in shortcutObj.list">
          <view
            class="shortcut-item"
            v-if="isOlderMenu(item.name) && item.isShow"
            :key="item.name"
            @click="goToPage(item)"
          >
            <image
              :style="{width: shortcutObj.iconSize, height: shortcutObj.iconSize}"
              mode="aspectFit"
              :src="item.icon"
            />
            <view class="name">{{ item.name }}</view>
          </view>
        </template>
      </view>
    </view>


    <u-action-sheet
      :actions="actionsList"
      :show="actionsShow"
      cancelText="关闭"
      :closeOnClickOverlay="true"
      :closeOnClickAction="true"
      round="20rpx"
      @select="selectClick"
      @close="closed"
    />
  </view>
</template>

<script>
import commonTitle from '@/components/commonTitle/commonTitle.vue'
export default {
  components: { commonTitle },
  props: {
    shortcutObj: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      actionsShow: false,
      actionsTitle: '',
      actionsList: [],
    }
  },
  methods: {
    // 跳转页面
    goToPage(item) {
      const url = item.navigate
      if(url || item.actionsList) {
        if(item.actionsList) {
          this.actionsTitle = item.name
          this.actionsList = item.actionsList
          this.actionsShow = true
        }else{
          uni.navigateTo({ url })
        }
      }else{
        uni.$u.toast('正在开发中...')
      }
    },

    // 点击action-sheet选项
    selectClick(data) {
      uni.navigateTo({ url: data.navigate })
    },

    // action-sheet关闭回调
    closed() {
      this.actionsShow = false
    },
    // 判断是否是老年人独有的页面
    isOlderMenu(pageName) {
      const arr = ['基本信息', '健康监测', '报警记录']
      const isOld = arr.includes(pageName)
      if(isOld) {
        return this.$isOlder()
      }else{
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .shortcut-card-content{
    padding: 0 34rpx 34rpx;
    .content{
      background: #ffffff;
      border-radius: 20rpx;
      padding: 30rpx;
      .shortcut-list{
        display: flex;
        flex-wrap: wrap;
        margin-top: 10rpx;
        .shortcut-item{
          margin-top: 35rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 25%;
          .name{
            font-size: 26rpx;
            font-weight: 500;
            margin-top: 20rpx;
            color: #808080;
          }
        }
      }
    }
  }
</style>