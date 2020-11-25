<template>
  <div class="product-list-wrap">
    <div class="product-list-content">
      <header class="category-header wrap">
        <van-icon name="arrow-left" class="icon-left" @click="goBack" />
        <div class="header-search">
          <van-icon name="search" />
          <input type="text" class="search-title" v-model="keyword" />
        </div>
        <span class="search-btn" @click="getSearch">搜索</span>
      </header>
      <van-tabs type="card" color="#FD4141" @click="changeTab">
        <van-tab title="推荐" name></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
      </van-tabs>
    </div>

    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="product-list-refresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="productList.length ? '没有更多了' : '搜索想要的商品'"
          @load="onLoad"
          @offset="10"
        >
          <template v-if="productList.length > 0">
            <div
              class="product-item"
              v-for="(item, index) in productList"
              :key="index"
              @click="productDetail(item)"
            >
              <img :src="$filters.prefix(item.goodsCoverImg)" />
              <div class="product-info">
                <div class="name">{{item.goodsName}}</div>
                <div class="subtitle">{{item.goodsIntro}}</div>
                <span class="price">￥ {{item.sellingPrice}}</span>
              </div>
            </div>
          </template>
          <img class="empty" v-else :src="emptyImg" alt="搜索" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { search } from "@/service/good";
import emptyImg from '@/assets/images/empty.png'

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      emptyImg,
      keyword: route.query.keyword || "",
      searchBtn: false,
      seclectActive: false,
      refreshing: false,
      loading: false,
      finished: false,
      productList: [],
      total: 0,
      page: 1,
      sort: 0
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      const { categoryId } = route.query;
      if (!categoryId && !state.keyword) {
        state.finished = true;
        state.loading = false;
        return;
      }
      state.loading = true;
      const {
        data: { data, total }
      } = await search({
        page: state.page,
        categoryId: categoryId,
        keyword: state.keyword,
        sort: state.sort
      });

      state.productList = state.productList.concat(data);
      state.total = total;
      state.loading = false;
      //加载全部
      if (state.productList.length >= total) state.finished = true;
    };

    const goBack = () => {
      router.go(-1);
    };

    const productDetail = item => {
      router.push({ path: `/product/${item.goodsId}` });
    };

    const getSearch = () => {
      onRefresh();
    };

    const onLoad = () => {
      //触底，且未加载全部，页码+1
      if (!state.refreshing && state.productList.length < state.total) {
        state.page = state.page + 1;
        console.log('state.page: ', state.page);
      }
      //如果是下拉清空原数据
      if (state.refreshing) {
        state.productList = [];
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

    const changeTab = (name,title) => {
      if(title == '价格') {
        state.sort = state.sort == 0 ? 1:0;
        console.log(' state.sort: ',  state.sort);
      }
      onRefresh();
    };

    return {
      ...toRefs(state),
      goBack,
      productDetail,
      getSearch,
      changeTab,
      onLoad,
      onRefresh
    };
  }
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.product-list-content {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  .category-header {
    display: flex;
    align-items: center;
    .fj();
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
    }
    .header-search {
      display: flex;
      align-items: center;
      width: 76%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px;
      color: #232326;
      background: #f7f7f7;
      .borderRadius(20px);
      .search-title {
        font-size: 14px;
        color: #666;
        background: #f7f7f7;
      }
    }
    .search-btn {
      height: 28px;
      margin: 8px 0;
      line-height: 28px;
      padding: 0 5px;
      color: #fff;
      background: @primary;
      .borderRadius(5px);
    }
  }
}
.content {
  height: calc(~"(100vh - 70px)");
  overflow: hidden;
  overflow-y: scroll;
  margin-top: 78px;
}
.product-list-refresh {
  .product-item {
    display: flex;
    .fj();
    width: 100%;
    height: 120px;
    padding: 10px 0;
    border-bottom: 1px solid #dcdcdc;
    img {
      width: 140px;
      height: 120px;
      padding: 0 10px;
      .boxSizing();
    }
    .product-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 120px;
      padding: 5px;
      text-align: left;
      .boxSizing();
      .name {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        font-size: 15px;
        color: #333;
        .text-line-num();
      }
      .subtitle {
        width: 100%;
        max-height: 20px;
        padding: 10px 0;
        line-height: 25px;
        font-size: 13px;
        color: #999;
        overflow: hidden;
      }
      .price {
        color: @primary;
        font-size: 16px;
      }
    }
  }
  .empty {
    display: block;
    width: 150px;
    margin: 50px auto 20px;
  }
}
</style>
