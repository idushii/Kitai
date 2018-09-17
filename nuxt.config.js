import bodyParser from 'body-parser'
import session from 'express-session'

let host = 'http://localhost:3000/';
host = 'http://ovz1.j693917.1qyn6.vps.myjino.ru/';

export default {
  head: {
    title: 'Язык китая',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Auth Routes example' }
    ],
    script: [
      { src: '/js/tinymce/tinymce.min.js' }
    ],    
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
    host,
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    // proxyHeaders: false
  },
  router: {
    extendRoutes (routes) {
      for(let index in routes) {
        if (routes[index].path == '/Page/Testing' ) routes[index].redirect = '/Test'
        if (routes[index].path == '/' ) routes[index].redirect = '/Page/Main'
      }
      return routes
    },
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Add server middleware
  ** Nuxt.js uses `connect` module as server
  ** So most of express middleware works with nuxt.js server middleware
  */
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    //baseURL: 'http://ovz1.j693917.1qyn6.vps.myjino.ru/',
    //baseURL: 'http://localhost:8080/',
    baseURL: host,
    //baseURL: 'http://192.168.43.13:80/',
    //baseURL: 'http://169.254.185.70:80/',
  },
  plugins: ['~/plugins/global.js', {src: '~plugins/no-ssr', ssr: false}],
  store: true
}
