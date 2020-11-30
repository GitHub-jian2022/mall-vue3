
<template>
  <div class="seting-box">
    <s-header :name="'账号管理'"></s-header>
    <div class="input-item">
      <van-field v-model="username" label="用户名" />
      <van-field v-model="nickname" label="昵称" />
      <van-field v-model="sign" label="个性签名" />
      <van-field v-model="password" type="password" label="修改密码" />
    </div>
    <van-button round class="save-btn" type="primary" @click="save" block
      >保存</van-button
    >
    <van-button round class="logout-btn" @click="handleLogout" block
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import md5 from "js-md5";
import sHeader from "@/components/SimpleHeader";
import { getUserInfo, EditUserInfo } from "../service/user";
import { setLocal } from "@/common/js/utils";
import { Toast, Dialog } from "vant";
export default {
  components: {
    sHeader,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      username: "",
      nickname: "",
      sign: "",
      password: "",
    });

    onMounted(async () => {
      const { data } = await getUserInfo();
      state.username = data.username;
      state.nickname = data.nickname;
      state.sign = data.sign;
    });

    const save = async () => {
      const params = {
        username: state.username,
        sign: state.sign,
        nickname: state.nickname,
      };
      if (state.password) {
        params.passwordMd5 = md5(state.password);
      }
      await EditUserInfo(params);
      Toast.success("保存成功");
    };

    const handleLogout = async () => {
      Dialog.confirm({
        title: "提示",
        message: "确定退出?",
      })
        .then(() => {
          setLocal("token", "");
          router.push({ path: "/" });
        })
        .catch(() => {
          // on cancel
        });
    };

    return {
      ...toRefs(state),
      save,
      handleLogout,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.seting-box {
  .input-item {
    margin-top: 44px;
  }
  .save-btn,
  .logout-btn {
    width: 80%;
    margin: 20px auto;
  }

  .logout-btn {
    background: @primary;
    color: @fc;
  }
}
</style>
