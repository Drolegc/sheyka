<template>
    <v-app>
        <v-app-bar
        app
        absolute
        class="elevation-0 primary"
        >
        <v-btn icon color="secondary" @click="$router.push('/')"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-menu offset-y>
            <template v-slot:activator="{on,attrs}">
              <v-btn 
              icon 
              color="secondary" 
              v-bind="attrs"
              v-on="on">
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </template>
<v-list>
    <v-list-item>
        <v-list-item-title>Mi perfil</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Mis ordenes</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Comunicate con nosotros</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Preguntas frecuentes</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title>Terminos y condiciones</v-list-item-title>
    </v-list-item>
    <v-list-item>
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
    <v-btn class="rounded-lg elevation-0" color="secondary" @click="siguiente" large>Siguiente</v-btn>
    <v-spacer></v-spacer>
</v-app-bar>
</v-app>

</template>

<script>
    export default {
        name: 'new-photos',
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
            }
        },
        computed: {
            photos: {
                get() {
                    return this.$store.getters["new/photos"]
                }
            }
        },
        methods: {
            siguiente() {

            }
        }
    }
</script>