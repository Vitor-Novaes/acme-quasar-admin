/* eslint-disable no-unused-vars */
import {
  getAllVariants,
} from '../../services/API';

export const fetchVariants = async ({ commit }, params) => {
  const { data } = await getAllVariants(params);
  commit('setVariants', data);
};

