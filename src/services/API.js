import Vue from 'vue';

export const getAllOrders = (params) => {
  const {
    rowsPerPage,
    page,
  } = params.pagination
  return Vue.prototype.$axios.get(`/orders?page=${page}&per_page=${rowsPerPage}`);
};
