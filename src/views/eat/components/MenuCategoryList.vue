<template>
  <div id="allMenuWrapper">
    <div class="menuLists" ref="menuLists" v-show="isShowMenuList">
      <div class="menuWrapper">
        <span class="menuCategoryTitle" v-if="recentlyChooseList.length > 0"
          >最近找过</span
        >
        <ul class="contentTip">
          <li v-for="item in recentlyChooseList" :key="item.id" class="item">
            {{ item.name }}
          </li>
        </ul>
        <span class="menuCategoryTitle">菜单分类</span>
        <ul class="contentTip">
          <li
            v-for="(item, index) in todayMenuCategoryList"
            :key="item.id"
            @click="menuTitleClick(index)"
            class="item"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <MenuWaterFall v-show="!isShowMenuList" />
  </div>
</template>

<script>
import MenuWaterFall from "./MenuWaterFall";
export default {
  name: "MenuCategoryList",
  data() {
    return {
      currentMenuTitle: "",
      recentlyChooseList: [],
    };
  },
  props: ["todayMenuCategoryList", "isShowMenuList"],
  components: { MenuWaterFall },
  methods: {
    menuTitleClick(index) {
      this.currentMenuTitle = index;
      this.$emit("menuItemClick", index);
      if (this.recentlyChooseList.length <= 7) {
        this.recentlyChooseList.unshift(this.todayMenuCategoryList[index]);
        this.recentlyChooseList = Array.from(new Set(this.recentlyChooseList))
      } else {
        this.recentlyChooseList.pop();
        this.recentlyChooseList.unshift(this.todayMenuCategoryList[index]);
        this.recentlyChooseList = Array.from(new Set(this.recentlyChooseList))

      }
    },
  },
};
</script>

<style lang="less" scoped>
.menuLists {
  padding: 0.5rem;
  width: 100%;
  background-color: white;
  overflow: auto;
  .menuCategoryTitle {
    font-size: 0.6rem;
    color: grey;
  }
  .menuWrapper {
    .contentTip {
      padding: 0.5rem;
      display: flex;
      flex-flow: row wrap;
      .item {
        text-align: center;
        margin-right: 1.45rem;
        margin-top: 0.4rem;
        width: 3.3rem;
        line-height: 1.5rem;
        height: 1.5rem;
        font-size: 0.6rem;
        border-radius: 1rem;
        color: rgba(0, 0, 0, 0.7);
        border: 1px solid #dedede;
      }
    }
  }
}
</style>
