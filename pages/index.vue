<template>
  <v-container 
  fluid
  class="
  background
  pa-0
  d-flex 
  flex-column 
  align-center
  ">
    
      <img
      class="logo mb-3"
      src="/logo-t.png"
      height="200vh"    
      ></img>  
      <h1 class="white--text text-center ls-3 sheyka-title">Sheyka</h1>
      <span class="white--text text-center">Galería en casa</span>
      <p class="white--text text-center pl-5 ls-2 pr-5 mt-6">No pierdas tus mejores recuerdos en la memoria de tu celular, comienza a crear una galería en tu casa.</p>
      <h2 class="white--text text-center ls-2 mb-6 mt-6">Así de simple:</h2>

      <div class="pa-1 video-size mb-10" >
        <iframe class="rounded-xl" src="https://www.youtube.com/embed/yeTE-arIzSo?autoplay=0&showinfo=0&controls=0" frameborder="0" height="100%" width="100%"></iframe>
      </div>

      <h3 class="pl-5 ls-2 pr-5 primary--text text-center">3 marcos por COL$150.000 y cada adicional por COL$30.000. No olvides que los envíos nacionales son gratis.</h3>
      <h3 class="pl-5 pt-3 ls-2 pr-5 primary--text text-center">Tambien puedes hacernos el encargue por Whatsapp!</h3>

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
        background: url('/background.png');
    }
    
    .sheyka-title {
        letter-spacing: 3px;
    }
    
    .video-size {
        width: 90%;
        height: 30vh;
    }
    
    @media (min-width: 768px) {
        .background {
            width: 100%;
            background: url('/background.png');
        }
        .video-size {
            width: 90%;
            height: 80vh;
        }
    }
</style>