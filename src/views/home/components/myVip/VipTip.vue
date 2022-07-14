<template>
  <div id="vipPage">
    <svg-icon iconClass="vip" class="icon"></svg-icon>
    <span class="title">加入会员·每年预计节省806元</span>
    <span class="subTitle">五折开卡</span>
  </div>
</template>

<script>
export default {
  name: "VipTip",
};
</script>

<style lang="less" scoped>
#vipPage {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem auto;
  height: 2rem;
  background-color: #3bba63;
  width: 95%;
  border-radius: 0.2rem;
  opacity: 0.9;
  .icon {
    padding-left: 0.5rem;
  }
  .title {
    margin-left: 0.5rem;
    font-size: 0.6rem;
    color: white;
  }
  .subTitle {
    margin-left: auto;
    margin-right: 0.5rem;
    font-size: 0.6rem;
    color: white;
  }
}
</style>
