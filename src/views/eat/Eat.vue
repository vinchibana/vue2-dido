<template>
  <div id="eatWrapper">
    <Search />
    <TodayMenu />
  </div>
</template>

<script>
import Search from "@/views/eat/components/Search";
import TodayMenu from "@/views/eat/components/TodayMenu";
export default {
  name: "Eat",
  components:{
    Search,
    TodayMenu
  }
}
</script>

<style lang="less" scoped>
#eatWrapper {
  background-color: #f5f5f5;
}
</style>
