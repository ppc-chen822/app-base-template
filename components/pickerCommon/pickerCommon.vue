<template>
  <view class="commonPicker-content">
    <view class="input-con" @click="show">
      <u-input
        v-model="finalValue"
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

    <u-picker
      :show="pickerShow"
      :columns="[pickerOptions]"
      :keyName="keyName"
      :defaultIndex="[defaultIndex]"
      :closeOnClickOverlay="true"
      :confirmColor="$mainColor"
      @close="pickerShow = false"
      @confirm="confirmPicker"
      @cancel="pickerShow = false"
    />
  </view>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    pickerId: {
      type: Number,
      default: 0,
    },
    value: {
      type: String | Number,
      default: "",
    },
    pickerOptions: {
      type: Array,
      default: () => [],
    },
    keyName: {
      type: String,
      default: "value",
    },
    idName: {
      type: String,
      default: "id",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
  },
  data() {
    return {
      pickerShow: false,

      finalId: "",
      finalValue: "",

      defaultIndex: 0,

      inputStyle: {
        inputAlign: "right",
        border: "none",
        confirmType: "next",
      },
    };
  },
  mounted() {
    this.showDefault();
  },
  watch: {
    value() {
      this.showDefault();
    },
  },
  methods: {
    show() {
      this.pickerShow = true;
      uni.hideKeyboard();
    },

    // 回显默认值
    showDefault() {
      const { value, pickerOptions, idName, keyName } = this;
      if (value || value === 0) {
        console.log("pickerCommon回显默认值");

        // if (pickerOptions.length === 0) {
        //   console.log("暂无options");
        //   return;
        // }
        let checkedItem = pickerOptions.find((item) => item[idName] == value);
        let checkedItemIndex = pickerOptions.findIndex(
          (item) => item[idName] == value
        );
        this.finalId = value;
        this.finalValue = checkedItem[keyName];
        this.defaultIndex = checkedItemIndex;
      }
    },

    confirmPicker(e) {
      console.log(e);
      const { keyName, idName } = this;
      this.finalId = e.value[0][idName];
      this.finalValue = e.value[0][keyName];
      console.log(this.finalValue);
      this.$emit("currlist", e, this.pickerId);
      this.$emit("input", this.finalId);
      this.pickerShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.commonPicker-content {
  width: 100%;
  .input-con {
  }
}
</style>