<template>
    <v-container>
        
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                orders: []
            }
        },
        created() {
            this.$axios.get('/orders?user=' + this.$auth.user.id).then(response => this.orders = repsonse.data)
        }
    }
</script>