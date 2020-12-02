<template>
  <div>
    <header class="home-header wrap" :class="{'active' : headerScroll}">
      <div class="header-search">
        <van-icon name="search" />
        <router-link tag="span" class="search-title" to="./product-list?from=home">vue3.0/koa/mysql打造全栈项目</router-link>
      </div>
    </header>

    <swiper :list="swiperList"></swiper>
    <div class="category-list">
      <div v-for="item in categoryList" v-bind:key="item.categoryId" @click="tips">
        <img :src="item.imgUrl">
        <span>{{item.name}}</span>
      </div>
    </div>

    <div class="goods">
      <home-list :list="hots" :title="'新品上线'" />
      <home-list :list="newGoodses" :title="'热门商品'" />
      <home-list :list="recommends" :title="'推荐商品'" />
    </div>


    <tabbar />

  </div>
</template>

<script>
import { reactive, onMounted, toRefs, nextTick } from 'vue'
import swiper from '@/components/Swiper'
import HomeList from '@/components/HomeList';
import tabbar from '@/components/TabBar'
import { getHome } from '@/service/home'
import { getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
export default {
  name: 'home',
  components: {
    swiper,
    HomeList,
    tabbar
  },
  setup() {
    const state = reactive({
      swiperList: [], // 轮播图列表
      isLogin: false, // 是否已登录
      headerScroll: false, // 滚动透明判断
      hots: [],
      newGoodses: [],
      recommends: [],
      categoryList: [ {
          name: '全球购',
          imgUrl: require('@/assets/images/3.png'),
          categoryId: 100002
        }, {
          name: '9.9元拼',
          imgUrl: require('@/assets/images/2.png'),
          categoryId: 100007
        }, {
          name: '领劵',
          imgUrl: require('@/assets/images/6.png'),
          categoryId: 100008
        }, {
          name: '省钱',
          imgUrl: require('@/assets/images/4.png'),
          categoryId: 100009
        }, {
          name: '全部',
          imgUrl: require('@/assets/images/all.png'),
          categoryId: 100010
        }
      ],
    })
    onMounted(async () => {
      const token = getLocal('token')
      if (token) {
        state.isLogin = true
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      });
      const { data } = await getHome()
      state.swiperList = data.carousels
      state.newGoodses = data.newGoodses
      state.hots = data.hotGoodses
      state.recommends = data.recommendGoodses
      Toast.clear()
    })

    nextTick(() => {
      window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 100 ? state.headerScroll = true : state.headerScroll = false
      })
    })

    const tips = () => {
      Toast('敬请期待');
    }

    return {
      ...toRefs(state),
      tips
    }
  },
}
</script>

<style lang="less" scoped >
  @import '../common/style/mixin';
  .home-header {
      position: fixed;
      left: 0;
      top: 0;
      .wh(100%, 50px);
      .fj();
      line-height: 50px;
      padding: 0 15px;
      .boxSizing();
      font-size: 15px;
      color: #fff;
      z-index: 10000;
      &.active {
        background: @primary;
      }

      .header-search {
          display: flex;
          .wh(100%, 20px);
          align-items: center;
          margin: 10px 0;
          padding: 5px;
          color: #232326;
          background: rgba(255, 255, 255, .7);
          border-radius: 20px;
          .icon-search {
              padding: 0 10px;
              font-size: 17px;
          }
          .search-title {
              flex: 1;
              font-size: 14px;
              color: #666;
              line-height: 21px;
          }
      }
  }

  .category-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(36px, 36px);
        margin: 13px auto 8px auto;
      }
      span {
        font-size: 16px;
      }
    }
  }

  .goods {
    padding-bottom: 48px;
  }
</style>