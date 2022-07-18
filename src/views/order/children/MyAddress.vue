<template>
  <div id="myAddress">
    <van-nav-bar
      title="收货地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="clickLeft"
    ></van-nav-bar>
    <div class="noDataPlaceHold" v-show="shippingAddress.length < 1">
      <img src="./../../../images/order/noAddress.png" alt="" />
      <span class="desc">还没有添加过地址呢,添加一个吧</span>
    </div>

    <van-address-list
      v-model="chosenAddressId"
      :list="shippingAddress"
      @add="addAddress"
      @edit="editAddress"
      @select="selectAddress"
      style="margin-top: 3rem"
      add-button-text="添加地址"
    >
    </van-address-list>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import PubSub from "pubsub-js";
import {CHOOSE_USER_ADDRESS} from "@/config/pubsub_type";

export default {
  name: "MyAddress",
  data() {
    return {
      chosenAddressId: 0,
    };
  },
  computed: {
    ...mapState(["shippingAddress"]),
  },
  methods: {
    ...mapMutations(["INIT_USER_SHOPPING_ADDRESS"]),
    clickLeft() {
      this.$router.back();
    },
    addAddress() {
      this.$router.push("/order/myAddress/addAddress");
    },
    editAddress(item, index) {
      this.$router.push({ name: "editAddress", params: { content: item } });
    },
    selectAddress(item, index) {
      PubSub.publish(CHOOSE_USER_ADDRESS, item);
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
#myAddress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40%;
      height: 20%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
    }
  }
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
  .van-address-list__add {
    bottom: 1rem;
  }
  .van-button--large {
    left: 15%;
    width: 70%;
    border-radius: 2rem;
    background-color: #45c763;
    border: none;
  }
}
</style>
