<template>
  <div id="wrapper">
    <div class="titleWrapper">
      <div class="title">限时抢购</div>
      <van-count-down :time="time" class="countStyle" format="HH mm ss">
        <template v-slot="timeData">
          <span class="item">{{ timeData.hours }}</span>
          <span class="item">{{ timeData.minutes }}</span>
          <span class="item">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
      <div class="more" @click="more">更多</div>
    </div>
    <FlashFood :flash_product_list="flash_product_list" />

  </div>
</template>

<script>
import FlashFood from "@/views/home/components/flash/FlashFood";
import {Toast} from "vant";

export default {
  name: "FlashBuy",
  data() {
    return {
      // 倒计时时间设置
      time: 30 * 60 * 1000 * 100,
    };
  },
  props: ["flash_product_list"],
  components: {
    FlashFood,
  },
  methods:{
    more() {
      Toast({
        message:'更多',
        duration:1000
      })
    }
  }
};
</script>

<style lang="less" scoped>
#wrapper {
  margin-top: 0.625rem;
  padding: 1.25rem 0 0.9375rem 0;
  background-color: white;
}

.titleWrapper {
  margin: 0 0.625rem 0.625rem 0.625rem;
  height: 1.5625rem;
}
.title {
  display: inline-block;
  border-left: 4px #3cb963 solid;
  padding-left: 0.3125rem;
  height: 1.3125rem;
  line-height: 1.3125rem;
  vertical-align: middle;
  font-size: 1.1875rem;
  float: left;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: black;
}
.countStyle {
  float: left;
  margin-left: 0.7rem;
}

.more {
  color: #3cb963;
  float: right;
  font-size: 0.8rem;
}
</style>
