import Vue from 'vue';

// Orders
export const getAllOrders = (params) => {
  const {
    rowsPerPage,
    page,
  } = params.pagination

  let url = `/orders?page=${page}&per_page=${rowsPerPage }`

  const {
    sort,
    category,
    status
  } = params.search

  if (sort) url = url.concat(`&sort_by_sales=${sort}`)
  if (category) url = url.concat(`&by_category=${category}`)
  if (status) url = url.concat(`&status=${status}`)

  return Vue.prototype.$axios.get(url)
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

export const getOrder = (params) => {
  return Vue.prototype.$axios.get(`/orders/${params.id}`);
}


// Category
export const getAllCategories = () => {
  return Vue.prototype.$axios.get(`/categories`);
};

// Products
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

export const getProduct = (params) => {
  return Vue.prototype.$axios.get(`/products/${params.id}`);
}


// Variants
export const getAllVariants = (params) => {
  const {
    rowsPerPage,
    page,
  } = params.pagination

  let url = `/variants?page=${page}&per_page=${rowsPerPage}`

  const {
    sort,
    category
  } = params.search

  if (sort) url = url.concat(`&sort_by_sales=${sort}`)
  if (category) url = url.concat(`&by_category=${category}`)

  return Vue.prototype.$axios.get(url)
}

// TODO getAll refactor at least for now
