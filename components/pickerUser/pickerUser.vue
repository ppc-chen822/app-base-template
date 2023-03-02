<template>
  <u-popup :show="popupShow" round="10" closeable @close="popupShow = false">
    <view class="tree-content">
      <view class="title">
        <common-title :title="'选择用户'" />
      </view>
      <!-- v-slot:default="{item}" -->
      <view class="inner-content">
        <luyj-tree
          :trees="list"
          :props="treeProps"
          :search-if="true"
          :is-check="true"
          check-active-color="#2279ff"
          @sendValue="submit"
        >
          <!-- <view class="content-item">
            {{ item.realName }}
          </view> -->
        </luyj-tree>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { getUserApi } from '@/api/common.js'
import commonTitle from '@/components/commonTitle/commonTitle.vue'
export default {
  components: { commonTitle },
  data() {
    return {
      treeProps: {
        id: 'id',
        label: 'realName',
        multiple: false,
        children: 'children'
      },
      popupShow: false,
      list: [],
    }
  },
  mounted() {
  },
  methods: {
    show(orgCode) {
      this.popupShow = true
      this.getUserFun(orgCode)
    },
    submit(results) {
      console.log(results);
      if(results && results.length === 0){
        uni.$u.toast('请选择用户')
        return
      }
      // let arr = []
      // results.forEach(ele => {
      //   arr.push(type === 1 ? ele.id : ele.orgCode)
      // });
      this.popupShow = false
      this.$emit('submit', results[0])
    },
    // =============== API ===============

    // 查询 用户列表
    getUserFun(orgCode) {
      let params = {
        enabled: true,
        userOrgCode: orgCode,
      }
      getUserApi(params).then((res) => {
        this.list = res
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .tree-content{
    min-height: 1000rpx;
    padding-top: 80rpx;
    .title{
      padding: 0 0 20rpx 20rpx;
    }
    .content-item{
      font-size: 30rpx;
      margin-bottom: 8rpx;
    }
    .inner-content{
      height: 1000rpx;
      overflow-y: auto;
    }
  }
</style>