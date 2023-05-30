<template>
  <view class="locationPicker-content">
    <view class="input-con" @click="show">
      <u-input
        v-model="location"
        placeholder="请选择居住地址"
        readonly
        placeholderClass="placeholderClass"
        clearable
        :inputAlign="inputStyle.inputAlign"
        :border="inputStyle.border"
        :confirmType="inputStyle.confirmType"
      >
        <u-icon
          slot="suffix"
          name="arrow-right"
          color="#bbbbbb"
        />
      </u-input>
    </view>

    <u-popup :show="popupShow" round="10" closeable @close="popupShow = false">
      <view class="tree-content">
        <view class="title">
          <common-title title="选择地址" />
        </view>
        <!-- v-slot:default="{item}" -->
        <view class="inner-content">
          <luyj-tree
            :trees="locationTree"
            :props="treeProps"
            :search-if="false"
            :is-check="false"
            check-active-color="#2279ff"
            @clickItem="clickItem"
          >
            <!-- <view class="content-item">
              {{ item.divisionName }}
            </view> -->
          </luyj-tree>
        </view>
      </view>
    </u-popup>

  </view>
</template>

<script>
import { getLocationApi } from '@/api/villageBusiness/prove.js';
import commonTitle from '../commonTitle/commonTitle.vue';
export default {
  components: { commonTitle },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      location: this.value,
      popupShow: false,
      inputStyle: {
        inputAlign: 'right',
        border: 'none',
        confirmType: 'next'
      },
      locationTree: [],
      treeProps: {
        id: 'id',
        label: 'divisionName',
        children: 'children'
      },
      finalLocation: [],
      finalLocationId: []
    }
  },
  mounted() {
    this.getLocationFun()
  },
  methods: {
    show() {
      this.popupShow = true;
      uni.hideKeyboard()
      this.finalLocation = []
      this.finalLocationId = []
    },
    // 选择树状图中的某一级
    clickItem(data) {
      const { finalLocation } = this
      const { divisionName, id, children, pid } = data
      if(children) {
        if(finalLocation.length > 0){
          if(pid === 0){ // 第一级
            console.log('全部清空');
            this.finalLocation = []
            this.finalLocationId = []
          }else{ // 第二级
            this.finalLocation.splice(1, 1)
            this.finalLocationId.splice(1, 1)
          }
        }
        this.finalLocation.push(divisionName)
        this.finalLocationId.push(id)
      }else{ // 第三级
        this.finalLocation.push(divisionName)
        this.finalLocationId.push(id)

        this.location = this.finalLocation.join('-')
        this.$emit("input", this.finalLocation.join('-'));
        this.popupShow = false

      }
    },
    // =============== API ===============
    // 查询行政区划
    getLocationFun() {
      getLocationApi().then((res) => {
        this.locationTree = res
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .input-con{
    margin-left: 26rpx;
  }

  .tree-content{
    padding-top: 60rpx;
    height: 1000rpx;
    // padding: 30rpx;
    .title{
      margin: 20rpx;
    }
  }
  .inner-content{
    height: 1000rpx;
    overflow-y: auto;
  }
</style>