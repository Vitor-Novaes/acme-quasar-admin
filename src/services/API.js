import Vue from 'vue';

export const getAllOrders = (params) => {
  const {
    rowsPerPage,
    page,
  } = params.pagination
  return Vue.prototype.$axios.get(`/orders?page=${page}&per_page=${rowsPerPage}`);
};

export const sendFileOrders = (file) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  const formData = new FormData();
  formData.append('file', file);
  return Vue.prototype.$axios.post(
    `/orders/import-data`,
    formData,
    { headers }
  );
}
