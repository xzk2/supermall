<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" />
      <span>全选</span>
    </div>

    <div class="price">合计:{{ totalprice }}</div>

    <div class="calculate">去计算：{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalprice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      //   return !this.$store.state.cartList.filter((item) => !item.checked).length; //先在数组中找一下有没有不被选中的，有应该为false所以取反
      return !this.$store.state.cartList.find((item) => !item.checked); //查找里面有没有不被选中的，有应该为false所以取反
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;

  bottom: 40px;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: skyblue;
}
</style>