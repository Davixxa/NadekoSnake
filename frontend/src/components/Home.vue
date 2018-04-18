<template>
    <div id="server">
        <div v-text="msg">
            {{msg}}
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                msg: null
            }
        },
        methods: {
            
        },
        created() {
            this.$http.get("http://localhost:3000/users").then(function(response){
               this.msg = response.body.username;
            });
        }
    }

</script>