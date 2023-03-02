<template>
  <view class="auditProcess-container">

    <view class="title-content">
      <common-title :title="title"/>
      <view class="step-con">
        <view class="step" v-if="status === 0">
          当前审核步骤：
          <u-tag :text="`${currentStep}/${list.length}`" size="mini" type="primary"></u-tag>
        </view>
        <view v-if="status === 1">已通过审核</view>
        <view v-if="status === 2">已驳回</view>
      </view>
    </view>
    <view class="list-content">
      <view
        class="process-item"
        v-for="(item, index_) in list"
        :key="index_"
      >
        <view class="top">
          <view class="left">

            <view class="avatar-content">
              <u-avatar
                :src="item.avatar"
                :text="item.avatar ? '' : item.auditer ? $getFirstName(item.auditer) : $getFirstName(item.others[0])"
                shape="square"
                size="80rpx"
                bg-color="#438ffe"
                font-size="30rpx"
                mode="aspectFill"
              />
              <view class="yes-icon" v-if="item.auditStatus">
                <image
                  :src="yesImg"
                  mode="scaleToFill"
                  style="width: 30rpx; height: 30rpx;"
                />
              </view>
            </view>

            <view class="info-content">
              <view class="info">{{ item.info }}</view>
              <view class="name">
                {{ item.auditer || item.others[0] }} {{ item.others && item.others.length > 0 && !item.auditer ? `(共${item.others.length}人)` : '' }}
                <view class="status" v-if="item.auditStatus === 2">
                  (已驳回)
                </view>
              </view>
            </view>
          </view>
    
          <view class="date">
            {{ item.date ? item.date : status === 2 ? '' : '审批中' }}
          </view>
        </view>

        <!-- 全部审批人 -->
        <view class="others-content" v-if="item.others && item.others.length > 0 && !item.auditer">
          <view class="others-item" v-for="(other, index) in item.others" :key="index">
            <u-avatar
              :src="item.othersAvatars[index]"
              :text="item.othersAvatars[index] ? '' : $getFirstName(other)"
              shape="square"
              size="60rpx"
              bg-color="#438ffe"
              font-size="24rpx"
              mode="aspectFill"
            />
            <view class="other-name">{{ other }}</view>
          </view>
        </view>
        <!-- 审批备注 -->
        <view class="commont-content" v-if="item.comment">
          审批备注：{{ item.comment || '无' }}
        </view>

      </view>
    </view>
  </view>
</template>

<script>
import commonTitle from '@/components/commonTitle/commonTitle.vue'
export default {
  components: { commonTitle },
  props: {
    title: {
      type: String,
      default: '审批进度'
    },
    list: {
      type: Array,
      default: ()=>[]
    },
    currentStep: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      yesImg: `${this.imgUrl}/villageBusiness/yes.png`
    }
  },
  watch: {
    list(newList) {
      console.log(newList);
    }
  },
  methods: {
    getFirstWrod(str) {
      return str.substring(0, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .auditProcess-container{
    background: #ffffff;
    padding: 30rpx;
    padding-bottom: 0;
    .title-content{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .step-con{
        color: #adaaaa;
        font-size: 28rpx;
        .step{
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

      }
    }
    .list-content{
      margin-top: 50rpx;
      .process-item{
        // display: flex;
        // justify-content: space-between;
        margin-bottom: 50rpx;
        .top{
          display: flex;
          justify-content: space-between;
          .left{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .avatar-content{
              .yes-icon{
                width: 30rpx;
                height: 30rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: -20rpx;
                margin-left: 60rpx;
                position: absolute;
              }
            }
            .info-content{
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              height: 80rpx;
              margin-left: 26rpx;
              margin-bottom: 4rpx;
              .info{
                font-size: 26rpx;
                font-weight: 500;
                color: #999999;
              }
              .name{
                font-size: 30rpx;
                font-weight: bold;
                color: #222222;
                display: flex;
                .status{
                  color: #ef7c3c;
                  margin-left: 10rpx;
                  font-weight: normal;
                  font-size: 26rpx;
                }
              }
            }
          }
          .date{
            font-size: 26rpx;
            font-weight: 500;
            color: #999999;
          }
        }
        .others-content{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 100rpx;
          margin-top: 30rpx;
          flex-wrap: wrap;
          .others-item{
            margin: 0 20rpx 10rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .other-name{
              font-size: 24rpx;
              margin-top: 6rpx;
              color: #adaaaa;
            }
          }
        }
        .commont-content{
          padding-left: 100rpx;
          font-size: 28rpx;
          color: #999999;
          margin-top: 20rpx;
        }
      }
    }
  }
</style>