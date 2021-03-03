<template>
    <v-container class=" pa-3 full-height primary_background" fluid>
        <h1 class="primary--text mb-10">Mi perfil</h1>
        <v-card class="pa-1 rounded-lg" >
        <v-form
        class="pa-2"
        ref="form"
        v-model="valid"
        >
        <v-text-field
            name="nombre_apellido"
            label="Nombre Apellido"
            id="nombre_apellido"
            v-model="user.nombre_apellido"
            required
        ></v-text-field>
        <v-text-field
            name="documento"
            label="Documento"
            id="documento"
            v-model="user.documento"
            type="number"
            required
        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Telefono"
            id="telefono"
            v-model="user.telefono"
            type="number"
            required
        ></v-text-field>
        <v-text-field
            name="username"
            label="Usuario"
            id="username"
            v-model="user.username"
            required
        ></v-text-field>
        <v-text-field
            name="email"
            label="Email"
            id="email"
            v-model="user.email"
            required
        ></v-text-field>
        <v-btn v-show="saveBtn" class="mt-3" color="primary" @click="updateUser" block>Guardar cambios</v-btn>

        </v-form>

        </v-card>

        <v-snackbar v-model="snackbar" :timeout="1500">
            {{snackbarMessage}}
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        layout: 'profile',
        data() {
            return {
                user: {},
                initUser: {},
                valid: false,
                saveBtn: false,
                snackbar: false,
                snackbarMessage: "Datos guardados"
            }
        },
        created() {
            this.$axios.get('/users/' + this.$auth.user.id)
                .then(response => {
                    this.user = response.data
                    this.initUser = {...response.data
                    }
                })
        },

        watch: {
            user: {
                handler(val) {
                    this.saveBtn = (
                        val.nombre_apellido != this.initUser.nombre_apellido ||
                        val.documento != this.initUser.documento ||
                        val.username != this.initUser.username ||
                        val.email != this.initUser.email
                    )

                },
                deep: true
            }
        },
        methods: {
            updateUser() {
                this.$axios.put('/users/' + this.$auth.user.id, this.user)
                    .then(response => {
                        this.snackbar = true
                        this.snackbarMessage = "Datos guardados"
                        this.saveBtn = false
                        this.user = response.data
                        this.initUser = {...response.data
                        }
                    }).catch((error) => {
                        this.snackbar = true
                        this.snackbarMessage = `Error: ${error.message}`
                    })
            }
        }
    }
</script>