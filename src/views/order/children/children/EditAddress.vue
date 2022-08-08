<template>
  <div id="editAddress">
    <van-nav-bar
      title="编辑收货地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="clickLeft"
    ></van-nav-bar>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :addressInfo="addressInfo"
      :searchResult="searchResult"
      @save="saveAddress"
      @delete="deleteAddress"
      style="margin-top: 3rem"
    ></van-address-edit>
  </div>
</template>

<script>
import areaList from "./../../../../config/area";
import { mapMutations } from "vuex";
export default {
  name: "EditAddress",
  data() {
    return {
      areaList: areaList,
      addressInfo: {},
      searchResult: [],
    };
  },

  mounted() {
    this.addressInfo = this.$route.params.content;
  },
  methods: {
    ...mapMutations([
      "ADD_USER_SHOPPING_ADDRESS",
      "DELETE_USER_SHOPPING_ADDRESS",
      "CHANGE_USER_SHOPPING_ADDRESS",
    ]),
    clickLeft() {
      this.$router.back();
    },
    saveAddress(content) {
      let id = content.id;
      content["address"] =
        content.province +
        content.city +
        content.country +
        content.addressDetail;
      this.CHANGE_USER_SHOPPING_ADDRESS({
        id,
        content,
      });
      this.$router.back();
    },
    deleteAddress(content) {
      let id = content.id;
      this.DELETE_USER_SHOPPING_ADDRESS({ id });
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
#editAddress {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 99999;
}
</style>
