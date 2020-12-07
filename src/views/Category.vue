<template>
  <div class="categray">
    <div>
      <header class="category-header wrap">
        <div class="header-search">
          <van-icon name="search" />
          <router-link tag="span" class="search-title" to="./product-list?from=category">vue3.0/koa/mysql打造全栈项目</router-link>
        </div>
      </header>
      <div class="search-wrap" ref="searchWrap">
        <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
          <ul class="nav-side">
            <li
              v-for="item in categoryData"
              :key="item.id"
              v-text="item.category_name.substring(0,8)"
              :class="{'active' : currentIndex == item.id}"
              @click="selectMenu(item.id)"
            ></li>
          </ul>
        </list-scroll>
        <div class="search-content">
          <list-scroll :scroll-data="categoryData" >
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <template v-for="(category, index) in categoryData">
                  <div class="swiper-slide" v-if="currentIndex == category.id" :key="index">
                    <!-- <img class="category-main-img" :src="category.mainImgUrl" v-if="category.mainImgUrl"/> -->
                    <div class="category-list" v-for="(products, index) in category.children" :key="index">
                      <p class="catogory-title">{{products.category_name}}</p>
                      <div class="product-item" v-for="(product, index) in products.children" :key="index" @click="selectProduct(product)">
                        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3062962250,1882153521&fm=26&gp=0.jpg" class="product-img"/>
                        <p v-text="product.category_name" class="product-title"></p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </list-scroll>
        </div>
      </div>

      <tabbar />

    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import tabbar from '@/components/TabBar'
import listScroll from '@/components/ListScroll'
import { getCategory } from "@/service/good";
import { Toast } from 'vant'
export default {
  components: {
    tabbar,
    listScroll
  },
  setup() {
    const router = useRouter()
    // composition API 获取 refs 的形式
    const searchWrap = ref(null)
    const state = reactive({
      categoryData: [],
      currentIndex: 1
    })

    onMounted(async () => {
      let $screenHeight = document.documentElement.clientHeight
      console.log('searchWrap.value', searchWrap.value)
      searchWrap.value.style.height = $screenHeight - 100 + 'px'
      Toast.loading('加载中...')
      const { data } = await getCategory()
      console.log('data: ', data);
      Toast.clear()
      state.categoryData = data
    })

    const goHome = () => {
      router.push({ path: 'home' })
    }

    const selectMenu = (index) => {
      state.currentIndex = index
    }

    const selectProduct = (item) => {
      console.log('item', item.id)
      router.push({ path: '/product-list', query: { categoryId: item.id } })
    }
    return {
      ...toRefs(state),
      goHome,
      selectMenu,
      selectProduct,
      searchWrap
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../common/style/mixin';
  .categray {
    .category-header {
      background: #fff;
      position: fixed;
      left: 0;
      top: 0;
      .fj();
      .wh(100%, 50px);
      line-height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      font-size: 15px;
      color: #656771;
      z-index: 10000;
      &.active {
        background: @primary;
      }
      .icon-left {
        font-size: 25px;
        font-weight: bold;
      }
      .header-search {
        display: flex;
        .wh(100%, 20px);
        align-items: center;
        margin: 10px 0;
        padding: 5px;
        color: #232326;
        background: #F7F7F7;
        border-radius: 20px;
        .search-title {
          flex: 1;
          font-size: 12px;
          color: #666;
          line-height: 21px;
        }
      }
    }
  }
  .search-wrap {
    .fj();
    width: 100%;
    margin-top: 50px;
    background: #F8F8F8;
    border-top: 1px solid #999;
    .nav-side-wrapper {
      width: 28%;
      height: 100%;
      overflow: hidden;
      .nav-side {
        width: 100%;
        .boxSizing();
        background: #F8F8F8;
        li {
          width: 100%;
          height: 56px;
          text-align: center;
          line-height: 56px;
          font-size: 14px;
          &.active {
            color: @primary;
            background: #fff;
          }
        }
      }
    }
    .search-content {
      width: 72%;
      height: 100%;
      padding: 0 10px;
      background: #fff;
      .boxSizing();
      .swiper-container {
        width: 100%;
        .swiper-slide {
          width: 100%;
          .category-main-img {
            width: 100%;
          }
          .category-list {
            display: flex;
            flex-wrap: wrap;
            flex-shrink: 0;
            width: 100%;
            .catogory-title {
              width: 100%;
              font-size: 17px;
              font-weight: 500;
              padding: 20px 0;
            }
            .product-item {
              width: 33.3333%;
              margin-bottom: 10px;
              text-align: center;
              font-size: 15px;
              .product-img {
                .wh(30px, 30px);
              }
            }
          }
        }
      }
    }
  }
  .fade-out-enter-active, .fade-out-leave-active {
    // transition: opacity 0.5s;
  }

  .fade-out-enter, .fade-out-leave-to {
    // opacity: 0;
  }
</style>