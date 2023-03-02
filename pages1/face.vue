<template>
  <view>
    <camera
      device-position="front"
      flash="auto"
      @error="error"
      style="width:100%;height: 300px;"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>