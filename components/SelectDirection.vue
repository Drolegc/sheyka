<template>
    <v-container >
        <v-container class="d-flex justify-space-around align-center rounded-lg white" @click="dialog = true">
            <v-icon x-large>mdi-home</v-icon>
        <span class="headline">{{message}}</span>
        </v-container>

        <v-dialog
        :width="(isMobile())?'auto':'50vw'"
        v-model="dialog"
        transition="dialog-transition"
    >

   <div class="rounded-lg white pa-2">
    <v-form
    ref="formDirection"
    v-model="validate"
    >
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
            name="telefono"
            label="Telefono extra (opcional)"
            type="number"
            id="telefono"
            v-model="telefono_extra"
        ></v-text-field>
        <v-text-field
            name="codigo_postal"
            label="Codigo postal (opcional)"
            type="number"
            id="codigo_postal"
            v-model="codigo_postal"
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
    import global from '~/mixins/global.js'

    export default {
        mixins: [global],
        data() {
            return {
                message: 'Agregar direccion',
                dialog: false,
                validate: false,
                ciudades: ciudades,
                paises: ['Colombia'],
            }
        },
        created() {
            this.$root.$on('showOrderDirectionInformation', () => {
                this.dialog = true
                    //this.checkForm()
            })


        },
        computed: {
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
            telefono_extra: {
                set(value) {
                    this.$store.dispatch("new/setTelefonoExtra", value)
                },
                get() {
                    return this.$store.getters["new/getTelefonoExtra"]
                }
            }
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