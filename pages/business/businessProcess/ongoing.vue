<template>
  <view class="ongoing-content">
    <view class="total">
      <view> 
        {{ 
          queryObj.reviewStatus === 0 ? '目前正在办理事项'
          : queryObj.reviewStatus === 1 ? '已通过事项'
          : '已驳回事项'
        }}
      </view>
      <view class="num"> {{ total }}项</view>
    </view>

    <view class="content">
      <view class="item" v-for="(item, index) in ongoingList" :key="item.title">
        <!-- 标题 -->
        <view class="title-content">
          <commonTitle :title="item.templateName" />
          <view class="date">
            {{ $u.timeFormat(item.createTime, 'mm-dd hh:MM') }}
          </view>
        </view>
        <!-- 分割线 -->
        <u-line color="#E5E5E5" :hairline="false" dashed margin="15rpx 0"></u-line>
        <!-- 主题 -->
        <view class="main-content">
          {{ item.applicationName }}

          <view class="download-btn" v-if="item.pdfAddress">
            <u-button @click="downLoad(item.pdfAddress)" icon="download" iconColor="#2979ff" color="#2979ff" text="下载pdf" size="small" plain />
          </view>
         </view>
        <!-- 隐藏的更多信息 -->
        <view class="more-content" v-if="item.isExpend">
          <history :list="item.process" :currentStep="item.stepIndex" :status="queryObj.reviewStatus" />
        </view>

        <!-- 查看更多/收起按钮 -->
        <view class="fold-btn">
          <u-loading-icon mode="circle" v-if="item.loading" text="加载中" size="30rpx" textSize="24rpx" />
          <u--text
            v-if="!item.loading"
            align="center"
            color="#2A82E4"
            size="24rpx"
            iconStyle="font-size: 30rpx; color: #2A82E4;margin-left: 6rpx;"
            :suffixIcon="item.isExpend ? 'arrow-up' : 'arrow-down'"
            :text="item.isExpend ? '收起' : '审批记录'"
            @click="expendFlod(index, item)"
          />
        </view>

      </view>
    </view>

    <empty v-show="ongoingList.length === 0 && loadmore === 'nomore'" />
    <view class="loadmore" v-if="!(loadmore =='nomore' && ongoingList.length === 0)">
      <u-loadmore loadingIcon="semicircle" :status="loadmore" />
    </view>
  </view>
</template>

<script>
import commonTitle from '@/components/commonTitle/commonTitle.vue'
import Empty from '@/components/empty/empty.vue';
import history from './history.vue'
import { getOngoingApi, reviewApi } from '@/api/business/business.js';
export default {
  components: { commonTitle, Empty, history },
  data(){
    return {
      loadmore: 'loading',
      total: 0,
      queryObj: {
        current: 1,
        size: 10,
        reviewStatus: 0
      },

      finishImg: `${this.imgUrl}/business/process/finish.png`,
      ongoingList: []

    }
  },
  mounted() {
    this.getOngoingFun()
  },
  methods: {
    // 展开/收起 更多
    expendFlod(index) {
      const id = this.ongoingList[index].id
      const isExpend = this.ongoingList[index].isExpend
      const process = this.ongoingList[index].process

      if(!isExpend && process.length === 0) {
        this.ongoingList[index].loading = true
        this.ongoingList[index].process = []

        this.reviewFun(index, id)
      }else{
        this.ongoingList[index].isExpend = !isExpend
      }
    },
    loadMore(reviewStatus) {
      if(this.loadmore === 'nomore') {
        return
      }
      this.queryObj.current++
      this.getOngoingFun(reviewStatus)
    },

    // 下载pdf[按钮]
    downLoad(pdfAddress) {
      console.log(pdfAddress);
      uni.downloadFile({
        url: pdfAddress,
        success: (res) => {
          if (res.statusCode === 200) {
            console.log(res.tempFilePath);
            console.log('下载成功');
            var filePath = res.tempFilePath;
            uni.openDocument({
              filePath: filePath,
              fileType: 'pdf',
              showMenu: true,
              success: function (res) {
                console.log('打开文档成功');
              }
            });
          }else{
            uni.$u.toast('下载失败')
          }
        }
      });
    },

    // =============== API ===============
    // 查询正在办理中的事项(分页)
    getOngoingFun(reviewStatus = 0) {
      this.queryObj.reviewStatus = reviewStatus
      this.loadmore = 'loading'
      getOngoingApi(this.queryObj).then((res) => {
        let arr = []
        res.records.map(ele => {
          let obj = Object.assign({}, ele, {
            isExpend: false,
            loading: false,
            process: []
          })
          arr.push(obj)
        });

        if(res.records.length === 0) {
          this.loadmore = 'nomore'
        }else{
          this.ongoingList = this.ongoingList.concat(arr)
          this.loadmore = 'loadmore'
        }
        this.total = res.total
      }).catch(err => {
        this.loadmore = 'nomore'
      })
    },

    // 初始化审核进度, 并获取当前审核到第几步[方法]
    initAuditProcessList(reviews) {
      const { proveData, allData } = this
      var arr = []

      // 将默认的第一步发起填上
      let obj = {
        avatar: allData.creatorInfo.avatar,
        info: '发起人',
        auditer: allData.creatorInfo.realName,
        date: allData.createTime,
        auditStatus: true
      }
      arr.push(obj)
      reviews.forEach((ele, index) => {
        let obj = {
          avatar: ele.reviewerAvatar,
          info: ele.reviewerOrgName || '审批人',
          auditer: ele.reviewerName,
          others: ele.reviewerNames,
          othersAvatars: ele.reviewerAvatars,
          date: ele.reviewTime,
          auditStatus: ele.comment ? 2 : ele.reviewTime,
          comment: ele.comment,
        }
        arr.push(obj)
      })
      this.auditProcessList = arr

      
    },
    

    // 查询办理的时间线
    reviewFun(index, id) {
      reviewApi(id).then((res) => {
        const allData = res
        const reviews = res.reviews
        var arr = []

        // 将默认的第一步发起填上
        let obj = {
          avatar: allData.creatorInfo.avatar,
          info: '发起人',
          auditer: allData.creatorInfo.realName,
          date: allData.createTime,
          auditStatus: true
        }
        arr.push(obj)
        reviews.forEach((ele, index) => {
          let obj = {
            avatar: ele.reviewerAvatar,
            info: ele.reviewerOrgName || '审批人',
            auditer: ele.reviewerName,
            others: ele.reviewerNames,
            othersAvatars: ele.reviewerAvatars,
            date: ele.reviewTime,
            auditStatus: ele.comment ? 2 : ele.reviewTime,
            comment: ele.comment,
          }
          arr.push(obj)
        })
        // 获取当前审核步骤进行到第几步了
        for (let i = 0; i < reviews.length; i++) {
          const ele = reviews[i];
          if(!ele.reviewTime) {
            this.ongoingList[index].stepIndex = i + 1
            this.stepIndex = i + 1
            break
          }
        }

        console.log(arr);
        // this.auditProcessList = arr

        this.ongoingList[index].process = arr
        setTimeout(() => {
          this.ongoingList[index].isExpend = true
          this.ongoingList[index].loading = false
        }, 500)
      }).catch(err => {
        this.ongoingList[index].loading = false
      })
    },
  }
}
</script>

<style>
  ::v-deep .u-steps-item__wrapper{
    background: none !important;
  }
  ::v-deep .u-steps-item__line{
    width: 8rpx;
    /* height: 180px; */
    background: rgba(212, 230, 250, 1) !important;
    left: 16rpx;
    top: 20rpx;
  }
</style>
<style lang="scss" scoped>
  .ongoing-content{
    .total{
      width: 680rpx;
      height: 76rpx;
      background: linear-gradient(90deg, rgba(42, 130, 228, 1) 0%, rgba(42, 130, 228, 0) 100%);
      border-radius: 8rpx;
      color: #FFFFFF;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 24rpx;
      font-size: 24rpx;
      .num{
        font-size: 36rpx;
        font-weight: 700;
        margin-left: 25rpx;
      }
    }
    .content{
      margin-top: 36rpx;
      .item{
        padding: 28rpx 30rpx 14rpx;
        background: linear-gradient(360deg, rgba(255, 255, 255, 1) 0%, rgba(235, 244, 255, 1) 100%);
        border-radius: 20rpx;
        margin-bottom: 56rpx;
        .title-content{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5rpx 0;
          .date{
            font-size: 24rpx;
            color: #817e7e;
          }
        }
        .main-content{
          color: rgba(56, 56, 56, 1);
          font-size: 30rpx;
          // line-height: 45rpx;
          padding: 10rpx 0;
          .download-btn{
            padding-top: 20rpx;
          }
          
          .reviewers{
            .reviewers-title{
              font-size: 28rpx;
              font-weight: bold;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .date{
                color: rgba(166, 166, 166, 1);
                font-size: 22rpx;
                margin-top: 6rpx;
              }
            }
            .list-content{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              flex-wrap: wrap;
              margin-top: 15rpx;
            }
            .reviewers-item{
              margin-right: 30rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              .name{
                color: #817e7e;
                font-size: 24rpx;
                margin-top: 6rpx;
              }
            }
          }
        }
        .look-more{
          margin-top: 16rpx;
        }
        .more-content{
          margin-top: 30rpx;
          .step-container{
            margin-top: 30rpx;
            .finish{
              border-left: 8rpx #D4E6FA solid !important;
              &::before{
                content: '';
                display: block;
                width: 18rpx !important;
                height: 18rpx !important;
                border-radius: 50%;
                background: #FFFFFF !important;
                margin-left: -42rpx;
                border: 6rpx solid rgba(143, 192, 247, 1);
              }
            }
            .step-content{
              padding-left: 25rpx;
              border-left: 8rpx #2A82E4 solid;
              padding-bottom: 40rpx;
              &:last-child{
                padding-bottom: 0 !important;
              }
              &::before{
                content: '';
                display: block;
                width: 28rpx;
                height: 28rpx;
                border-radius: 50%;
                background: #2A82E4;
                margin-left: -42rpx;
              }
              .main-content{
                background: #ffffff;
                // background: linear-gradient(90deg, rgba(42, 130, 228, .2) 0%, rgba(42, 130, 228, 0.01) 100%);
                padding: 22rpx;
                border-radius: 8rpx;
                margin-top: -24rpx;
                .step-title{
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-start;
                  .audit-content{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    .name{
                      margin-bottom: 10rpx;
                    }
                  }
                  .title{
                    color: rgba(56, 56, 56, 1);
                    font-size: 26rpx;
                    font-weight: bold;
                  }
                  .date{
                    color: rgba(166, 166, 166, 1);
                    font-size: 22rpx;
                    margin-top: 6rpx;
                  }
                }
                .step-content-main{
                  margin: 12rpx 0;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  color: rgba(128, 128, 128, 1);
                  font-size: 22rpx;
                  .desc{
                    flex: 1;
                    padding-right: 20rpx;
                    line-height: 45rpx;
                    letter-spacing: 1rpx;
                    font-size: 28rpx;
                  }
                }
                
              }
            }
          }
        }

        .fold-btn{
          padding: 20rpx 0 10rpx;
        }

      }
    }

    .loadmore{
      margin-bottom: 50rpx;
    }
    .finish-img{
      position: absolute;
    }
  }
</style>