<template>
  <div>
    <nav-bar class="detail-nav">
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="titles-item"
          :class="{ active: index === currentIndex }"
          @click="inClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    inClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
      // this.$router.go(-1)
    },
  },
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}
.titles {
  display: flex;
  font-size: 14px;
}
.titles-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
</style>