<template>
  <div id="mine">
    <van-nav-bar
      title="我的"
      :fixed="true"
      :border="false"
      style="background-color: #3bba63; color: #fff"
    ></van-nav-bar>
    <van-cell-group style="margin-top: 2.4rem">
      <van-cell
        style="background-color: #3bba63; color: #fff"
        label-class="labelClass"
        is-link
        center
      >
        <template slot="title">
          <div class="personMsg" ></div>
        </template>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      value:'',
      // 头像
      user_image: {
        login_icon: require("./../../images/mine/defaultImg.jpeg"),
        noLogin_icon: require("./../../images/login/grey.jpg"),
        female: require("./../../images/mine/female.png"),
        male: require("./../../images/mine/male.png"),
      },
      // 订单状态
      orderData: [
        { icon: "cart-circle-o", title: "mine.itemsTitle[1]" },
        { icon: "gift-o", title: "mine.itemsTitle[2]" },
        { icon: "smile-comment-o", title: "mine.itemsTitle[3]" },
        { icon: "cash-back-record", title: "mine.waitingFeedback" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#mine {
  width: 100%;
  background-color: #f5f5f5;
  margin-bottom: 3rem;
  .version {
    margin: 0 auto;
    text-align: center;
    font-size: 0.6rem;
    background-color: #ffffff;
    height: 2rem;
    color: grey;
    line-height: 2rem;
  }
  .van-nav-bar {
    background-color: #3bba63;
    font-size: 0.6rem;
  }
  .van-nav-bar__title {
    color: white;
  }
  .personMsg {
    display: flex;
    align-items: center;
    .sex {
      position: absolute;
      top: 3.5rem;
      left: 3.8rem;
      width: 0.1rem;
      height: 0.1rem;
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }

    .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 0.8rem;
    }
  }

  .van-cell__left-icon {
    color: #45c763;
    font-size: 1.2rem;
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}
</style>
