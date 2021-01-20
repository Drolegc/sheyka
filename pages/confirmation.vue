<template>
    <v-container class="full-height d-flex flex-column justify-center align-center primary_background pl-10 pr-10">
        <div class="full-width mb-5">
            <p class="title">Cantidad</p>
            <h1 class="primary--text">{{$store.getters["new/frames"]}} cuadros de 20x20(cm)</h1>
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
            <p class="title">Para</p>
            <person-data></person-data>
        </div>
    </v-container>
</template>

<script>
    import SelectDirection from '~/components/SelectDirection.vue'
    import PersonData from '~/components/PersonData.vue'

    export default {
        layout: 'confirmation',
        data() {
            return {
                price: null
            }
        },
        created() {
            var cantidad = this.$store.getters["new/frames"]
            this.price = 150000 + (cantidad - 3) * 30000
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
            PersonData
        }
    }
</script>