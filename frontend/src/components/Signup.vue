<template>
    <div class="ui centered grid">
        <div class="seven wide column login">
            <div class="ui middle aligned center aligned grid">
                <div class="column">
                    <h2 class="ui teal image header">
                        <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" class="image">
                        <div class="content">
                            Opret en konto i dag!
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
                                    <input type="text" v-model="form.firstName" placeholder="Fornavn">
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="user icon"></i>
                                    <input type="text" v-model="form.lastName" placeholder="Efternavn">
                                </div>
                            </div>
                            <div class="field">
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
                            <input type="checkbox" v-model="form.accept" /> <span> Accepterer du vores <a href="../#/agreements/tos"> Salgsbetingelser </a>?</span>
                            <button v-on:click.prevent="signUp" class="ui fluid large blue submit button">Registrer</button>
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
                    password: null,
                    accept: null
                },
                code: 0,
                message: null
            }
        },
        methods: {
            signUp: function() {
                if(this.form.accept != true){
                    this.message = "Please accept the terms of sale";
                    return;
                };
                this.$http.post('http://localhost:3000/users/signup', {
                    firstName: this.form.firstName,
                    lastName: this.form.lastName,
                    email: this.form.email,
                    password: this.form.password
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