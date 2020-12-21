<template>
    <v-container >
        <v-container class="d-flex justify-space-around align-center rounded-lg white" @click="">
            <v-icon x-large>mdi-credit-card</v-icon>
        <span class="headline ml-3 text-center">Agregar metodo de pago</span>
        </v-container>

        <v-dialog
        v-model="dialog"
        transition="dialog-transition"
    >
    </v-dialog>
    </v-container>
    
</template>


<script>
    export default {
        data() {
            return {
                dialog: false
            }
        }
    }
</script>