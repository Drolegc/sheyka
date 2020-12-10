<template>
  <v-app >
    <v-app-bar
      app
      absolute
      class="elevation-0 primary"
    >
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
<v-list v-if="$auth.loggedIn">
    <v-list-item v-for="(item, index) in optionsLoggedIn" :key="index">
        <v-list-item-title @click="callback(item.callback)">{{ item.title }}</v-list-item-title>
    </v-list-item>
</v-list>
<v-list v-else>
    <v-list-item v-for="(item, index) in optionsAnonymously" :key="index">
        <v-list-item-title @click="callback(item.callback)">{{ item.title }}</v-list-item-title>
    </v-list-item>
</v-list>

</v-menu>
</v-app-bar>
<v-main>
    <nuxt></nuxt>
</v-main>

<v-dialog v-model="dialogInicioSesion" transition="dialog-transition">

    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <h3>Inicio de sesion</h3>
        <v-form class="text-center" ref="inicio-sesion-form">
            <v-text-field name="Email" label="Email" id="email" v-model="email"></v-text-field>
            <v-text-field name="pass" label="Contrase;a" id="pass" v-model="pass"></v-text-field>
            <GoogleLogin class="ma-3" :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            <v-btn class="elevation-0 large" color="secondary">Entrar</v-btn>
        </v-form>
    </div>
</v-dialog>

<v-dialog v-model="dialogRegistro" transition="dialog-transition">

</v-dialog>

<v-app-bar app flat bottom color="white">
    <v-spacer></v-spacer>
    <v-btn class="rounded-lg elevation-0" color="secondary" large>Iniciemos</v-btn>
    <v-spacer></v-spacer>
</v-app-bar>

</v-app>
</template>

<script>
    import GoogleLogin from 'vue-google-login';

    export default {
        name: 'default',
        data() {
            return {
                dialogInicioSesion: false,
                dialogRegistro: false,
                email: null,
                pass: null,
                optionsLoggedIn: [{
                    title: 'Click Me'
                }, {
                    title: 'Click Me'
                }, {
                    title: 'Click Me'
                }, {
                    title: 'Click Me 2'
                }, ],
                optionsAnonymously: [{
                    title: 'Iniciar sesion',
                    callback: 'inicioDeSesion'
                }, {
                    title: 'Registro',
                    callback: 'registro'
                }, ],
                params: {
                    client_id: "957222471580-0s95ltriq07u5ugq6l81ksovbiorm6lk.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
            }
        },
        methods: {
            onSuccess(data) {
                console.log("Success", data)
            },
            onFailure(data) {
                console.log("Failed", data)
            },
            callback(f) {
                switch (f) {
                    case 'registro':
                        this.registro()
                        break
                    case 'inicioDeSesion':
                        this.inicioDeSesion()
                        break
                }
            },
            registro() {
                this.dialogRegistro = true
                console.log("registro")
            },
            inicioDeSesion() {
                this.dialogInicioSesion = true
                console.log("inicioDeSesion")
            }

        },
        components: {
            GoogleLogin
        }
    }
</script>

<style>
    /* .iniciemos-container {
        background-color: white;
    } */
</style>