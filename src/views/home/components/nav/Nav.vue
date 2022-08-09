<!-- TODO Chrome浏览器错位问题 -->
<template>
  <div class="wrapper">
    <van-grid   :column-num="5" :gutter="4" :border="false">
      <van-grid-item
        v-for="(nav, index) in nav_list"
        :key="index"
        :icon="nav.icon_url"
        :text="nav.name"
        @click="gotoCategory(index)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: ["nav_list"],
  methods: {
    //
    gotoCategory(index) {
      this.$router.push({ name: "category", params: { currentIndex: index } });
    },
  },
};
</script>

<style scoped></style>
