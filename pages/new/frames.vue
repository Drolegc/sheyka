<template>
    <div>
        <v-container v-if="isMobile()" class="full-height d-flex flex-column pa-0" min-height="100%" >
            <v-sheet class="mb-2 mt-2">
                <v-slide-group>
                    <v-slide-item
                    v-for="n in 4"
                    >
                    <v-card 
                    :class="(selectedFrame == n)?'pa-1 mx-2':'pa-1 elevation-0 mx-2'" 
                    @click="selectedFrame = n">
                        <v-img
                        width="120"
                        :src="getMarco(n)"
                        aspect-ratio="1"
                        class="grey lighten-2 "
                    >
                    </v-img>
                    <span v-html="frameName(n)" class="font-weight-bold" ></span>

                    </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        <div class="primary_background">
            <h3 class="text-center mt-2 primary--text">Has click en las fotos para poder editarlas</h3>

            <v-slide-group
            v-model="selected"
        >
          <v-slide-item
            v-for="(photo,n) in photos"
            :key="n"
            v-slot="{ active, toggle }"
          >
          <cropped-image :index="n" :active="active" :selectedFrameImageIndex="selectedFrame" :selectedFrameImage="selectedFrameImage" @click="changeSelectedImage(n)"></cropped-image>
          </v-slide-item>
        </v-slide-group>
            
        </div>
        </v-container>
        <v-container v-else min-height="100%" fluid>
            
            <v-layout class="split">
                <v-section class="right primary_background">
                    <v-card
                            v-for="n in 4"
                            :class="(selectedFrame == n)?'ma-3 pa-1':' ma-3 pa-1 elevation-0'" 
                            @click="selectedFrame = n">
                                <v-img
                                :src="getMarco(n)"
                                width="'100px'" 
                                aspect-ratio="1"
                                class="grey lighten-2"
                            >
                            </v-img>
                            <span  class="font-weight-bold" >{{frameName(n)}}</span>
                            </v-card>
                </v-section>
                <v-section class="left primary_background">
                    <h3 class="text-center mt-2 primary--text">Has click en las fotos para poder editarlas</h3>

                    <v-row class="pa-5">
                        <v-col
                        v-for="(photo,index) in photos"
                        cols="4"
                        >
                        <v-item  :key="index" v-slot="{ active, toggle }">
                            <cropped-image :index="index" :active="active" :selectedFrameImage="selectedFrameImage" :selectedFrameImageIndex="selectedFrame" @click="changeSelectedImage(n)"></cropped-image>
                        </v-item>
                        </v-col>
                    </v-row>
                </v-section>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import global from '~/mixins/global.js';
    import CroppedImage from '../../components/CroppedImage.vue'
    export default {
        layout: 'new-photos-frame',
        middleware: 'checkEmpty',
        mixins: [global],
        data() {
            return {
                selected: 0,
            }
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },
            selectedFrame: {
                set(value) {
                    this.$store.dispatch("new/setSelectedFrame", value)
                },
                get() {
                    return this.$store.getters["new/getSelectedFrame"]
                }
            },
            selectedFrameImage: {
                get() {
                    switch (this.selectedFrame) {
                        case 1:
                            return '/previewMarcoNegroBorde.png'
                        case 2:
                            return '/previewMarcoNegro.png'
                        case 3:
                            return '/previewMarcoBlancoBorde.png'
                        case 4:
                            return '/previewMarcoBlanco.png'
                    }
                }
            }
        },
        methods: {
            changeSelectedImage(selected) {
                if (this.selected != selected) {
                    this.selected = selected
                }
            },

            getMarco(index) {
                switch (index) {
                    case 1:
                        return '/marcoNegroConBorde.png'
                    case 2:
                        return '/marcoNegro.png'
                    case 3:
                        return '/marcoBlancoConBorde.png'
                    case 4:
                        return '/marcoBlanco.png'
                }
            },
            frameName(index) {
                switch (index) {
                    case 1:
                        return (!this.isMobile()) ? 'Negro con margen' : 'Negro con <br>margen'
                    case 2:
                        return 'Negro'
                    case 3:
                        return (!this.isMobile()) ? 'Blanco con margen' : 'Blanco con <br>margen'
                    case 4:
                        return 'Blanco'
                }
            }
        },
        components: {
            CroppedImage
        }
    }
</script>

<style>
    .primary-shadow {
        box-shadow: 0px 3px 3px -2px rgba(0, 162, 156, 0.12), 0px 3px 4px 0px rgba(0, 162, 156, 0.14), 0px 1px 8px 0px rgba(0, 162, 156, 0.12) !important;
    }
    
    .v-ripple__container {
        opacity: 0 !important;
    }
    
    .split {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
    }
    
    .right {
        overflow-y: scroll;
        /* it works! */
    }
    
    .right::-webkit-scrollbar {
        width: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    .left {
        flex: 1;
        overflow-y: scroll;
        overflow-x: scroll;
    }
    
    .left::-webkit-scrollbar {
        width: 1px;
        height: 1px;
    }
</style>