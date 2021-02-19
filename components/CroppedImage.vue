<template>
    <v-card
        active-class=""
          elevation="3"
          :width="'80vw'"
          :class=" !active ? 'ma-4 pa-2 rounded-lg' : 'primary-shadow ma-4 pa-2 rounded-lg primary--text ' "
        >
        <v-img
        @click="dialog = true"
        :src="photo.original"
        aspect-ratio="1"
        class="mb-1 transparent lighten-2 rounded-lg"
        >
            <v-img
                :src="selectedFrameImage"
                aspect-ratio="1"
            >
                </v-img>
        </v-img>
        
        <div class="d-flex justify-center align-center">
            <div class="d-flex justify-center align-center">
                <v-btn class="mr-2" elevation="0" color="secondary" @click="removeOne"><v-icon>mdi-minus</v-icon></v-btn>
            </div>
            <h1>{{photo.cantidad}}</h1>
            <div class="d-flex justify-center align-center">
                <v-btn class="ml-2" elevation="0" color="secondary" @click="addOne" ><v-icon>mdi-plus</v-icon></v-btn>
            </div>
        </div>

        <v-dialog
            v-model="dialog"
            fullscreen
            persistent :overlay="false"
            width="100"
            transition="dialog-transition"
        >
            <h1>asd</h1>
        </v-dialog>
        </v-card>
</template>

<script>
    export default {
        props: {
            index: Number,
            active: Boolean,
            selectedFrameImage: String
        },
        data() {
            return {
                dialog: false
            }
        },
        computed: {
            photo: {
                get() {
                    return this.$store.getters["new/photos"][this.index]
                }
            }
        },
        methods: {
            addOne() {
                this.$store.dispatch("new/addCantidad", this.index)
            },
            removeOne() {
                if (this.photo.cantidad > 1)
                    this.$store.dispatch("new/removeCantidad", this.index)
            },
        }
    }
</script>