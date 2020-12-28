<template>
    <v-container class="full-height d-flex flex-column justify-center align-center primary_background pl-10 pr-10">
        <div class="full-width mb-5">
            <p class="title">Cantidad</p>
            <h1 class="primary--text">{{$store.getters["new/frames"]}} cuadros de 20x20</h1>
        </div>
        <div class="full-width mb-5">
            <p class="title">Precio total</p>
            <h1 class="primary--text">COL$ {{price}}</h1>
        </div>

        <div class="full-width mb-5">
            <p class="title">Direccion</p>
            <select-direction></select-direction>
        </div>

        <div class="full-width mb-5">
            <p class="title">Pago</p>
            <select-payment></select-payment>
        </div>
    </v-container>
</template>

<script>
    import SelectDirection from '~/components/SelectDirection.vue'
    import SelectPayment from '~/components/SelectPayment.vue'

    export default {
        layout: 'confirmation',
        data() {
            return {
                price: null
            }
        },
        created() {
            this.$axios.get('/order-price').then(response => this.price = response.data['price'] * this.$store.getters["new/frames"])
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },
        },
        components: {
            SelectDirection,
            SelectPayment
        }
    }
</script>