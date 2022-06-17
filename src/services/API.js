import Vue from 'vue';

export const getAllOrders = (search) => {
  const searchParams = search;
  return Vue.prototype.$axios.get(`/orders${searchParams}`);
};
