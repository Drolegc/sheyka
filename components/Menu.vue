<template>
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
<v-list v-if="$auth.loggedIn">
    <v-list-item>
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
    <v-list-item>
        <v-list-item-title>Salir</v-list-item-title>
    </v-list-item>
</v-list>
<v-list v-else>
    <v-list-item>
        <v-list-item-title @click="inicioDeSesion">Iniciar sesion</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title @click="registro">Reistro</v-list-item-title>
    </v-list-item>
</v-list>

</v-menu>
</template>

<script>
    export default {
        data() {

        },
        methods: {
            inicioDeSesion() {

            },
            registro() {

            }
        }
    }
</script>