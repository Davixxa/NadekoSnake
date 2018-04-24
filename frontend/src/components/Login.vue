<template>
    <div class="ui centered grid">
        <div class="seven wide column login">
            <div class="ui middle aligned center aligned grid">
              <div class="column">
                <h2 class="ui teal image header">
                  <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" class="image">
                  <div class="content">
                    Log-in to your account
                  </div>
                </h2>
                <form class="ui large form">
                  <div class="ui stacked segment">
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="envelope outline icon"></i>
                        <input type="text" name="email" placeholder="E-mail address">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password">
                      </div>
                    </div>
                    <div class="ui fluid large blue submit button">Login</div>
                    </div>
                    <div class="ui error message"></div>
                </form>
              <div class="ui message">
                New to us? <a href="./#/signup">Sign Up</a>
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
          console.log(data);
        });
      }
    }
  }
</script>