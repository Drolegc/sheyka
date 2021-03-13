<template>
    <v-container class="full-height d-flex flex-column justify-center align-center primary_background pl-10 pr-10" fluid>
        <div class="full-width mb-5">
            <p class="title">Cantidad</p>
            <h1 class="primary--text">{{$store.getters["new/frames"]}} cuadros de 20x20(cm)</h1>
        </div>
        <div class="full-width mb-5">
            <p class="title">Precio total</p>
            <h1 class="primary--text">COL$ {{price}}</h1>
        </div>

        <div class="full-width mb-5">
            <p class="title">Direccion del destinatario</p>
            <select-direction></select-direction>
        </div>
        <div class="full-width d-flex justify-left align-center">
            <v-form
            ref="terminosYCondicionesForm"
            v-model="terminosYCondicionesValidation"
            >
                <v-checkbox 
                v-model="terminos_y_condiciones"
                :rules="[v => !!v || 'Debe aceptar los terminos y condiciones para continuar']"
                required
                >
                <template v-slot:label>
                    <h3>Terminos y condiciones</h3>
                </template>
</v-checkbox>
</v-form>

<v-btn class="ml-1" icon color="blue lighten-3">
    <v-icon>mdi-help-circle</v-icon>
</v-btn>
</div>
<div class="full-width mb-5">
    <person-data></person-data>
</div>
<user-personal-data></user-personal-data>

</v-container>
</template>

<script>
    import SelectDirection from '~/components/SelectDirection.vue'
    import PersonData from '~/components/PersonData.vue'
    import UserPersonalData from '~/components/UserPersonalData.vue'

    export default {
        layout: 'confirmation',
        middleware: 'checkEmpty',
        data() {
            return {
                price: null,
                terminosYCondicionesValidation: false
            }
        },
        async created() {

            this.$root.$on('checkTerminosYCondicionesForm', () => {
                this.$refs.terminosYCondicionesForm.validate()
                if (!this.terminosYCondicionesValidation) return
            })

            var cantidad = this.$store.getters["new/frames"]
            const basePrice = (await this.$axios.get('/order-price')).data.price
            const extraOrderPrice = (await this.$axios.get('/extra-order-price')).data.price
            this.price = basePrice + (cantidad - 3) * extraOrderPrice
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },
            terminos_y_condiciones: {
                set(value) {
                    this.$store.dispatch("new/setTerminosYCondiciones", value)
                },
                get() {
                    return this.$store.getters["new/getTerminosYCondiciones"]
                }
            }
        },
        components: {
            SelectDirection,
            PersonData,
            UserPersonalData
        }
    }
</script>