<template>
  <view class="villageBusiness-content">
    <view class="top-bg" :style="{backgroundImage: `url(${bgImg})`}"/>
    <!-- 通知公告 -->
    <view class="notice">
      <notice />
    </view>

    <!-- 快捷方式 -->
    <!-- <view class="shortcut-list">
      <view class="content">
        <view class="shortcut-item" v-for="item in list" :key="item.name" @click="goToPage(item)">
          <image :style="{width: '72rpx', height: '72rpx'}" mode="aspectFit" :src="item.icon" />
          <view class="name">{{ item.name }}</view>
        </view>
      </view>
    </view> -->

    <view class="threeOpenNews">
      <three-open-news />
    </view>

    <view class="news-content">
      <view class="content">
        <view class="title">
          <common-title title="乡情圈" />
        </view>
        <news-card v-for="news in newsList" :key="news.id" :news="news" />
        <skeleton
          :list="newsList"
          :itemNum="3"
          rows="2"
          hasPad
        />
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
      @close="actionsShow = false"
    />
  </view>
</template>

<script>
import notice from '@/components/notice/notice.vue'
import threeOpenNews from '@/components/threeOpenNews/threeOpenNews.vue'
import newsCard from '@/components/newsCard/newsCard'
import CommonTitle from '@/components/commonTitle/commonTitle.vue'
import { getContentApi } from '@/api/common.js'
import Skeleton from '@/components/skeleton/skeleton.vue'
export default {
  components: { notice, threeOpenNews, newsCard, CommonTitle, Skeleton },
  data() {
    return {
      bgImg: `${this.imgUrl}/villageBusiness/villageBusiness.png`,
      newsList: [],
      actionsShow: false,
      actionsTitle: '',
      actionsList: [],
      list: [
        {
          name: '证明办理',
          icon: `${this.imgUrl}/villageBusiness/a.png`,
          navigate: '/pagesVillageBusiness/prove/proveHome'
        },{
          name: '助学申请',
          icon: `${this.imgUrl}/villageBusiness/b.png`,
          actionsList: [
            {
              name:'公司职工子女助学申请',
              navigate: '/pagesVillageBusiness/studyHelp/staffForm?templateCode=aid_stu_staff_application_and_investigation&title=公司职工子女助学申请',
            },
            {
              name:'西易籍村民子弟助学申请',
              navigate: '/pagesVillageBusiness/studyHelp/villagerForm?templateCode=aid_stu_villager_application_and_investigation&title=西易籍村民子弟助学申请',
            }
          ]
        }
      ],
    }
  },
  mounted() {
    this.getContentFun()
  },
  methods: {
    // 跳转页面
    goToPage(item) {
      const url = item.navigate
      if(item.actionsList) {
        this.actionsTitle = item.name
        this.actionsList = item.actionsList
        this.actionsShow = true
      }else{
        uni.navigateTo({ url })
      }
    },
    // 点击action-sheet选项
    selectClick(data) {
      uni.navigateTo({ url: data.navigate })
    },

    // =============== API ===============
    // 查询景点详情
    getContentFun() {
      const params = {
        current: 1,
        size: 500,
        modelCode: 'gzd-news',
      }
      getContentApi(params).then((res) => {
        this.newsList = res.records
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>
<style>
  page{
    background: #f6f6f6;
  }
</style>
<style lang="scss" scoped>
  .villageBusiness-content{
    .top-bg{
      height: 360rpx;
      background-size: 100% 100%;
    }
    .notice{
      padding: 0 34rpx;
      margin-top: -60rpx;
    }
    .shortcut-list{
      padding: 34rpx 34rpx 0;
      .content{
        border-radius: 20rpx;
        background: #ffffff;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-bottom: 34rpx;
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
    .threeOpenNews{
      padding: 36rpx 34rpx;
    }
    .news-content{
      // padding: 10rpx 34rpx;
      padding: 34rpx;
      .content{
        background: linear-gradient(180deg, rgba(235, 244, 255, 1) 0%,  rgba(255, 255, 255, 1) 100%);
        border-radius: 20rpx;
        .title{
          padding: 30rpx 30rpx 0;
        }
      }
    }
  }
</style>