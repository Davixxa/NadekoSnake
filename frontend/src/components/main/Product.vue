<template>
<div id="server">
    <div class="ui centered grid container">
        <div class="row">
            <div class="twelve wide column">
                    <div class="ui segments">
                        <div class="ui center aligned segment">
                                <div class="statusError" v-if="message != null">
                                    <h2> {{ message }} </h2>
                                </div>
                            <h1>{{ productName }}</h1>
                            <div v-if="isAdmin">
                                <small>Product ID: {{id}}</small>
                                <br>
                                <small><a v-bind:href="'/#/su/product/editProduct/?id=' + id">Rediger</a> <a v-on:click.prevent="deletThis">Slet</a></small>

                            </div>
                        </div>
                        <div class="ui segment">
                            <div class="ui grid">
                                <div class="row">
                                    <div class="ten wide center aligned column">
                                        <img class="ui image" v-bind:src="productImg" />
                                    </div>
                                    <div class="six wide center aligned column">
                                        <div class="ui segment">
                                            <h1>{{ productPrice }} kr</h1>
                                            <a class="ui fade animated blue button" v-bind:href="'/#/a/order/place/?id=' + id">
                                                <div class="visible content">Køb</div>
                                                <div class="hidden content"><i class="shop icon"></i></div>
                                            </a>
                                            <p></p>
                                            <p>Leveringstid: 1-2 dage.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="eight wide column">
                                        <div class="ui segments">
                                            <div class="ui center aligned segment">
                                                <h1>Produktoplysninger</h1>
                                            </div>
                                            <div class="ui segment">
                                                <p>{{productDesc}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="eight wide column">
                                        <div class="ui segments">
                                            <div class="ui center aligned segment">Specifikationer</div>
                                            <div class="ui segment"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
          id: 0,
          productName: "Intet produkt fundet",
          productDesc: "",
          productImg: "",
          productPrice: 1.048596,
          isAdmin: false,
          message: null
        }
    },
        mounted() {
          console.log(this.$route.query.id);
            this.$http.post('http://80.162.194.172:8080/product/info', {
                //jsonBody
                id: this.$route.query.id
            }).then(function(data) {
                if (!data.body.code == 200) {
                    this.$router.push('/#/');
                }
                else {
                    this.id = data.body.id;
                    this.productName = data.body.productName;
                    this.productDesc = data.body.productDesc;
                    this.productImg = data.body.productImg;
                    this.productPrice = data.body.productPrice;


                }
            });
            this.$http.post("http://80.162.194.172:8080/admin/auth", {
                auth: {
                    userID: this.$session.get("userID"),
                    token: this.$session.get("token"),
                    isAdmin: this.$session.get("isAdmin")
                    }
            }).then(function(data) {
                //console.log(data)
                if (data.body.authed) {

                    this.isAdmin = true;

                }

                console.log(this.isAdmin);
            });

        }, methods: {

            deletThis: function() {
                
                this.$http.post('http://80.162.194.172:8080/product/delete', {

                    auth: {
                        token: this.$session.get("token"),
                        userID: this.$session.get("userID")

                    },
                    productID: this.id

                }).then(function(data) {
                    this.message = data.body.message;
                    if(data.body.status != 200) {
                        return;
                    }
                    window.location('/#/');
                });
            }


        }
    }
  
</script>