<template>
    <v-card
        active-class=""
          elevation="3"
          :width="'80vw'"
          :class=" !active ? 'ma-4 pa-2 rounded-lg' : 'primary-shadow ma-4 pa-2 rounded-lg primary--text ' "
        >
        <v-img
        @click="dialog = true"
        :src="photo.preview"
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
            :overlay="false"
            transition="scroll-y-reverse-transition"
            eager
        >
        <v-card
        >
            <img 
            :src="photo.original"
            :ref="'cropped' + index"
            crossorigin
            />
        </v-card>
    
            </v-dialog>
        </v-card>
</template>

<script>
    import Cropper from "cropperjs";
    export default {
        props: {
            index: Number,
            active: Boolean,
            selectedFrameImage: String
        },
        data() {
            return {
                dialog: false,
                cropper: {}
            }
        },
        mounted() {
            let ref = 'cropped' + this.index
            this.cropper = new Cropper(
                this.$refs[ref], {
                    zoomable: true,
                    scalable: false,
                    aspectRatio: 1,
                    crop: () => {
                        const canvas = this.cropper.getCroppedCanvas();
                        this.$store.dispatch("new/setPreview", {
                            index: this.index,
                            src: canvas.toDataURL("image/png")
                        })
                    }
                }
            )
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

<style>
    .container-cropper {
        display: block;
        max-width: 100%;
    }
</style>