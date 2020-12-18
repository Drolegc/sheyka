<template>
    <v-container class="full-height d-flex flex-column justify-center align-center primary_background pl-10 pr-10">
        <div class="full-width mb-5">
            <p class="title">Cantidad</p>
            <h1 class="primary--text">{{photos.length}} cuadros de 20x20</h1>
        </div>
        <div class="full-width mb-5">
            <p class="title">Precio total</p>
            <h1 class="primary--text">U$S 70</h1>
        </div>

        <div class="full-width mb-5">
            <p class="title">Direccion</p>
            <select-direction></select-direction>
        </div>

        <div class="full-width mb-5">
            <p class="title">Pago</p>
            <h1 class="primary--text">{{photos.length}} cuadros de 20x20</h1>
        </div>
    </v-container>
</template>

<script>
    import SelectDirection from '~/components/SelectDirection.vue'

    export default {
        layout: 'confirmation',
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },
        },
        components: {
            SelectDirection
        }
    }
</script>