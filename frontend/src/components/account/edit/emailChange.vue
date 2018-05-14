<template>

    <div class="ui centered grid">
        <div class="seven wide column login">
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <h2 class="ui teal image header">
                  <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" class="image">
                  <div class="content">
                    Ændre dit navn
                  </div>
                </h2>
                <form class="ui large form">
                  <div class="ui stacked segment">
                    <div class="field">
                        <p>Efterlad blank hvis ændring ikke ønskes</p>
                      <div v-if="message != null" class="statusError">
                        <h2>{{ message }}</h2>
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class=" icon"></i>
                        <input type="text" v-model="form.email" placeholder="Email">
                      </div>
                    </div>
                    <button v-on:click.prevent="emailChange" class="ui fluid large blue submit button">Update</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                message: null,
                info: {
                    firstName: null,
                    lastName: null
                },
                form: {
                    email: null
                }
            }
        },
        mounted() {
            if(this.$session.get('token') == null){
                this.$router.push('../../login');
                return;
            }
            this.$http.post('http://localhost:3000/users/info', {
                auth: {
                    token: this.$session.get('token'),
                    userID: this.$session.get('userID'),
                    isAdmin: this.$session.get('isAdmin')
                }
            }).then(function(data) {
                if(data.body.authed == true){
                    this.info.firstName = data.body.firstName;
                    this.info.lastName = data.body.lastName;
                }else{
                    this.$router.push('../../login');
                }
            });
        },
        methods: {
            emailChange: function() {
                this.$http.post('http://localhost:3000/users/emailChange', {
                    auth: {
                        userID: this.$session.get('userID'),
                        token: this.$session.get('token'),
                        isAdmin: this.$session.get('isAdmon')
                    },
                    user: {
                        email: this.form.email
                    }
                }).then(function(data) {
                    this.message = data.body.message;
                    if(data.body.code == 200){
                        this.$router.push('../settings');
                    }
                });
            }
        }
    }
</script>