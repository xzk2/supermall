import {POP, NEW, SELL} from "./const"
import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
    components: {
        BackTop,
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        }, //传递回到顶部x,y位置
        listenShowBackTop(position) {
            //1.判断BackTop是否显示
            this.isShowBackTop = -position.y > 1000;
        },
    }
}

export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }