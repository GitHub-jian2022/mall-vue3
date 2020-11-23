<template>
    <div class="good-item" v-for="(item, index) in list" :key="index" @click="clickItem(item.goodsId)">
      <van-checkbox :name="item.id" @click="checkBoxClick" />
      <div class="good-img">
        <img :src="$filters.prefix(item.goodsCoverImg)" alt="" />
      </div>
      <div class="good-desc">
        <div class="good-title">
          <span>{{ item.goodsName }}</span>
        </div>
        <div class="good-btn">
          <div class="price">¥{{ item.sellingPrice }}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['click-item'],
  setup(props,ctx) {
    const clickItem = (goodsId) => {
      ctx.emit('click-item',goodsId)
    }

    const checkBoxClick = (event) => {
      event.stopPropagation()
    }

    return {
      clickItem,
      checkBoxClick
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.good-item {
  padding: 5px;
  display: flex;
  .border-1px(#ccc);
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
    }
    .good-btn {
      display: flex;
      justify-content: space-between;
      .price {
        font-size: 16px;
        color: red;
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
.van-swipe-cell__right {
    background: #ee0a24;
    .fj(space-between);
    align-items: center;
}
</style>