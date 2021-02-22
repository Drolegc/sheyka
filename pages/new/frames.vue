<template>
    <v-container class="full-height d-flex flex-column pa-0" min-height="100%">
        <v-row justify="center" class="ml-1 mr-1">
            <v-col v-for="n in 4">
                <v-card :class="(selectedFrame == n)?'pa-1':'pa-1 elevation-0'" @click="selectedFrame = n">
                    <v-img
                    :src="getMarco(n)"
                    aspect-ratio="1"
                    class="grey lighten-2"
                >
                </v-img>
                </v-card>
            </v-col>
        </v-row>
    <div class="d-flex justify-center align-center full-height primary_background">
        <v-slide-group
        v-model="selected"
    >
      <v-slide-item
        v-for="(photo,n) in photos"
        :key="n"
        v-slot="{ active, toggle }"
      >
      <cropped-image :index="n" :active="active" :selectedFrameImage="selectedFrameImage" @click="changeSelectedImage(n)"></cropped-image>
      </v-slide-item>
    </v-slide-group>
        
    </div>
    </v-container>
</template>

<script>
    import CroppedImage from '../../components/CroppedImage.vue'
    export default {
        layout: 'new-photos-frame',
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
                            return '/previewMarcoNegroBorde.svg'
                        case 2:
                            return '/previewMarcoNegro.svg'
                        case 3:
                            return '/previewMarcoBlancoBorde.svg'
                        case 4:
                            return '/previewMarcoBlanco.svg'
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
</style>