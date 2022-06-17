/* eslint-disable no-unused-vars */
import {
  getAllOrders,
  sendFileOrders,
} from '../../services/API';

export const fetchOrders = async ({ commit }, params) => {
  const { data } = await getAllOrders(params);
  commit('setOrders', data);
};

export const uploadOrders = async ({ _commit }, file) => {
  return await sendFileOrders(file)
};
