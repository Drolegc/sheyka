<template>
    <v-container class=" full-height primary_background" >
        <h1 class="primary--text mb-10">Mis ordenes</h1>
        <p class="subtitle text-center">Las ordenes pueden demorar un par de minutos en ser procesadas</p>
        <h3 v-if="orders.length == 0" class="grey--text">No tienes ordenes</h3>
        <template v-else v-for="(order,index) in orders">
            <div class="white d-flex justify-center align-center rounded-lg elevation-1 pa-3 mt-3 mb-3">
                <v-img
                class="mr-3"
                :src="$axios.defaults.baseURL + order.frames[0].picture.url"
                aspect-ratio="1"
                width="33%"
                >   
                </v-img>
                <div class="text-left">
                    <span class="subtitle">{{quantity(order)}} cuadros</span>
                    <br>
                    <span><b>Estado:</b> {{state(order.state)}}</span>
                    <br>
                    <span><b>Fecha:</b> {{formatDate(order.created_at)}}</span>

                    
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
    <v-list-item @click="orderAction(order)">
        <v-list-item-title>Detalles</v-list-item-title>
    </v-list-item>
</v-list>
</v-menu>
</div>

</div>
</template>
<v-dialog v-model="selectedOrder" max-width="500px" transition="dialog-transition">
    <div class="pa-4 white rounded-lg">
        <h2>Detalles de la orden</h2>
        <span>* Codigo de referencia en epayco: {{selectedOrderData.ref_payco}}</span>
        <hr class="mt-2 mb-2">
        <p><b>Pais: </b>{{selectedOrderData.country}}</p>
        <p><b>Ciudad: </b>{{selectedOrderData.city}}</p>
        <p><b>Calle: </b>{{selectedOrderData.street}}</p>
        <p><b>Otros: </b>{{selectedOrderData.street_number}}</p>
        <hr class="mt-2 mb-2">
        <template v-for="(frame,index) in selectedOrderData.frames">
            <div class="d-flex align-center mt-1 mb-1" :key="index">
                <v-img
                aspect-ratio="1"
                class="mr-3"
                :src="$axios.defaults.baseURL + frame.picture.url"
                max-width="75"
                max-height="75"
                ></v-img>
                <span>Cantidad: {{frame.quantity}}</span>
            </div>
        </template>
        <hr class="mt-2 mb-2">
        <h3>Total: $COL {{selectedOrderData.price}}</h3>
        <hr class="mt-2 mb-2">
        <div class=" text-center">
            <v-btn class="elevation-0 rounded-lg mt-2 mb-2" color="primary">Ya llego!</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="mt-2" text small color="red">Reportar demora</v-btn>
        </div>
    </div>
</v-dialog>
</v-container>
</template>

<script>
    import moment from 'moment';

    export default {
        layout: 'orders',
        data() {
            return {
                orders: [],
                selectedOrder: false,
                selectedOrderData: {},
            }
        },
        created() {
            this.$axios.get(`/orders?user=${this.$auth.user.id}&ref_payco_null=false`).then(response => this.orders = response.data)
        },
        methods: {
            deleteOrder() {
                this.$router.push('/orders')
            },
            quantity(order) {
                var result = 0
                order.frames.forEach(frame => result += frame.quantity)
                return result
            },
            state(state_data) {
                console.log(state_data)
                switch (state_data) {
                    case 'comming':
                        return 'en camino'
                    case 'delay':
                        return 'con retraso'
                    case 'received':
                        return 'recibido'
                    default:
                        'error  '
                }
            },
            orderAction(order) {
                this.selectedOrder = true
                this.selectedOrderData = order
            },
            formatDate(date) {
                return moment(date).format('LLLL');
            }
        }
    }
</script>