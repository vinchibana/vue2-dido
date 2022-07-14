<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

* {
  touch-action: pan-y;
}
</style>

