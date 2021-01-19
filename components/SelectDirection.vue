<template>
    <v-container >
        <v-container class="d-flex justify-space-around align-center rounded-lg white" @click="dialog = true">
            <v-icon x-large>mdi-home</v-icon>
        <span class="headline">{{message}}</span>
        </v-container>

        <v-dialog
        v-model="dialog"
        transition="dialog-transition"
    >

   <div class="rounded-lg white pa-2">
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
            name="documento"
            label="Documento de identidad"
            id="documento"
            v-model="documento"
            :rules="[ v => !!v || 'Documento requerido']"
            required
        ></v-text-field>
        <v-text-field
            name="calle_numero"
            label="Calle y numero"
            id="calle_numero"
            v-model="calle_numero"
            :rules="[ v => !!v || 'Calle y numero requeridos']"
            required
        ></v-text-field>
        <v-text-field
            name="piso_puerta_otros"
            v-model="piso_puerta_otros"
            label="Piso, puerta, escalera, otros"
            id="piso_puerta_otros"
            :rules="[ v => !!v || 'Campo requerido']"

            required
        ></v-text-field>
        <!-- <v-select 
        :items="paises" 
        item-text="text" 
        item-value="value" 
        v-model="paisSeleccionado" 
        label="Pais" 
        :rules="[(v) => !!v || 'Este campo es requerido']"></v-select> -->
        <!-- <v-select 
        :items="ciudades" 
        item-text="text" 
        item-value="value" 
        required 
        v-model="ciudadSeleccionada" 
        label="Ciudad" 
        :rules="[(v) => !!v || 'Este campo es requerido']"></v-select> -->
        <v-text-field
            name="pais_seleccionado"
            v-model="paisSeleccionado"
            label="Pais"
            id="pais_seleccionado"
            :rules="[ v => !!v || 'Campo requerido']"
            required
        ></v-text-field>
        <v-text-field
            name="ciudad_seleccionada"
            v-model="ciudadSeleccionada"
            label="Ciudad o Municipio"
            id="ciudad_seleccionada"
            :rules="[ v => !!v || 'Campo requerido']"
            required
        ></v-text-field>
        <v-text-field
            name="codigo_postal"
            label="Codigo postal"
            type="number"
            id="codigo_postal"
            required
            v-model="codigo_postal"
            :rules="[ v => !!v || 'Codigo postal requerido']"
        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Numero de telefono"
            type="number"
            id="telefono"
            required
            v-model="telefono"
            :rules="[ v => !!v || 'Telefono requeridos']"
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
                message: 'Agregar direccion',
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


        },
        computed: {
            nombre_apellido: {
                set(value) {
                    this.$store.dispatch("new/setNombreApellido", value)
                },
                get() {
                    return this.$store.getters["new/getNombreApellido"]
                }
            },
            calle_numero: {
                set(value) {
                    this.$store.dispatch("new/setCalleNumero", value)
                },
                get() {
                    return this.$store.getters["new/getCalleNumero"]
                }
            },
            piso_puerta_otros: {
                set(value) {
                    this.$store.dispatch("new/setPisoPuertaOtros", value)
                },
                get() {
                    return this.$store.getters["new/getPisoPuertaOtros"]
                }
            },
            codigo_postal: {
                set(value) {
                    this.$store.dispatch("new/setCodigoPostal", value)
                },
                get() {
                    return this.$store.getters["new/getCodigoPostal"]
                }
            },
            telefono: {
                set(value) {
                    this.$store.dispatch("new/setTelefono", value)
                },
                get() {
                    return this.$store.getters["new/getTelefono"]
                }
            },
            paisSeleccionado: {
                set(value) {
                    this.$store.dispatch("new/setPais", value)
                },
                get() {
                    return this.$store.getters["new/getPais"]
                }
            },
            ciudadSeleccionada: {
                set(value) {
                    this.$store.dispatch("new/setCiudad", value)
                },
                get() {
                    return this.$store.getters["new/getCiudad"]
                }
            },
            documento: {
                set(value) {
                    this.$store.dispatch("new/setDocumento", value)
                },
                get() {
                    return this.$store.getters["new/getDocumento"]
                }
            },
        },
        methods: {
            checkForm() {
                this.$refs.formDirection.validate()
                if (!this.validate) return
                this.dialog = false
                this.message = `${this.paisSeleccionado} ${this.ciudadSeleccionada} ${this.calle_numero} ${this.piso_puerta_otros}`
            }
        }
    }
</script>