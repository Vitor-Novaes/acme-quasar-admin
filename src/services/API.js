import Vue from 'vue';

export const getAllOrders = (params) => {
  const {
    rowsPerPage,
    page,
  } = params.pagination

  let url = `/orders?page=${page}&per_page=${rowsPerPage }`

  const {
    sort,
    category
  } = params.search

  if (sort) url = url.concat(`&sort_by_sales=${sort}`)
  if (category) url = url.concat(`&by_category=${category}`)

  return Vue.prototype.$axios.get(url)
};

export const getAllCategories = () => {
  return Vue.prototype.$axios.get(`/categories`);
};

export const getAllProducts = (params) => {
  const {
    rowsPerPage,
    page,
  } = params.pagination

  let url = `/products?page=${page}&per_page=${rowsPerPage}`

  const {
    sort,
    category
  } = params.search

  if (sort) url = url.concat(`&sort_by_sales=${sort}`)
  if (category) url = url.concat(`&by_category=${category}`)

  return Vue.prototype.$axios.get(url)
}

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
