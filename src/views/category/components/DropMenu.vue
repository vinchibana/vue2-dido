<template>
  <div
    id="dropMenu"
    v-if="menuDown"
    @touchmove.prevent
    ref="dropMenuWrap"
    @click="touchClick"
  >
    <!-- 下拉菜单 -->
    <div class="itemWrapper">
      <ul v-for="(item, index) in categoriesDetailData" :key="item.id">
        <li
          class="titleItem"
          @click="itemClick(index)"
          :class="{ selected: currentSubTitle === index }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropMenu",
  // menuDown 指示、categoriesDetailData 下拉菜单内容、currentSubTitle 指示高亮
  props: ["menuDown", "categoriesDetailData", "currentSubTitle"],
  methods: {
    // 点击下拉菜单的项目
    itemClick(index) {
      this.$emit("itemClick", index);
    },

    // 点击下拉菜单箭头
    touchClick() {
      this.$emit("touchClick");
    },
  },
};
</script>

<style lang="less" scoped>
#dropMenu {
  position: fixed;
  justify-content: flex-start;
  z-index: 50 !important;
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  top: 5.6rem;
  bottom: 3rem;
  .itemWrapper {
    padding: 0.5rem;
    display: flex;
    flex-flow: row wrap;
    background-color: white;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .titleItem {
      text-align: center;
      margin-right: 2rem;
      margin-top: 0.4rem;
      width: 3.5rem;
      line-height: 1.4rem;
      height: 1.4rem;
      font-size: 0.65rem;
      border-radius: 1rem;
      color: rgba(0, 0, 0, 0.7);
      border: 1px solid grey;
    }
    .selected {
      background-color: rgba(60, 185, 99, 0.1);
      color: #3cb963;
      border: 1px solid #3cb963;
    }
  }
}
@keyframes animate {
  from {
    height: 0;
    top: 0;
  }
  to {
    height: 90%;
    top: 0;
  }
}
</style>
