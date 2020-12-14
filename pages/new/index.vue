<template>
    <v-container class="full-height" >
        <div class="d-flex flex-column justify-center align-center full-height" @click="options = true" v-if="photos.length == 0" >
            <h3 class="ma-3 text-center" >Selecciona tus imagenes favoritas</h3>
            <v-icon x-large>mdi-plus</v-icon>
        </div>
        <v-row v-else>
            <v-col
              v-for="(n,index) in photos"
              :key="index"
              cols="4"
            >
              <div class="full-height elevation-1 rounded-lg">

                <v-img
                  :src="n.url"
                  aspect-ratio="1"
                  class="transparent lighten-2 rounded-lg"
                >
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
                <h3 class="pa-2" @click="showCamara=true;options=false">Camara</h3>
                <v-divider></v-divider>
                <input multiple type="file" ref="imagePicker" @change="newImages" style="display:none;" accept="image/png, image/jpg"> 
                <h3 class="pa-2" @click="$refs.imagePicker.click()">Galeria</h3>
               
            </div>
            </v-sheet>
        </v-bottom-sheet>
        <v-dialog
            v-model="showCamara"
            transition="dialog-transition"
        >
        <v-easy-camera
        :fullscreen="true"
        :mustApprove="true"
        :output="'blob'"
        @approve="actionCamera"
        @close="actionCamera"
        ref="camaraComponent"
        ></v-easy-camera>
        </v-dialog>


    </v-container>
</template>


<script>
    import EasyCamera from 'easy-vue-camera'

    export default {
        layout: 'new-photos',
        data() {
            return {
                options: false,
                showCamara: false,
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
            }
        },
        beforeDestroy() {
            this.photos = []
        },
        methods: {
            addPhotos() {
                this.photos = [1, 2, 3]
            },
            actionCamera(data) {
                if (data != undefined) {
                    var file = new File([data], "camera-" + Math.random())
                    var reader = new FileReader()
                    reader.onload = (e) => {
                        this.$store.dispatch("new/addPhoto", {
                            file: file,
                            url: e.target.result
                        })
                    }
                    reader.readAsDataURL(file)

                }
                this.showCamara = false
                this.$refs.camaraComponent.stop()

            },
            urlFromFileImageOrBlob(n) {
                console.log(n)
                return ""
            },
            handleFilesValidated(result, files) {
                console.log('Validation result: ' + result);
            },

            handleFilesChanged(files) {
                console.log('Selected files: ');
                console.table(files);
            },
            newImages(e) {
                var files = e.target.files
                for (let i = 0; i < files.length; i++) {

                    let reader = new FileReader()
                    let file = files[i]
                    reader.onload = (e) => {
                        let data = {
                            file: files[i],
                            url: e.target.result
                        }
                        this.$store.dispatch("new/addPhoto", data);
                    }
                    reader.readAsDataURL(files[i])
                }
                this.options = false

            }

        },
        components: {
            'v-easy-camera': EasyCamera,
        }
    }
</script>