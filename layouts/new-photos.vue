<template>
    <v-app>
        <v-app-bar
        app
        absolute
        class="elevation-0 primary"
        >
        <v-btn icon color="white" @click="$router.push('/')"><v-icon>mdi-arrow-left</v-icon></v-btn>
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
    <v-list-item>
        <v-list-item-icon>
            <v-icon> mdi-whatsapp</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
            Comunicate con nosotros</v-list-item-title>
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
<v-app-bar v-if="photos.length != 0" app flat bottom color="white">
    <v-spacer></v-spacer>
    <v-btn v-show="showBtn" class="rounded-lg elevation-0" color="secondary" @click="$router.push('/new/frames')" large>Siguiente</v-btn>
    <v-spacer></v-spacer>
</v-app-bar>
</v-app>

</template>

<script>
    export default {
        name: 'new-photos',
        middleware: "auth",
        data() {
            return {
                options: [{
                    title: 'Mi perfil',
                    callback: ''
                }, {
                    title: 'Mis ordenes',
                    callback: ''
                }, {
                    title: 'Contacto',
                    callback: ''
                }, {
                    title: 'Click Me 2',
                    callback: ''
                }, ],
                showBtn: false
            }
        },
        watch: {
            photos(value) {
                if (value.length >= 3) {
                    this.showBtn = true
                }
            }
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            },

        },

    }
</script>