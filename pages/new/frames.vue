<template>
    <v-container class="full-height d-flex flex-column pa-0" min-height="100%">
    <v-slide-group
      v-model="model"
    >
      <v-slide-item
        v-for="n in 15"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :elevation="active ? 3 : 1"
          :class=" !active ? 'ma-4 pa-2 rounded-lg' : 'primary-shadow ma-4 pa-2 rounded-lg primary--text ' "
          @click="toggle"
        >
        <v-img
        src="https://picsum.photos/350/165?random"
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
                
                class="asdad"
                src="https://picsum.photos/350/165?random"
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
            </v-row>
        
    </div>
    </v-container>
</template>

<script>
    export default {
        layout: 'new-photos-frame',
        data() {
            return {
                model: null
            }
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            }
        }
    }
</script>

<style scoped>
    .primary-shadow {
        box-shadow: 0px 3px 3px -2px rgba(101, 24, 130, 0.12), 0px 3px 4px 0px rgba(101, 24, 130, 0.14), 0px 1px 8px 0px rgba(101, 24, 130, 0.12) !important;
    }
    
    .primary_background {
        background-color: rgba(101, 24, 130, 0.1);
    }
</style>