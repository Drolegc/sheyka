<template>
    <v-container class="pa-0" fluid >
        
        <div class="rounded-lg white pa-2">
            <v-form
            ref="formDirection"
            v-model="validate"
            >
                <v-text-field
                    name="calle_numero"
                    label="Direccion"
                    id="calle_numero"
                    v-model="calle_numero"
                    :rules="[ v => !!v || 'Calle y numero requeridos']"
                    required
                ></v-text-field>
                <v-text-field
                    name="piso_puerta_otros"
                    v-model="piso_puerta_otros"
                    label="Casa, apto, edificio, otros"
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
                validate: false

            }
        },
        created() {
            this.$root.$on('showOrderDirectionInformation', () => {
                this.checkForm()
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
                console.log('Chequeo de formulario de direccion')
                this.$refs.formDirection.validate()
                if (!this.validate) return
            }
        }
    }
</script>