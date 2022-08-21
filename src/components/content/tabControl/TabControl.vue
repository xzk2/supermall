<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index1, index) in titles"
      :key="index"
      :class="{ active: index1 === currentIndex }"
      @click="itemClick(index1)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index1) {
      this.currentIndex = index1;
      this.$emit("tabClick", index1);
    },
  },
};
</script>
    
<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>