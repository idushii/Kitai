import bodyParser from 'body-parser'
import session from 'express-session'

export default {
  head: {
    title: 'Язык китая',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'Auth Routes example' }
    ]
  },
  env: {
    //baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    // proxyHeaders: false
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
    baseURL: 'http://localhost:3000/',
  },
  plugins: ['~/plugins/global.js', {src: '~plugins/no-ssr', ssr: false}],
  store: true
}
