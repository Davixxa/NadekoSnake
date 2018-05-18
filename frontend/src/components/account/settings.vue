<template>
    <div class="accButtonContainer">
        <h1> Indstillinger </h1>
        <hr />
        <div class="ui two column grid">
            <div class="fourteen wide column">
                <h3> Fornavn: {{ info.firstName }} </h3>
                <h3> Efternavn: {{ info.lastName }} </h3>
            </div>
            <div class="two wide column">
                <a href="./#/a/settings/changeName">
                    <i class="edit icon huge">
                    </i>
                </a>
            </div>
        </div>
        <hr />

        <div class="ui two column grid">
            <div class="fourteen wide column">
                <h3> email: {{ info.email }} </h3>
            </div>
            <div class="two wide column">
                <a href="./#/a/settings/changeEmail">
                    <i class="edit icon huge">
                    </i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    firstName: null,
                    lastName: null,
                    email: null
                },
                link: {
                    nameChange: null,
                    emailChange: null
                }
            }
        },
        mounted() {
            if(this.$session.get('token') == null){
                this.$router.push('../login');
                return;
            }
            this.$http.post('http://80.162.194.172:8080/users/info', {
                auth: {
                    token: this.$session.get('token'),
                    userID: this.$session.get('userID'),
                    isAdmin: this.$session.get('isAdmin')
                }
            }).then(function(data) {
                if(data.body.authed){
                    this.info.firstName = data.body.firstName;
                    this.info.lastName = data.body.lastName;
                    this.info.email = data.body.email;
                }else{
                    this.$router.push('../login');
                }
            });
        },
    }
</script>