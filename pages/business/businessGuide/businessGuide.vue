<template>
  <view class="help-container">
    <view class="main-content">
      <view class="big-item" v-for="(item) in bigList" :key="item.name">
        <view class="left">
          <view class="icon">
						<image
							:src="item.icon"
							mode="scaleToFill"
							style="width: 55rpx; height: 60rpx;"
						/>
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
					<!-- <u-empty v-if="item.list.length === 0" /> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getContentApi } from '@/api/common.js'
import empty from '../../../components/empty/empty.vue'
export default {
  components: { empty },
  data() {
    return {
      bigList: [
        {
          icon: `${this.imgUrl}/business/shortcut1/a.png`,
          name: '村务服务',
          list: []
        },{
          icon: `${this.imgUrl}/business/shortcut2/d.png`,
          name: '疫情防控',
          list: []
        },
        {
          icon: `${this.imgUrl}/business/shortcut3/c.png`,
          name: '养老系统',
          list: []
        },
        {
          icon: `${this.imgUrl}/business/shortcut4/c.png`,
          name: '网格综治',
          list: []
        },
        {
          icon: `${this.imgUrl}/business/shortcut5/d.png`,
          name: '党建内容',
          list: []
        },
        {
          icon: `${this.imgUrl}/business/shortcut6/c.png`,
          name: '人居环境',
          list: []
        },
        {
          icon: `${this.imgUrl}/business/shortcut7/a.png`,
          name: '森林防火',
          list: []
        }
      ]
    }
  },
  mounted() {
    this.getContentFun('gzd-guide-village', 0)
    this.getContentFun('gzd-guide-epidemic', 1)
		this.getContentFun('gzd-guide-older', 2)
		this.getContentFun('gzd-guide-girdManagement', 3)
		this.getContentFun('gzd-guide-party', 4)
		this.getContentFun('gzd-guide-environment', 5)
		this.getContentFun('gzd-guide-forest', 6)
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
    padding: 34rpx;
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