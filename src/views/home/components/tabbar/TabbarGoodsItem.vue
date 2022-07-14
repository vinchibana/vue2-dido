<template>
  <div id="tabbarItem">
    <van-tabs
      v-model="active"
      animated
      swipeable
      sticky
      :border="false"
      :offset-top="47"
      ref="tabs"
      type="line"
      color="#28BE57"
      title-active-color="#28BE57"
      animated:yes
    >
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[0] }}</span>
        </div>
        <ProductItem :product_lists="tabbar_product_list"></ProductItem>
      </van-tab>
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[1] }}</span>
        </div>
        <ProductItem :product_lists="flash_product_list"></ProductItem>
      </van-tab>
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[2] }}</span>
        </div>
        <ProductItem :product_lists="tabbar_product_list"></ProductItem>
      </van-tab>
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[3] }}</span>
        </div>
        <ProductItem :product_lists="flash_product_list"></ProductItem>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ProductItem from "@/views/home/components/tabbar/ProductItem";
export default {
  name: "TabbarGoodsItem",
  props: ["tabbar_product_list", "flash_product_list"],
  data() {
    return {
      active: 0,
      itemsTitle: ["全部", "晚餐", "人气", "心选"],
    };
  },
  components:{
    ProductItem
  }
};
</script>

<style lang="less" scoped>
#tabbarItem {
  width: 100%;
}
</style>
