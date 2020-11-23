<template>
  <div class="nav-bar van-hairline--top">
    <ul class="nav-list">
      <router-link tag="li" class="nav-list-item active" to="home">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="category">
        <van-icon name="shop-o" />
        <span>分类</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="cart">
        <div class="cartCount" v-if="count>0">{{!count ? '' : count}}</div>
        <van-icon  name="shopping-cart-o" />
        <span>购物车</span>
      </router-link>
      <router-link tag="li" class="nav-list-item" to="user">
        <van-icon name="user-o" />
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { getLocal } from "@/common/js/utils";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    onMounted(() => {
      const token = getLocal("token");
      const path = route.path;
      console.log("path: ", path);
      if (token && !["/home", "/category"].includes(path)) {
        store.dispatch('cart/updateCartCount')
      }
    });
    const count = computed(() => {
      const { cartCount } = store.state.cart;
      console.log('cartCount: ', cartCount);
      return cartCount;
    });

    return {
      count
    };
  }
};
</script>

<style lang="less" scoped >
@import "../common/style/mixin";
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  z-index: 1000;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
      .shopping-cart-o,.cartCount {
        .wh(16px,16px);
        line-height: 16px;
        text-align: center;
        .borderRadius(8px);
        color: #fff;
        background: #f00;
        position: absolute;
        top: 0;
        right: 25px;
        -webkit-transform: translate(50%, -50%);
        transform: translate(50%, -50%);
      }
    }
  }
}
</style>
