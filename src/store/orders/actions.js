/* eslint-disable no-unused-vars */
import {
  getAllOrders
} from '../../services/API';

export const fetchOrders = async ({ commit }, search) => {
  const searchParam = search || '';
  const { data } = await getAllOrders(searchParam);
  commit('setOrders', data);
};
