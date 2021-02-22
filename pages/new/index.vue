<template>
    <v-container class="full-height" >
        <div class="d-flex flex-column justify-center align-center full-height" @click="options = true" v-if="photos.length == 0" >
            <h3 class="ma-3 text-center" >Has click para seleccionar</h3>
            <v-icon x-large>mdi-plus</v-icon>
        </div>
        <v-row v-else>
            <v-col
              v-for="(photo,index) in photos"
              :key="index"
              cols="4"
            >
              <div class="full-height elevation-1 rounded-lg">

                <v-img
                  :src="photo.original"
                  aspect-ratio="1"
                  class="transparent lighten-2 rounded-lg"
                >
                
                <v-btn 
                fab
                dark
                x-small
                absolute
                dark
                elevation="0"
                color="red"
                @click="removePhoto(index)"
                >
              <v-icon>mdi-delete</v-icon></v-btn>
                  </v-img>

                  
                  
              </div>
            </v-col>
            <v-col
            cols="4">
                <div @click="options = true" class="full-height d-flex flex-column justify-center align-center" >
                    <v-icon>mdi-plus</v-icon>
                </div>
            </v-col>
        </v-row>
        <v-bottom-sheet v-model="options">
            <v-sheet
            class="text-center transparent pa-3"
            >
            <div class="white rounded-xl">
                <input multiple type="file" ref="imagePicker" @change="newImages" style="display:none;" accept="image/png, image/jpg, image/jpeg"> 
                <h3 class="pa-2" @click="$refs.imagePicker.click()">Galeria</h3>
            </div>
            </v-sheet>
        </v-bottom-sheet>
        <v-snackbar
            v-model="moreImages"
            timeout="2000"
            rounded="pill"
        >
            Te faltan {{3 - photos.length}} imagenes para un minimo de 3
        </v-snackbar>

    </v-container>
</template>


<script>
    import Cropper from "cropperjs";

    export default {
        layout: 'new-photos',
        data() {
            return {
                options: false,
                moreImages: false,
            }
        },
        watch: {
            photos(value) {
                if (value.length < 3) {
                    this.moreImages = true
                }
            }
        },
        computed: {
            photos: {
                set(photos) {
                    this.$store.dispatch("new/setPhotos", photos)
                },
                get() {
                    return this.$store.getters["new/photos"]
                }
            },
        },
        methods: {
            newImages(e) {
                var files = e.target.files
                for (let i = 0; i < files.length; i++) {

                    let reader = new FileReader()
                    let file = files[i]
                    reader.onload = (e) => {
                        let data = {
                            file: files[i],
                            original: e.target.result,
                            preview: '',
                            cantidad: 1,
                        }

                        // data['cropper'] = new Cropper(data['original'], {
                        //     zoomable: true,
                        //     scalable: true,
                        //     aspectRatio: 1,
                        //     crop: () => {
                        //         const canvas = this.cropper.getCroppedCanvas()
                        //         data['destination'] = canvas.toDataUrl("image/png")
                        //     }
                        // })

                        this.$store.dispatch("new/addPhoto", data)
                    }
                    reader.readAsDataURL(files[i])
                }
                this.options = false

            },
            removePhoto(index) {
                this.$store.dispatch("new/removePhoto", index)
            }

        },
    }
</script>