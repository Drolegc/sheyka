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
            name="direccion1"
            label="Calle y numero"
            id="direccion1"
            v-model="direccion1"
            :rules="[ v => !!v || 'Calle y numero requeridos']"
            required
        ></v-text-field>
        <v-text-field
            name="direccion2"
            v-model="direccion2"
            label="Piso, puerta, escalera, otros"
            id="direccion2"
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
        :items="ciudad" 
        item-text="text" 
        item-value="value" 
        required 
        v-model="ciudadSeleccionada" 
        label="Ciudad" 
        :rules="[(v) => !!v || 'Este campo es requerido']"></v-select>
        <v-text-field
            name="codigo_postal"
            label="Codigo postal"
            id="codigo postal"
            v-model="codigo_postal"
        ></v-text-field>
        <v-text-field
            name="telefono"
            label="Numero de telefono"
            id="telefono"
            v-model="telefono"
        ></v-text-field>
        <div class="d-flex justify-space-between align-center">
            <v-btn icon color="red"><v-icon>mdi-close</v-icon></v-btn>
            <v-btn icon color="success"><v-icon>mdi-check</v-icon></v-btn>
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
                dialog: true,
                direccion1: '',
                direccion2: '',
                ciudad: [''],
                ciudadSeleccionada: '',
                estado_provincia: '',
                codigo_postal: '',
                numero: '',
                pais: [''],
                paisSeleccionado: '',
                telefono: ''
            }
        }
    }
</script>