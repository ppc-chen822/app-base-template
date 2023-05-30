<template>
  <view
    class="notice-content"
  >
    <view class="title-content">
      <u-cell is-link :border="false" value="查看全部" :rightIconStyle="{color: '#fff'}">
        <text slot="title" class="u-slot-title">通知公告</text>
        <text slot="value" class="u-slot-value" @click="viewList">查看全部</text>
      </u-cell>
    </view>

    <view class="news-list">
      <template v-if="notice && notice.length > 0">
        <u-notice-bar
          :text="notice"
          duration="5000"
          mode="link"
          bgColor="none"
          color="#ffffff"
          direction="column"
          @click="checkNews"
        />
      </template>
      <skeleton :list="notice" :itemNum="1" rows="0" />
    </view>
  </view>
</template>

<script>
import { getContentApi } from '@/api/common.js'
import skeleton from '../skeleton/skeleton.vue'
export default {
  components: { skeleton },
  props: {
    theme: {
      type: String,
      default: 'blue'
    }
  },
  data() {
    return {
      partIcon: `${this.imgUrl}/villageBusiness/partIcon.png`,
      notice: [],
      alldata: []
    }
  },
  mounted() {
    this.getContentFun()
  },
  methods: {
    checkNews(index) {
      const { alldata } = this
      const id = alldata[index].id
      uni.navigateTo({ url: `/pages/common/newsDetail?id=${id}&title=通知公告` })
    },
    // 查看全部通知公告
    viewList() {
      uni.navigateTo({ url: '/pages/my/noticeList' })
    },
    // =============== API ===============
    // 查询景点详情
    getContentFun() {
      const params = {
        current: 1,
        size: 500,
        modelCode: 'gld-tzgg'
      }
      getContentApi(params).then((res) => {
        this.alldata = res.records
        let arrText = []
        res.records.forEach(ele => {
          arrText.push(ele.content.articleTitle)
        })
        this.notice = arrText
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style>
  page{
    background: #f6f6f6;
  }
  .u-cell__value{
    color: #ffffff !important;
  }
</style>
<style lang="scss" scoped>
  .notice-content{
    background: linear-gradient(90deg, rgba(174, 210, 242, 1) 0%, rgba(56, 135, 246, 1) 100%);
    border-radius: 20rpx;
    >.title-content{
      .u-slot-title{
        color: #ffffff;
        font-size: 32rpx;
        font-weight: 700;
      }
      .u-slot-value{
        color: #ffffff !important;
        font-size: 24rpx;
      }
    }
    .news-list{
      padding: 0rpx 10rpx 20rpx;
    }
  }
</style>