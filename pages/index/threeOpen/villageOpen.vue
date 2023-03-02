<template>
  <view class="village-open-content">
    <view class="top-bg" :style="{backgroundImage: `url(${bgImg})`}" />
    <view class="news-list">
      <news-list :list="list" :newsListObj="newsListObj" newsType="villageOpen"/>
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
      loading: false,
      bgImg: `${this.imgUrl}/homePage/threeOpen/topBg1.png`,
      newsListObj: {
        titleColor: "#2A82E4",
        tipColor: "#FF8D1A"
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
      this.loading = true
      const params = {
        current: 1,
        size: 500,
        modelCode: 'gzd-sy-swgk',
        // content: 'newClass:1569565256396562433,articleIs:true',
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
