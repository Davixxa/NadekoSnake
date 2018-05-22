<template>
        <div class="server">



        <h3>{{ ordersPopulated }}</h3>
        
        <ul class="example">
            <li v-for="order in ordersPopulated">
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
                orders: null,
            }
        }, 
        mounted() {
           var orders = [];
           var ordersPopulated = [];
                if(this.$session.get('token') == null){
                    this.$router.push('../login');
                    return;
                }
                this.$http.post('http://80.162.194.172:8080/order/getOrders/', {
                    auth: {
                        token: this.$session.get('token'),
                        userID: this.$session.get('userID'),
                        isAdmin: this.$session.get('isAdmin')
                    },
                    showAll: false
                }).then(function(data) {
                    if(data.body.code != null){
                        console.log("not null");
                        //this.$router.push('../login');
                    }else{
                        orders = data.body;
                        console.log("orders")
                        console.log(orders)
                        console.log("Array")
                        console.log(orders.array)

                        Object.keys(orders).forEach(key => {
                            console.log(key)
                            console.log(orders[key])

                            this.$http.post('http://80.162.194.172:8080/product/info', {
                                //jsonBody
                                id: orders[key].productID
                            }).then(function(data) {
                                if (!data.body.code == 200) {
                                    //this.$router.push('/#/');
                                }
                                else {
                                    //orders[key]
                                    orders[key].productName = data.body.productName;
                                    orders[key].productDesc = data.body.productDesc;
                                    orders[key].productImg = data.body.productImg;
                                    orders[key].productPrice = data.body.productPrice;


                                }
                            });                                

                            ordersPopulated.push(orders[key]);

                        });

                    }
                });
                console.log("OrdersPopulated")
                console.log(ordersPopulated);
                this.ordersPopulated = ordersPopulated;
            }
    }
</script>
