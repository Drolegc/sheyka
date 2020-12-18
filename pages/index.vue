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
      src="/logo.svg"
      height="200vh"    
      ></img>  
      <h1 class="white--text text-center ls-3 mb-3 sheyka-title">Sheyka</h1>
      <p class="white--text text-center pl-5 ls-2 pr-5 mt-6">No pierdas tus mejores recuerdos en la memoria de tu celular, comienza a crear una galeria en tu casa.</p>
      <h2 class="white--text text-center ls-2 mb-6 mt-6">Asi de simple:</h2>

      <div class="pa-1 video-size mb-10" >
        <iframe class="rounded-xl" src="https://youtube.com/embed/P3MdfNZF9iY?autoplay=0&showinfo=0&controls=0" frameborder="0" height="100%" width="100%"></iframe>
      </div>

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
        /* background-color: aqua; */
        /* background-image: url('/background.png');
        background-size: cover; */
        background: rgb(101, 24, 130);
        background: linear-gradient(180deg, rgba(101, 24, 130, 1) 0%, rgba(101, 24, 130, 1) 22%, rgba(101, 24, 130, 0.7) 50%, rgba(101, 24, 130, 0.5) 79%, rgba(255, 255, 255, 0.14889705882352944) 100%);
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
            /* height: 100vh; */
            width: 100%;
            background: rgb(101, 24, 130);
            background: linear-gradient(180deg, rgba(101, 24, 130, 1) 0%, rgba(101, 24, 130, 1) 22%, rgba(101, 24, 130, 0.7) 39%, rgba(101, 24, 130, 0.5) 63%, rgba(255, 255, 255, 0.14889705882352944) 86%);
        }
        .video-size {
            width: 90%;
            height: 80vh;
        }
    }
</style>