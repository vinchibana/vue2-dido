<template>
  <div id="tip">
    <div class="tipBox">
      <img src="../../../../images/icon/transport.png" alt="" />
      <span class="tipText">最快29分钟内送达</span>
    </div>
    <div class="tipBox">
      <img src="../../../../images/icon/money.png" alt="" />
      <span class="tipText">0元起送 0配送费</span>
    </div>

    <div class="tipBox">
      <img src="../../../../images/icon/seal.png" alt="" />
      <span class="tipText">安心退</span>
    </div>
    <div @click="goToVip">
      <img :src="home_ad" alt="" class="adImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tip",
  props: ["home_ad"],
  methods: {
    goToVip() {
      this.$router.push({ name: "myVip" });
    },
  },
};
</script>

<style lang="less" scoped>
#tip {
  margin-top: 0.3rem;
  position: relative;
}

.tipBox {
  float: left;
  width: 33%;
  text-align: center;
}

.tipBox img {
  vertical-align: middle;
  height: 1rem;
  width: 1rem;
  margin-right: 0.2rem;
}

.tipText {
  font-size: 0.6rem;
  color: #45c763;
}
.adImg {
  margin-top: 0.8rem;
  width: 100%;
  height: 6rem;
  margin-bottom: -0.2rem;
}
.adTitle {
  position: absolute;
  top: 3.4rem;
  left: 14%;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 1.2rem;
  border-radius: 50%;
  font-size: 0.1rem;
  text-align: center;
  color: gold;
  background-image: linear-gradient(to right, #ff9569 0%, #e92758 100%);
  -webkit-animation-name: scaleDraw; /*关键帧名称*/
  -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
  -webkit-animation-iteration-count: infinite; /*动画播放的次数*/
  -webkit-animation-duration: 3s; /*动画所花费的时间*/

  @keyframes scaleDraw {
    /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
    0% {
      transform: scale(1); /*开始为原始大小*/
    }
    25% {
      transform: scale(1.1); /*放大1.1倍*/
    }
    50% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.1);
    }
  }
}
</style>
