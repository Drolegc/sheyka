<template>
    <v-app>
        <v-app-bar
        app
        absolute
        class="elevation-0 primary"
        >
        <v-btn icon color="white" @click="$router.push('/new')"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <span class="sheyka-app-bar white--text">Sheyka</span>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{on,attrs}">
              <v-btn 
              icon 
              color="white" 
              v-bind="attrs"
              v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
<v-list>
    <v-list-item @click="$router.push('/')">
        <v-list-item-title>Inicio</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$router.push('/profile/')">
        <v-list-item-title>Mi perfil</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$router.push('/orders/')">
        <v-list-item-title>Mis ordenes</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Preguntas frecuentes</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Terminos y condiciones</v-list-item-title>
    </v-list-item>

    <v-list-item @click="$auth.logout()">
        <v-list-item-title>Salir</v-list-item-title>
    </v-list-item>
</v-list>

</v-menu>
</v-app-bar>
<v-main>
    <nuxt></nuxt>
</v-main>
<v-app-bar class="elevation-1" app flat bottom color="white">
    <v-spacer></v-spacer>
    <v-btn v-show="photos.length != 0" class="rounded-lg elevation-0" color="secondary" @click="$router.push('/confirmation')" large>Confirmar</v-btn>
    <v-spacer></v-spacer>
    <v-btn class="mb-4" fab elevation="2" color="success" href="https://wa.me/message/YKH44MFDY2Z4O1" target="_blank" absolute right>
        <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
</v-app-bar>
</v-app>

</template>

<script>
    export default {
        name: 'new-photos-frame',
        middleware: "auth",
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            }
        }
    }
</script>

<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.1/cropper.min.css';
</style>