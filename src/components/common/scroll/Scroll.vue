<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import PullDown from "@better-scroll/pull-down";
import ObserveImage from "@better-scroll/observe-image";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(Pullup);
BScroll.use(PullDown);

BScroll.use(ObserveImage);
BScroll.use(ObserveDOM);
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true, //针对页面刷新的
      observeImage: true, //防止上拉加载时图片未加载出来而触发上拉加载
    });
    //2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    //3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });

    // this.scroll.refresh();
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
      this.scroll.refresh();
    }, //上拉一次后可以继续上拉，不过没有这个的或只能上拉一次
  },
};
</script>

<style>
</style>