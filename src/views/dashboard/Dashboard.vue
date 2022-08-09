<template>
  <div id="dashboard">
    <van-tabbar v-model="active" active-color="#76a342" class="active_tab">
      <van-tabbar-item
        :badge="item.name == 'cart' ? goodsNum : ''"
        v-for="(item, index) in tabbars"
        :key="index"
        @click="tab(index, item.name)"
      >
        <span :class="currentIndex == index ? active : ''">{{
          item.title
        }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 缓存组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Dashboard",
  data() {
    return {
      active: 0,
      // tab 栏项目数组
      tabbars: [
        {
          name: "home",
          title: "首页",
          normal: require("@/images/tabbar/home_default.png"),
          active: require("@/images/tabbar/home_selected.png"),
        },
        {
          name: "category",
          title: "分类",
          normal: require("@/images/tabbar/category_default.png"),
          active: require("@/images/tabbar/category_selected.png"),
        },
        {
          name: "eat",
          title: "吃什么",
          normal: require("@/images/tabbar/eat_default.png"),
          active: require("@/images/tabbar/eat_selected.png"),
        },
        {
          name: "cart",
          title: "购物车",
          normal: require("@/images/tabbar/shoppingcart_default.png"),
          active: require("@/images/tabbar/shoppingcart_selected.png"),
          num: 5,
        },
        {
          name: "mine",
          title: "我的",
          normal: require("@/images/tabbar/mine_default.png"),
          active: require("@/images/tabbar/mine_selected.png"),
        },
      ],
      currentIndex: 0,
    };
  },

  mounted() {
    this.initData();
  },

  methods: {
    ...mapMutations(["INIT_SHOP_CART", "INIT_USER_INFO"]),
    // 接收 index 改变高亮状态，接收 name 跳转路由
    tab(index, name) {
      this.currentIndex = index;
      this.$router.push(name);
    },

    // 初始化用户数据、购物车数据
    initData() {
      this.INIT_USER_INFO();
      this.INIT_SHOP_CART();
    },
  },

  computed: {
    ...mapState(["userInfo", "shopCart"]),
    // 遍历 state 当中的 shopcart，获得购物车商品数量
    goodsNum() {
      let num = 0;
      Object.values(this.shopCart).forEach((goods, index) => {
        num += goods.num;
      });
      if (num > 0) {
        return num;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-moz-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.moveToCart {
  animation: mymove 0.5s ease-in-out;
}
</style>
