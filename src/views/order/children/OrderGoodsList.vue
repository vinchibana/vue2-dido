<template>
  <div id="orderGoodsList">dfsfsdf
    <van-nav-bar
      title="商品清单"
      left-arrow
      :fixed="true"
      @click-left="onClick"
    ></van-nav-bar>
    <div class="listTitle">
      <span>订单商品</span>
      <span class="total">{{ selectedCount }}</span>
    </div>
    <ul>
      <li v-for="(item, index) in goods" :key="index" class="goodsList">
        <div class="listItem">
          <img :src="item.smallImage" alt="">
        </div>
        <div class="textDetail">
          <p class="name">{{item.name}}</p>
          <span class="subParam">价格{{item.price}}</span>
          <span class="subParam">数量{{item.num}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderGoodsList",
  mounted() {
  },
  computed: {
    // 从store中取选中的商品信息
    ...mapGetters({
      selectedCount: "SELECTED_GOODS_COUNT",
      goods: "SELECTED_GOODS",
    }),
  },
  methods: {
    onClick() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
#orderGoodsList {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 200;
  overflow-y: auto;
  overflow-x: hidden;
  .listTitle {
    padding-left: 0.5rem;
    margin-top: 3rem;
    height: 1.5rem;
    line-height: 1.5rem;
    width: 100%;
    background-color: white;
    border-bottom: solid 0.01rem #e8e9e8;
    font-size: 0.9rem;
    .total {
      padding-right: 2rem;
      font-size: 0.9rem;
      float: right;
    }
  }
  .goodsList {
    display: flex;
    height: 3rem;
    width: 100%;
    background-color: white;
    border-bottom: solid 0.01rem #e8e9e8;
    .listItem {
      height: 3rem;
      width: 10%;
      img {
        padding: 0.5rem;
        width: 100%;
        height: 2.5rem;
      }
    }
    .textDetail {
      height: 3rem;
      width: 70%;
      padding-left: 0.9rem;
      .name {
        font-size: 0.8rem;
        padding: 0.3rem 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .subParam {
        font-size: 0.6rem;
        color: grey;
        padding-right: 0.5rem;
      }
    }
    .goodPrice {
      padding-top: 0.3rem;
      font-size: 0.8rem;
    }
  }
}
</style>
