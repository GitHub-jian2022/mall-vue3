<template>
  <div class="good-list">
    <header class="good-header">{{title}}</header>
    <div class="good-box">
      <div
        class="good-item"
        v-for="item in list"
        :key="item.goodsId"
        @click="goToDetail(item)"
      >
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
        <div class="good-desc">
          <div class="title">{{ item.goodsName }}</div>
          <div class="price">¥ {{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
  },
  setup() {
    const router = useRouter()
    const goToDetail = (item) => {
      router.push({ path: `/product/${item.goodsId}` })
    }

    return {
      goToDetail,
    }
  }
};
</script>

<style lang="less" scoped >
@import "../common/style/mixin";
.good-list {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          .text-line-num(4);
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
</style>