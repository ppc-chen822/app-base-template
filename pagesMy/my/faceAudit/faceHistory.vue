<template>
  <view class="face-histroy-content">
    <view class="title">
      <common-title title="人脸采集记录" />
    </view>
    <view class="list-content">
      <view class="face-item"
        v-for="(item, index) in list"
        :key="item.id"
      >
        <view class="left" @click="preview(index)">
          <u-avatar
            :src="item.address"
            shape="square"
            size="100"
          />
        </view>

        <view class="right">
          {{ item.createTime }}
        </view>
      </view>

      <skeleton
        :list="list"
        avatar
        avatarShape="square"
        :itemNum="5"
        rows="1"
        avatarSize="100"
      />
    </view>
    <is-down />
  </view>
</template>

<script>
import { getImgsByIdApi } from '@/api/common.js'
import CommonTitle from '@/components/commonTitle/commonTitle.vue'
import Skeleton from '@/components/skeleton/skeleton.vue'
import IsDown from '@/components/isDown/isDown.vue'
export default {
  components: { CommonTitle, Skeleton, IsDown },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getImgsByIdFun()
  },
  computed: {
    initImgList() {
      const { list } = this
      let arr = []
      list.forEach(ele => {
        arr.push(ele.address)
      })
      return arr
    }
  },
  methods: {
    // 预览图片
    preview(index) {
      uni.previewImage({
        current: index,
        urls: this.initImgList,
      })
    },
    // =============== API ===============
    getImgsByIdFun() {
      const params = {
        current: 1,
        size: 500,
        businessId: uni.getStorageSync('userInfo').id
      }
      getImgsByIdApi(params).then((res) => {
        this.list = res.records
      }).catch(err => {
        console.log(err);
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
  .face-histroy-content{
    .title{
      padding: 30rpx;
      padding-bottom: 0;
    }
    .list-content{
      padding: 30rpx;
      padding-bottom: 10rpx;
      .face-item{
        background: #ffffff;
        border-radius: 10rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx 30rpx;
        margin-bottom: 30rpx;
        .right{
          font-size: 28rpx;
          color: #9b9999;
        }
      }
    }
  }
</style>