<template>
  <div class="cart-box">
    <s-header :name="'购物车'" :showLeftIcon="false"></s-header>
    <div class="cart-body">
       <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="list.length>=total ? '没有更多了' : ''"
          @load="onLoad"
          @offset="10"
        >
          <van-checkbox-group
            @change="groupChange"
            v-model="result"
            ref="checkboxGroup"
          >
            <cart-list
            :list="list"
            @onChange="onChange"
            @deleteItem="deleteGood"
            />
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-submit-bar
      v-if="list.length > 0"
      class="submit-all"
      :price="totalPrice * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model:checked="checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>

    <tabbar />
  </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import tabbar from "@/components/TabBar";
import sHeader from "@/components/SimpleHeader";
import CartList from "@/components/CartList";

import {  getCart, deleteCartItem } from "@/service/cart";

export default {
  components: {
    tabbar,
    sHeader,
    CartList
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: true,
      refreshing: false,
      loading: false,
      finished: false,
      total: 0,
      page: 1,
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      state.loading = true;
      const { data } = await getCart({ page: state.page,size: 10 });
      state.list = state.list.concat(data);
      state.result = state.list.map((item) => item.id);
      state.total = store.state.cart.cartCount;
      state.loading = false;
      //加载全部
      if (state.list.length >= state.total) {
        state.finished = true;
      }
    };

    const onLoad = () => {
      //触底，且未加载全部，页码+1
      if (!state.refreshing && state.list.length < state.total) {
        state.page = state.page + 1;
      }
      //如果是下拉清空原数据
      if (state.refreshing) {
        state.list = [];
        state.refreshing = false;
      }
      //获取数据
      init();
    };

    // 下拉刷新
    const onRefresh = () => {
      state.refreshing = true;
      // 清空列表数据
      state.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      state.page = 1;
      onLoad();
    };

    const totalPrice = computed(() => {
      let sum = 0;
      let _list = state.list.filter((item) => state.result.includes(item.id));
      _list.forEach((item) => {
        sum += item.quanity * item.sellingPrice;
      });
      return sum;
    });

    const onChange = async (value, detail) => {
      const currentItem = state.list.filter((item) => item.id == detail.name)[0]
      //如果新的值等于原数量,停止遍历修改
      if (currentItem.quanity == value) {
        return;
      }
      state.list.forEach((item) => {
        if (item.id == detail.name) {
          item.quanity = value;
        }
      });
    };

    const onSubmit = async () => {
      if (state.result.length == 0) {
        Toast.fail("请选择商品进行结算");
        return;
      }
      const params = JSON.stringify(state.result);
      router.push({ path: "/create-order", query: { ids: params } });
    };

    const deleteGood = async (id) => {
      const ids = [];
      ids.push(id);
      await deleteCartItem({ ids });
      store.dispatch("cart/updateCartCount");
      init();
    };

    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result;
    };

    const allCheck = () => {
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.id);
      } else {
        state.result = [];
      }
    };

    return {
      ...toRefs(state),
      totalPrice,
      onChange,
      onSubmit,
      deleteGood,
      groupChange,
      allCheck,
      
      onLoad,
      onRefresh
    };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";
.cart-box {
  .cart-header {
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
    .cart-name {
      font-size: 14px;
    }
  }
  .cart-body {
    height: calc(~"(100vh - 70px)");
    overflow: hidden;
    overflow-y: scroll;
    margin: 60px 0 100px 0;
    padding-left: 10px;
    
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    // background-color: @primary;
    // border-color: @primary;
  }
}
</style>
