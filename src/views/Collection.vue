
<template>
  <div class="collection-box">
    <s-header :name="'我的收藏'"></s-header>

    <div class="collection-body">
      <van-checkbox-group
        @change="groupChange"
        v-model="result"
        ref="checkboxGroup"
      >
        <collection-list :list="list" @clickItem="clickItem" />
      </van-checkbox-group>
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
    });

    onMounted(async () => {
      init();
    });

    const init = async () => {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const { data } = await getCollection({ page: 1 });
      state.list = data;
      Toast.clear();
    };

    const groupChange = (result) => {
      if (result.length == state.list.length) {
        console.log("checkAll");
        state.checkAll = true;
      } else {
        console.log(3);
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
      clickItem
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.collection-box {
  .collection-body {
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
