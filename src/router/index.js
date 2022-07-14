import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/dashboard/Dashboard";
import store from "../store/store";
// 二级路由组件 Tabbar
const Home = () => import("@/views/home/Home");
const Category = () => import("@/views/category/Category");
const Eat = () => import("@/views/eat/Eat");
const Cart = () => import("@/views/cart/Cart");
const Mine = () => import("@/views/mine/Mine");

// 地图
const Map = () => import("../views/home/components/map/Map.vue");
const Login = () => import("../views/login/Login.vue");

// 订单相关
const Order = () => import("../views/order/Order.vue");
const MyAddress = () => import("../views/order/children/MyAddress.vue");
const AddAddress = () =>
  import("../views/order/children/children/AddAddress.vue");
const EditAddress = () =>
  import("../views/order/children/children/EditAddress.vue");
const OrderGoodsList = () => import("../views/order/children/OrderGoodsList");

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      // 是否数据缓存
      meta: {
        keepAlive: true,
      },
    },
    {
      // 根页面
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "/dashboard",
          redirect: "/dashboard/home",
          // 是否数据缓存
          meta: {
            keepAlive: true,
          },
        },
        {
          // 主页
          path: "home",
          name: "home",
          component: Home,
          // 是否数据缓存
          meta: {
            keepAlive: true,
          },
        },
        {
          // 分类
          path: "category",
          name: "category",
          component: Category,
          // 是否数据缓存
          meta: {
            keepAlive: true,
          },
        },
        {
          // 吃什么
          path: "eat",
          name: "eat",
          component: Eat,
          // 是否数据缓存
          meta: {
            keepAlive: true,
          },
        },
        {
          // 购物车
          path: "cart",
          name: "cart",
          component: Cart,
          meta: {
            keepAlive: true,
          },
        },
        {
          // 我的
          path: "mine",
          name: "mine",
          component: Mine,
        },
        {
          path: "map",
          name: "map",
          component: Map,
        },
      ],
    },
    {
      // 订单
      path: "/order",
      name: "order",
      component: Order,
      children: [
        {
          // 我的地址
          path: "myAddress",
          name: "myAddress",
          component: MyAddress,
          meta: {
            requireAuth: true,
          },
          children: [
            {
              // 添加地址
              path: "addAddress",
              name: "addAddress",
              component: AddAddress,
            },
            {
              // 编辑地址
              path: "editAddress",
              name: "editAddress",
              component: EditAddress,
            },
          ],
        },
        {
          path: "orderGoodsList",
          name: "orderGoodsList",
          component: OrderGoodsList,
        },
      ],
    },
    {
      // 登录
      path: "/Login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
