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
import router from "@/router/index";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/config/localStorage";
import { ADD_TO_CART } from "@/config/pubsub_type";

export default {
  [ADD_GOODS](state, { goodsID, goodsName, smallImage, goodsPrice }) {
    let shopCart = state.shopCart;
    if (shopCart[goodsID]) {
      shopCart[goodsID]["num"]++;
    } else {
      shopCart[goodsID] = {
        num: 1,
        id: goodsID,
        name: goodsName,
        price: goodsPrice,
        smallImage: smallImage,
        checked: true,
      };
      state.shopCart = {
        ...shopCart,
      };
    }
    setLocalStorage("shopCart", state.shopCart);
  },

  [INIT_SHOP_CART](state) {
    let initCart = getLocalStorage("shopCart");
    if (initCart) {
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

  [DELETE_SELECT_GOODS](state) {
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((goods) => {
      if (goods.checked) {
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
    state.userInfo = {}
    state.shopCart = {}
    removeLocalStorage('userInfo')
    removeLocalStorage('shopCart')
    removeLocalStorage('shippingAddress')
  }
};
