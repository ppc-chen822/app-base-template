<template>
  <view class="date-picker-content">
    <view class="input-con" @click="show">
      <u-input
        v-model="dateStr"
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

    <u-datetime-picker
      v-model="demoTime"
      :show="dateShow"
      ref="datetimePicker"
      :mode="mode"
      :minDate="minDate"
      :maxDate="maxDate"
      :confirmColor="$mainColor"
      @confirm="confirmTime"
      @cancel="dateShow = false"
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
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请选择日期",
    },
    mode: {
      type: String,
      default: "date",
    },
    maxDate: {
      type: Number,
      // default: NaN
      // new Date('1990-01-01').getTime()
    },
    minDate: {
      type: Number,
      // default: NaN
      // new Date().getTime()
    },
  },
  data() {
    return {
      dateStr: this.value,
      dateShow: false,
      demoTime: Number(new Date()),
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
      if (value) {
        this.dateStr = value.split(" ")[0];
      }
    },
    show() {
      this.dateShow = true;
      uni.hideKeyboard();
    },
    confirmTime({ mode, value }) {
      const timeFormat = uni.$u.timeFormat;
      let dateStr;

      switch (mode) {
        case "date":
          dateStr = timeFormat(value, "yyyy-mm-dd");
          break;
        case "datetime":
          dateStr = timeFormat(value, "yyyy-mm-dd hh:MM:ss");
          break;
        default:
          break;
      }
      this.dateStr = dateStr;
      this.$emit("input", this.dateStr);
      this.dateShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.date-picker-content {
  width: 100%;
  .input-con {
    margin-left: 26rpx;
  }
}
</style>