<template>
  <view class="notice-list">
    <view class="list">
      <view class="item"
        v-for="item in list"
        :key="item.id"
        @click="checkNews(item)"
      >
        <view class="title">
          {{ item.content.articleTitle }}
        </view>
        <view class="top">
          <view class="people">
            <u-icon name="account" color="#9d9d9d" size="16" />
            <view class="inner">{{ item.content.articlePeople }}</view>
          </view>
          <view class="date">
            <u-icon name="clock" color="#9d9d9d" size="16" />
            <view class="inner">{{ item.content.articleDate }}</view>
          </view>
        </view>
        
      </view>
    </view>

    <empty v-show="list.length === 0 && loadmore === 'nomore'" />
    <view class="loadmore" v-if="!(loadmore =='nomore' && list.length === 0)">
      <u-loadmore loadingIcon="semicircle" :status="loadmore" />
    </view>
  </view>
</template>

<script>
import { getContentApi } from '@/api/common.js'
import empty from '@/components/empty/empty.vue'
export default {
  components: { empty },
  data() {
    return {
      loadmore: 'loading',
      list: [],
      queryObj: {
        current: 1,
        size: 10,
        modelCode: 'gld-tzgg'
      }
    }
  },
  mounted() {
    this.getContentFun()
  },
  methods: {
    checkNews({ id }) {
      uni.navigateTo({ url: `/pages/index/threeOpen/newsDetail?id=${id}&title=通知公告` })
    },
    loadMore() {
      if(this.loadmore === 'nomore') {
        return
      }
      this.queryObj.current++
      this.getContentFun()
    },
    // =============== API ===============
    // 查询景点详情
    getContentFun() {
      getContentApi(this.queryObj).then((res) => {
        this.list = this.list.concat(res.records)
        if(res.total === this.list.length) {
          this.loadmore = 'nomore'
        }else{
          this.loadmore = 'loadmore'
        }
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
</style>
<style lang="scss" scoped>
  .notice-list{
    .list{
      padding: 30rpx;
      .item{
        background: #ffffff;
        border-radius: 20rpx;
        margin-bottom: 30rpx;
        padding: 30rpx;
        .top{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .people, .date{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 24rpx;
            color: #9d9d9d;
            .inner{
              padding-left: 10rpx;
            }
          }
        }
        .title{
          margin-bottom: 25rpx;
          font-size: 28rpx;
          padding: 10rpx 0;
        }
      }
    }
  }
</style>