import Vue from 'vue';
import Vuex from 'vuex';

import orders from './orders';
import categories from './categories';
import products from './products';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.DEV,
  modules: {
   orders,
   categories,
   products,
  },
});

export default store;
