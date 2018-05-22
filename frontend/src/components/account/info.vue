<template>
    <div class="accButtonContainer">
        <h2> Velkommen {{ info.firstName }} {{ info.lastName }} </h2>
        <br />
        <br />
        <div class="ui two column grid">
            <a href="./#/a/settings" class="eight wide column accButton">
                <div class="ui two column wid grid">
                    <div class="row">
                        <div class="three wide column">
                            <i class="setting icon massive">
                            </i>
                        </div>
                        <div class="five wide column">
                            <h3> Bruger Indstillinger </h3>
                            <p> Se og rediger dine bruger-oplysninger </p>
                        </div>
                    </div>
                </div>
            </a>
            <a class="eight wide column accButton" href="./#/a/orders">
                <div class="ui two column wid grid">
                    <div class="row">
                        <div class="three wide column">
                            <i class="mail icon massive">
                            </i>
                        </div>
                        <div class="five wide column">
                            <h3> Ordre </h3>
                            <p> Se og rediger dine Ordre </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="ui two column grid">
            <a class="eight wide column accButton">
                <div class="ui two column wid grid">
                    <div class="row">
                        <div class="three wide column">
                            <i class="payment icon massive">
                            </i>
                        </div>
                        <div class="seven wide column">
                            <h3> Kortoplysninger (Ikke udviklet) </h3>
                            <p> Se og rediger dine kort-oplysninger </p>
                        </div>
                    </div>
                </div>
            </a>
            <a class="eight wide column accButton">
                <div class="ui two column wid grid">
                    <div class="row">
                        <div class="three wide column">
                            <i class="info icon massive">
                            </i>
                        </div>
                        <div class="seven wide column">
                            <h3> Avanceret (ikke udviklet) </h3>
                            <p> Avanceret brugerindstillinger </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                info: {
                    firstName: null,
                    lastName: null
                }
            }
        },
        mounted() {
            if(this.$session.get('token') == null){
                this.$router.push('../login');
                return;
            }
            this.$http.post('http://80.162.194.172:8080/users/auth', {
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
                    this.$router.push('../login');
                }
            });
        }
    }
</script>