import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

//2.创建state对象
const state = {
  cartList: []
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  actions,
  modules: {
  }
})
