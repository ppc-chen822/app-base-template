<template>
  <view class="commonPicker-content">
    <view class="input-con" @click="chooseLocal">
      <u-input
        v-model="finalName"
        :placeholder="placeholder"
        readonly
        placeholderClass="placeholderClass"
        clearable
        :inputAlign="inputStyle.inputAlign"
        :border="inputStyle.border"
        :confirmType="inputStyle.confirmType"
      >
        <u-icon slot="suffix" name="arrow-right" color="#bbbbbb" />
      </u-input>
    </view>
  </view>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    returnLonLat: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请选择详细地址",
    },
  },
  data() {
    return {
      finalName: "",
      inputStyle: {
        inputAlign: "right",
        border: "none",
        confirmType: "next",
      },
    };
  },
  watch: {
    value(data) {
      this.showDefault();
    },
  },
  methods: {
    //回显默认值
    showDefault() {
      const { value } = this;
      console.log(value);
      if (value) {
        console.log("picker回显默认值", value);
        this.finalName = value;
      }
    },
    //选择地址
    chooseLocal() {
      const { returnLonLat } = this;
      uni.hideKeyboard();
      uni.chooseLocation({
        success: (res) => {
          console.log(res);
          this.finalName = res.address;

          if (!returnLonLat) {
            this.$emit("input", res.address);
          } else {
            let obj = {
              address: res.address,
              longitude: res.longitude,
              latitude: res.latitude,
            };
            this.$emit("input", obj);
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.commonPicker-content {
  width: 100%;
  .input-con {
    margin-left: 26rpx;
  }
}
</style>