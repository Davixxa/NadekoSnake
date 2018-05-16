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
            this.$http.post('http://localhost:3000/admin/auth', {
                auth: {
                    userID: this.$session.get('userID'),
                    token: this.$session.get('token'),
                    isAdmin: this.$session.get('isAdmin')
                }
            }).then(function(data) {
                console.log(data);
                if(data.body.authed != authed){
                    
                    this.$router.push('../');
                }
            });
        }
    }
</script>