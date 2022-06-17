import Vue from 'vue';
import Vuex from 'vuex';

import orders from './orders';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.DEV,
  modules: {
   orders
  },
});

export default store;
