import Vue from 'vue';
import Vuex from 'vuex';

import orders from './orders';
import categories from './categories';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.DEV,
  modules: {
   orders,
   categories,
  },
});

export default store;
