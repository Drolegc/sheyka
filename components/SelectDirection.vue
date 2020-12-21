<template>
    <v-container >
        <v-container class="d-flex justify-space-around align-center rounded-lg white" @click="dialog = true">
            <v-icon x-large>mdi-home</v-icon>
        <span class="headline">Agregar direccion</span>
        </v-container>

        <v-dialog
        v-model="dialog"
        transition="dialog-transition"
    >

   <div class="rounded-lg white pa-2">
    <v-form
    ref="form"
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
        ></v-text-field>
        <v-select 
        :items="paises" 
        item-text="text" 
        item-value="value" 
        required 
        v-model="paisSeleccionado" 
        label="Pais" 
        :rules="[(v) => !!v || 'Este campo es requerido']"></v-select>
        <v-select 
        :items="ciudades" 
        item-text="text" 
        item-value="value" 
        required 
        v-model="ciudadSeleccionada" 
        label="Ciudad" 
        :rules="[(v) => !!v || 'Este campo es requerido']"></v-select>
        <v-text-field
            name="codigo_postal"
            label="Codigo postal"
            id="codigo_postal"
            v-model="codigo_postal"
        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Numero de telefono"
            id="telefono"
            v-model="telefono"
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
    export default {
        data() {
            return {
                dialog: false,
                validate: false,
                // direccion1: '',
                // direccion2: '',
                ciudades: [''],
                ciudadSeleccionada: '',
                // estado_provincia: '',
                // codigo_postal: '',
                // numero: '',
                paises: [''],
                paisSeleccionado: '',
                // telefono: ''
            }
        },
        computed: {
            nombre_apellido: {
                set(value) {
                    this.$store.dispatch("new/setNombreApellido", value)
                },
                get() {
                    return this.$store.nombre_apellido
                }
            },
            calle_numero: {
                set(value) {
                    this.$store.dispatch("new/setCalleNumero", value)
                },
                get() {
                    return this.$store.calle_numero
                }
            },
            piso_puerta_otros: {
                set(value) {
                    this.$store.dispatch("new/setPisoPuertaOtros", value)
                },
                get() {
                    this.$store.piso_puerta_otros
                }
            },
            codigo_postal: {
                set(value) {
                    this.$store.dispatch("new/setCodigoPostal", value)
                },
                get() {
                    this.$store.codigo_postal
                }
            },
            telefono: {
                set(value) {
                    this.$store.dispatch("new/setTelefono", value)
                },
                get() {
                    this.$store.telefono
                }
            }
        },
        methods: {
            checkForm() {
                this.$refs.form.validate()
                if (this.validate) return
            }
        }
    }
</script>