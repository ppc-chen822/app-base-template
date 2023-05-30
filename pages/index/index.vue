<template>
  <view class="page-container">
    首页

    <is-down />
    <Fab />
 </view>
</template>

<script>
import mainTitle from '@/components/mainTitle/mainTitle.vue'
import IsDown from '@/components/isDown/isDown.vue'
import Fab from '@/components/fab/fab.vue'
export default {
  components: { mainTitle, IsDown, Fab },
  data() {
    return {

      bgImg: `${this.imgUrl}/index/bg.png`,
      // 中间导航栏
      midNavigate: [
        {
          title: '亲属关系',
          icon: `${this.imgUrl}/index/b.png`,
          navigate: '/pagesVillageBusiness/prove/newProve/relatives',
          isShow: true,
        }
      ],
    }
  },
  onShow() {
    if(!uni.getStorageSync('token')) {
      uni.showModal({
        title: '未登录',
        content: '请登录后继续使用',
        showCancel: false,
        confirmColor: this.$mainColor,
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定');
            uni.redirectTo({
              url: '/pages/login/login'
            });
          }
        }
      });
    }
  }, 
  methods: {
    // 跳转页面
    goToPage(item) {
      const url = item.navigate
      if(item.actionsList) {
        this.actionsTitle = item.name
        this.actionsList = item.actionsList
        this.actionsShow = true
      }else{
        uni.navigateTo({ url })
      }
    },
  }
}
</script>

<style>
  page{
    background: #f3f4f9;
  }
</style>
<style lang="scss" scoped>
  .page-container{

  }
</style>
