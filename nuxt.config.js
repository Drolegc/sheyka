import colors from 'vuetify/es5/util/colors'

export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        titleTemplate: '%s - sheyka',
        title: 'sheyka',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/style.css'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/auth'

    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    auth: {
        autoLogout: true,
        localStorage: false,
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "/auth/local/",
                        method: "post",
                        propertyName: "jwt"
                    },
                    logout: false,
                    user: {
                        url: "/users/me/",
                        method: "get",
                        propertyName: false
                    },
                },
                tokenRequired: true,
                tokenType: "Bearer"
            }
        },
        redirect: {
            login: "/bienvenido",
            logout: "/home",
            user: "/"
        }
    },

    axios: {
        baseURL: 'http://localhost:1337'
    },

    // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
    vuetify: {
        treeShake: true,
        customVariables: ['~/assets/variables.scss'],
        theme: {
            themes: {
                light: {
                    primary: '#651882',
                    accent: colors.grey.darken3,
                    secondary: '#e98652',
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {

    }
}