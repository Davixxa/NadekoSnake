<template>
    <div>
        <h3>{{ token }}</h3>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: null
            }
        },
        mounted() {
            this.$session.start();
            this.token = this.$session.get('token');
            this.$http.post('http://80.162.194.172:8080/admin/auth', {
                auth: {
                    userID: this.$session.get('userID'),
                    token: this.$session.get('token'),
                    isAdmin: this.$session.get('isAdmin')
                }
            }).then(function(data) {
                console.log(data);
                if(!data.body.authed){
                    this.$router.push('../');
                }
            });
        }
    }
</script>