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
        fab
        small
        elevation="0" 
        color="white" 
        v-bind="attrs"
        v-on="on">
          <v-icon color="primary">mdi-menu</v-icon>
        </v-btn>
      </template>
<v-list v-if="$auth.loggedIn">
    <v-list-item @click="$router.push('/')">
        <v-list-item-title>Inicio</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$router.push('/profile/')">
        <v-list-item-title>Mi perfil</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$router.push('/orders/')">
        <v-list-item-title>Mis ordenes</v-list-item-title>
    </v-list-item>

    <v-list-item @click="$router.push('/preguntas_frecuentes')">
        <v-list-item-title>Preguntas frecuentes</v-list-item-title>

    </v-list-item>
    <v-list-item @click="$router.push('terminos_y_condiciones')">
        <v-list-item-title>Terminos y condiciones</v-list-item-title>

    </v-list-item>
    <v-list-item @click="$auth.logout()">
        <v-list-item-title>Salir</v-list-item-title>
    </v-list-item>
</v-list>
<v-list v-else>
    <v-list-item>
        <v-list-item-title @click="dialogInicioSesion = true">Iniciar sesión</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title @click="dialogRegistro = true">Registro</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title @click="dialogPassword = true">Olvidé mi contraseña</v-list-item-title>
    </v-list-item>
</v-list>

</v-menu>
<v-spacer></v-spacer>
<span v-if="$auth.loggedIn" class="sheyka-app-bar white--text">Hola {{$auth.user.username}}!</span>
<v-spacer></v-spacer>
</v-app-bar>
<v-main>
    <nuxt></nuxt>
</v-main>

<v-dialog v-model="dialogInicioSesion" :width="(isMobile())?'auto':'50vw'" transition="dialog-transition">

    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <div class="d-flex flex-column align-center">
            <v-btn class="font-weight-black mb-2" color="primary" elevation="0">Inicio de sesión</v-btn>
            <v-btn outlined color="primary" @click="changeToRegistro">Crear una nueva cuenta</v-btn>
        </div>
        <v-form class="full-width text-center mt-2" ref="form" v-model="valid_inicio_sesion">
            <v-text-field name="Email" label="Email" id="email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field name="pass" label="Contraseña" id="pass" v-model="pass" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :type="showPass ? 'text' : 'password'" :rules="passRules" @click:append="showPass = !showPass" required></v-text-field>
            <v-btn class="elevation-0 large" color="primary" @click="inicioDeSesion" block>Entrar</v-btn>
        </v-form>

        <div class="rounded-lg pa-3 mt-3 full-width primary_grey text-center">
            <span class="ma-5 primary--text font-weight-bold">
                Acceso rapido
            </span>

            <v-btn class="mt-1" color="white" block elevation="0" :href="$axios.defaults.baseURL + '/connect/google'">
                <v-icon class="mr-1">mdi-google</v-icon>Google</v-btn>

            <v-btn class="mt-1" color="white" block elevation="0" :href="$axios.defaults.baseURL + '/connect/facebook'">
                <v-icon class="mr-1">mdi-facebook</v-icon>Facebook</v-btn>
        </div>
    </div>
</v-dialog>

<v-dialog v-model="dialogRegistro" :width="(isMobile())?'auto':'50vw'" transition="dialog-transition">

    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <div class="d-flex flex-column align-center">
            <v-btn class="font-weight-black mb-2" color="primary" elevation="0">Registro</v-btn>
            <v-btn outlined color="primary" @click="changeToInicio">Ya tengo cuenta</v-btn>
        </div>
        <v-form class="text-center full-width mt-2" ref="form_registro" v-model="valid_registro">
            <v-text-field name="email" type="email" label="Email" id="email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field name="pass" type="password" label="Contraseña" id="pass" v-model="pass" @click:append="showPass = !showPass" required></v-text-field>
            <v-text-field name="nombre" label="Nombre" id="nombre" v-model="nombre" required></v-text-field>
            <v-text-field name="apellido" label="Apellido" id="apellido" v-model="apellido" required></v-text-field>
            <v-text-field name="telefono" label="Telefono" id="telefono" v-model="telefono" type="number" required></v-text-field>
            <v-text-field name="documento" label="Documento" id="documento" v-model="documento" type="number" required></v-text-field>
            <v-btn class="elevation-0 large" color="primary" @click="registro" block>Crear cuenta</v-btn>
        </v-form>
        <div class="rounded-lg pa-3 mt-3 full-width primary_grey text-center">
            <span class="ma-5 primary--text font-weight-bold">
                Acceso rapido
            </span>

            <v-btn class="mt-1" color="white" block elevation="0" :href="$axios.defaults.baseURL + '/connect/google'">
                <v-icon class="mr-1">mdi-google</v-icon>Google</v-btn>

            <v-btn class="mt-1" color="white" block elevation="0" :href="$axios.defaults.baseURL + '/connect/facebook'">
                <v-icon class="mr-1">mdi-facebook</v-icon>Facebook</v-btn>
        </div>
    </div>

</v-dialog>

<v-dialog v-model="dialogPassword" :width="(isMobile())?'auto':'50vw'">
    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <h4>Si olvidaste tu contraseña, escribe tu email y te enviaremos un codigo para que puedas escribir una nueva</h4>
        <v-form class="text-center full-width mt-2" ref="form_forgot_password" v-model="valid_forgot_password">
            <v-text-field name="email" type="email" label="Email" id="email" v-model="emailForgotPassword" :rules="emailRules" required></v-text-field>
            <v-btn class="elevation-0 large" color="primary" @click="confirmarForgotPassword" block>Confirmar</v-btn>
        </v-form>
        <span class="text-decoration-underline hover" @click="dialogCodigo = true">Ya tengo codigo</span>
    </div>
</v-dialog>

<v-dialog v-model="dialogCodigo" :width="(isMobile())?'auto':'50vw'">
    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <h4>Ingresa el codigo que te enviamos por email para poder resetear tu contraseña</h4>
        <v-form class="text-center full-width mt-2" ref="form_reset_password" v-model="valid_reset_password">
            <v-text-field name="Codigo" label="Codigo" id="codigo" v-model="codigo" required></v-text-field>
            <v-text-field name="pass" label="Contraseña" id="pass" v-model="recoverPass" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :type="showPass ? 'text' : 'password'" :rules="passRules" @click:append="showPass = !showPass" required></v-text-field>
            <v-btn class="elevation-0 large" color="primary" @click="confirmarResetPassword" block>Confirmar</v-btn>
        </v-form>
    </div>
</v-dialog>

<v-dialog v-model="loading" fullscreen class="no-transition">
    <div class="full-height d-flex justify-center align-center shadow-background">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
</v-dialog>
<v-app-bar app flat bottom color="white">
    <v-spacer></v-spacer>
    <v-btn class="rounded-lg elevation-0" color="secondary" @click="iniciar" large>Iniciemos</v-btn>
    <v-spacer></v-spacer>
    <v-btn class="mb-4" fab elevation="2" x-large color="success" href="https://wa.me/message/YKH44MFDY2Z4O1" target="_blank" absolute right>
        <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
</v-app-bar>
<v-snackbar v-model="snackbar" :timeout="1500">
    Email y/o contraseña incorrecta
</v-snackbar>
<v-snackbar v-model="snackbarRegistro" :timeout="1500">
    Email ocupado
</v-snackbar>
<v-snackbar v-model="snackbarRecoverPassword" :timeout="1500">
    {{snackbarRecoverMessage}}
</v-snackbar>
</v-app>
</template>

<script>
    import global from '~/mixins/global.js'
    export default {
        name: 'default',
        mixins: [global],
        data() {
            return {
                codigo: '',
                snackbarRecoverMessage: '',
                snackbarRecoverPassword: false,
                emailForgotPassword: '',
                valid_forgot_password: false,
                valid_reset_password: false,
                recoverPass: '',
                dialogCodigo: false,
                dialogPassword: false,
                snackbar: false,
                snackbarRegistro: false,
                dialogInicioSesion: false,
                valid_inicio_sesion: false,
                valid_registro: false,
                dialogRegistro: false,
                loading: false,
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
                documento: null,
                showPass: false,
                params: {
                    client_id: "957222471580-0s95ltriq07u5ugq6l81ksovbiorm6lk.apps.googleusercontent.com"
                },
                model: {},
                scope: {}
            }
        },
        methods: {

            changeToInicio() {
                this.dialogRegistro = false
                this.dialogInicioSesion = true
            },
            changeToRegistro() {
                this.dialogInicioSesion = false
                this.dialogRegistro = true
            },
            registro() {
                this.loading = true
                this.$refs.form_registro.validate()
                if (!this.valid_registro) return
                this.$axios.post('/auth/local/register', {
                    username: this.email.split('@')[0],
                    email: this.email,
                    password: this.pass,
                    nombre_apellido: `${this.nombre} ${this.apellido}`,
                    telefono: this.telefono,
                    documento: this.documento
                }).then(response => {
                    this.$auth.loginWith("local", {
                        data: {
                            identifier: this.email,
                            password: this.pass,
                        }
                    }).then(response => {
                        this.loading = false
                        this.dialogRegistro = false

                    })

                }).catch(e => {
                    this.snackbarRegistro = true
                    this.loading = false
                })
            },
            async inicioDeSesion() {
                this.loading = true
                this.$refs.form.validate()
                if (!this.valid_inicio_sesion) return

                try {
                    await this.$auth.loginWith("local", {
                        data: {
                            identifier: this.email,
                            password: this.pass,
                        }
                    })
                    this.dialogInicioSesion = false
                    this.dialogRegistro = false
                    this.loading = false

                    var response = await this.$axios.get("/users/" + this.$auth.user.id)

                } catch (e) {
                    console.error(e)
                    this.snackbar = true
                    this.loading = false
                }
            },
            iniciar() {
                //this.$router.push('/new')

                if (this.$auth.loggedIn) {
                    this.$router.push('/new')
                } else {
                    this.dialogRegistro = true
                }
            },
            googleAuthentication(id) {
                this.$axios.get(`/auth/google/callback?id_token=${id}#`).then(response => {
                    this.$axios.setToken(response.data['jwt'])
                    this.$auth.setUser(response.data['user'])
                })
            },
            facebookAuthentication(id) {
                this.$axios.get(`/auth/facebook/callback?access_token=${id}#`).then(response => {
                    this.$axios.setToken(response.data['jwt'])
                    this.$auth.setUser(response.data['user'])
                })
            },
            confirmarForgotPassword() {
                this.$refs.form_forgot_password.validate()
                if (!this.valid_forgot_password) return

                this.loading = true
                this.$axios.post('/auth/forgot-password', {
                    email: this.emailForgotPassword,
                    url: 'https//sheyka.com.co'
                }).then(response => {
                    this.loading = false
                    this.snackbarRecoverPassword = true
                    this.snackbarRecoverMessage = "Chequea tu email"
                }).catch(error => {
                    this.loading = false
                    this.snackbarRecoverPassword = true
                    this.snackbarRecoverMessage = `${error}`
                })
            },
            confirmarResetPassword() {
                this.$refs.form_reset_password.validate()
                if (!this.valid_reset_password) return

                this.loading = true
                this.$axios.post('/auth/reset-password', {
                    code: this.codigo,
                    password: this.recoverPass,
                    passwordConfirmation: this.recoverPass
                }).then(response => {
                    this.loading = false
                    this.snackbarRecoverPassword = true
                    this.snackbarRecoverMessage = "Constraseña cambiada, ya puedes iniciar sesion"
                }).catch(error => {
                    this.loading = false
                    this.snackbarRecoverPassword = true
                    this.snackbarRecoverMessage = `${error}`
                })
            }

        },
        created() {
            const id_token = this.$route.query['id_token']
            if (id_token != undefined)
                this.googleAuthentication(id_token)

            const access_token = this.$route.query['access_token']
            if (access_token != undefined)
                this.facebookAuthentication()
        },

    }
</script>

<style>
    .no-transition .stepper__content {
        transition: none;
    }
    
    .primary_grey {
        background-color: #3b628028;
    }
</style>