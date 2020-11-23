<template>
  <header class="simple-header">
    <div class="left">
      <van-icon name="arrow-left" size="20" @click="goBack" v-if="showLeftIcon" />
    </div>
    <div class="simple-header-name">{{ name }}</div>
    <van-icon name="ellipsis" size="20" />
  </header>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    showLeftIcon: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      default: "",
    },
    back: {
      type: String,
      default: "",
    },
  },
  emits: ["callback"],
  setup(props, ctx) {
    const router = useRouter();
    const goBack = () => {
      if (!props.back) {
        router.go(-1);
      } else {
        router.push({ path: props.back });
      }
      ctx.emit("callback");
    };
    return {
      goBack,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.simple-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  .fj();
  .wh(100%, 44px);
  line-height: 44px;
  padding: 0 10px;
  .boxSizing();
  color: #252525;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  .left {
    width: 20px;
    height: 20px;
  }
  .simple-header-name {
    font-size: 14px;
  }
}
</style>
