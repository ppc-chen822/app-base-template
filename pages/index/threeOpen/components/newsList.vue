<template>
  <view class="news-list-content">
    <view class="content">
      <template v-for="item in list">
        <news-item :key="item.title" :news="item" :newsListObj="newsListObj" :newsType="newsType" />
      </template>
    </view>
  </view>
</template>

<script>
import newsItem from './newsItem.vue'
export default {
  components: { newsItem },
  props: {
    list: {
      type: Array,
      default: ()=>[]
    },
    newsListObj: {
      type: Object,
      default: ()=>{}
    },
    newsType: {
      type: String,
      default: 'villageOpen'
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .news-list-content{
    padding: 0 35rpx;
  }
</style>