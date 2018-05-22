<template>
    <div id="server">
        <div class="ui grid">
            <div class="ui four wide column" v-for="item in prodList" :key="item">
                <h3>{{ item.productName }}</h3>
                <img width="300px" :src="item.productImg" />
                <a class="ui fluid large blue submit button" :href="'/#/product?id=' + item.id"> Læs mere eller køb </a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                prodList: [],
                prodListLength: 0,
                msg: null
            }
        },
        mounted() {
            this.$http.get('http://80.162.194.172:8080/product/getProducts').then(function(data) {
                this.prodList = data.body;
                this.prodListLength = data.body.length;
            });
        },
        methods: {
            
        },
        created() {
            this.$http.get("http://80.162.194.172:8080/users").then(function(response){
               this.msg = response.body.username;
            });
        }
    }

</script>