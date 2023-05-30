<template>
  <view class="threeOpenNews-content">
    <view class="title" :style="{backgroundImage: `url(${bgImg})`}">
      三务公开栏目
    </view>

    
      <view class="news-list" :style="{ height: isExpend ? 'auto' : '300rpx' }">
        <view class="news-item" v-for="(item, index) in news" :key="item.id"
          @click="enterDetail(item)"
        >
          <view class="left">
            <text class="num"> {{ index + 1 }}. </text>
            <view class="title"> {{ item.content && item.content.articleTitie }} </view> 
          </view>
          <!-- <text class="date"> 
            <u-tag v-if="item.content && item.content.newClass === '1569565256396562433'" text="村务公开" size="mini" bgColor="#3bcb9f" borderColor="#3bcb9f" />
            <u-tag v-if="item.content && item.content.newClass === '1569565208254341121'" text="党建公开" size="mini" bgColor="#ff7456" borderColor="#ff7456" />
            <u-tag v-if="item.content && item.content.newClass === '1569565296200507394'" text="财务公开" size="mini" bgColor="#ffa246" borderColor="#ffa246" />
          </text>  -->
        </view>
        <skeleton
          :list="news"
          :itemNum="1"
          rows="3"
        />
      </view>

      <template v-if="news && news.length > 0">
        <!-- 查看更多 -->
        <view class="fold-btn">
          <u-text
            align="center"
            color="#2A82E4"
            size="24rpx"
            iconStyle="font-size: 30rpx; color: #2A82E4;margin-left: 6rpx;"
            :suffixIcon="isExpend ? 'arrow-up' : 'arrow-down'"
            :text="isExpend ? '收起' : '展开'"
            @click="expendFlod"
          />
        </view>
      </template>

  </view>
</template>

<script>
import { getContentThreeApi } from '@/api/common.js'
import skeleton from '../skeleton/skeleton.vue'
export default {
  components: { skeleton },
  data() {
    return {
      isExpend: false,
      bgImg: `${this.imgUrl}/villageBusiness/titleBg.png`,
      news: null
    }
  },
  mounted() {
    this.getContentThreeFun()
  },
  methods: {
    // 展开/收起 更多
    expendFlod() {
      this.isExpend = !this.isExpend
    },
    enterDetail({ id }) {
      uni.navigateTo({ url: `/pages/common/newsDetail?id=${id}` })
    },
    // =============== API ===============
    getContentThreeFun() {
      const params = {
        current: 1,
        size: 100,
        modelCode: 'gzd-sy-swgk'
      }
      getContentThreeApi(params).then((res) => {
        this.news = res.records
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .threeOpenNews-content{
    >.title{
      width: 250rpx;
      height: 64rpx;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: 700;
      padding-left: 22rpx;
    }
    .news-list{
      background: #ffffff;
      border-radius: 0 20rpx 0 0;
      padding: 15rpx 30rpx;
      overflow: hidden;
      .news-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1rpx solid #E3E3E3;
        padding: 16rpx 0;
        &:first-child{
          border-top: none;
        }
        .left{
          display: flex;
          justify-content: flex-start ;
          align-items: center;
          .num{
            font-size: 28rpx;
            color: #ff901f;
            font-weight: bold;
          }
          .title{
            font-size: 28rpx;
            color: #383838;
            max-width: 580rpx;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
            margin-left: 4rpx;
          }
        }
        .date{
          font-size: 24rpx;
          color: #A6A6A6;
        }
      }

    }
    .look-more, .fold-btn{
      padding: 14rpx 0 26rpx;
      background: #ffffff;
      border-radius: 0 0 20rpx 20rpx;
    }

    .loading{
      margin-top: 70rpx;
    }
  }
</style>