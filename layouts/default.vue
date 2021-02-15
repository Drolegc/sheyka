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
        color="white" 
        v-bind="attrs"
        v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
<v-list v-if="$auth.loggedIn">
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
            <v-icon> mdi-whatsapp </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
            Comunicate con nosotros</v-list-item-title>
    </v-list-item>
    <v-list-item @click="$auth.logout()">
        <v-list-item-title>Salir</v-list-item-title>
    </v-list-item>
</v-list>
<v-list v-else>
    <v-list-item>
        <v-list-item-title @click="dialogInicioSesion = true">Iniciar sesion</v-list-item-title>
    </v-list-item>
    <v-list-item>
        <v-list-item-title @click="dialogRegistro = true">Registro</v-list-item-title>
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
        <v-form class="full-width text-center" ref="form" v-model="valid_inicio_sesion">
            <v-text-field name="Email" label="Email" id="email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field name="pass" label="Contraseña" id="pass" v-model="pass" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :type="showPass ? 'text' : 'password'" :rules="passRules" @click:append="showPass = !showPass" required></v-text-field>
            <v-btn class="elevation-0 large" color="primary" @click="inicioDeSesion" block>Entrar</v-btn>
        </v-form>
        <v-btn class="mt-1" color="white" block elevation="0" :href="$axios.defaults.baseURL + '/api/google/connect'">
            <v-icon class="mr-1">mdi-google</v-icon>Google</v-btn>

        <v-btn class="mt-1" color="white" block elevation="0">
            <v-icon class="mr-1">mdi-facebook</v-icon>Facebook</v-btn>
    </div>
</v-dialog>

<v-dialog v-model="dialogRegistro" transition="dialog-transition">

    <div class="white d-flex flex-column align-center pa-5 rounded-xl">
        <h3>Registro</h3>
        <v-form class="text-center full-width" ref="form_registro" v-model="valid_registro">
            <v-text-field name="email" type="email" label="Email" id="email" v-model="email" :rules="emailRules" required></v-text-field>
            <v-text-field name="pass" type="password" label="Contraseña" id="pass" v-model="pass" @click:append="showPass = !showPass" required></v-text-field>
            <v-text-field name="nombre" label="Nombre" id="nombre" v-model="nombre" required></v-text-field>
            <v-text-field name="apellido" label="Apellido" id="apellido" v-model="apellido" required></v-text-field>
            <v-text-field name="telefono" label="Telefono" id="telefono" v-model="telefono" type="number" required></v-text-field>
            <v-text-field name="documento" label="Documento" id="documento" v-model="documento" type="number" required></v-text-field>
            <v-btn class="elevation-0 large" color="primary" @click="registro" block>Crear cuenta</v-btn>
        </v-form>
        <v-btn class="mt-1" color="white" block elevation="0" :href="$axios.defaults.baseURL + '/api/google/connect'">
            <v-icon class="mr-1">mdi-google</v-icon>Google</v-btn>

        <v-btn class="mt-1" color="white" block elevation="0">
            <v-icon class="mr-1">mdi-facebook</v-icon>Facebook</v-btn>
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
</v-app-bar>
<v-snackbar v-model="snackbar" :timeout="1500">
    Email y/o contraseña incorrecta
</v-snackbar>
</v-app>
</template>

<script>
    export default {
        name: 'default',
        data() {
            return {
                snackbar: false,
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
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true,
                },
                model: {},
                scope: {}
            }
        },
        methods: {

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

                }).catc(e => loading = false)
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
                if (this.$auth.loggedIn) {
                    this.$router.push('/new')
                } else {
                    this.dialogInicioSesion = true
                }
            },
            goToGoogleAuth() {

            },
            googleAuthentication(id) {
                this.$axios.get(`/auth/google/callback?id_token=${id}`).then(response => {
                    this.$axios.setToken(response.data['jwt'])
                    this.$axios.setUser(response.data['user'])
                })
            }

        },
        created() {
            const id_token = this.$route.query['id_token']
            if (id_token != undefined)
                this.googleAuthentication()
        },

    }
</script>

<style>
    .no-transition .stepper__content {
        transition: none;
    }
</style>