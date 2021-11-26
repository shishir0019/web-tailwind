import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'mitbringen',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'favicon/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: 'favicon/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'favicon/favicon-32x32.png'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0c64c1' },

  /*
   ** Global CSS
   */
  css: [

  ],

  serverMiddleware: [ ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/auth-next',
    '@/modules/api',
    '@nuxtjs/gtm',
    [
      'nuxt-facebook-pixel-module',
      {
        /* module options */
        track: 'PageView',
        pixelId: 'pixelId',
        autoPageView: true,
        disabled: false
      }
    ],
    [
      'nuxt-social-meta',
      {
        title: 'mitbringen',
        description: 'mitbringen',
        url: 'https://mitbringen.vercel.app',
        img: '/link_to_image_in_static_folder.jpg',
        locale: 'de-DE',
        twitter: '@twitterHandle',
        themeColor: '#3367D6'
      }
    ],
    'bootstrap-vue/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-imagemin',
    [
      'nuxt-imagemin',
      {
        optipng: { optimizationLevel: 5 },
        gifsicle: { optimizationLevel: 2 }
      }
    ],
    '@nuxtjs/robots',
    'nuxt-i18n',
  ],

  // All routes do need authentication
  // router: {
  //   middleware: ['auth']
  // },

  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  i18n: {},

  robots: {
    UserAgent: '*',
    Disallow: '/'
  },

  axios: {
    baseURL: process.env.BASE_URL ? `${process.env.BASE_URL}/api/`: 'https://dev.tripheros.com/api/'
  },



  sitemap: {
    hostname: 'https://mitbringen.vercel.app',
    gzip: true,
    exclude: ['/secret', '/admin/**']
  },

  // sentry: {
  //   dsn: 'https://xyz.ingest.sentry.io/xyz',
  //   config: {}
  // },

  // pwa: {
  //   manifest: {
  //     name: 'Cto',
  //     lang: 'de',
  //     theme_color: '#3367D6'
  //   },
  //   workbox: {
  //     importScripts: ['pushSw.js']
  //   }
  // },

  gtm: {
    id: '{G-Tag-ID}'
  },

  /*
   ** Plugins to load before mounting the App
   */
  // '~/plugins/Userback.client',
  plugins: [
 
  ],

  build: {
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    extend (config: any, ctx: any) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },

  
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/pwa',
    'nuxt-compress',
    '@nuxtjs/tailwindcss'
  ],
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },

  // Netlify reads a 404.html, Nuxt will load as an SPA
  generate: {
    fallback: '404.html'
  },

  env: {},

  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.ts', '.vue', '.js']
  }
}

export default config
