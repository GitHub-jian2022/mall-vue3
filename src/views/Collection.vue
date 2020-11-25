
<template>
  <div class="collection-box">
    <s-header :name="'我的收藏'"></s-header>

    <div class="collection-body">
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
            <collection-list :list="list" @clickItem="clickItem" />
          </van-checkbox-group>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-action-bar class="footer">
      <div class="selectAll" @click="selectAll">全选</div>
      <div class="deleteAll" @click="deleteAll">删除</div>
    </van-action-bar>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import sHeader from "@/components/SimpleHeader";
import CollectionList from "@/components/CollectionList";
import { getCollection, deleteCollection } from "@/service/collection";
import { Toast, Dialog } from "vant";

export default {
  components: {
    sHeader,
    CollectionList,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      list: [],
      result: [],
      refreshing: false,
      loading: false,
      finished: false,
      total: 0,
      page: 1,
    });

    onMounted(async () => {
      init();
    });

    const init = async () => {
      state.loading = true;
      const { data: { data, total } } = await getCollection({page: state.page,size: 8 });
      state.list = state.list.concat(data);
      state.total = total;
      state.loading = false;
      //加载全部
      if (state.list.length >= total) {
        state.finished = true;
      }
    };

    const onLoad = () => {
      //触底，且未加载全部，页码+1
      if (!state.refreshing && state.list.length < state.total) {
        state.page = state.page + 1;
        console.log('state.page: ', state.page);
      }
      //如果是下拉清空原数据
      if (state.refreshing) {
        console.log('下拉: ');
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

    const groupChange = (result) => {
      if (result.length == state.list.length) {
        console.log("checkAll");
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }
      state.result = result;
    };

    const selectAll = async () => {
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.id);
      } else {
        state.result = [];
      }
    };

    const deleteAll = () => {
      const ids = state.result;
      if (ids.length < 1) {
        Toast.fail("请选择删除项");
        return;
      }
      Dialog.confirm({
        title: "提示",
        message: "确定删除?",
      })
        .then(async () => {
          await deleteCollection({ ids });
          state.list = [];
          state.page = 1;
          init();
        })
        .catch(() => {
          // on cancel
        });
    };

    const clickItem = (id) => {
      router.push(`/product/${id}`);
    }

    return {
      ...toRefs(state),
      groupChange,
      selectAll,
      deleteAll,
      clickItem,
      onLoad,
      onRefresh
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.collection-box {
  .collection-body {
    height: calc(~"(100vh - 70px)");
    overflow: hidden;
    overflow-y: scroll;
    margin-top: 50px;
    margin-bottom: 80px;
  }

  .footer {
    display: flex;
    .selectAll,
    .deleteAll {
      height: 100%;
      flex: 1;
      .fj(center);
      align-items: center;
      font-size: 16px;
      color: @fc;
    }
    .selectAll {
      background: @blue;
    }
    .deleteAll {
      background: @primary;
    }
  }
}
</style>
