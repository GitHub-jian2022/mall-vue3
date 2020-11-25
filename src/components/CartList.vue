<template>
  <div class="cart-list" v-if="list.length > 0">
      <van-swipe-cell
          :right-width="50"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="good-item">
            <van-checkbox :name="item.id" @click="checkBoxClick" />
            <div class="good-img" @click="clickItem(item.goodsId)">
              <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title" @click="clickItem(item.goodsId)">
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
  </div>

  <div class="empty" v-if="!list.length">
      <img
        class="empty-cart"
        :src="cart_emptyImg"
        alt="空购物车"
      />
      <div class="title">购物车空空如也</div>
      <van-button round @click="goTo" block
        >前往选购</van-button
      >
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import cart_empty from '@/assets/images/cart_empty.jpg';
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["click-item","on-change","delete-item"],
  setup(props, ctx) {
    const router = useRouter();
    const cart_emptyImg = ref(cart_empty)
    //跳转详情
    const clickItem = (id) => {
      router.push(`/product/${id}`);
    };
    //阻止默认行为
    const checkBoxClick = (event) => {
      event.stopPropagation();
    };

    const onChange = async (value, detail) => {
        ctx.emit("on-change", value, detail);
    }
    //删除商品
    const deleteGood = async (id) => {
     ctx.emit("delete-item", id);
    };

    const goTo = () => {
      router.push({ path: "/home" });
    };

    return {
      cart_emptyImg,
      clickItem,
      checkBoxClick,
      onChange,
      deleteGood,
      goTo
    };
  },
};
</script>

<style lang="less">
@import "../common/style/mixin";

.cart-list{
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
    margin-top: 100px;
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
    .van-button {
      background: @primary;
      color: @fc;
    }
  }
</style>