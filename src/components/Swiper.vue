<template>
    <van-swipe class="my-swipe" :autoplay="3000" :indicator-color="indicatorColor">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img :src="$filters.prefix(item.carouselUrl)" alt="" @click="goTo(item.redirectUrl)">
      </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    indicatorColor: {
      type: String,
      default: "#fff"
    },

  },
  methods: {
    goTo(url) {
      window.open(url)
    }
  }
}
</script>

<style lang='less' scoped>
  .my-swipe {
    width: 100%;
    height: 180px;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
