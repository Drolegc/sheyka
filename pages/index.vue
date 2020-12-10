<template>
  <v-container 
  class="
  background
  fill-height-without-app-bar 
  d-flex 
  flex-column 
  justify-space-around">
    <v-icon>{{path}}</v-icon>
  </v-container>
</template>

<script>
    import Logo from '~/components/Logo.vue'
    import VuetifyLogo from '~/components/VuetifyLogo.vue'

    export default {
        components: {
            Logo,
            VuetifyLogo
        },
        data() {
            return {
                path: '/logo.svg'
            }
        }
    }
</script>

<style>
    .background {
        background-image: url('/background.png');
        background-size: cover;
    }
    
    @media (min-width: 768px) and (max-width: 979px) {
        .background {
            background-image: url('/background-desktop.png');
            background-size: contain;
        }
    }
</style>