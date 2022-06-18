/* eslint-disable no-unused-vars */
import {
  getAllOrders,
  sendFileOrders,
  getOrder,
} from '../../services/API';

export const fetchOrders = async ({ commit }, params) => {
  const { data } = await getAllOrders(params);
  commit('setOrders', data);
};

export const detailsOrder = async ({ commit }, params) => {
  const { data } = await getOrder(params);
  commit('setOrder', data.order);
}

export const uploadOrders = async ({ _commit }, file) => {
  return await sendFileOrders(file)
};
