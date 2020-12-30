<template>
    <v-container class="full-height d-flex flex-column pa-0" min-height="100%">
    <v-slide-group
      v-model="selected"
    >
      <v-slide-item
        v-for="(photo,n) in photos"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :elevation="active ? 3 : 1"
          :class=" !active ? 'ma-4 pa-2 rounded-lg' : 'primary-shadow ma-4 pa-2 rounded-lg primary--text ' "
          @click="changeSelectedImage(n)"
        >
        <v-img
        :src="photo.url"
        aspect-ratio="1"
        class="mb-1 transparent lighten-2 rounded-lg"
      >
        </v-img>
        <b>Cuadro simple</b>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    <div class="d-flex justify-center align-center full-height primary_background">
            <v-row
            align="center"
            justify="center"
            no-gutters
            >
                <v-col
                class="d-flex child-flex"
                cols="8"
                >
                <v-img
                :src="photos[selected].url"
                aspect-ratio="1"  
                >
                <v-img
                contain
            src="/frame.png"
            aspect-ratio="1"
            >
            </v-img>
            </v-img>
                </v-col>
                <v-col class="pt-5" cols="12">
                    <div class="d-flex justify-center align-center">
                        <div class="d-flex justify-center align-center">
                            <v-btn class="mr-2" elevation="0" color="secondary" @click="removeOne"><v-icon>mdi-minus</v-icon></v-btn>
                        </div>
                        <h1>{{photos[selected].cantidad}}</h1>
                        <div class="d-flex justify-center align-center">
                            <v-btn class="ml-2" elevation="0" color="secondary" @click="addOne" ><v-icon>mdi-plus</v-icon></v-btn>
                        </div>
                    </div>
                </v-col>
                <v-col>

                </v-col>
            </v-row>
            
        
    </div>
    </v-container>
</template>

<script>
    export default {
        layout: 'new-photos-frame',
        data() {
            return {
                selected: 0
            }
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },
        },
        methods: {
            changeSelectedImage(selected) {
                if (this.selected != selected) {
                    this.selected = selected
                }
            },
            addOne() {
                this.$store.dispatch("new/addCantidad", this.selected)
            },
            removeOne() {
                if (this.photos[this.selected].cantidad > 1)
                    this.$store.dispatch("new/removeCantidad", this.selected)
            }
        }
    }
</script>

<style scoped>
    .primary-shadow {
        box-shadow: 0px 3px 3px -2px rgba(0, 162, 156, 0.12), 0px 3px 4px 0px rgba(0, 162, 156, 0.14), 0px 1px 8px 0px rgba(0, 162, 156, 0.12) !important;
    }
</style>