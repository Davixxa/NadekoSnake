<template>
<div id="server">
    <div class="ui centered grid container">
        <div class="row">
            <div class="twelve wide column">
                    <div class="ui segments">
                        <div class="ui center aligned segment">
                            <h1>{{ productName }}</h1>
                        </div>
                        <div class="ui segment">
                            <div class="ui grid">
                                <div class="row">
                                    <div class="ten wide center aligned column">
                                        <img class="ui image" v-bind:src="productImg" />
                                    </div>
                                    <div class="six wide center aligned column">
                                        <div class="ui segment">
                                            <h1>{{ productPrice }} kr</h1>
                                            <button class="ui fade animated blue button">
                                                <div class="visible content">Læg i indkøbsvognen</div>
                                                <div class="hidden content"><i class="shop icon"></i></div>
                                            </button>
                                            <p></p>
                                            <p>Leveringstid: 1-2 dage.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="eight wide column">
                                        <div class="ui segments">
                                            <div class="ui center aligned segment">
                                                <h1>Produktoplysninger</h1>
                                            </div>
                                            <div class="ui segment">
                                                <p>{{productDesc}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="eight wide column">
                                        <div class="ui segments">
                                            <div class="ui center aligned segment">test</div>
                                            <div class="ui segment"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
          id: 0,
          productName: "None",
          productDesc: "\"Whose eyes are those eyes?\". \
              I dream a lot. In my dream, big me visits little me in a time machine. Big me does not look like little me at all. The time machine has a lot of buttons, and I think a shower or shampoo or something comes out if you push them. I asked big me to show me how it works and he said we could go see dinosaurs or even cavemen. He asked what I am bad at in school and I said I am bad at math. He told me there was a switch that would make me super good at math. He got really angry when I tried to use it. I think he said I need to earn it by trying hard. \
    He only got mad that one time, so he was nice and it was fun after that. He told me about the girl I marry. That's a secret. I also asked him about God. He told me God is real. I think God is real too. God is watching everywhere. Mom said you go to hell if you do bad things. I can never ever do bad things. I have to be kind to my little sister too. Mom told me it was not God that watches you do bad things. She said it was a scary man. The scary man is the whose eyes are those eyes monster. You go to hell if he sees you. God's eyes and whose eyes are those eyes are in the skies and the house and the walls and the school and there are a lot of them and they are watching me all the time. I think I should do good things because of that. It embarrasses me because they still watch even when I need to use the toilet or take a bath.\
    Also, since I was *really* little, I could dream when I closed my eyes even though I was not sleeping. The inside of my head was like a video game or manga. Every time I do it, the whose eyes are those eyes monster comes out, so I do not like doing it. I asked Mom and she said not to do it. But while I am writing this essay I asked big me in my dream about the time machine and he said he knew all there was to know. He said he would not tell me anything though because I am just a kid. So from now on I want to do tons of really good things so I can beat whose eyes are those eyes. (The end). \
          ",
          productImg: "https://tlwiki.org/images/a/a6/ChaosHead_bg144_01_1_%E7%94%9F%E5%BE%92%E6%89%8B%E5%B8%B3%E3%81%9D%E3%81%AE%E7%9B%AE_a_new.jpg",
          productPrice: 1.048596
        }
      }
    }
  
</script>