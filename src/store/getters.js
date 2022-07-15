import {
  USER_SEX,
  SELECTED_GOODS,
  SELECTED_GOODS_PRICE,
} from "@/store/mutation-type";

export default {
  SELECTED_GOODS_COUNT(state) {
    let count = 0;
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((item) => {
      if (item.checked) {
        count++;
      }
    });
    return count;
  },

  SELECTED_GOODS(state) {
    let goods = [];
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((item) => {
      if (item.checked) {
        goods.push(shopCart[item.id]);
      }
    });
    return goods;
  },

  SELECTED_GOODS_PRICE(state) {
    let totalPrice = 0;
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((item) => {
      if (item.checked) {
        totalPrice += item.price * item.num * 100;
      }
    });
    return totalPrice;
  },
  [USER_SEX](state) {
    if (state.userInfo.sex == "1") {
      return "美女";
    } else if (state.userInfo.sex == "2") {
      return "帅哥";
    } else {
      return "未填写";
    }
  },
};
