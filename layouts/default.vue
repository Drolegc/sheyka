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
<v-list v-else>
    <v-list-item>
        <v-list-item-title @click="dialogInicioSesion = true">Iniciar sesion</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title @click="registro">Reistro</v-list-item-title>
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
        <v-form class="text-center" ref="inicio_sesion_form" v-model="valid_inicio_sesion">
            <v-text-field name="Email" label="Email" id="email" v-model="email"></v-text-field>
            <v-text-field name="pass" label="Contraseña" id="pass" v-model="pass"></v-text-field>
            <google-login class="ma-3" :params="params" :renderParams="renderParams" :onSuccess="onSuccessGoogle" :onFailure="onFailureGoogle"></google-login>
            <v-facebook-login class="ma-3" app-id="1099826073788172" @sdk-init="handleSdkInit"></v-facebook-login>
            <v-btn class="elevation-0 large" color="secondary" block>Entrar</v-btn>
        </v-form>
    </div>
</v-dialog>

<v-dialog v-model="dialogRegistro" transition="dialog-transition">

    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <h3>Registro</h3>
        <v-form class="text-center" ref="inicio-sesion-form">
            <v-text-field name="Email" type="email" label="Email" id="email" v-model="email" :rules="emailRules"></v-text-field>
            <v-text-field name="pass" label="Contraseña" id="pass" v-model="pass" :rules="passRules"></v-text-field>
            <v-text-field name="nombre" label="Nombre" id="nombre" v-model="nombre"></v-text-field>
            <v-text-field name="apellido" label="Apellido" id="apellido" v-model="apellido"></v-text-field>
            <v-text-field name="telefono" label="Telefono" id="telefono" v-model="telefono" type="number"></v-text-field>
            <google-login class="ma-3" :params="params" :renderParams="renderParams" :onSuccess="onSuccessGoogle" :onFailure="onFailureGoogle"></google-login>
            <v-facebook-login class="ma-3" app-id="1099826073788172" @sdk-init="handleSdkInit"></v-facebook-login>
            <v-btn class="elevation-0 large" color="secondary" block>Crear cuenta</v-btn>
        </v-form>
    </div>
</v-dialog>


<v-app-bar app flat bottom color="white">
    <v-spacer></v-spacer>
    <v-btn class="rounded-lg elevation-0" color="secondary" @click="iniciar" large>Iniciemos</v-btn>
    <v-spacer></v-spacer>
</v-app-bar>

</v-app>
</template>

<script>
    import GoogleLogin from 'vue-google-login';
    import VFacebookLogin from 'vue-facebook-login-component'
    import Menu from '../components/Menu.vue'

    export default {
        name: 'default',
        data() {
            return {
                dialogInicioSesion: false,
                valid_inicio_sesion: false,
                dialogRegistro: false,
                //Data para registrar usuario
                email: null,
                emailRules: [
                    v => !!v || 'Email requerido'
                ],
                pass: null,
                passRules: [
                    v => !!v || 'Constraseña requerida'
                ],
                nombre: null,
                apellido: null,
                telefono: null,
                //Manu options
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
                    longtitle: true,
                },
                FB: {},
                model: {},
                scope: {}
            }
        },
        methods: {
            onSuccessGoogle(data) {
                console.log("Success", data)
            },
            onFailureGoogle(data) {
                console.log("Failed", data)
            },
            registro() {
                this.dialogRegistro = true
                console.log("registro")
            },
            async inicioDeSesion() {
                this.$refs.inicio_sesion_form.validate()
                if (!this.valid_inicio_sesion) return

                try {
                    await this.$auth.loginWith("local", {
                        data: {
                            identifier: this.email,
                            password: this.pass,
                        }
                    })
                } catch (e) {
                    console.error(e)
                }
            },

            handleSdkInit({
                FB,
                scope
            }) {
                console.log(FB, scope)
                this.FB = FB
                this.scope = scope
            },
            iniciar() {
                if (!this.$auth.loggedIn) {
                    this.$router.push('/new')
                } else {
                    this.dialogInicioSesion = true
                }
            }

        },
        components: {
            GoogleLogin,
            VFacebookLogin,
            Menu
        }
    }
</script>

<style>

</style>