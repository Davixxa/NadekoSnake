<template>
  <div id="app">
    <div class="ui top fixed menu">
                <div class="item">
                  <img src="/images/logo.png">
                </div>
                <div class="right menu">
                        <a class="item">
                                <i class="user icon"></i>
                                Login
                            </a>
                            <a class="item">
                                <i class="shop icon"></i>
                                Kurv
                            </a>
                  </div>
              </div>
              <div class="ui bottom fixed menu">
                <div class="item">
                  <img src="/images/logo.png">
                </div>
              </div>
    <router-view>

    </router-view>
  </div>

</template>