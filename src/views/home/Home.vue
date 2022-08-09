<template>
  <div id="home">
    <div v-if="isShowLoading">
      <div class="head">
        <Header />
        <Sowing :sowing_list="sowing_list"></Sowing>
        <Tip :home_ad="home_ad" />
      </div>
      <Nav :nav_list="nav_list" />
      <VipTip />
      <FlashBuy :flash_product_list="flash_product_list" />
      <SpecialZone :special_zone="specialZone" />
      <TabbarGoodsItem
        :tabbar_product_list="tabbar_product_list"
        :flash_product_list="flash_product_list"
      />
      <van-divider>到底了,看看别的分类吧</van-divider>
    </div>
  </div>
</template>

<script>
import Header from "@/views/home/components/header/Header";
import Tip from "@/views/home/components/tip/Tip";
import Nav from "@/views/home/components/nav/Nav";
import TabbarGoodsItem from "@/views/home/components/tabbar/TabbarGoodsItem";
import SpecialZone from "@/views/home/components/special/SpecialZone";
import FlashBuy from "@/views/home/components/flash/FlashBuy";
import Sowing from "@/views/home/components/sowing/Sowing";
import { getHomeData } from "@/api";
import VipTip from "@/views/home/components/myVip/VipTip";

export default {
  name: "Home",
  mounted() {
    this.initData();
  },
  data() {
    return {
      // 初始化各个组件需要的数据
      isShowLoading: true,
      sowing_list: [],
      nav_list: [],
      flash_product_list: [],
      tabbar_product_list: [],
      specialZone: {},
      home_ad: "",
    };
  },

  methods: {
    async initData() {
      // 发送请求获取 homeData，分别赋值给 sowing、nav、flash、tabbar、specialZone 组件
      const res = await getHomeData();
      if (res.success) {
        const data = res.data;
        this.sowing_list = data.list[0].icon_list;
        this.nav_list = data.list[2].icon_list;
        this.flash_product_list = data.list[3].product_list;
        this.tabbar_product_list = data.list[12].product_list;
        this.specialZone = data.special_zone;
        this.home_ad = data.home_ad.image_url;
      }
    },
  },
  components: {
    Header,
    Tip,
    Nav,
    FlashBuy,
    SpecialZone,
    TabbarGoodsItem,
    Sowing,
    VipTip,
  },
};
</script>

<style lang="less" scoped>
#home {
  background-color: #f5f5f5;
  padding-bottom: 3rem;
  .head {
    margin-top: -3rem;
    width: 100%;
    background-image: url("../../assets/backImage.png");
  }
}
.van-divider {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
