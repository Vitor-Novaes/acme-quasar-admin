/* eslint-disable no-unused-vars */
import {
  getAllOrders
} from '../../services/API';

export const fetchOrders = async ({ commit }, params) => {
  const { data } = await getAllOrders(params);
  commit('setOrders', data);
};
