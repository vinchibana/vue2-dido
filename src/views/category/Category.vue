<template>
  <div id="category">
    <SearchHead />
    <div class="listWrapper" v-if="!isShowLoading">
      <div class="leftWrapper">
        <ul class="wrapper">
          <li
            class="categoryItem"
            v-for="(cate,index) in categoriesData"
            :key="cate.id"
            ref="menuList"
            :class="{ selected: currentIndex == index }"
            @click="clickLeftLi(index)"
          >
            <span class="textWrapper">{{ cate.name }}</span>
          </li>
        </ul>
      </div>

      <ContentView :categoriesDetailData="categoriesDetailData"/>
    </div>

    <Skeleton v-if="isShowLoading"/>
  </div>
</template>

<script>
import SearchHead from "./components/SearchHead";
import Skeleton from "@/views/category/skeleton";
import ContentView from "./components/ContentView";
import { getCategoryData, getCategoryDetailData } from "@/api";
import BScroll from "better-scroll";
export default {
  name: "Category",
  components: {
    SearchHead,
    ContentView,
    Skeleton
  },
  data() {
    return {
      isShowLoading: true,
      categoriesData: [],
      categoriesDetailData: [],
      currentIndex: 0,
      isShowLoadingGif: false,
    };
  },

  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let leftRes = await getCategoryData();
      if (leftRes.success) {
        this.categoriesData = leftRes.data.cate;
      }

      let rightRes = await getCategoryDetailData('/lk001');
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate;
      }
      this.isShowLoading = false
      this.$nextTick(() => {
        if (!this.leftScroll) {
          this.leftScroll = new BScroll(".leftWrapper",{
            probeType:3,
            click:true,
            scrollY:true,
            tap:true,
            mouseWheel:true
          })
        } else {
          this.leftScroll.refresh()
        }
      })
    },

    async clickLeftLi(index) {
      this.currentIndex = index
      let menuList = this.$refs.menuList
      let el = menuList[index]
      this.leftScroll.scrollToElement(el,300)
      let param
      if (index >= 9) {
        param = `/lk0${index + 1}`
      } else {
        param = `/lk00${index + 1}`
      }
      let rightRes = await getCategoryDetailData(param)
      if (rightRes.success) {
        this.categoriesDetailData = rightRes.data.cate
      }
    }
  },
};
</script>

<style scoped>
#category {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.listWrapper {
  display: flex;
  position: absolute;
  top: 2.75rem;
  bottom: 3rem;
  width: 100%;
  overflow: hidden;
}

.leftWrapper {
  background-color: #f4f4f4;
  width: 5.3125rem;
  flex: 0 0 5.3125rem;
}

.categoryItem {
  padding: 0.75rem 0;
  border-bottom: solid 0.01rem #e8e9e8;
  position: relative;
}

.categoryItem .textWrapper {
  line-height: 1.25rem;
  border-left: solid 0.1875rem transparent;
  padding: 0.3125rem 0.6875rem;
  font-size: 0.8125rem;
  color: #666666;
}

.categoryItem.selected {
  background: #fff;
}

.categoryItem.selected .textWrapper {
  border-left-color: #3cb963;
  font-weight: bold;
  font-size: 0.875rem;
  color: #333333;
}

@media (min-width: 960px) {
  .wrapper {
    border-right: 0.01rem solid #e8e9e8;
  }

  .wrapper .categoryItem {
    background: #fff;
  }
}
</style>
