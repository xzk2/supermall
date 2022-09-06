<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperimageLoad="swiperimageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMUltidata, getHomeGoods } from "network/home";
import { backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin], //混入
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",

      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMUltidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  //挂载
  mounted() {},
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index1) {
      switch (index1) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index1;
      this.$refs.tabControl2.currentIndex = index1;
    }, //对流行。。。几个页面传输

    contentScroll(position) {
      this.listenShowBackTop(position);

      //2.决定tabControl是否吸顶(position：fixed)
      this.isTabFixed = -position.y > this.$refs.tabControl2.$el.offsetTop;
    }, //隐藏/显示  回到顶部按钮
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperimageLoad() {
      //吸顶效果 获取tabControl的offsetTop
      //所有组件都有一个属性$el:用于获取组件中的元素 $el是在挂载中使用的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }, //  等待轮播图加载完
    /**
     * 网络请求相关方法
     */
    getHomeMUltidata() {
      getHomeMUltidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //页码加一
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list); //将获取的数据遍历加入数组中
        this.goods[type].page += 1; //页码加一输出

        this.$refs.scroll.finishPullUp(); //调用上拉刷新
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  position: relative;
  margin-top: -1px;
  z-index: 9;
}
.content {
  overflow: hidden;

  position: fixed;
  top: 44px;
  bottom: 44px;
}
</style>