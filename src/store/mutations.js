import {
  ADD_GOODS,
  INIT_SHOP_CART,
  REDUCE_GOODS,
  SINGLE_SELECT_GOODS,
  ALL_SELECT_GOODS,
  DELETE_SELECT_GOODS,
  USER_INFO,
  INIT_USER_INFO,
  CHANGE_USER_NICK_NAME,
  LOGIN_OUT,
  INIT_USER_SHOPPING_ADDRESS,
  ADD_USER_SHOPPING_ADDRESS,
  DELETE_USER_SHOPPING_ADDRESS,
  CHANGE_USER_SHOPPING_ADDRESS,
} from "./mutation-type";
import Vue from "vue";
import { Toast } from "vant";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/config/localStorage";
import { ADD_TO_CART } from "@/config/pubsub_type";

export default {
  // ES5风格 使用一个常量作为函数名，相当于 ADD_GOODS(){}
  [ADD_GOODS](state, { goodsID, goodsName, smallImage, goodsPrice }) {
    let shopCart = state.shopCart;
    // 如果购物车有同类，数量++
    if (shopCart[goodsID]) {
      shopCart[goodsID]["num"]++;
    } else {
      // 收集解构出的 id 等等赋给 shopCart
      shopCart[goodsID] = {
        num: 1,
        id: goodsID,
        name: goodsName,
        price: goodsPrice,
        smallImage: smallImage,
        checked: true,
      };
      // Object assign
      state.shopCart = {
        ...shopCart,
      };
    }
    setLocalStorage("shopCart", state.shopCart);
  },

  // 初始化购物车
  [INIT_SHOP_CART](state) {
    let initCart = getLocalStorage("shopCart");
    if (initCart) {
      // 解析本地存储中的 shopCart
      state.shopCart = JSON.parse(initCart);
    }
  },

  [ADD_TO_CART](state, goods) {
    setTimeout(() => {
      this.commit("ADD_GOODS", {
        goodsID: goods.id,
        goodsName: goods.name,
        smallImage: goods.small_image,
        goodsPrice: goods.price,
      });
      Toast({
        message: "成功加入购物车",
        duration: 500,
      });
    });
  },

  // 取出 state 中的 shopCart，如果存在 goodsID 同款商品，num--，如果为 0 直接删除
  [REDUCE_GOODS](state, { goodsID }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsID];
    if (goods) {
      if (goods["num"] > 0) {
        goods["num"]--;
      }
      if (goods["num"] == 0) {
        delete shopCart[goodsID];
      }
      // Object assign
      state.shopCart = {
        ...shopCart,
      };
    }
  },

  [SINGLE_SELECT_GOODS](state, { goodsID }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsID];
    if (goods) {
      if (goods.checked) {
        goods.checked = !goods.checked;
      } else {
        Vue.set(goods, "checked", true);
      }
    }
    state.shopCart = {
      ...shopCart,
    };
  },

  // 取出 shopCart 遍历每项的 checked
  [DELETE_SELECT_GOODS](state) {
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((goods) => {
      if (goods.checked) {
        // 删除对象属性
        delete shopCart[goods.id];
      }
    });
    state.shopCart = {
      ...shopCart,
    };
    setLocalStorage("shopCart", state.shopCart);
  },

  [ALL_SELECT_GOODS](state, { isCheckedAll }) {
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((item) => {
      if (item.checked) {
        item.checked = !isCheckedAll;
      } else {
        Vue.set(item, "checked", !isCheckedAll);
      }
    });
  },

  [USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo;
    setLocalStorage("userInfo", state.userInfo);
  },

  [INIT_USER_INFO](state) {
    let initUserInfo = getLocalStorage("userInfo");
    if (initUserInfo) {
      state.userInfo = JSON.parse(initUserInfo);
    }
  },

  [CHANGE_USER_NICK_NAME](state, { nickName }) {
    let userInfo = state.userInfo;
    Object.keys(userInfo).forEach((info) => {
      if (info == "user_name") {
        userInfo["user_name"] = nickName;
      }
    });
    state.userInfo = {
      ...userInfo,
    };
    setLocalStorage("userInfo", state.userInfo);
  },

  [LOGIN_OUT](state) {
    state.userInfo = {};
    state.shopCart = {};
    removeLocalStorage("userInfo");
    removeLocalStorage("shopCart");
    removeLocalStorage("shippingAddress");
  },

  [INIT_USER_SHOPPING_ADDRESS](state) {
    let address = getLocalStorage("shippingAddress");
    state.shippingAddress = JSON.parse(address) || [];
  },

  [ADD_USER_SHOPPING_ADDRESS](state,{content}) {
    state.shippingAddress = [...state.shippingAddress,content]
    setLocalStorage('shippingAddress',state.shippingAddress)
  },

  [CHANGE_USER_SHOPPING_ADDRESS](state, { content }) {
    const index = state.shippingAddress.findIndex(
      (item) => item.id === content.id
    );
    state.shippingAddress.splice(index, 1, content);
    setLocalStorage("shippingAddress", state.shippingAddress);
  },

  [DELETE_USER_SHOPPING_ADDRESS](state, { id }) {
    state.shippingAddress = state.shippingAddress.filter(
      (item) => item.id !== id
    );
    setLocalStorage("shippingAddress", state.shippingAddress);
  },
};
