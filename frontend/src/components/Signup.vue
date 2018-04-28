<template>
    <div class="ui centered grid">
        <div class="seven wide column login">
            <div class="ui middle aligned center aligned grid">
                <div class="column">
                    <h2 class="ui teal image header">
                        <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" class="image">
                        <div class="content">
                            Create your account today!
                        </div>
                    </h2>
                    <form class="ui large form">
                        <div class="ui stacked segment">
                            <div class="field">
                                <div v-if="message != null" class="statusError">
                                    <h2>{{ message }}</h2>
                                </div>
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" name="firstName" placeholder="First Name">
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" name="text" placeholder="Last Name">
                                </div>
                            </div>
                            <div class="field">
                                <div v-if="message != null" class="statusError">
                                    <h2>{{ message }}</h2>
                                </div>
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
                            <button v-on:click.prevent="signUp" class="ui fluid large blue submit button">Sign Up</button>
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
                form: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    password: null
                },
                code: 0,
                message: null
            }
        },
        methods: {
            signUp: function() {
                this.$http.post('http://localhost:4000/users/login', {
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    email: this.form.email,
                    passowrd: this.form.data
                }).then(function(data) {
                    this.message = data.message;
                    if(data.code != 200) {

                    }
                });
            }
        }
    }
</script>