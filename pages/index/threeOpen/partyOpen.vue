<template>
  <view class="village-open-content">
    <view class="top-bg" :style="{backgroundImage: `url(${bgImg})`}" />
    <view class="news-list">
      <news-list :list="list" :newsListObj="newsListObj" newsType="partyOpen"/>
      <view class="skeleton">
        <skeleton
          :list="list"
          :itemNum="3"
          rows="1"
        />
      </view>
    </view>

  </view>
</template>

<script>
import newsList from './components/newsList.vue'
import { getContentApi } from '@/api/common.js'
export default {
  components: { newsList },
  data() {
    return {
      bgImg: `${this.imgUrl}/homePage/threeOpen/topBg3.png`,
      newsListObj: {
        titleColor: "#D43030",
        tipColor: "#2a82e4"
      },
      list: []
    }
  },
  mounted() {
    this.getContentFun()
  },
  methods: {
    // =============== API ===============
    // 查询景点详情
    getContentFun() {
      const params = {
        current: 1,
        size: 500,
        modelCode: 'gzd-sy-swgk',
        // content: 'newClass:1569565208254341121,articleIs:true',
      }
      getContentApi(params).then((res) => {
        this.list = res.records
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style>
  page{
    background: #f6f6f6 ;
  }
</style>
<style lang="scss" scoped>
  .village-open-content{
    .top-bg{
      width: 100%;
      height: 330rpx;
      background-size: 106% 100%;
      background-position: -20rpx -40rpx;
      background-repeat: no-repeat;
    }
    .news-list{
      margin-top: -120rpx;
    }
    .skeleton{
      padding: 0 30rpx;
      margin-top: -150rpx;
    }
  }
</style>
