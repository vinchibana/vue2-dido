<template>
  <div class="searchWrapper">
    <div class="searchBox" @click="goSearch">
      <div class="iconSearchWrapper">
        <svg-icon iconClass="search"></svg-icon>
      </div>
      <span class="searchPrompt">购物车空空如也~</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  name: "SearchHead",
  methods: {
    goSearch() {
      Toast({
        message: "暂未实现",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.searchWrapper {
  padding: 0.5rem 0.625rem;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: solid 1px #e6e6e6;
  z-index: 999;
}

.searchBox {
  display: block;
  padding: 0 0.875rem 0 1.75rem;
  border-radius: 1.75rem;
  height: 1.75rem;
  line-height: 1.75rem;
  font-size: 0.875rem;
  background: #f2f2f2;
}

.iconSearchWrapper {
  position: absolute;
  left: 0.9375rem;
  top: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
}

.icon {
  fill: #999;
  width: 1rem;
  height: 1rem;
}

.iconSearch {
  width: 100%;
  height: 100%;
}

.searchPrompt {
  color: #b5b5b5;
}
</style>
