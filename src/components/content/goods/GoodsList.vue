<template>
  <div class="goods">
    <grid-view>
      <goods-list-item
        v-for="(item, index) in goods"
        :goods-item="item"
        :key="index"
      />
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GridView,
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
</style>