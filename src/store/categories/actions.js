/* eslint-disable no-unused-vars */
import {
  getAllCategories,
} from '../../services/API';

export const fetchCategories = async ({ commit }) => {
  const { data } = await getAllCategories();
  commit('setCategories', data.categories);
};
