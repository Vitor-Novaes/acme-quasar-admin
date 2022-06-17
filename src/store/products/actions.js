/* eslint-disable no-unused-vars */
import {
  getAllProducts
} from '../../services/API';

export const fetchProducts = async ({ commit }, params) => {
  const { data } = await getAllProducts(params);
  commit('setProducts', data);
};
