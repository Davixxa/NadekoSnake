<template>
    <div class="ui centered grid">
        <div class="seven wide column login">
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <h2 class="ui teal image header">
                  <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" class="image">
                  <div class="content">
                    Log ind på din bruger
                  </div>
                </h2>
                <form class="ui large form">
                  <div class="ui stacked segment">
                    <div class="field">
                      <div v-if="message != null" class="statusError">
                        <h2>{{ message }}</h2>
                      </div>
                      <div class="ui left icon input">
                        <i class="envelope outline icon"></i>
                        <input type="text" v-model="form.email" placeholder="E-mail adresse">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" v-model="form.password" placeholder="Password">
                      </div>
                    </div>
                    <button v-on:click.prevent="login" class="ui fluid large blue submit button">Log ind</button>
                    </div>
                    <div class="ui error message"></div>
                </form>
              <div class="ui message">
                <span>Førstegangskøber? -</span> <a href="./#/signup">Registrer</a>
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
        token: null,
        isAdmin: 0,
        status: 0,
        message: null,
        form: {
          email: null,
          password: null
        }
      }
    },
    methods: {
      login: function() {
        this.$http.post('http://localhost:3000/users/login',{
          email: this.form.email,
          password: this.form.password
        }).then(function(data){
          if(data.body.code == 200){
            this.$session.start();
            this.$session.set('userID', data.body.userID);
            this.$session.set('token', data.body.token);
            this.$session.set('isAdmin', data.body.isAdmin);
            location.reload();
            this.$router.push('./');
          }else{
            this.message = data.body.message;
          }
        });
      }
    }
  }
</script>