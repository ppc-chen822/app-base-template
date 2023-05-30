<template>
	<view class="page-container">
   <view class="top" :style="{backgroundImage: `url(${bgImg})`}">
   	<view class="title">
      <u-text text="消息列表" bold size="36rpx" color="#FFFFFF" />
   	</view>
   </view>
   <view class="content">
   	<u-swipe-action>
      <view v-for="item in list" :key="item.id" class="item">
        <u-swipe-action-item :options="options" @click="toolsClick($event, item)">
          <view class="inner-content" @click="messageClick(item)">
            <view class="icon">
              <image class="img" :src="getMessageType(item.messageCode) === 'message' ? imgB : imgA" mode="" />
              <view class="num" v-if="!item.readed">
                <u-badge
                  is-center
                  isDot
                  bgColor="#F74848"
                />
              </view>
            </view>
            <view class="info">
              <view class="title-content">
                <view class="name">{{ item.creatorRealName }}</view>
                <view class="time">{{ $u.timeFrom(new Date(item.createTime).getTime()) }}</view>
              </view>
              <view class="detail">
                {{ item.messageContent }}
              </view>
            </view>
          </view>
        </u-swipe-action-item>
      </view>
   	</u-swipe-action>
   </view>

   <u-loading-page :loading="loading" />
   <view class="loadmore" v-if="!(loadmore =='nomore' && list.length === 0)">
      <u-loadmore loadingIcon="semicircle" :status="loadmore" />
    </view>
    <Empty v-show="list.length === 0 && loadmore === 'nomore'" />
    <!-- <fab /> -->
	</view>
</template>

<script>
import { getMessageApi, readMessageApi, delMessageApi } from '@/api/message.js'
import Empty from '@/components/empty/empty.vue';
import Fab from '@/components/fab/fab.vue';
	export default {
  components: { Empty, Fab },
  data() {
   	return {
      loadmore: 'loading',
      loading: false,
      websocketObj: null,
      bgImg:`${this.imgUrl}/message/top.png`,

      imgA: `${this.imgUrl}/message/unhandle.png`,
      imgB: `${this.imgUrl}/message/system.png`,
      imgC: `${this.imgUrl}/message/work.png`,
      imgD: `${this.imgUrl}/message/community.png`,
      imgE: `${this.imgUrl}/message/temporary.png`,

      options: [
        {
          text: '已读',
          style: {
            backgroundColor: '#3c9cff'
          }
        }, {
          text: '删除',
          style: {
            backgroundColor: '#f56c6c',
          }
        }
      ],

      list: [],
      queryObj: {
      	current: 1,
      	size: 10,
        messageCode: 'system:user:message'
      },
   	};
   },
   onShow() {
   	this.loadList()
   },
   onReachBottom() {
   	console.log('滑动到底 加载更多');
   	if(this.loadmore === 'nomore') {
      return
   	}
   	this.queryObj.current++
   	this.getMessageFun()
   },
   methods:{
    loadList() {
      this.queryObj.current = 1
      this.list = []
      this.getMessageFun()
    },
   	// 通过messageCode判断消息类型
   	getMessageType(messageCode) {
      if(messageCode === 'system:user:message') {
      	return 'message'
      }else {
      	return 'business'
      }
   	},
   	// 点击消息跳转到相关页面
		messageClick(itemData){
		  const { messageCode } = itemData
		  let url = ''
		  if(messageCode === 'system:user:message') {
		    url = '/pages/business/businessProcess/businessProcess'
		    uni.navigateTo({ url })
				this.readMessageFun(itemData)
		  }else{
        uni.$u.toast('请登录管理端进行查看')
      }
		},

    // 修改或删除
    toolsClick({ index }, data) {
      switch (index) {
        case 0:
          this.readMessageFun(data)
        break;
        case 1:
          uni.showModal({
            title: '删除',
            content: '确定删除该条消息吗？',
            success: (res) => {
              if (res.confirm) {
                this.delMessageFun(data.id)
              }
            }
          });
        break;
      }
    },
   	// =============== API ===============
   	// 获取消息列表
   	getMessageFun () {
      this.loadmore = 'loading'
      getMessageApi(this.queryObj).then((res) => {
        this.list = this.list.concat(res.records)
        if(res.total === this.list.length) {
          this.loadmore = 'nomore'
        }else{
          this.loadmore = 'loadmore'
        }
      }).catch(err => {
        this.loadmore = 'nomore'
        console.log(err);
      })
    },
    // 已读消息
    readMessageFun(itemData) {
			const { readed, id } = itemData
      if(readed) { return }
      const params = { ids: [ id ] }
      readMessageApi(params).then((res) => {
        this.loadList()
      }).catch(err => {
        console.log(err);
      })
    },
    // 删除消息
    delMessageFun(id) {
      const params = { ids: [ id ] }
      delMessageApi(params).then((res) => {
        this.loadList()
      }).catch(err => {
        console.log(err);
      })
    },
   }
	}
</script>

<style>
	page {
   background: #f6f6f6;
	}
</style>
<style lang="scss" scoped>
	.page-container {}

	.top {
   height: 324rpx;
   background-size: 103% 106%;
   background-repeat: no-repeat;
   background-position: -10rpx -110rpx;
   position: relative;
   display: flex;
   flex-direction: column;

   .title {
   	margin: 32rpx 0 0 34rpx;
   	display: flex;
   	justify-content: flex-start;
   	width: 152rpx;
   	height: 54rpx;
   }
	}

	.content {
   position: relative;
   margin: -200rpx 34rpx 0 34rpx;
   z-index: 1;

   .item {
   	background: #ffffff;
   	margin-bottom: 22rpx;
    border-radius: 20rpx;
    overflow: hidden;
    .inner-content{
      padding: 30rpx;
      display: flex;
   	  align-items: center;
      .icon {
       position: relative;
       .img {
         flex-shrink: 0;
         width: 88rpx;
         height: 88rpx;
       }
       .num {
         position: absolute;
         top: -6rpx;
         right: -6rpx;
       }
      }
 
      .info {
       padding: 0 0 0 22rpx;
       width: 100%;
 
       .title-content {
         display: flex;
         justify-content: space-between;
         align-items: center;
         .name {
          font-size: 28rpx;
          font-weight: 700;
         }
         .time {
          color: #A6A6A6;
          font-size: 24rpx;
         }
       }
 
       .detail {
         color: #A6A6A6;
         font-size: 28rpx;
         margin-top: 10rpx;
         font-weight: 400;
         display: -webkit-box;
         word-break: break-all;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 1;
         overflow: hidden;
         text-overflow: ellipsis;
       }
      }
    }
   }
	}

	.loadmore{
    padding: 30rpx 0;
	}
</style>
