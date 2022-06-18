/* eslint-disable no-unused-vars */
import {
  getAllProducts,
  getProduct
} from '../../services/API';

export const fetchProducts = async ({ commit }, params) => {
  const { data } = await getAllProducts(params);
  commit('setProducts', data);
};

export const detailsProduct = async({ commit }, params) => {
  const { data } = await getProduct(params);
  commit('setProduct', data.product);
}
