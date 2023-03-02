<template>
  <u-popup
    :show="popShow"
    mode="center"
    :round="10"
    :closeable="true"
    @close="popShow = false"
  >
    <view class="process-content">
      <view class="title-con">
        <common-title title="绑定进程" />
      </view>

      <view class="list-con">
        <view
          class="door-item"
          v-for="(item, index) in doorList"
          :key="item.code"
        >
          <view class="left">
            <view class="name">{{ item.name }}</view>

            <view
              v-if="doorBindPro[index].status === 2"
              class="bind-again"
              @click="bindAgain(item, index)"
            >
              再次绑定
            </view>
          </view>

          <view class="right">
            <u-loading-icon
              text="绑定中..."
              textSize="26rpx"
              mode="circle"
              color="#2979ff"
              size="36rpx"
              vertical
              v-if="doorBindPro[index].status === 0"
            />

            <u-icon
              v-else
              :name="doorBindPro[index].status === 1 ? 'checkmark-circle' : 'close-circle'"
              :color="doorBindPro[index].status === 1 ? '#13ce66' : 'red'"
              size="42rpx"
              :label="doorBindPro[index].status === 1 ? '绑定成功' : '绑定失败'"
              labelPos="bottom"
              labelSize="24rpx"
              labelColor="#909399"
            />
          </view>
        </view>
        <u-button text="关闭" @click="close"></u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
import commonTitle from '@/components/commonTitle/commonTitle.vue';
export default {
  components: { commonTitle },
  props: {
    doorList: {
      type: Array,
      default: ()=>[]
    },
    bindingIndex: {
      type: Number,
      default: 0
    },
    doorBindPro: {
      type: Array,
      default: ()=>[]
    },
  },
  data() {
    return {
      popShow: false,
      // closeable: true
    }
  },
  mounted() {
    console.log(this.doorBindPro);
  },
  computed: {
    closeable() {
      let flag = false;
      for (let i = 0; i < this.doorBindPro.length; i++) {
        const ele = this.doorBindPro[i];
        if(ele.status === 2){
          flag = false
          break
        }else{
          flag = true
        }
      }
      return flag
    }
  },
  methods: {
    show() {
      this.popShow = true
    },
    close() {
      this.popShow = false
      
    },
    // 再次绑定
    bindAgain(item, index) {
      console.log(item.code);
      this.$emit('bindAgain', item.code, index)
    }
  }

}
</script>

<style lang="scss" scoped>
  .process-content{
    background: #ffffff;
    width: 500rpx;
    padding: 10rpx 30rpx;
    border-radius: 20rpx;
    .title-con{
      padding: 20rpx 0;
    }

    .list-con{
      .door-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #f7f0f0;
        padding: 20rpx 0;
        .name{
          font-size: 34rpx;
        }
        .bind-again{
          margin-top: 8rpx;
          color: #2979ff;
          text-decoration: underline;
          font-size: 26rpx;
        }
        &:last-child{
          border-bottom: none;
        }
      }
    }
  }
</style>