<template>
  <div class="wrapper">
    <div class="subTitleWrapper" ref="subTitleWrapper">
      <ul ref="ulContent">
        <!-- 商品分类副标题 -->
        <li
          class="title"
          v-for="(detailItem, index) in categoriesDetailData"
          :key="detailItem.id"
          :class="{ selected: currentSubTitle == index }"
          ref="subTitle"
          @click="subTitleClick(index)"
        >
          {{ detailItem.name }}
        </li>
      </ul>
    </div>

    <div class="showMenu" @click="menuClick" v-show="isShowDropMenu">
      <span class="dropMenu" v-if="menuDown">
        <svg-icon
          iconClass="down"
          style="width: 1.5rem; height: 1.5rem"
        ></svg-icon>
      </span>
      <span class="upMenu" v-else>
        <svg-icon
          iconClass="up"
          style="width: 1.5rem; height: 1.5rem"
        ></svg-icon>
      </span>
    </div>

    <!-- 下拉菜单（定义两个自定义 click 事件） -->
    <DropMenu
      :menuDown="!menuDown"
      :categoriesDetailData="categoriesDetailData"
      :currentSubTitle="currentSubTitle"
      @itemClick="itemClick"
      @touchClick="menuClick"
    />

    <section class="r_list" ref="r_list">
      <div ref="b">
        <div
          v-for="(item, index) in categoriesDetailData"
          :key="index"
          ref="good"
        >
          <!-- 右侧每个 section 的标题-->
          <p class="productCategoryTitle">
            {{ item.name }}
          </p>
          <ul>
            <!-- 每个商品（商品名、描述、价格） -->
            <li
              v-for="(good, index) in item.products"
              :key="index"
              class="list"
              @click.stop="goToGoodsDetail(good)"
            >
              <div class="list_item flex">
                <p>
                  <img v-lazy="good.small_image" alt="" />
                </p>
                <div>
                  <p class="name">{{ good.product_name }}</p>
                  <p class="des">{{ good.spec }}</p>
                  <p class="price">{{ good.price }}</p>
                  <p class="originPrice">{{ item.origin_price }}</p>

                  <!-- 添加购物车按钮（stop 阻止事件继续传播）-->
                  <div class="iconCartWrapper" @click.stop="addToCart(good)">
                    <svg-icon
                      iconClass="car"
                      style="height: 1.5rem; width: 1.5rem"
                    ></svg-icon>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottomTip">我是有底线的</div>
      </div>
    </section>
  </div>
</template>

<script>
import DropMenu from "@/views/category/components/DropMenu";
import BScroll from "better-scroll";
import { mapMutations } from "vuex";
export default {
  name: "ContentView",
  components: {
    DropMenu,
  },
  data() {
    return {
      scrollY: 0,
      currentSubTitle: 0,
      arrLi: 0,
      flag: true,
      value: 0,
      // 菜单箭头
      menuDown: true,
      // 下拉菜单显示状态
      isShowDropMenu: false,
    };
  },
  mounted() {
    // 初始化两个滚动
    this.$nextTick(() => {
      this.initTitleScroll();
      this.initProductScroll();
    });
  },
  watch: {
    // watch 右侧数据，改变时将品类副标题重置为 0，menuDown 重置为 true ……
    categoriesDetailData() {
      this.currentSubTitle = 0;
      this.menuDown = true;
      this.$nextTick(() => {
        this.initTitleScroll();
        this.initProductScroll();
        this.showDropMenu();
      });
    },
  },
  props: ["categoriesDetailData"],
  methods: {
    // ...mapMutations(["ADD_GOODS", "ADD_TO_CART"]),
    ...mapMutations({
      addToCart: "ADD_TO_CART",
    }),

    initTitleScroll() {
      let contentWrapperWidth = 120;
      let el = this.$refs.subTitle;
      // 累加每个上级分类下的副标题长度
      for (let i = 0; i < el.length; i++) {
        contentWrapperWidth += el[i].clientWidth;
      }
      // 使 content（ulContent）长度大于 wrapper（subTitleWrapper）长度得以滚动
      this.$refs.ulContent.style.width = contentWrapperWidth + "px";
      if (!this.titleScroll) {
        this.titleScroll = new BScroll(".subTitleWrapper", {
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true,
        });
      } else {
        this.titleScroll.refresh();
      }
    },
    initProductScroll() {
      this.$nextTick(() => {
        if (!this.productScroll) {
          this.productScroll = new BScroll(this.$refs.r_list, {
            // 容器
            probeType: 3,
            click: true,
            mouseWheel: true,
          });
        } else {
          this.productScroll.refresh();
        }
      });
    },

    // 点击下拉菜单箭头
    menuClick() {
      this.isShowDropMenu = true;
      this.menuDown = !this.menuDown;
    },

    // 控制下拉菜单箭头是否显示 content 宽度大于 wrapper（即超出无法显示，更多内容通过下拉菜单来显示）
    showDropMenu() {
      let subTitleWrapperWidth = this.$refs.subTitleWrapper.clientWidth;
      let ulContentWidth = this.$refs.ulContent.clientWidth;
      this.isShowDropMenu = ulContentWidth > subTitleWrapperWidth;
    },

    // 点击副标题传递 index，用 refs 取元素，调用 titleScroll 实现点击滚动至相应元素
    subTitleClick(index) {
      // index 通过 currentSubTitle 传递给 DropMenu 以高亮显示
      this.currentSubTitle = index;
      let el = this.$refs.subTitle[index];
      this.titleScroll.scrollToElement(el, 300);
      // 同时让商品列表滚动至相应位置
      console.log(this.$refs.good[index]);
      this.productScroll.scrollToElement(this.$refs.good[index], 100, 0);
    },

    // 点击下拉菜单的项目
    itemClick(index) {
      this.currentSubTitle = index;
      // 触发副标题点击事件
      this.subTitleClick(index);
      this.menuDown = true;
    },

    // 传递商品对象，解构出 query 参数 路由跳转商详页
    goToGoodsDetail(good) {
      this.$router.push({
        name: "goodsDetail",
        query: {
          id: good.id,
          name: good.name,
          small_image: good.small_image,
          price: good.price,
          spec: good.spec,
          total_sales: good.total_sales,
          origin_price: good.origin_price,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
/**scrollTitle  CSS***/
.wrapper {
  width: 100%;
  .subTitleWrapper {
    width: 100%;
    height: 2.8rem;
    display: inline-block;
    white-space: nowrap;
    border-bottom: solid 0.01rem #e8e9e8;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    top: 2.8rem;
    background-color: white;
    .title {
      display: inline-block;
      font-size: 0.73rem;
      padding: 1rem;
    }
    .selected {
      color: #3cb963;
    }
  }
  .showMenu {
    position: fixed;
    width: 10%;
    height: 2.5rem;
    line-height: 2.5rem;
    right: -0.2rem;
    z-index: 1999;
    margin-top: 0.1rem;
    background-color: white;
    .menuIcon {
      width: 100%;
      height: 2.8rem;
    }
  }
}

.r_list {
  position: absolute;
  left: 5.2rem;
  right: 0;
  top: 2.9rem;
  bottom: 0;
  overflow: hidden;
  // 防止抖动
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  .productCategoryTitle {
    display: inline-block;
    font-size: 0.73rem;
    border-left: 3px solid #d9dde1;
    height: 0.32rem;
    width: 100%;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
    padding: 1rem 1rem 1rem 0.28rem;
  }
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .list {
    padding: 0.36rem 0.36rem 0 0.36rem;
    img {
      width: 4.0625rem;
      height: 4.0625rem;
      border-radius: 0.04rem;
      display: block;
      // 等比缩小图片来适应元素的尺寸
      background-size: contain;
      background-image: url("../../../images/placeholderImg/product-img-load.png");
    }
    .list_item {
      justify-content: flex-start;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      padding-bottom: 1rem;
      position: relative;
      & > div {
        margin-left: 0.2rem;
        .name {
          font-size: 0.8375rem;
          line-height: 1rem;
          color: rgb(7, 17, 27);
          margin-bottom: 0.16rem;
        }
        .des,
        .sale {
          padding: 0.2rem;
          line-height: 0.8rem;
          font-size: 0.65rem;
          color: rgb(147, 153, 159);
          margin-bottom: 0.16rem;
        }
        .sale {
          margin-bottom: 0;
          span {
            margin-left: 0.24rem;
          }
        }
        .price {
          display: inline;
          font-size: 0.75rem;
          color: red;
        }
        .originPrice {
          display: inline;
          padding-left: 0.5rem;
          text-decoration: line-through;
          font-size: 0.6875rem;
          color: #b2b2b2;
        }
        .add {
          position: absolute;
          right: 0;
          bottom: 0.28rem;
        }
        .iconCartWrapper {
          position: absolute;
          width: 1.875rem;
          top: 3.4rem;
          right: 0.6rem;
        }
        .icon {
          fill: #999;
          width: 1rem;
          height: 1rem;
        }
        .iconCart {
          display: block;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
  .bottomTip {
    padding-top: 0.8rem;
    color: grey;
    font-size: 0.6rem;
    text-align: center;
  }
}
</style>
