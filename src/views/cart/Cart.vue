<template>
  <div class="cart">
    <header class="titleWrapper">
      <h4><strong>购物车</strong></h4>
      <div
        class="clearCart"
        :style="selectedGoodsCount == 0 ? 'color:grey' : 'color:#45c762'"
        @click="clearCart"
        v-show="isShowEmptyCart"
      >
        删除
      </div>
    </header>

    <div class="cartWrapper">
      <div class="emptyCart" v-show="!isShowEmptyCart">
        <img src="./../../images/cart/empty.png" alt="" />
        <div class="title">购物车空空如也</div>
        <router-link to="/dashboard/home" class="goHome">去逛逛</router-link>
      </div>

      <div class="contentWrapper" v-show="isShowEmptyCart">
        <div class="contentWrapperList" v-for="item in shopCart" :key="item.id">
          <section>
            <div class="shopCartListCon">
              <div class="left">
                <a
                  href="javascript:"
                  class="cartCheckBox"
                  :checked="item.checked"
                  @click.stop="single(item.id)"
                ></a>
              </div>
              <div class="center">
                <img :src="item.smallImage" alt="" />
              </div>
              <div class="right">
                <a>{{ item.name }}</a>
                <div class="bottomContent">
                  <p class="shopPrice">{{ item.price }}</p>
                  <div class="shopDeal">
                    <span @click="reduceGoods(item.id, item.num)">-</span>
                    <input type="number" disabled v-model="item.num" />
                    <span
                      @click="
                        addGoods(
                          item.id,
                          item.name,
                          item.smallImage,
                          item.price
                        )
                      "
                      >+</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <van-submit-bar
          :price="totalPrice"
          :button-text="submitBarText"
          @submit="onSubmit"
          :disabled="!(selectedGoodNum > 0)"
          v-show="isShowEmptyCart"
        >
          <van-checkbox v-model="isCheckedAll" checked-color="#45c762"
            >全选</van-checkbox
          >
        </van-submit-bar>

        <van-divider
          :style="{ color: 'black', borderColor: 'grey', padding: '0 16px' }"
          >猜你喜欢</van-divider
        >

        <ProductItem
          :product_lists="youLike_product_lists"
          :style="
            isShowEmptyCart ? 'padding-bottom:5.5rem' : 'padding-bottom:3rem'
          "
        />
      </div>
    </div>

    <div class="cartWrapper">
      <div class="emptyCart" v-show="!isShowEmptyCart"></div>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/views/home/components/tabbar/ProductItem";
import { getGuessYouLike } from "@/api";
import { Dialog, Toast } from "vant";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      youLike_product_lists: [],
      isEmptyCart: false,
    };
  },
  mounted() {
    this.initData();
  },
  components: {
    ProductItem,
  },

  computed: {
    submitBarText() {
      const count = this.selectedGoodNum;
      return "结算" + (count ? `(${count})` : "");
    },
    isShowEmptyCart() {
      return this.totalCount > 0;
    },
    totalCount() {
      return Object.keys(this.shopCart).length;
    },
    selectedGoodsCount() {
      let selectedCount = 0;
      Object.values(this.shopCart).forEach((item) => {
        if (item.checked) {
          selectedCount++;
        }
      });
      return selectedCount;
    },
    isCheckedAll: {
      get() {
        let flag = 0;
        Object.values(this.shopCart).forEach((item) => {
          if (!item.checked) {
            flag = false;
          }
        });
      },
      set(value) {
        let isCheckedAll = !value;
        this.ALL_SELECT_GOODS(isCheckedAll);
      },
    },
    ...mapState(["shopCart", "userInfo"]),
    ...mapGetters({
      selectedGoodNum: "SELECTED_GOODS_COUNT",
      totalPrice: "SELECTED_GOODS_PRICE",
    }),
  },

  methods: {
    ...mapMutations([
      "ADD_GOODS",
      "REDUCE_GOODS",
      "SINGLE_SELECT_GOODS",
      "ALL_SELECT_GOODS",
      "DELETE_SELECT_GOODS",
      "ADD_TO_CART",
    ]),
    clearCart() {
      if (this.selectedGoodsCount > 0) {
        Dialog({
          title: "提示",
          message: "确认删除吗 ?",
        })
          .then(() => {
            this.DELETE_SELECT_GOODS();
          })
          .catch(() => {});
      }
    },
    async initData() {
      let res = await getGuessYouLike();
      if (res.success) {
        this.youLike_product_lists = res.data.product_list;
      }
    },
    reduceGoods(goodsID, num) {
      if (num > 1) {
        this.REDUCE_GOODS({ goodsID });
      } else if (num == 1) {
        Dialog.confirm({
          title: "提示",
          message: "确认删除该商品吗？",
        })
          .then(() => {
            this.REDUCE_GOODS({ goodsID });
          })
          .catch(() => {});
      }
    },
    addGoods(goodsID, goodsName, goodsSmallImage, goodsPrice) {
      this.ADD_GOODS({
        goodsID,
        goodsName,
        goodsSmallImage,
        goodsPrice,
      });
    },
    single(goodsID) {
      this.SINGLE_SELECT_GOODS({ goodsID });
    },
    onSubmit() {
      if (this.selectedGoodNum > 0) {
        this.$router.push("/order");
      } else {
        Toast({
          message: "请选择需要结算的商品",
          duration: 1000,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .titleWrapper {
    width: 100%;
    height: 2.6rem;
    background: #fff;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titleWrapper .clearCart {
    position: absolute;
    right: 0.3rem;
    font-size: 0.8rem;
  }
  .disableClearCart {
    color: grey;
  }
  .cartWrapper {
    width: 100%;
    height: 100rem;
    margin-top: 2.6rem;
    @media screen and (min-width: 300px) and(max-width: 374px) {
      .van-submit-bar {
        bottom: 3.3rem;
      }
    }
    @media screen and (min-width: 375px) and(max-width: 420px) {
      .van-submit-bar {
        bottom: 2.7rem;
      }
    }
    @media screen and (min-width: 420px) and(max-width: 1024px) {
      .van-submit-bar {
        bottom: 1.4rem;
      }
    }
    .emptyCart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        padding-top: 2rem;
        width: 50%;
        height: 8rem;
        margin: 0 auto;
      }
      .title {
        text-align: center;
        padding: 0.5rem;
      }
      .goHome {
        margin-top: 2rem;
        color: white;
        background-color: #45c763;
        text-align: center;
        margin: 0 auto;
        padding: 0.5rem;
        width: 5rem;
        height: 1rem;
        line-height: 1rem;
        border-radius: 1rem;
      }
    }
    .contentWrapper {
      padding-top: 0.5rem;
      section {
        background-color: #ffffff;
        .shopCartListCon {
          display: flex;
          height: 6rem;
          border-bottom: 0.01rem solid #e0e0e0;
          margin-bottom: 0.7rem;
          padding: 0.5rem 0;
          justify-content: center;
          align-items: center;
          .left {
            flex: 1;
            display: flex;
            a {
              display: inline-block;
              margin-top: 0.8rem;
              margin-left: 0.5rem;
            }
            .cartCheckBox {
              background: url("./../../images/cart/shop-icon.png") no-repeat;
              background-size: 2.5rem 5rem;
              width: 1rem;
              height: 1rem;
            }
            .cartCheckBox[checked] {
              background-position: -1.2rem 0;
            }
          }
          .center {
            flex: 3;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .right {
            flex: 6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            position: relative;
            a {
              height: 2.2rem;
              line-height: 1.2rem;
              overflow: hidden;
              margin-bottom: 0.3rem;
              font-size: 0.8rem;
              color: #000;
            }
          }
        }
        .bottomContent {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .shopPrice {
            font-size: 0.8rem;
          }
          .shopDeal span {
            display: inline-block;
            width: 1rem;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            float: left;
          }
          .shopDeal input {
            float: left;
            width: 2rem;
            height: 1.2rem;
            text-align: center;
            margin: 0 0.2rem;
            font-size: 0.8rem;
            background-color: #f5f5f5;
            border: 0;
          }
        }
      }
    }
  }
  .van-checkbox {
    margin-left: 0.5rem;
  }
}
</style>
