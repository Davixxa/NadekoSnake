<template>
  <div id="app">
    <div class="ui top sticky menu">
        <div class="item">
          <a href="./#/">
            <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" width="55%">
          </a>
      </div>
      <div class="right menu">
        <a v-if="isLoggedin == false" href="./#/login" class="item">
          <center>
          <i class="user icon big">
          </i>
            <p style="font-size: 100%;">Login</p>
          </center>
        </a>
        <a v-if="isLoggedin" v-on:click="signout" class="item">
          <center>
          <i class="ban icon big">
          </i>
            <p style="font-size: 100%;">Log ud</p>
          </center>
        </a>
        <a v-if="this.$session.get('isAdmin') == 1" href="./#/su/product/createProduct" class="item">
          <center>
          <i class="lock icon big">
          </i>
            <p style="font-size: 100%;">Admin</p>
          </center>
        </a>
        <a v-if="isLoggedin" href="./#/a" class="item">
          <center>
          <i class="user icon big">
          </i>
            <p style="font-size: 100%;">Min side</p>
          </center>
        </a>
      </div>
    </div>
    <router-view>

    </router-view>

    <br />
  </div>

</template>

<script>

  export default {
    data() {
      return {
        isLoggedin: false
      }
    },
    mounted() {
      this.$session.start();
      //Session data gets stored into the cache
      if(this.$session.get('token') != null){
        this.isLoggedin = true;
      }
    },
    methods: {
      signout: function() {
        this.$session.start();
        this.$session.destroy();
        location.reload();
        this.$router.push('./');
      }
    }
  }

</script>