<template>
    <v-container >
        <v-container class="d-flex justify-space-around align-center rounded-lg white" @click="dialog = true">
            <v-icon x-large>mdi-card-account-details</v-icon>
        <span class="headline ml-2">{{message}}</span>
        </v-container>

        <v-dialog
        v-model="dialog"
        transition="dialog-transition"
    >

   <div class="rounded-lg white pa-2">

    <div class="mb-3 d-flex justify-space-between">
        <v-btn class="elevation-0 flex-grow-0" color="primary" :outlined="regalo" @click="regalo = false">Para mi</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" :outlined="!regalo" @click="regalo = true">De regalo!</v-btn>
    </div>

    <v-form
    ref="formDirection"
    v-model="validate"
    >
        <v-text-field
            name="nombre_apellido"
            label="Nombre y Apellidos"
            id="nombre_apellido"
            v-model="nombre_apellido"
            :rules="[ v => !!v || 'Nombre y apellidos requeridos']"
            :disabled="!regalo"
            required
        ></v-text-field>
        <v-text-field
            name="documento"
            label="Documento de identidad"
            id="documento"
            v-model="documento"
            :rules="[ v => !!v || 'Documento requerido']"
            :disabled="!regalo"
            required
        ></v-text-field>
        <v-text-field
            name="email"
            label="Email"
            type="email"
            id="email"
            required
            v-model="email"
            :rules="[ v => !!v || 'Email requerido']"
            :disabled="!regalo"

        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Numero de telefono"
            type="number"
            id="telefono"
            required
            v-model="telefono"
            :rules="[ v => !!v || 'Telefono requerido']"
            :disabled="!regalo"

        ></v-text-field>
        <div class="text-center">
            <v-btn class="elevation-0" fab color="success" @click="checkForm"><v-icon>mdi-check</v-icon></v-btn>
        </div>
    </v-form>
        
   </div>
    </v-dialog>
    </v-container>
    
</template>

<script>
    import ciudades from '~/static/ciudades.json'


    export default {
        data() {
            return {
                user: {},
                personas: [],
                message: 'Datos del destinatario',
                dialog: false,
                validate: false,
                // direccion1: '',
                // direccion2: '',
                ciudades: ciudades,
                // estado_provincia: '',
                // codigo_postal: '',
                // numero: '',
                paises: ['Colombia'],
                // telefono: ''
            }
        },
        created() {
            this.$root.$on('showOrderInformation', () => {
                this.dialog = true
                    //this.checkForm()
            })
            this.$axios.get('/users/' + this.$auth.user.id).then(response => this.user = response.data)
            this.$axios.get('/personas/misPersonas/').then(response => this.personas = response.data)

        },
        computed: {
            regalo: {
                set(value) {
                    this.$store.dispatch("new/setRegalo", value)
                },
                get() {
                    return this.$store.getters["new/getRegalo"]
                }
            },
            nombre_apellido: {
                set(value) {
                    this.$store.dispatch("new/setNombreApellido", value)
                },
                get() {
                    return (this.regalo) ? this.$store.getters["new/getNombreApellido"] : this.user.nombre_apellido
                }
            },
            telefono: {
                set(value) {
                    this.$store.dispatch("new/setTelefono", value)
                },
                get() {
                    return (this.regalo) ? this.$store.getters["new/getTelefono"] : this.user.telefono
                }
            },
            documento: {
                set(value) {
                    this.$store.dispatch("new/setDocumento", value)
                },
                get() {
                    return (this.regalo) ? this.$store.getters["new/getDocumento"] : this.user.documento
                }
            },
            email: {
                set(value) {
                    this.$store.dispatch("new/setEmail", value)
                },
                get() {
                    return this.$store.getters["new/getEmail"]
                }
            }
        },
        methods: {
            checkForm() {
                this.$refs.formDirection.validate()
                if (!this.validate) return
                this.dialog = false
                this.message = `${this.nombre_apellido}`
            }
        }
    }
</script>