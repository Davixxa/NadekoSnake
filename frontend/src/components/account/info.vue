<template>

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
                this.$router.push('./login');
                return;
            }
            this.$http.post('http://localhost:3000/users/info', {
                auth: {
                    token: this.$session.get('token'),
                    userID: this.$session.get('userID'),
                    isAdmin: this$session.get('isAdmin')
                }
            }).then(function(data) {
                if(data.body.code == 200){
                    this.info.firstName = data.body.firstName;
                    this.info.lastName = data.body.lastName;
                }else{
                    this.$router.push('./login');
                }
            });
        }
    }
</script>