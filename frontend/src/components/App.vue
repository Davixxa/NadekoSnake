<template>
  <div id="app">
    <div class="ui top fixed menu">
        <div class="item">
          <img src="https://cdn.discordapp.com/attachments/311052549685903361/436267861737209866/inKomplett.png" width="55%">
      </div>
      <div class="right menu">
        <a class="item">
          <center>
          <i class="user icon big">
          </i>
            <p style="font-size: 100%;">Login</p>
          </center>
        </a>
        <a class="item">
          <center>
          <i class="shop icon big">
          </i>
            <p style="font-size: 100%;">Kurv</p>
          </center>
        </a>
      </div>
    </div>
    <div class="ui bottom fixed menu">
      <div class="item">
        <img src="/images/logo.png">
      </div>
    </div>
    <br />
    <router-view>

    </router-view>
  </div>

</template>