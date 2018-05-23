<template>
        <div class="server">



        <h3>{{ ordersPopulated }}</h3>
        
        <ul class="example">
            <li v-for="order in orders" :key="order">
                {{ order.productName }} // {{ order.address }}
                <img v-bind:src="order.productImg">
            </li>
        </ul>
        
        </div>

</template>

<script>
    export default {
        data() {
            return {
                orders: [],
            }
        }, 
        mounted() {
                if(this.$session.get('token') == null){
                    this.$router.push('../login');
                    return;
                }
                this.$http.post('http://localhost:3000/order/getOrders/', {
                    auth: {
                        token: this.$session.get('token'),
                        userID: this.$session.get('userID'),
                        isAdmin: this.$session.get('isAdmin')
                    },
                    showAll: false
                }).then(function(data) {
                    console.log(data.body);
                    this.orders = data.body;
                    if(data.body.code != null){
                        console.log("not null");
                        //this.$router.push('../login');
                    }else{

                    }
                });
                console.log(this.orders)
            }
    }
</script>
