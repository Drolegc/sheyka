<template>
    <v-app>
        <v-app-bar
        app
        absolute
        class="elevation-0 primary"
        >
        <v-btn icon color="secondary" @click="$router.push('/')"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <span class="sheyka-app-bar white--text">Sheyka</span>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{on,attrs}">
              <v-btn 
              icon 
              color="secondary" 
              v-bind="attrs"
              v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
<v-list>
    <v-list-item>
        <v-list-item-title>Mi perfil</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Mis ordenes</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Preguntas frecuentes</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Terminos y condiciones</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-icon>
            <v-icon> mdi-whatsapp</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
            Comunicate con nosotros</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$auth.logout()">
        <v-list-item-title>Salir</v-list-item-title>
    </v-list-item>
</v-list>

</v-menu>
</v-app-bar>
<v-main>
    <nuxt></nuxt>
</v-main>
<v-app-bar app flat bottom color="white">
    <v-spacer></v-spacer>
    <v-btn class="rounded-lg elevation-0" color="secondary" @click="createOrder" large>Confirmar</v-btn>
    <v-spacer></v-spacer>
</v-app-bar>
</v-app>

</template>

<script>
    import VS2 from 'vue-script2'

    export default {
        name: 'confirmation',
        middleware: "auth",
        data() {
            return {
                options: [{
                    title: 'Mi perfil',
                    callback: ''
                }, {
                    title: 'Mis ordenes',
                    callback: ''
                }, {
                    title: 'Contacto',
                    callback: ''
                }, {
                    title: 'Click Me 2',
                    callback: ''
                }, ],
            }
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },

        },
        methods: {
            createOrder() {
                VS2.load('https://checkout.epayco.co/checkout.js')
                    .then(() => {
                        var handler = ePayco.checkout.configure({
                            key: '733c081b8f0b9b3c4c7259ceedbd3a34',
                            test: true
                        })
                        var data = {
                            //Parametros compra (obligatorio)
                            name: "Vestido Mujer Primavera",
                            description: "Vestido Mujer Primavera",
                            invoice: "1234",
                            currency: "cop",
                            amount: "12000",
                            tax_base: "0",
                            tax: "0",
                            country: "co",
                            lang: "en",

                            //Onpage="false" - Standard="true"
                            external: "false",


                            //Atributos opcionales
                            extra1: "extra1",
                            extra2: "extra2",
                            extra3: "extra3",
                            confirmation: "http://localhost:3000",
                            response: "http://localhost:3000",

                            //Atributos cliente
                            name_billing: "Andres Perez",
                            address_billing: "Carrera 19 numero 14 91",
                            type_doc_billing: "cc",
                            mobilephone_billing: "3050000000",
                            number_doc_billing: "50148289",

                            //atributo deshabilitación metodo de pago
                            //methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]

                        }

                        handler.open(data)
                    })
                    //this.$router.push('/orders')
            }
        }

    }
</script>