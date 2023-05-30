<template>
  <view class="news-detail-content">

    <template v-if="JSON.stringify(newsObj) !== '{}'">
      <view class="news-title">
        {{ newsObj.articleTitle || '' }}
      </view>
      <view class="news-info">
        <u-avatar
          :text="subName(newsObj.articlePeople)"
          fontSize="18"
          randomBgColor
          size="85rpx"
        />
        <view class="info">
          <view class="author"> {{ newsObj.articlePeople || '' }} </view>
          <view class="date-content">
            <u-icon name="clock" color="#a6a6a6" size="16"></u-icon>
            <view class="date">{{ newsObj.articleDate || '' }}</view>
          </view>
        </view>
      </view>

      <u-parse
        :tagStyle="style"
        :content="newsObj.articleContent"
      />
    </template>

    <skeleton
      :list="newsObj"
      :itemNum="1"
      rows="1"
      avatar
      avatarShape="circle"
      avatarSize="40"
    />
    <skeleton
      :list="newsObj"
      :itemNum="1"
      rows="15"
    />
  </view>
</template>

<script>
import { getContentDetailApi } from '@/api/common.js'
export default {
  onLoad: function (option) {
    const { id, title } = option
    if(title) {
      uni.setNavigationBarTitle({ title: title })
    }
    this.getContentDetailFun(id)
	},
  data() {
    return {
      newsObj: {},
      articleContent: '',
      style: {
        p: 'color: #383838; font-size:28rpx; line-height: 50rpx;',
        img: 'width: 100% !important;'
      }
    }
  },
  methods: {
    // 截取发表人第一个字
    subName(str) {
      if(str && str.length > 0) {
        return str.substring(0, 1)
      }
    },

    // =============== API ===============
    getContentDetailFun(id) {
      getContentDetailApi(id).then((res) => {
        console.log(res)
        this.newsObj = res.content
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .news-detail-content{
    padding: 23rpx 30rpx;
    .news-title{
      color: #383838;
      font-size: 36rpx;
      font-weight: 700;
    }
    .news-info{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 30rpx 0;
      .info{
        margin-left: 20rpx;
        .author{
          color: rgba(56, 56, 56, 1);
          font-size: 28rpx;
          padding-left: 10rpx;
        }
        .date-content{
          
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 8rpx;
          padding-left: 10rpx;
          .date{
            color: #a6a6a6;
            font-size: 22rpx;
            margin-left: 8rpx;
          }
        }
      }
    }

  }
</style>