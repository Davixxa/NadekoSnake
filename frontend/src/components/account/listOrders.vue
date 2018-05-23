<template>
        <div class="server">

        
        <div class="ui centered grid container">

            <div class="row">
                <div class="twelve wide column">
                    <table class="ui celled table">
                        <thead>
                            <tr>
                                <th>Produkt</th>
                                <th>Adresse</th>
                                <th>Postnummer</th>
                                <th>By</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="order in orders" :key="order">
                                <td> 
                                    <img v-bind:src="order.productImg" style="width: 20%; float: left;">
                                    <p style="line-height: 100px;"> {{ order.productName}} </p>
                                </td>
                                <td>
                                    <p> {{ order.address }} </p>
                                </td>
                                <td>
                                    <p>{{ order.postal }}</p>
                                </td>
                                <td>
                                    <p>{{ order.city }}</p>
                                </td>
                                
                            </tr>
                        </tbody>
                     </table>
                </div>
            </div>

        </div>
        
        
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
                this.$http.post('http://80.162.194.172:8080/order/getOrders/', {
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
