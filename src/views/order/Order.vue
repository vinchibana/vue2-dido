<template>
  <div id="order">
    <van-nav-bar
      title="填写订单"
      :fixed="true"
      @click="onClickLeft"
      left-arrow
    ></van-nav-bar>
    <van-contact-card
      :type="address_type"
      add-text="选择收货地址"
      :name="address_name"
      :tel="address_phone"
      @click="chooseAddress"
      style="margin-top: 3rem"
    ></van-contact-card>

    <van-cell-group>
      <van-cell
        title="送达时间"
        :value="deliveryTime"
        is-link
        @click="showTimePickView"
      >
        <template v-slot="label">
          <span class="custom-title">超过十分钟可获得积分补偿</span>
          <van-icon name="question-o"></van-icon>
        </template>
      </van-cell>

      <TimeIntervalList />
      <div class="wrapper" @click="goToGoodsList">
        <div class="productImageWrapper" ref="productImageWrapper">
          <ul class="imageWrapper" ref="imageWrapper">
            <li
              ref="subWrapper"
              v-for="(item, index) in goods"
              style="display: inline"
              :key="index"
            >
              <img :src="item.smallImage" alt="" />
            </li>
          </ul>
        </div>

        <ul class="productCount">
          <span>{{ selectedCount }}</span>
          <van-icon name="arrow"></van-icon>
        </ul>
      </div>
    </van-cell-group>

    <van-cell-group v-model="radio">
      <van-cell-group title="支付方式">
        <van-cell clickable @click="radio = '1'">
          <template v-slot="title">
            <img
              src="./../../images/order/wx.png"
              width="25px"
              style="vertical-align: middle; padding-right: 5px"
              alt=""
            />
            <span>微信支付</span>
          </template>
          <van-radio
            slot="right-icon"
            name="1"
            checked-color="#07c160"
          ></van-radio>
        </van-cell>

        <van-cell clickable @click="radio = '2'">
          <template v-slot="title">
            <img
              src="./../../images/order/zfb.png"
              width="32"
              style="vertical-align: middle; padding-right: 5px"
              alt=""
            />
            <span>支付宝支付</span>
          </template>
          <van-radio
            slot="right-icon"
            name="2"
            checked-color="#07c160"
          ></van-radio>
        </van-cell>

        <van-cell clickable @click="radio = '3'">
          <template v-slot="title">
            <img
              src="./../../images/order/hb.png"
              width="32"
              style="vertical-align: middle; padding-right: 5px"
              alt=""
            />
            <span>红包支付</span>
          </template>
          <van-radio
            slot="right-icon"
            name="3"
            checked-color="#07c160"
          ></van-radio>
        </van-cell>
      </van-cell-group>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-coupon-cell
        :coupons="coupons"
        :chose-coupon="chosenCoupon"
        @click="showList = true"
      >
      </van-coupon-cell>

      <van-cell>
        <van-popup v-model="showList" position="bottom">
          <van-coupon-list
            :coupons="coupons"
            :chose-coupon="chosenCoupon"
            @change="onChange"
            @exchange="onExchange"
          >
          </van-coupon-list>
        </van-popup>
        <span slot="title"
          >使用{{ integral }}支付宝支付<b>{{ integralToPrice }}</b></span
        >
        <van-switch
          v-model="checked"
          slot="right-icon"
          @input="onInput"
          active-color="#07c160"
        ></van-switch>
      </van-cell>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-field
        label="备注"
        placeholder="选填,可以告诉我们您的特殊需求"
        rows="1"
        autosize
        is-link
      ></van-field>
    </van-cell-group>

    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="总金额">
        <div class="money">{{ selectedTotalPrice / 100 }}</div>
      </van-cell>
      <van-cell title="配送费">
        <div class="money">0.00</div>
      </van-cell>
      <van-cell title="积分" v-show="isShowPreferential">
        <div class="integralToMoney">[{{ integralToPrice }}</div>
      </van-cell>
    </van-cell-group>

    <van-submit-bar
      :price="actualPrice"
      label="支付"
      button-text="提交订单"
      @submit="onSubmit"
    ></van-submit-bar>

    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TimeIntervalList from "@/views/order/children/TimeIntervalList";
import { mapGetters, mapMutations } from "vuex";
import PubSub from 'pubsub-js'
import {CHOOSE_USER_ADDRESS} from "@/config/pubsub_type";

export default {
  name: "Order",
  components: {
    TimeIntervalList,
  },
  data() {
    return {
      address_type: "add", //地址卡片类型
      address_name: null, // 收货人
      address_phone: null, // 收货人电话
      address_id: null, // 收货人地址ID

      radio: "1", // 支付方式
      checked: false, // 积分兑换开关
      isShowPreferential: false, // 展示积分兑换
      integral: 800, // 积分,
      showList: false, // 展示优惠列表

      deliveryTime: "请选择送达时间",
      showDateTimePopView: false,
      coupons: [
        {
          // 优惠券信息
          available: 1,
          condition: "无使用门槛\n最多优惠1.5元",
          reason: "",
          value: 150,
          name: "优惠券",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "1.5",
          unitDesc: "元",
        },
        {
          // 优惠券信息
          available: 1,
          condition: "无使用门槛\n最多优惠1.5元",
          reason: "",
          value: 200,
          name: "优惠券",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "2",
          unitDesc: "元",
        },
      ],
      chosenCoupon: -1,
    };
  },
  computed: {
    ...mapGetters({
      selectedCount: "SELECTED_GOODS_COUNT",
      goods: "SELECTED_GOODS",
      selectedTotalPrice: "SELECTED_GOODS_PRICE",
    }),
    actualPrice() {},
    integralToPrice() {},
  },

  mounted() {
    this.INIT_SHOP_CART();
    PubSub.subscribe(CHOOSE_USER_ADDRESS,(msg,data) => {
      if (msg == CHOOSE_USER_ADDRESS) {
        this.address_type = 'edit';
        this.address_name = data.name;
        this.address_phone = data.tel;
        this.address_id = data.id;
      }
    })
  },
  beforeDestroy () {
    PubSub.unsubscribe(CHOOSE_USER_ADDRESS);
  },
  methods: {
    ...mapMutations(["INIT_SHOP_CART"]),
    onClickLeft() {
      this.$router.back();
    },
    chooseAddress() {
      this.$router.push("/order/myAddress");
    },
    showTimePickView() {},
    goToGoodsList() {
      this.$router.push({ name: "orderGoodsList" });
    },
    onChange() {},
    onExchange() {},
    onInput() {

    },
    onSubmit() {},
  },
};
</script>

<
<style lang="less" scoped>
#order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin-bottom: 5rem;
  .wrapper {
    height: 4rem;
    width: 100%;
    position: relative;
    .productImageWrapper {
      display: flex;
      white-space: nowrap;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: start;
      height: 4rem;
      width: 80%;
      overflow: hidden;
      .imageWrapper {
        flex-wrap: nowrap;
        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }
    .productCount {
      right: 0.1rem;
      top: 1.5rem;
      position: absolute;
      color: grey;
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
}
</style>
