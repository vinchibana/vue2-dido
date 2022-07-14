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
  USER_INFO_BIRTHDAY,
  USER_INFO_SEX,
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

import {ADD_TO_CART} from "@/config/pubsub_type";

export default {
  [ADD_GOODS]() {},
  [INIT_SHOP_CART](state) {
    let initCart = getLocalStorage('shopCart')
    if (initCart) {
      state.shopCart = JSON.parse(initCart)

    }
  },
  [INIT_USER_INFO](state) {
    let initUserInfo= getLocalStorage('userInfo')
    if (initUserInfo) {
      state.userInfo = JSON.parse(initUserInfo)
    }
  },
  [ADD_TO_CART](state) {

  }
};
