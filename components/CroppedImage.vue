<template>
    <v-card
        active-class=""
          elevation="3"
          :width="'80vw'"
          :class=" !active ? 'ma-4 pa-2 rounded-lg' : 'primary-shadow ma-4 pa-2 rounded-lg primary--text ' "
        >
        <v-img
        @click="openDialog"
        :src="photo.preview"
        lazy-src="./lazyLogo.jpg"
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
        <v-btn class="mr-2" elevation="0" color="secondary" @click="removeOne">
            <v-icon>mdi-minus</v-icon>
        </v-btn>
    </div>
    <h1>{{photo.cantidad}}</h1>
    <div class="d-flex justify-center align-center">
        <v-btn class="ml-2" elevation="0" color="secondary" @click="addOne">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</div>

<v-dialog v-model="dialog" fullscreen :overlay="false" transition="scroll-y-reverse-transition" eager>

    <v-app-bar flat color="primary">
        <v-btn icon color="white" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn v-if="!loading" color="white" text @click="done">
            Listo
        </v-btn>
        <v-progress-circular v-else indeterminate color="white"></v-progress-circular>
    </v-app-bar>
    <v-card>
        <div class="cropper-div" ref="father-cropper">
            <img class="cropper-image" :src="photo.original" :ref="'cropped' + index" crossorigin />
        </div>
    </v-card>

    <v-app-bar app flat bottom color="transparent">
        <div v-if="isMobile" class="d-flex full-width justify-space-between align-center text-center mb-5">
            <v-icon color="white" large>mdi-gesture-pinch</v-icon>
            <span class="headline white--text">Pellizca para zoom, arrastra para mover</span>
            <v-icon color="white" large>mdi-gesture-swipe-horizontal</v-icon>
        </div>
        <div v-else class="d-flex full-width justify-space-between align-center text-center">
            <v-icon color="white" large>mdi-mouse-move-up</v-icon>
            <span class="headline white--text">Gira la ruedita para zoom, arrastra para mover</span>
            <v-icon color="white" large>mdi-cursor-default-gesture-outline</v-icon>
        </div>
    </v-app-bar>

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
                loading: false,
                cropper: {},
                zoom: 0,
                message: ''
            }
        },
        computed: {
            photo: {
                get() {
                    return this.$store.getters["new/photos"][this.index]
                }
            },
        },
        async mounted() {

            await new Promise(resolve => setTimeout(resolve, 1000))

            let ref = 'cropped' + this.index

            this.cropper = new Cropper(
                this.$refs[ref], {
                    zoomable: true,
                    scalable: false,
                    aspectRatio: 1,
                    cropBoxMovable: false,
                    cropBoxResizable: false,
                    viewMode: 0,
                    dragMode: 'move',
                    minContainerWidth: window.innerWidth,
                    minContainerHeight: window.innerHeight,
                    background: false,
                    ready: () =>
                        this.done(),

                }
            )
        },
        methods: {
            addOne() {
                this.$store.dispatch("new/addCantidad", this.index)
            },
            removeOne() {
                if (this.photo.cantidad > 1)
                    this.$store.dispatch("new/removeCantidad", this.index)
            },
            done() {
                this.loading = true
                var canvas = this.cropper.getCroppedCanvas();
                this.$store.dispatch("new/setAuxPreview", {
                    index: this.index,
                    src: canvas.toDataURL("image/png")
                })
                this.$store.dispatch("new/setPreview", this.index)
                this.cropper.destroy()
                this.croppper = {}
                this.loading = false
                this.dialog = false
            },
            openDialog() {
                this.dialog = true
                let ref = 'cropped' + this.index
                this.cropper = new Cropper(
                    this.$refs[ref], {
                        zoomable: true,
                        scalable: false,
                        aspectRatio: 1,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        viewMode: 0,
                        dragMode: 'move',
                        minContainerWidth: window.innerWidth,
                        minContainerHeight: window.innerHeight,
                        background: false,

                    }
                )
            },
            closeDialog() {
                this.dialog = false
                this.cropper.destroy()
                this.croppper = {}
            },
            isMobile() {
                var ua = navigator.userAgent;
                return isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua);
            }
        }
    }
</script>

<style>
    .cropper-image {
        display: block;
        max-width: 100%;
    }
    
    .cropper-div {
        height: 100%;
        width: 100%;
    }
</style>