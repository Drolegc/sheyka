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
    <v-list-item @click="$router.push('/')">
        <v-list-item-title>Inicio</v-list-item-title>
    </v-list-item>
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
<v-dialog v-model="loading" fullscreen>
    <div class="full-height d-flex justify-center align-center shadow-background">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
</v-dialog>
<script2 src="https://checkout.epayco.co/checkout.js"></script2>
</v-app>

</template>

<script>
    import VS2 from 'vue-script2'
    import moment from 'moment';

    export default {
        name: 'confirmation',
        middleware: "auth",
        data() {
            return {
                loading: false
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
                    return this.$store.getters["new/getPisoPuertaOtros"]
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
            },
            regalo: {
                get() {
                    return this.$store.getters["new/getRegalo"]
                }
            },
            is_new_person: {
                get() {
                    return this.$store.getters["new/getIsNewPerson"]
                }
            },
            id_person: {
                get() {
                    return this.$store.getters["new/getIdPerson"]
                }
            },
            telefono_extra: {
                get() {
                    return this.$store.getters["new/getTelefonoExtra"]
                }
            }

        },
        methods: {
            async createOrder() {

                if (!this.$store.getters["new/checkOrderDirectionInformation"]) {
                    this.$root.$emit('showOrderDirectionInformation')
                    return
                }

                if (!this.$store.getters["new/checkOrderPersonInformation"]) {
                    this.$root.$emit('showOrderPersonInformation')
                    return
                }

                return
                const framesQuantity = this.$store.getters["new/frames"]

                //Generar frames
                let frames = []
                for (const photo of this.photos) {
                    let frameData = new FormData()
                    frameData.append('files.picture', photo.file, `${this.$auth.user.username+moment()}`)
                    frameData.append('data', JSON.stringify({
                        quantity: photo.cantidad
                    }))
                    let response = await this.$axios.post('/frames', frameData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    frames.push(response.data.id)
                }

                let person = null
                if (this.regalo) {
                    if (this.is_new_person) {
                        person = (await this.$axios.post('/personas', {
                            "nombre_apellido": this.nombre_apellido,
                            "documento": this.documento,
                            "email": this.email,
                            "telefono": this.telefono
                        })).data.id
                    } else {
                        person = this.id_person
                    }
                }



                let newOrderData
                try {
                    var response = await this.$axios.post('/orders', {
                        frames: frames,
                        user: this.$auth.user.id,
                        persona: person,
                        street: this.calle_numero,
                        street_number: this.piso_puerta_otros,
                        country: this.paisSeleccionado,
                        city: this.ciudadSeleccionada,
                        telefono_extra: this.telefono_extra
                    })

                    newOrderData = response.data

                } catch (e) {
                    console.error("Error generando orden de ocmpra", e)
                    return
                }

                //Generar Orden

                var handler = ePayco.checkout.configure({
                    key: '1dec2b485b2f6dcf1ea69d936bb005a5',
                    test: true
                })
                var data = {
                    //Parametros compra (obligatorio)
                    name: `${framesQuantity} cuadros de 20x20(cm)`,
                    description: `${framesQuantity} cuadros de Sheyka de 20x20 cms`,
                    currency: "cop",
                    amount: newOrderData.price,
                    country: "co",
                    lang: "en",

                    //Onpage="false" - Standard="true"
                    external: "true",


                    //Atributos opcionales
                    extra1: newOrderData.id,
                    // extra2: "extra2",
                    // extra3: "extra3",
                    response: window.location.hostname + ":3000/orders",
                    confirmation: this.$axios.defaults.baseURL + "/orders/confirm",
                    accepted: window.location.hostname + ":3000/orders/acepted",
                    rejected: window.location.hostname + ":3000/orders/rejected",
                    //Atributos cliente
                    name_billing: this.nombre_apellido,
                    address_billing: `Calle numero: ${this.calle_numero}. Otros (piso, puerta, etc): ${this.piso_puerta_otros}`,
                    type_doc_billing: "cc",
                    mobilephone_billing: this.telefono,
                    number_doc_billing: this.documento,

                    //atributo deshabilitación metodo de pago
                    //methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]

                }
                console.log("Opening dialog")
                handler.open(data)

            }
        }

    }
</script>

<style scoped>
    .shadow-background {
        background: rgba(65, 65, 65, 0.267);
    }
</style>