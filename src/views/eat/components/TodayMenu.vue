<template>
  <div>
    <div id="todayMenu">
      <div class="todayMenuWrapper">
        <div class="menuList">
          <ul ref="menuUlContent">
            <!-- 下拉菜单 -->
            <li
              class="menuItem"
              v-for="(item, index) in todayMenuCategoryList"
              :key="item.id"
              ref="menuTitle"
              :class="{ selected: currentSubTitle === index }"
              @click="menuItemClick(index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="menuAll" @click="clickAll">
          {{ msg }}
          <span class="downMenu" v-if="menuDown">
            <svg-icon
              iconClass="down"
              style="width: 1rem; height: 1rem"
            ></svg-icon>
          </span>
          <span class="upMenu" v-else>
            <svg-icon
              iconClass="up"
              style="width: 1rem; height: 1rem"
            ></svg-icon>
          </span>
        </div>
      </div>
      <MenuCategoryList
        :todayMenuCategoryList="todayMenuCategoryList"
        :isShowMenuList="isShowMenuList"
        @menuItemClick="menuItemClick"
      />
    </div>
  </div>
</template>

<script>
import MenuCategoryList from "@/views/eat/components/MenuCategoryList";
import { getTodayMenuCategoryList } from "@/api";
import BScroll from "better-scroll";

export default {
  name: "TodayMenu",
  data() {
    return {
      // 下拉菜单箭头指示
      menuDown: true,
      // 下拉菜单显示 flag
      isShowMenuList: false,
      todayMenuCategoryList: [],
      msg: "全部",
      // 用于
      currentSubTitle: 0,
    };
  },
  components: {
    MenuCategoryList,
  },

  mounted() {
    this.initData();
  },

  watch: {
    menuDown() {
      // watch menuDown 的状态
      this.msg = this.menuDown == true ? "全部" : "收起";
    },
  },
  methods: {
    async initData() {
      let res = await getTodayMenuCategoryList();
      if (res.success) {
        this.todayMenuCategoryList = res.data.list;
        this.$nextTick(() => {
          this.initMenuTitleScroll();
        });
      }
    },

    // 初始化菜单标题滚动
    initMenuTitleScroll() {
      if (!this.menuTitleScroll) {
        let contentWrapperWidth = 100;
        let el = this.$refs.menuTitle;
        // 累加标题个数，判断总 content 宽度是否大于 wrapper
        for (let i = 0; i < el.length; i++) {
          contentWrapperWidth += el[i].clientWidth;
        }
        // menuUlContent 作为内容
        this.$refs.menuUlContent.style.width = contentWrapperWidth + "px";
        this.menuTitleScroll = new BScroll(".menuList", {  // .menuList 作为容器
          probeType: 3,
          startX: 0,
          click: true,
          scrollX: true,
        });
      } else {
        this.menuTitleScroll.refresh();
      }
    },

    // 点击菜单项将当前 index 传递给 currentSubTitle
    menuItemClick(index) {
      this.currentSubTitle = index;
      let el = this.$refs.menuTitle[index];
      this.menuTitleScroll.scrollToElement(el, 300);
      if (this.isShowMenuList) {
        this.isShowMenuList = false;
      }
    },

    // 点击 “全部”
    clickAll() {
      this.menuDown = !this.menuDown;
      this.isShowMenuList = !this.isShowMenuList;
    },
  },
};
</script>

<style lang="less" scoped>
#todayMenu {
  width: 100%;
  margin-top: 6.5rem;
  overflow: hidden;
  margin-bottom: 3rem;
  .todayMenuWrapper {
    width: 100%;
    height: 1.5rem;
    display: inline-block;
    white-space: nowrap;
    border-bottom: solid 0.01rem #e8e9e8;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    top: 5.1rem;
    background-color: white;
    .menuList {
      width: 80%;
      overflow: hidden;
      .menuItem {
        margin-right: 0.5rem;
        display: inline-block;
        font-size: 0.73rem;
        border: 1px solid #dedede;
        border-radius: 0.6rem;
        padding: 0.3rem;
      }
      .selected {
        color: #3cb963;
        border: 1px solid #3cb963;
      }
    }
    .menuAll {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 0.9rem;
      font-size: 0.6rem;
      color: gray;
      .downMenu {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>
