<template>
    <v-dialog
    v-model="dialog"
    >
        <v-card class="pa-1 rounded-lg" >
            <h1 class="primary--text text-center mb-10">Nos faltan algunos datos tuyos para seguir con la orden... </h1>
        <v-form
        class="pa-2"
        ref="form"
        v-model="valid"
        >
        <v-text-field
            name="nombre_apellido"
            label="Nombre Apellido"
            id="nombre_apellido"
            v-model="nombre_apellido"
            required
        ></v-text-field>
        <v-text-field
            name="documento"
            label="Documento"
            id="documento"
            v-model="documento"
            type="number"
            required
        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Telefono"
            id="telefono"
            v-model="telefono"
            type="number"
            required
        ></v-text-field>
        <v-btn class="mt-3" color="primary" @click="updateUser" block>Guardar cambios</v-btn>

        </v-form>

        </v-card>

        <v-snackbar v-model="snackbar" :timeout="1500">
            {{snackbarMessage}}
        </v-snackbar>
    </v-dialog>

</template>

<script>
    export default {
        data() {
            return {
                nombre_apellido: '',
                documento: '',
                telefono: '',
                dialog: false,
                snackbar: false,
                snackbarMessage: '',
                valid: false,
            }
        },
        created() {
            var user = this.$auth.user
            this.nombre_apellido = user.nombre_apellido
            this.documento = user.documento
            this.telefono = user.telefono

            this.$root.$on('checkOrderPersonInformation', () => {
                console.log('Abriendo formulario para cambiar datos del usuario')
                this.dialog = true
            })
        },
        methods: {
            updateUser() {
                this.$refs.form.validate()
                if (!this.valid) return
                this.$axios.put('/users/' + this.$auth.user.id, {
                        documento: this.documento,
                        telefono: this.telefono,
                        nombre_apellido: this.nombre_apellido,
                    })
                    .then(response => {
                        this.snackbar = true
                        this.snackbarMessage = "Datos guardados"
                        this.$auth.user.documento = response.data['documento']
                        this.$auth.user.telefono = response.data['telefono']
                        this.$auth.user.nombre_apellido = response.data['nombre_apellido']
                        this.documento = response.data['documento']
                        this.telefono = response.data['telefono']
                        this.nombre_apellido = response.data['nombre_apellido']
                    }).catch((error) => {
                        this.snackbar = true
                        this.snackbarMessage = `Error: ${error.message}`
                    })
            }
        }
    }
</script>