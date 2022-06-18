import Vue from 'vue';
import Vuex from 'vuex';

import orders from './orders';
import categories from './categories';
import products from './products';
import variants from './variants';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.DEV,
  modules: {
   orders,
   categories,
   products,
   variants,
  },
});

export default store;
