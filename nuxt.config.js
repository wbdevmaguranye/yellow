const isDev = process.env.NODE_ENV == "production";
const useEmulators = false;

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: "static",
  server: {
    default: 3000,
    host: "0.0.0.0" // default: localhost
  },
  head: {
    title: "YellowDot",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  router: {
    linkExactActiveClass: "exact-active-link"
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/vee-validate", "~/plugins/vue-formulate.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules

  modules: [
    "@nuxtjs/axios",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyDORd--GKb0cWcG_6bexT3XVAMSFx9j9n0",
          authDomain: "yellowdot-eef1f.firebaseapp.com",
          databaseURL: "https://yellowdot-eef1f-default-rtdb.firebaseio.com",
          projectId: "yellowdot-eef1f",
          storageBucket: "yellowdot-eef1f.appspot.com",
          messagingSenderId: "452236325240",
          appId: "1:452236325240:web:ffdd18c20b893a72f1588d"
        },
        services: {
          auth: {
            persistance: "local",
            ssr: true,
            initialize: {
              // onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
              onAuthStateChangedAction: "onAuthStateChangedAction",
              subscribeManually: false
            },
            emulatorPort: isDev && useEmulators ? 9099 : undefined,
            emulatorHost: isDev && useEmulators ? "http://localhost" : undefined
          },
          firestore: {
            memoryOnly: false, // default
            chunkName:
              process.env.NODE_ENV !== "production" ? "firebase-auth" : "[id]", // default
            enablePersistence: true,
            emulatorPort: isDev && useEmulators ? 8086 : undefined,
            emulatorHost: isDev && useEmulators ? "localhost" : undefined
            // settings: {
            //   // Firestore Settings - currently only works in SPA mode
            // },
          },
          storage: true,
          functions: {
            location: "us-central1",
            emulatorPort: isDev && useEmulators ? 5001 : undefined,
            emulatorHost: isDev && useEmulators ? "http://localhost" : undefined
          }
        },
        options: { terminateDatabasesAfterGenerate: true },
        lazy: true //https://firebase.nuxtjs.org/service-options/auth calling onAuthStateChangedMutation does not work in lazy mode
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        config.devtool = "source-map";
      }
    },
    // transpile: ["vee-validate/dist/rules"],
    /*
     ** You can extend webpack config here
     */
    transpile: ["vee-validate/dist/rules"]
  }
};
