<template>
  <view class="help-container">
    <view class="main-content">
      <view class="big-item" v-for="(item) in bigList" :key="item.name">
        <view class="left">
          <view class="icon" :style="{background: item.color}">
            <u-icon :name="item.icon" color="#ffffff" size="24" />
          </view>
          <view class="name">{{ item.name }}</view>
        </view>

        <view class="right">
          <view
            class="right-item"
            v-for="(item_, index)  in item.list"
            :key="index"
            @click="goToDetail(item_)"
          >
            <view class="name">
              {{ item_.name }}
            </view>
            <u-icon name="arrow-right" color="#A6A6A6" size="14" bold />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getContentApi } from '@/api/common.js'
export default {
  data() {
    return {
      bigList: [
        {
          icon: 'search',
          color: '#886CE2',
          name: '使用手册',
          list: []
        },{
          icon: 'question',
          color: '#F36D4F',
          name: '常见问题',
          list: []
        },
        // {
        //   icon: 'error',
        //   color: '#FFA36A',
        //   name: '功能故障',
        //   list: [
        //     {
        //       name: '如何进行上报'
        //     },{
        //       name: '如何修改个人资料页'
        //     },{
        //       name: '更多问题'
        //     }
        //   ]
        // },
        // {
        //   icon: 'more-dot-fill',
        //   color: '#76D590',
        //   name: '意见反馈',
        //   list: [
        //     {
        //       name: '如何进行上报'
        //     },{
        //       name: '如何修改个人资料页'
        //     },{
        //       name: '更多问题'
        //     }
        //   ]
        // }
      ]
    }
  },
  mounted() {
    this.getContentFun('help', 0)
    this.getContentFun('question', 1)
  },
  methods: {
    goToDetail(data) {
      const { id, name } = data
      if(!id) {
        uni.$u.toast('暂无详情~')
        return
      }
      uni.navigateTo({ url: `/pages/index/threeOpen/newsDetail?id=${id}&title=${name}` })
    },
    // =============== API ===============
    // 查询景点详情
    getContentFun(code, index) {
      const params = {
        current: 1,
        size: 500,
        modelCode: code,
      }
      getContentApi(params).then((res) => {
        let arr = []
        res.records.forEach(ele => {
          let obj = {
            id: ele.id,
            name: ele.content.articleTitle
          }
          arr.push(obj)
        })
        this.bigList[index].list = arr
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
  .help-container{
    padding: 50rpx 34rpx;
    .main-content{
      border-radius: 10rpx;
      background: linear-gradient(0deg, #FFFFFFFF 0%, #EBF4FFFF 100%);
      .big-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #E3E3E3;
        &:last-child{
          border-bottom: none;
        }
        .left{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          flex: .3;
          padding: 20rpx 0;
          .icon{
            width: 72rpx;
            height: 72rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
          }
          .name{
            font-size: 30rpx;
            color: #383838;
            margin-top: 25rpx;
            font-weight: bold;
          }
        }
        .right{
          flex: .7;
          border-left: 2rpx solid #E3E3E3;
          .right-item{
            border-bottom: 2rpx solid #E3E3E3;
            padding: 30rpx 26rpx;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .name{
              margin-right: 20rpx;
              color: #808080;
              font-size: 28rpx;
              text-align: right;
            }

            &:last-child{
              border-bottom: none;
            }
          }
        }
      }
    }
  }
</style>