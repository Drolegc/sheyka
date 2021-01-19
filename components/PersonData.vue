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
    <v-select
    v-show="regalo"
        filled
        class="ma-2"
        :items="personas"
        v-model="selectedPerson"
        label="Amigos a los que ya les reglaste"
        item-text="nombre_apellido"
        item-value="id"
    ></v-select>
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
            :disabled="!regalo || !nuevo_amigo"
            required
        ></v-text-field>
        <v-text-field
            name="documento"
            label="Documento de identidad"
            id="documento"
            v-model="documento"
            :rules="[ v => !!v || 'Documento requerido']"
            :disabled="!regalo || !nuevo_amigo"
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
            :disabled="!regalo || !nuevo_amigo"

        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Numero de telefono"
            type="number"
            id="telefono"
            required
            v-model="telefono"
            :rules="[ v => !!v || 'Telefono requerido']"
            :disabled="!regalo || !nuevo_amigo"

        ></v-text-field>
        <div class="text-center mt-1">
            <v-btn class="elevation-0" block color="secondary" @click="checkForm"><v-icon>mdi-check</v-icon></v-btn>
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
                //nuevoAmigo: true,
                selectedPerson: 0,
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
            this.$axios.get('/users/' + this.$auth.user.id).then(response => {
                this.user = response.data

                //Current user info saved on the store
                //Because is the first time loading this page, we asume that this order its going to be for the current user
                this.nombre_apellido = this.user.nombre_apellido
                this.documento = this.user.documento
                this.email = this.user.email
                this.telefono = this.user.telefono

            })
            this.$axios.get('/personas/misPersonas/').then(response => {
                this.personas = response.data
                this.personas.push({
                    id: 0,
                    nombre_apellido: 'Nuevo amigo',
                    documento: '',
                    email: '',
                    telefono: ''
                })
            })

        },
        watch: {
            selectedPerson(persona_id) {
                var persona = this.personas.find(persona => persona.id == persona_id)
                this.nombre_apellido = persona.nombre_apellido
                this.documento = persona.documento
                this.email = persona.email
                this.telefono = persona.telefono
                if (persona_id == 0) {
                    this.nuevo_amigo = true
                    this.id_amigo = 0
                } else {
                    this.nuevo_amigo = false
                    this.id_amigo = persona_id
                }
            }
        },
        computed: {
            regalo: {
                set(isRegalo) {
                    this.$store.dispatch("new/setRegalo", isRegalo)
                    if (!isRegalo) {
                        this.nombre_apellido = this.user.nombre_apellido
                        this.documento = this.user.documento
                        this.email = this.user.email
                        this.telefono = this.user.telefono
                    } else {
                        this.nombre_apellido = this.persona.nombre_apellido
                        this.documento = this.persona.documento
                        this.email = this.persona.email
                        this.telefono = this.persona.telefono
                    }
                },
                get() {
                    return this.$store.getters["new/getRegalo"]
                }
            },
            nombre_apellido: {
                set(value) {
                    this.$store.dispatch("new/setNombreApellido", value)
                    if (this.personas.length > 0 && this.regalo)
                        this.persona.nombre_apellido = value

                },
                get() {
                    return this.$store.getters["new/getNombreApellido"]
                }
            },
            telefono: {
                set(value) {
                    this.$store.dispatch("new/setTelefono", value)
                    if (this.personas.length > 0 && this.regalo)
                        this.persona.telefono = value
                },
                get() {
                    return this.$store.getters["new/getTelefono"]
                }
            },
            documento: {
                set(value) {
                    this.$store.dispatch("new/setDocumento", value)
                    if (this.personas.length > 0 && this.regalo)
                        this.persona.documento = value
                },
                get() {
                    return this.$store.getters["new/getDocumento"]
                }
            },
            email: {
                set(value) {
                    this.$store.dispatch("new/setEmail", value)
                    if (this.personas.length > 0 && this.regalo)
                        this.persona.email = value
                },
                get() {
                    return this.$store.getters["new/getEmail"]
                }
            },
            persona: {
                get() {
                    return this.personas.find(persona => persona.id == this.selectedPerson)
                }
            },
            nuevo_amigo: {
                set(value) {
                    this.$store.dispatch("new/setIsNewPerson", value)
                },
                get() {
                    return this.$store.getters["new/getIsNewPerson"]
                }
            },
            id_amigo: {
                set(value) {
                    this.$store.dispatch("new/setIdPerson", value)
                },
                get() {
                    return this.$store.getters["new/getIdPerson"]
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