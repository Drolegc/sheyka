<template>
    <v-container class=" pa-3 full-height primary_background">
        <v-card class="pa-1 rounded-lg" >
            <v-img
        :src="$axios.defaults.baseURL + user.profile_picture.url"
        max-height="30vh"
        aspect-ratio="1"
        ></v-img>
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
            
        </v-form>

        </v-card>

        <v-btn v-show="saveBtn" class="mt-3" color="primary" @click="updateUser" block>Guardar cambios</v-btn>
        <v-snackbar v-model="snackbar" :timeout="1500">
            Datos gaurdados
        </v-snackbar>
    </v-container>
</template>

<script>
    export default {
        layout: 'profile',
        data() {
            return {
                user: {
                    profile_picture: {
                        url: ''
                    }
                },
                initUser: {},
                valid: false,
                saveBtn: false,
                snackbar: false
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
                        this.saveBtn = false
                        this.user = response.data
                        this.initUser = {...response.data
                        }
                    })
            }
        }
    }
</script>