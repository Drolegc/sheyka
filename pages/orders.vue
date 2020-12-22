<template>
    <v-container class=" full-height primary_background" >
        <h1 class="primary--text mb-10">Mis ordenes</h1>
        <div class="white d-flex justify-center align-center rounded-lg elevation-1 pa-3">
            <v-img
            class="mr-3"
            src="https://picsum.photos/id/11/500/300"
            aspect-ratio="1"
            >   
            </v-img>
            <div class="text-left">
                <span class="subtitle">3 cuadros grandes</span>
                <br>
                <span><b>Estado:</b> en camino</span>
            </div>
            <v-spacer></v-spacer>
            <div class="text-center">
                <v-menu
            bottom
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

<v-list>
    <v-list-item>
        <v-list-item-title>Reportar retraso</v-list-item-title>
    </v-list-item>
</v-list>
</v-menu>
</div>

</div>
</v-container>
</template>

<script>
    export default {
        layout: 'orders',
        data() {
            return {
                orders: []
            }
        },
        created() {
            this.$axios.get('/orders?user=' + this.$auth.user.id).then(response => this.orders = response)
        },
        methods: {
            deleteOrder() {
                this.$router.push('/orders')
            }
        }
    }
</script>