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
                                        <input type="text" v-model="form.name" placeholder="Name" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <textarea type="text" v-model="form.description" placeholder="Description" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="shekel sign icon"></i> <!-- Eventuelt udskift med "money bill alternate icon". Jeg har brugt shekel som joke. -->
                                        <input type="number" v-model="form.price" placeholder="Price" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="image icon"></i>
                                        <input type="text" v-model="form.image" placeholder="Image" />
                                    </div>
                                </div>
                            <button v-on:click.prevent="create" class="ui fluid large blue submit button">Create Product</button>
                            
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
                if (!data.authed) {

                    this.$router.push("/#/");

                }
            });
                
        },
        methods: {
            create: function() {
                if(!this.form.name){
                    this.message = "Please enter a name";
                    return;
                };

                if(!this.form.description) {
                    this.message ="Please enter a description";
                    return;
                }

                if(!this.form.price) {
                    this.message = "Please select a price";
                    return;
                }

                if(!this.form.image) {
                    this.message = "Please paste in an image link";
                    return;
                }


                this.$http.post('http://localhost:3000/product/create', {

                    auth: {
                        token: this.$session.get("token"),
                        userID: this.$session.get("userID")

                    },
                    product: {
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