<template>
  <view class="business-container">
    <view class="top-bg"  :style="{backgroundImage: `url(${bgImg})`}">

      <!-- 顶部搜索框 -->
      <view class="search-content">
        <u-text text="服务列表" bold size="36rpx" color="#FFFFFF" />
        <u-search
          v-model="searchData"
          :showAction="false"
          placeholder="输入关键字搜索菜单"
          bgColor="#FFFFFF"
          shape="square"
          placeholderColor="#808080"
          height="84rpx"
          :inputStyle="searchStyle"
          @search="filterMenu"
          @clear="clearFilter"
        />
      </view>
      
      <!-- 办事进度/办事指南 -->
      <view class="shortcut-content">
        <view
          class="shortcut-item"
          v-for="item in businessShort"
          :key="item.title"
          :style="{backgroundImage: `url(${item.img})`}"
          @click="goToPage(item.navigate)"
        >
          <view class="text-con">
            <view class="title">{{ item.title }}</view>
            <view class="tip">{{ item.tip }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 快捷方式卡片 -->
    <template
      v-for="item in showFiltedMenu ? filtedList : shortcutList"
    >
      <shortcut-card
        :key="item.title"
        :shortcutObj="item"
        v-if="item.isShow"
      />
    </template>


  </view>
</template>

<script>
import shortcutCard from './components/shortcutCard.vue'
  export default {
    components: { shortcutCard },
    data() {
      return {
        bgImg: `${this.imgUrl}/business/topBg.png`,
        searchData: '',
        showFiltedMenu: false,
        searchStyle: {
          borderRadius: '20rpx',
          width: '350rpx'
        },

        // 办事快捷方式
        businessShort: [
          {
            title: '办事进度',
            tip: '随时查询进度',
            img: `${this.imgUrl}/business/top1.png`,
            navigate: '/pages/business/businessProcess/businessProcess',
          },
          {
            title: '办事指南',
            tip: '办事指南汇总',
            img:  `${this.imgUrl}/business/top2.png`,
            navigate: '/pages/business/businessGuide/businessGuide',
          }
        ],
        // 快捷方式列表
        shortcutList: [
          {
            title: '代码demo',
            iconSize: '50rpx',
            url: "/pagesVillageBusiness/villageBusiness",
            isShow: true,
            list: [
              {
                name: '表单1',
                isShow: true,
                icon: `${this.imgUrl}/business/shortcut3/a.png`,
                navigate: '/pages1/form1'
              },{
                name: '人脸识别',
                isShow: true,
                icon: `${this.imgUrl}/business/shortcut3/a.png`,
                navigate: '/pages1/face'
              }
            ]
          }
        ],
        filtedList: []
      };
    },
    methods: {
      // 跳转页面
      goToPage(url) {
        if(url) {
          uni.navigateTo({ url })
        }else{
          uni.$u.toast('正在开发中...')
        }
      },
      // 筛选菜单
      filterMenu() {
        const { searchData, shortcutList } = this

        if(!searchData || searchData === ''){
          this.showFiltedMenu = false
          return
        }

        this.filtedList = []
        let arr = []

        for (let i = 0; i < shortcutList.length; i++) {
          const ele = shortcutList[i]
          if(ele.title.includes(searchData)){
            arr.push(ele)
            break;
          }else{
            for (let j = 0; j < ele.list.length; j++) {
              const ele_ = ele.list[j];
              if(ele_.name.includes(searchData)) {
                let obj = Object.assign({}, ele, {
                  list: [ele_]
                })
                arr.push(obj)
              }
            }
          }
        }
        if(arr.length === 0) {
          uni.$u.toast('暂无搜索结果')
          return
        }
        this.filtedList = arr
        this.showFiltedMenu = true
      },
      // 清空搜索项
      clearFilter() {
        this.showFiltedMenu = false
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
  .business-container{
    .top-bg{
      height: 324rpx;
      background-size: 103% 106%;
      background-position: -10rpx -110rpx;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background-repeat: no-repeat;
      margin-bottom: 36rpx;
      .search-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30rpx 34rpx;
      }
      .shortcut-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 34rpx;
        .shortcut-item{
          width: 328rpx;
          height: 160rpx;
          border-radius: 20rpx;
          color: #ffffff;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          background-size: 100% 100%;
          .text-con{
            margin-right: 32rpx;
            text-align: right;
            .title{
              font-size: 28rpx;
              font-weight: 700;
            }
            .tip{
              margin-top: 10rpx ;
              font-size: 24rpx;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
</style>
