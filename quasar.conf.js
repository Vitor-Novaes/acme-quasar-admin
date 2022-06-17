/* eslint-disable */

module.exports = function (ctx) {
  return {
    boot: [
      'axios',
      'logger',
      'vuelidate',
      'notify-defaults',
    ],
    css: [
      'app.css'
    ],
    extras: [
      'fontawesome-v5',
      'roboto-font',
      'material-icons'
    ],
    framework: {
      importStrategy: 'auto',
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
      ],
      lang: 'pt-br'
    },
    build: {
      env: ctx.dev ? {
        BASE_URL: 'http://localhost:3000/v1',
        STAGE: 'dev',
      } : {
        BASE_URL: process.env.API_URL,
        STAGE: process.env.STAGE,
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      extendWebpack(cfg) {
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader',
          exclude: /(node_modules|quasar)/
        });
      }
    },
    devServer: {
      open: true,
    },

    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      manifest: {
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          'src': 'icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
        ]
      }
    },

    cordova: {

    },

    capacitor: {

    },

    electron: {

      packager: {

      },

      builder: {},

      nodeIntegration: true,
      extendWebpack(cfg) { }
    }
  }
};
