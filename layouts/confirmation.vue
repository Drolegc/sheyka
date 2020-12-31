<template>
    <v-app>
        <v-app-bar
        app
        absolute
        class="elevation-0 primary"
        >
        <v-btn icon color="white" @click="$router.push('/')"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <span class="sheyka-app-bar white--text">Sheyka</span>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{on,attrs}">
              <v-btn 
              icon 
              color="white" 
              v-bind="attrs"
              v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
<v-list>
    <v-list-item @click="$router.push('/profile/')">
        <v-list-item-title>Mi perfil</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$router.push('/orders/')">
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
<script2 src="https://checkout.epayco.co/checkout.js"></script2>
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
            nombre_apellido: {
                get() {
                    return this.$store.getters["new/getNombreApellido"]
                }
            },
            calle_numero: {
                get() {
                    return this.$store.getters["new/getCalleNumero"]
                }
            },
            piso_puerta_otros: {
                get() {
                    return this.$store.getters["new/PisoPuertaOtros"]
                }
            },
            codigo_postal: {
                get() {
                    return this.$store.getters["new/getCodigoPostal"]
                }
            },
            telefono: {
                get() {
                    return this.$store.getters["new/getTelefono"]
                }
            },
            documento: {
                get() {
                    return this.$store.getters["new/getDocumento"]
                }
            },
            paisSeleccionado: {
                set(value) {
                    this.$store.dispatch("new/setPais", value)
                },
                get() {
                    return this.$store.getters["new/getPais"]
                }
            },
            ciudadSeleccionada: {
                set(value) {
                    this.$store.dispatch("new/setCiudad", value)
                },
                get() {
                    return this.$store.getters["new/getCiudad"]
                }
            }

        },
        methods: {
            createOrder() {

                if (!this.$store.getters["new/checkOrderInformation"]) {
                    this.$root.$emit('showOrderInformation')
                    return
                }

                var handler = ePayco.checkout.configure({
                    key: '1dec2b485b2f6dcf1ea69d936bb005a5',
                    test: true
                })
                var frames = this.$store.getters["new/frames"]
                var data = {
                    //Parametros compra (obligatorio)
                    name: `${frames} cuadros de 20x20`,
                    description: `${frames} cuadros de Sheyka de 20x20 cms`,
                    currency: "cop",
                    amount: "",
                    country: "co",
                    lang: "en",

                    //Onpage="false" - Standard="true"
                    external: "false",


                    //Atributos opcionales
                    extra1: "extra1",
                    extra2: "extra2",
                    extra3: "extra3",
                    response: "http://localhost:3000/orders/acepted",
                    confirmation: "http://84ce528a8263.ngrok.io/orders",
                    accepted: "http://localhost:3000/orders/acepted",
                    rejected: "http://localhost:3000/orders/rejected",
                    //Atributos cliente
                    name_billing: this.nombre_apellido,
                    address_billing: `Calle numero: ${this.calle_numero}. Otros (piso, puerta, etc): ${this.piso_puerta_otros}`,
                    type_doc_billing: "cc",
                    mobilephone_billing: this.telefono,
                    number_doc_billing: this.documento,

                    //atributo deshabilitación metodo de pago
                    //methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]

                }

                this.$axios.get('/order-price').then(response => {
                    var amount = response.data
                    var newAmount = amount['price'] * frames
                    data["amount"] = newAmount
                    handler.open(data)
                })

            }
        }

    }
</script>