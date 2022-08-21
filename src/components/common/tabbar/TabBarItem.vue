<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive() {
      //  /home ->item1(/home)=true
      //  /home ->item1(/cart)=false
      //  /home ->item1(/category)=false
      //  /home ->item1(/profile)=false
      //  获取活跃的path值与当前页面的path值进行对比
      return this.$route.path.indexOf(this.path) !== -1; //先判断页面页面内组件与页面下方组件是否匹配
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}; //匹配就给颜色
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path).catch((err) => {});
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>