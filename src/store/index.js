import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import mutations from "./mutations"
Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    // actions,
    getters: {

    },
    modules: {

    }
})
export default store

// 定义全局变量
export const apiUrl = 'http://localhost:8000';