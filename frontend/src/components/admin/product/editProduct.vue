<template>
  <div class="server">

      <div class="ui center aligned grid">
          <div class="seven wide column">
              <div class="ui center aligned grid">
                  <div class="column">


                      <div class="ui large form">
                          <div class="ui stacked segment">
                                <div class="field">
                                  <div v-if="message != null" class="statusError">
                                        <h2>{{ message }}</h2>
                                  </div>

                                    <div class="ui left icon input">
                                        <i class="file icon"></i>
                                        <input type="text" v-model="form.name" placeholder="Navn"/>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <textarea type="text" v-model="form.description" placeholder="Beskrivelse" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="shekel sign icon"></i> <!-- Eventuelt udskift med "money bill alternate icon". Jeg har brugt shekel som joke. -->
                                        <input type="number" v-model="form.price" placeholder="Pris" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="image icon"></i>
                                        <input type="text" v-model="form.image" placeholder="Billede" />
                                    </div>
                                </div>
                            <button v-on:click.prevent="create" class="ui fluid large blue submit button">Rediger Produkt</button>
                            
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
                form: {
                    name: null,
                    description: null,
                    price: null,
                    image: null,
                },
                code: 0,
                message: null
            }
        },
        mounted() {

            this.$http.post("http://localhost:3000/admin/auth", {

                auth: {
                    userID: this.$session.get("userID"),
                    token: this.$session.get("token"),
                    isAdmin: this.$session.get("isAdmin")
                }

            }).then(function(data) {
                
                if (data.authed == false) {
                    console.log("auth false");
                    this.$router.push("/");

                }
            });

            if(this.$route.query.id == null) {
                this.$router.push("/");
                return;
            }

            this.$http.post('http://localhost:3000/product/info', {
                //jsonBody
                id: this.$route.query.id
            }).then(function(data) {

                if (!data.body.code == 200) {
                    this.$router.push('/#/');
                }

                else {
                    this.form.name = data.body.productName;
                    this.form.description = data.body.productDesc;
                    this.form.image = data.body.productImg;
                    this.form.price = data.body.productPrice;


                }

            });
                
        },
        methods: {
            create: function() {
                if(!this.form.name){
                    this.message = "Skriv venligst et navn";
                    return;
                };

                if(!this.form.description) {
                    this.message ="Skriv venligst en beskrivelse";
                    return;
                }

                if(!this.form.price) {
                    this.message = "Indtast venligst en pris.";
                    return;
                }

                if(!this.form.image) {
                    this.message = "Indsæt venligst et billedlink.";
                    return;
                }


                this.$http.post('http://localhost:3000/product/edit', {

                    auth: {
                        token: this.$session.get("token"),
                        userID: this.$session.get("userID")

                    },
                    product: {
                        id: this.$route.query.id,
                        name: this.form.name,
                        description: this.form.description,
                        image: this.form.image,
                        price: this.form.price 

                    }

                }).then(function(data) {
                    this.message = data.body.message;
                    if(data.body.status != 200) {
                        return;
                    }
                    window.location('../');
                });
            }
        }
    }
</script>