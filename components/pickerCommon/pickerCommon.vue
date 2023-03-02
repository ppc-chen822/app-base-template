<template>
  <view class="commonPicker-content">
    <view class="input-con" @click="show">
      <u--input
        v-model="finalName"
        :placeholder="placeholder"
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
      </u--input>
    </view>

    <u-picker
      :show="pickerShow"
      :columns="[pickerOptions]"
      :keyName="keyName"
      @confirm="confirmPicker"
      @cancel="pickerShow = false"
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
    modelValue: {
      type: String,
      default: '',
    },
    pickerOptions: {
      type: Array,
      default: ()=>[]
    },
    keyName: {
      type: String,
      default: 'value',
    },
    idName: {
      type: String,
      default: 'id',
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    resultType: {
      type: String,
      default: 'id',
    },
  },
  data() {
    return {
      finalId: '',
      finalName: '',

      pickerShow: false,
      inputStyle: {
        inputAlign: 'right',
        border: 'none',
        confirmType: 'next'
      },
    }
  },
  methods: {
    show() {
      this.pickerShow = true;
      uni.hideKeyboard()
    },
    confirmPicker(e) {
      const { keyName, idName, resultType } = this
      
      this.finalId = e.value[0][idName]
      this.finalName = e.value[0][keyName]

      if(resultType === 'id') {
        this.$emit("input", this.finalId);
      } else {
        this.$emit("input", this.finalName);
      }
      this.pickerShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .commonPicker-content{
    .input-con{
      margin-left: 26rpx;
    }
  }
</style>