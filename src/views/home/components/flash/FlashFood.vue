<template>
  <div id="flashFood">
    <div class="flashItemWrapper">
      <ul class="itemWrapper" ref="ulWrapper">
        <li
          class="itemInCovers"
          v-for="(product, index) in flash_product_list"
          :key="index"
          ref="productItem"
          @click="goToGoodsDetail(product)"
        >
          <img :src="product.small_image" alt="" class="itemImage" />
          <span class="title">{{ product.name }}</span>
          <div class="price">
            <p class="nowPrice">{{ product.price }}</p>
            <p class="originPrice">{{ product.origin_price }}</p>
            <div class="buyCar" @click.stop="addToCart(product, index)">
              <svg-icon
                icon-class="car"
                style="width: 1.3rem; height: 1.3rem"
              ></svg-icon>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapMutations, mapState } from "vuex";
export default {
  name: "FlashFood",
  props: ["flash_product_list"],
  mounted() {
    // TODO 用$nextTick()替用

    setTimeout(() => {
      let contentWrapperWidth = 0;
      let el = this.$refs.productItem;
      for (let i = 0; i < el.length; i++) {
        contentWrapperWidth += el[i].clientWidth;
      }
      this.$refs.ulWrapper.style.width = contentWrapperWidth + "px";
      if (!this.scroll) {
        this.scroll = new BScroll(".flashItemWrapper", {
          probeType: 2,
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical",
        });
      } else {
        this.scroll.refresh();
      }
    }, 300);
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["ADD_TO_CART"]),
    goToGoodsDetail(goods) {
      this.$router.push({
        name: "goodsDetail",
        query: {
          id: goods.id,
          name: goods.name,
          small_image: goods.small_image,
          price: goods.price,
          spec: goods.spec,
          total_sales: goods.total_sales,
          origin_price: goods.origin_price,
          isFlash: true,
        },
      });
    },
    addToCart(product) {
      this.ADD_TO_CART(product);
      if (this.userInfo.token) {
      }
    },
  },
};
</script>

<style lang="less" scoped>
#flashFood {
  .flashItemWrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    .move_dot {
      position: fixed;
      z-index: 100;
      top: 1rem;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      img {
        animation: 0.88s mymove ease-in-out;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
    .itemWrapper {
      display: flex;
      justify-content: flex-start;
    }

    .itemInCovers {
      // 设置子li的宽度
      flex: 0 0 6rem;
      align-items: center;
      padding-right: 0.5rem;
      .itemImage {
        width: 100%;
        border-radius: 50%;
        // 等比缩小图片来适应元素的尺寸
        background-size: contain;
        background-image: url("../../../../images/placeholderImg/product-img-load.png");
      }
      .title {
        padding: 0.2rem;
        display: inline-block;
        height: 1.8rem;
        line-height: 1rem;
        font-size: 0.625rem;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        position: relative;
        padding-left: 0.5rem;
        .nowPrice {
          color: #f37078;
          font-size: 0.928rem;
        }
        .originPrice {
          font-size: 0.6875rem;
          color: #999999;
          text-decoration: line-through;
        }
        .buyCar {
          position: absolute;
          right: 0.6rem;
          top: 0.1rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
  @keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @-moz-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @-webkit-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @-o-keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
}
</style>
