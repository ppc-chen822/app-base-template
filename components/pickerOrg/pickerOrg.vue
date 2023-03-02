<template>
  <u-popup :show="popupShow" round="10" closeable @close="popupShow = false">
    <view class="tree-content">
      <view class="title">
        <common-title :title="'选择机构'" />
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
            {{ item.orgName }}
          </view> -->
        </luyj-tree>
      </view>
    </view>
  </u-popup>
</template>

<script>
import { getOrgApi } from '@/api/common.js'
import commonTitle from '@/components/commonTitle/commonTitle.vue'
export default {
  components: { commonTitle },
  data() {
    return {
      type: 0,
      treeProps: {
        id: 'id',
        label: "orgName",
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
    show(type) {
      this.popupShow = true

      this.getOrgFun()
    },
    submit(results) {
      console.log(results);
      const { type } = this
      if(results && results.length === 0){
        uni.$u.toast(type === 1 ? '请选择用户' : '请选择机构')
        return
      }
      this.popupShow = false
      this.$emit('submit', results[0])
    },
    // =============== API ===============
    // 查询 机构列表
    getOrgFun() {
      let params = {
        adLevelType: 2,
        enabled: true,
        // search4UserAd: true,
      }
      getOrgApi(params).then((res) => {
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