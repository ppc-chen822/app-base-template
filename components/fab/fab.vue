<template>
  <uni-fab
    ref="fab"
    :pattern="pattern"
    :content="content"
    :horizontal="horizontal"
    :vertical="vertical"
    :direction="direction"
    @trigger="trigger"
  />
</template>

<script>
export default {
  data() {
    return {
      pattern: {
        color: '#7A7E83',
        backgroundColor: '#ffffff',
        selectedColor: '#dbeaff',
        buttonColor: '#2a82e4',
        iconColor: '#fff'
      },
      direction: 'vertical',
      vertical: 'bottom',
      horizontal: 'right',

      content: [
        {
          iconPath: `${this.imgUrl}/midBtn/a.png`,
          text: '拍一拍',
        },{
          iconPath: `${this.imgUrl}/midBtn/c.png`,
          text: '一键火警',
        },{
          iconPath: `${this.imgUrl}/midBtn/d.png`,
          text: '一键开门',
        }
      ]
    }
  },
  methods: {
    // 点击某一项
    trigger(e) {
      const url = e.item.navigate
      uni.navigateTo({ url })
      // this.content[e.index].active = !e.item.active
    },
  }
}
</script>

<style lang="scss" scoped>

</style>