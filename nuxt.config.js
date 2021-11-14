import colors from 'vuetify/es5/util/colors'
import redirectSSL from 'redirect-ssl'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Quai - %s',
    title: 'Home',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        hid: 'gtm-script1',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-G3NBQLK3HM',
        async: true,
        defer: true,
      },
      {
        hid: 'gtm-script2',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-G3NBQLK3HM');
        `,
        type: 'text/javascript',
        charset: 'utf-8',
      },
    ],
  },

  // Set middleware to redirect to SSL on prod
  serverMiddleware: [
    redirectSSL.create({ enabled: process.env.VERIFY_SSL === 'verify' }),
  ],

  router: {
    scrollBehavior(to, from) {
      if (from.path != to.path) {
        if (to.hash) {
          setTimeout(() => {
            return window.scrollTo({
              top: document.querySelector(to.hash).offsetTop,
              behavior: 'smooth',
            })
          }, 500)
        } else {
          return window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }

      if (to.hash) {
        var doc = document.querySelector(to.hash)
        if (doc == null) {
          return window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop,
          behavior: 'smooth',
        })
      }
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    hostname: '',
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    collapseBooleanAttributes: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true,
    useShortDoctype: true,
  },
  server: {
    port: 4000, // default: 3000
  },
}
