<template>
    <v-container class="pa-0" fluid>
        <div class="d-flex justify-left align-center">
            <v-checkbox  
            v-model="regalo"
            ></v-checkbox>
            <h3>Lo quieres para regalo?</h3>            
        </div>

        <div v-show="regalo" class="rounded-lg white pa-2">
            <h3>Para:</h3>
            
            <v-select
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
        
                ></v-text-field>
                <v-text-field
                    name="telefono"
                    label="Numero de telefono"
                    type="number"
                    id="telefono"
                    required
                    v-model="telefono"
                    :rules="[ v => !!v || 'Telefono requerido']"
        
                ></v-text-field>
                
            </v-form>
                
           </div>

    </v-container>
    
</template>

<script>
    import ciudades from '~/static/ciudades.json'
    import global from '~/mixins/global.js'

    export default {
        mixins: [global],
        data() {
            return {
                user: {},
                personas: [],
                selectedPerson: 0,
                message: 'Datos del destinatario',
                dialog: false,
                validate: false,
                ciudades: ciudades,
                paises: ['Colombia'],
            }
        },
        created() {
            this.$root.$on('showOrderPersonInformation', () => {
                this.checkForm()
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
                    email: '',
                    telefono: ''
                })
            })

        },
        watch: {
            selectedPerson(persona_id) {
                var persona = this.personas.find(persona => persona.id == persona_id)
                this.nombre_apellido = persona.nombre_apellido
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
            },
            terminos_y_condiciones: {
                set(value) {
                    this.$store.dispatch("new/setTerminosYCondiciones", value)
                },
                get() {
                    return this.$store.getters["new/getTerminosYCondiciones"]
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