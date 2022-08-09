<template>
  <swiper id="swiper" :options="swiperOptions">
    <swiper-slide v-for="sowing in sowing_list" :key="sowing.public_id">
      <img :src="sowing.icon_url" alt="">
    </swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Sowing",
  data() {
    return {
      // swiper 轮播图配置
      swiperOptions: {
        notNextTick: true,
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        observer: true,
        observeParents: true,
        speed: 600,
        on: {
          slideChangeTransitionEnd() {},
          //   preventLinksPropagation: false
        },
      },

    }
  },
  components: {
    swiper,
    swiperSlide,
  },
  // 轮播图数据数组
  props:['sowing_list']
};
</script>

<style scoped>
#swiper {
  padding-top: 6rem;
  width: 95%;
  height: 10rem;
}
#swiper img {
  width: 100%;
  height: 100%;
}
/*
穿透修改样式
*/
#swiper >>> .swiper-pagination-bullet-active {
  background-color: #75a342;
}

#swiper >>> .swiper-pagination-bullet {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0;
}
</style>
