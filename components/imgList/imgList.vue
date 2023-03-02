<template>
  <view class="imgList-container">
    <common-title :title="title" />
    <view class="list-content">
      <view
        class="img-item"
        v-for="(item, index) in list"
        :key="index"
      >
        <u--image
          :src="item.address"
          width="162rpx"
          height="162rpx"
          bgColor="#DCDCDC"
          @click="preview(index)"
        />
      </view>

    </view>
    <u-empty v-if="list && list.length === 0" mode="list" text="暂无图片" />
  </view>
</template>

<script>
import commonTitle from '../commonTitle/commonTitle.vue'
export default {
  components: { commonTitle },
  props: {
    list: {
      type: Array,
      default: ()=>[]
    },
    title: {
      type: String,
      default: '相关资料'
    }
  },
  data() {
    return {
      previewShow: false,
    }
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
  }
}
</script>

<style lang="scss" scoped>
  .imgList-container{
    padding: 30rpx;
    background: #ffffff;

    .list-content{
      margin-top: 50rpx;
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      // align-items: center;
      .img-item{
        width: 25%;
        margin-bottom: 14rpx;
      }
    }
  }
</style>