<template>
  <view
    class="news-item"
    :class="{
      'villageOpenStyle': newsType === 'villageOpen',
    }"
    :style="{
      backgroundImage: newsType === 'villageOpenStyle' ? '' : newsType === 'partyOpen' ? `url(${partyOpenBgImg})` : `url(${financialOpenBgImg})`,
    }"
    @click="goToDetail(news.id)"
  >
    <!-- 新闻标题 -->
    <view class="title-content">
      <view style="width: 80%;">
        <u--text :text="news.content.articleTitle" :lines="1" :color="newsListObj.titleColor" size="28rpx" bold block></u--text>
      </view>
      <u--text suffixIcon="arrow-right" align="right" color="#A6A6A6" size="24rpx" iconStyle="font-size: 24rpx; margin: 0 0 -10rpx 10rpx;" text="详情"></u--text>
    </view>

    <!-- 分割线 -->
    <u-line dashed color="#E5E5E5" margin="25rpx 0" :hairline="false"></u-line>
    
    <!-- 新闻主体 -->
    <view class="news-content">
      <view class="feed">
        <u--text :text="news.content.articleIntroduction" :lines="3" color="#383838" size="26rpx" lineHeight="40rpx"></u--text>
      </view>
      <!-- <u-tag v-if="newsType !== 'partyOpen'" style="margin-left: 20rpx;" text="#农种家庭" :bgColor="newsListObj.tipColor" :borderColor="newsListObj.tipColor" size="mini"></u-tag> -->
    </view>

    <!-- 底部日期和左侧信息 -->
    <view class="date-content">
      <view v-if="newsType === 'villageOpen'" />
      <!-- <view class="left" v-if="newsType === 'financialOpen'">
        <u--text :text="news.code" :lines="1" color="#00BAAD" size="22rpx" />
      </view> -->

      <view class="party-left">
        <view class="top">{{ news.type }}</view>
        <view class="bottom"></view>
      </view>

      <view
        class="right"
        :class="{
          'partyOpenDateStyle': newsType === 'partyOpen'
        }"
      >
        <view class="item">
          <u-icon top="2rpx" name="clock" color="#C4C4C4" size="24rpx"></u-icon>
          <view class="name">{{ news.content.articleDate }}</view>
        </view>
        <!-- <view class="item">
          <u-icon top="2rpx" name="eye" color="#C4C4C4" size="24rpx"></u-icon>
          <view class="name">{{ news.views || 98 }}</view>
        </view> -->
      </view>
    </view>
  </view>
</template>
 
<script>
export default {
  props: {
    news: {
      type: Object,
      default: ()=>{}
    },
    newsListObj: {
      type: Object,
      default: ()=>{}
    },
    newsType: {
      type: String,
      default: 'villageOpen'
    }
  },
  data() {
    return {
      financialOpenBgImg: `${this.imgUrl}/homePage/threeOpen/financialOpenBg.png`,
      partyOpenBgImg: `${this.imgUrl}/homePage/threeOpen/partyOpenBg.png`,
    }
  },
  methods: {
    // 跳转详情页面
    goToDetail(id) {
      uni.navigateTo({ url: `/pages/index/threeOpen/newsDetail?id=${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>

  .villageOpenStyle{
    box-shadow:inset -8rpx -10rpx 40rpx rgba(90, 157, 232, 0.21);
    background: #ffffff;
  }
  .news-item{
    background-size: 100% 100%;
    border-radius: 20rpx;
    padding: 24rpx 32rpx 20rpx;
    margin-bottom: 32rpx;
    .title-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .news-content{
      display: flex;
      justify-content: space-between;
    }
    .date-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12rpx;
      .left{
        color: #00BAAD;
        font-size: 22rpx;
      }
      .party-left{
        color: rgba(56, 56, 56, 1);
        font-size: 22rpx;
        font-weight: 400;
        .bottom{
          margin-top: -15rpx;
          width: 100%;
          height: 20rpx;
          background: linear-gradient(90deg, rgba(255, 195, 0, .4) 0%, rgba(255, 195, 0, 0) 100%);
        }
      }
      .right{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .item{
          display: flex;
          justify-content: center;
          align-items: center;
          &:last-child{
            margin-left: 20rpx;
          }
          .name{
            color: #A6A6A6;
            font-size: 22rpx;
            margin-left: 10rpx;
          }
        }
      }
      .partyOpenDateStyle{
        margin-right: 60rpx;
      }
    }
  }
</style>