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
        :customStyle="customInputStyle"
      >
        <u-icon
          slot="suffix"
          name="arrow-right"
          color="#bbbbbb"
        />
      </u-input>
    </view>

     <!-- 日历(选择日期范围) -->
     <u-calendar
      :show="calendarShow"
      mode="range"
      :minDate="calendarMin"
      :maxDate="calendarMax"
      :color="$mainColor"
      @confirm="confirmDate"
      @close="calendarShow = false"
    />
  </view>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择日期范围'
    },
  },
  data() {
    return {
      dateStr: this.value,
      calendarShow: false,
      inputStyle: {
        inputAlign: 'right',
        border: 'none',
        confirmType: 'next'
      },
      customInputStyle: {
        width: '405rpx'
      }
    }
  },
  computed: {
    calendarMin() {
      return this.$u.timeFormat(new Date().getTime(), 'yyyy-mm-dd')
    },
    calendarMax() {
      return this.$u.timeFormat(new Date().getTime() + 31536000000, 'yyyy-mm-dd')
    }
  },
  methods: {
    show() {
      this.calendarShow = true;
      uni.hideKeyboard()
    },
    // 确认时间区间
    confirmDate(dataRange) {
      const startDate = dataRange[0]
      const endDate = dataRange[dataRange.length - 1]
      const dateRange = `${startDate}至${endDate}`

      this.dateStr = dateRange
      this.$emit("input", this.dateStr);
      this.calendarShow = false
    },
  }
}
</script>

<style lang="scss" scoped>
  .date-picker-content{
    .input-con{
      margin-left: 50rpx;
    }
  }
</style>