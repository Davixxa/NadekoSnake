<template>
        <div class="server">



        <h3>{{ orders }}</h3>
        
        <ul class="example">
            <li v-for="order in orders">
                {{ order.productName }} // {{ order.address }}
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
                this.$http.post('http://localhost:3000/order/getOrders/', {
                    auth: {
                        token: this.$session.get('token'),
                        userID: this.$session.get('userID'),
                        isAdmin: this.$session.get('isAdmin')
                    },
                    showAll: false
                }).then(function(data) {
                    if(data.body.code != null){
                        this.$router.push('../login');
                    }else{
                        orders = data.body;
                        console.log("orders")
                        console.log(orders)
                        for(var i = 0, len = orders.length; i <= len; i++) {
                            this.$http.post('http://80.162.194.172:8080/product/info', {
                                //jsonBody
                                id: orders[i].productID
                            }).then(function(data) {
                                if (!data.body.code == 200) {
                                    return;
                                }
                                else {
                                    console.log(orders[i])
                                    ordersPopulated.push(orders[i]);
                                    ordersPopulated[i].productName = data.body.productName;
                                    ordersPopulated[i].productDesc = data.body.productDesc;
                                    ordersPopulated[i].productImg = data.body.productImg;
                                    ordersPopulated[i].productPrice = data.body.productPrice;
                                }
                                //ordersPopulated.push(orders[i]);
                            });
                        }
                        this.orders = ordersPopulated;
                    }
                });

            }
    }
</script>
