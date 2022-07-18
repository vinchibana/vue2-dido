<template>
  <div id="addAddress">
    <van-nav-bar
      title="添加地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="clickLeft"
    ></van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-search-result
      show-set-default
      :search-result="searchResult"
      @save="saveAddress"
      style="margin-top: 3rem"
      save-button-text="确认该地址"
    ></van-address-edit>
  </div>
</template>

<script>
import areaList from "@/config/area";
import { mapMutations } from "vuex";
export default {
  name: "AddAddress",
  data() {
    return {
      areaList: areaList,
      searchResult: [],
    };
  },
  methods: {
    ...mapMutations(["ADD_USER_SHOPPING_ADDRESS"]),
    clickLeft() {
      this.$router.go(-1);
    },
    saveAddress(content) {
      let addressID = this.addressID().toString();
      content["id"] = addressID;
      content["address"] =
        content.province +
        content.city +
        content.country +
        content.addressDetail;
      this.ADD_USER_SHOPPING_ADDRESS({ addressID, content });
      this.$router.back()
    },
    addressID() {
      let lastUUID = 0;
      return new Date().getTime() * 1000 + (lastUUID++ % 1000);
    },
  },
};
</script>

<style lang="less" scoped>
#addAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
  .van-address-edit {
    .van-button {
      background-color: #45c763;
    }
  }
}
</style>
