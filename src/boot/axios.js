import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const baseURL = process.env.BASE_URL || '/';

Vue.use(VueAxios, axios);

axios.defaults.baseURL = baseURL;

Vue.prototype.$axios = axios;
