<template>
  <div class="about">
    <s-header :name="'关于我们'"></s-header>
    <div class="about-body">
      
      
    </div>
  </div>
</template>

<script>
import sHeader from '@/components/SimpleHeader'
export default {
  components: {
    sHeader
  },
}
</script>

<style lang="less" scoped>
  .about {
    box-sizing: border-box;
    padding: 20px;
  }
</style>
