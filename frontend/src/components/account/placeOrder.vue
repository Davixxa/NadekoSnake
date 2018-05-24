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
                                        <i class="home icon"></i>
                                        <input type="text" v-model="form.address" placeholder="Addresse"/>
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <input type="number" v-model="form.postal" placeholder="Postnummer" />
                                    </div>
                                </div>

                                <div class="field">
                                    <div class="ui left icon input">
                                        <i class="map icon"></i> <!-- Eventuelt udskift med "money bill alternate icon". Jeg har brugt shekel som joke. -->
                                        <input type="text" v-model="form.city" placeholder="By" />
                                    </div>
                                </div>

                            <button v-on:click.prevent="create" class="ui fluid large blue submit button">Placer Ordre</button>
                            
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
                    address: null,
                    postal: null,
                    city: null
                },
                code: 0,
                message: null
            }
        },
        mounted() {

            if(this.$session.get('token') == null){
                this.$router.push('/login');
                return;
            }
        
            if(this.$route.query.id == null) {
                this.$router.push("/");
                return;
            }
        },
        methods: {
            create: function() {
                if(!this.form.address){
                    this.message = "Skriv venligst din addresse";
                    return;
                };

                if(!this.form.postal) {
                    this.message ="Skriv venligst dit postnummer";
                    return;
                }

                if(!this.form.city) {
                    this.message = "Skriv venligst byen, hvor varen skal sendes til.";
                    return;
                }

                this.$http.post('http://80.162.194.172:8080/order/create', {

                    auth: {
                        token: this.$session.get("token"),
                        userID: this.$session.get("userID")

                    },
                    
                        productID: this.$route.query.id,
                        address: this.form.address,
                        postal: this.form.postal,
                        city: this.form.city


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