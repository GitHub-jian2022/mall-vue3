<template>
  <div class="cart-box">
    <s-header :name="'购物车'" :showLeftIcon="false"></s-header>
    <div class="cart-body">
      <van-checkbox-group
        @change="groupChange"
        v-model="result"
        ref="checkboxGroup"
      >
        <van-swipe-cell
          :right-width="50"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="good-item">
            <van-checkbox :name="item.id" @click="checkBoxClick" />
            <div class="good-img" @click="toGoodsDetail(item.goodsId)">
              <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title" @click="toGoodsDetail(item.goodsId)">
                <span>{{ item.goodsName }}</span>
                <span class="qunaity"> x{{ item.quanity }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :max="5"
                  :model-value="item.quanity"
                  :name="item.id"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              square
              icon="delete"
              type="danger"
              class="delete-button"
              @click="deleteGood(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      v-if="list.length > 0"
      class="submit-all"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model:checked="checkAll"
        >全选</van-checkbox
      >
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <img
        class="empty-cart"
        src="//s.yezgea02.com/1604028375097/empty-car.png"
        alt="空购物车"
      />
      <div class="title">购物车空空如也</div>
      <van-button round color="#1baeae" type="primary" @click="goTo" block
        >前往选购</van-button
      >
    </div>

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
import { getCart, deleteCartItem } from "@/service/cart";

export default {
  components: {
    tabbar,
    sHeader,
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
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const { data } = await getCart({ page: 1 });
      state.list = data;
      state.result = data.map((item) => item.id);
      Toast.clear();
    };

    const total = computed(() => {
      let sum = 0;
      let _list = state.list.filter((item) => state.result.includes(item.id));
      _list.forEach((item) => {
        sum += item.quanity * item.sellingPrice;
      });
      return sum;
    });

    const goBack = () => {
      router.go(-1);
    };

    const goTo = () => {
      router.push({ path: "/home" });
    };

    const checkBoxClick = (event) => {
      event.stopPropagation()
    }

    const onChange = async (value, detail) => {
      if (value > 5) {
        Toast.fail("超出单个商品的最大购买数量");
        return;
      }
      if (value < 1) {
        Toast.fail("商品不得小于0");
        return;
      }
      if (
        state.list.filter((item) => item.id == detail.name)[0].quanity == value
      )
        return;
      state.list.forEach((item) => {
        if (item.id == detail.name) {
          item.quanity = value;
        }
      });
      Toast.clear();
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
      console.log(1);
      if (result.length == state.list.length) {
        console.log(2);
        state.checkAll = true;
      } else {
        console.log(3);
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

    const toGoodsDetail = (id) => {
      router.push(`/product/${id}`);
    };

    return {
      ...toRefs(state),
      total,
      goBack,
      goTo,
      checkBoxClick,
      onChange,
      onSubmit,
      deleteGood,
      groupChange,
      allCheck,
      toGoodsDetail,
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
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      padding: 5px 0;
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
          margin-left: 5px;
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 10px;
        .good-title {
          display: flex;
          justify-content: space-between;
          .text-line-num(3);
          .qunaity {
            color: @primary;
          }
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: @primary;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
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
