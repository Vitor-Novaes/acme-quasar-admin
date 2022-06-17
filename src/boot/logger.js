import VueLogger from 'vuejs-logger';

// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.use(VueLogger, {
    logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    showLogLevel: true,
    showConsoleColors: true,
    showMethodName: true,
  });
};
