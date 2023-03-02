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
      <view class="news-content" v-html="articleContent" />
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
import Skeleton from '@/components/skeleton/skeleton.vue'
export default {
  components: { Skeleton },
  onLoad: function (option) {
    this.loading = true
    this.getContentDetailFun(option.id)
    if(option.title) {
      uni.setNavigationBarTitle({ title: option.title })
    }
	},
  data() {
    return {
      loading: false,
      newsObj: {},

      articleContent: ''
    }
  },
  mounted() {
    console.log(uni.getWindowInfo().screenWidth);
  },
  methods: {
    subName(str) {
      if(str && str.length > 0) {
        return str.substring(0, 1)
      }
    },
    // 将富文本中的图片宽度设置为100%
    formatRichText(html) { //控制小程序中图片大小
      const screenWidth = uni.getWindowInfo().screenWidth - 30
      let newContent = ''
      if (typeof(html) == 'string') { //检测值为字符串才能进行replace操作
        newContent = html.replace(/<img[^>]*>/gi,
        function(match) {
          match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
          match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
          match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
          return match;
        });
        newContent = newContent.replace(/style="[^"]+"/gi,
        function(match) {
          match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
          return match;
        });
        newContent = newContent.replace(/<br[^>]*\/>/gi, '');
        newContent = newContent.replace(/\<img/gi, `<img style="width:${screenWidth}px;height:auto;display:inline-block;margin:10rpx auto;"`);
        // newContent = newContent.replace(/\<img/gi, `<img style="width:100%;height:auto;display:inline-block;margin:10rpx auto;"`);
        return newContent;
      }
    },

    // =============== API ===============
    getContentDetailFun(id) {
      this.loading = true
      getContentDetailApi(id).then((res) => {
        this.$nextTick(() => {
          if (!uni.getStorageSync('token')){
            this.newsObj = res.data.content
            this.articleContent = this.formatRichText(res.data.content.articleContent)
          }else{
            this.newsObj = res.content
            this.articleContent = this.formatRichText(res.content.articleContent)
          }
        })
      }).catch(err => {
        this.loading = false
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

    .news-content{
      color: rgba(56, 56, 56, 1);
      font-size: 28rpx;
      font-weight: 400;
      line-height: 50rpx;
    }
  }
</style>