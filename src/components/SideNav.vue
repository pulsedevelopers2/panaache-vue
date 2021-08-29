<template>
  <span class="wrapper">
    <div class="dropdown2 user col-xs-1">
      <i v-if="!menuToggled" class="three-line-dim fa fa-bars" @click="menuToggled = true" />
      <div class="dropdown-content2" :class="menuToggled? 'shows': ''">
        <i v-if="menuToggled" class="three-line-dim fa fa-times" @click="menuToggled = false" />
        <div v-if="loggedIn == 'true'" class="user-container">
          <p class="user-tile"><span class="red">{{ email.charAt(0) }}</span>{{ email.charAt(1) }}</p>
        </div>
        <p v-if="loggedIn == 'true'" class="user-email">{{ email }}</p>
        <div class="dropdown-wrapper">
          <div class="dropdown">
            <a class="option-dropdown" href="/">
              <span class="maroon-text">H</span> o m e
            </a>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              <span class="maroon-text">J</span> e w e l z
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="/items?&item=rings"><span class="maroon-text">R</span> i n g s</a><br>
              <a class="dropdown-item" href="/items?&item=earings"><span class="maroon-text">E</span> a r i n g s</a><br>
              <a class="dropdown-item" href="/items?&item=necklace"><span class="maroon-text">N</span> e c k l  a c e</a><br>
              <a class="dropdown-item" href="/items?&item=tanmaiya"><span class="maroon-text">T</span> a n m a i y a</a><br>
              <a class="dropdown-item" href="/items?&item=pendents"><span class="maroon-text">P</span> e n d e n t s</a><br>
              <a class="dropdown-item" href="/items?&item=braclets"><span class="maroon-text">B</span> r a c l e t s</a><br>
              <a class="dropdown-item" href="/items?&item=solitaire"><span class="maroon-text">S</span> o l i t a i r e</a><br>
            </div>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="/solitaireLD"
            >
              <span class="maroon-text">D</span> i a m o n d z
            </a>
          </div>
          
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              <span class="maroon-text">P</span> a n a a c h e <span class="enlarge">?</span>
            </a>
          </div>
          <div class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="/wholesale"
            >
              <span class="maroon-text">F</span> r a n c h i z e
            </a>
          </div>
          <div v-if="loggedIn == 'true'" class="dropdown show">
            <a id="dropdownMenuLink"
               class="option-dropdown"
               href="#"
               role="button"
               data-toggle="dropdown"
            >
              <span class="maroon-text">A</span> c c o u n t
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="/myorders"><span class="maroon-text">O</span> r d e r s</a><br>
              <a class="dropdown-item" href="/mycart"><span class="maroon-text">C</span> a r t</a><br>
              <a class="dropdown-item" href="/"><span class="maroon-text">A</span> c c o u n t D e t a i l s</a>
            </div>
          </div>
          <div v-if="loggedIn == 'true'" class="dropdown">
            <a class="option-dropdown" href="#" @click="reset()">
              <span class="maroon-text">L</span> o g o u t
            </a>
          </div>
          <div v-if="loggedIn != 'true'" class="dropdown">
            <a class="option-dropdown" href="/login">
              <span class="maroon-text">L</span> o g i n
            </a>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return  {
            menuToggled: false
        }
    },
    computed : {
        ...mapState({
            email: state => state.login.email,
            loggedIn: state => state.login.loggedIn
        })
    },
    methods: {
        ...mapActions({
            reset: 'login/reset'
        })
    }
}
</script>
<style scoped>
.side-nav {
  position: absolute;
  height: 50vh;
  left: 0;
  top: 30vh;
  vertical-align: middle;
  min-width: 4.5%;
  animation: delayed;
  border-radius: 0px 10px 10px 0px;
  animation-duration: 8s;
  z-index: 2;
  background-color: rgba(0, 0, 0)
}
.nav-options .fa {
  color: transparent;
  background: linear-gradient(90deg, white, grey, white);
  background-clip: text;
}
.dash {
  display: inline-block;
  border: 5px solid black;
}
.nav-options .fa-circle-o {
  color: transparent;
  background: linear-gradient(rgb(148, 126, 2), rgb(194, 165, 3), rgb(187, 159, 2), rgb(194, 165, 1), rgb(148, 126, 2));
  background-clip: text;
}
.dropdown {
  position: relative;
  display: inline-block;
  text-align: center;
}

.dropdown-content {
  display: none;
  position: absolute;
  background:transparent;
  color: rgb(255, 255, 255);
  /* text-align: center; */
  min-width: 160px;
  width: 100%;
  box-shadow: 1px 1px 5px 1px rgba(255, 255, 255, 0.2);
  padding: 12px 16px;
  z-index: 1;
  animation: fading;
  animation-duration: 0.7s;
}
.dropdown:hover .dropdown-content {
  display: block;
}

.nav-options {
  margin: 23%;
  font-size: 120%;
}
.home {
  border-bottom: 1px solid white;
}
.dropdown2 {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  z-index: 2;
  animation: delayed;
  animation-duration: 6s;
}

.dropdown-content2 {
  display: none;
  position: fixed;
  top: 0;
  font-size: 120%;
  left: 0;
  height: 100vh;
  width: 20%;
  /* backdrop-filter: blur(8px); */
  background: transparent;
  color: rgb(255, 255, 255);
  min-width: 160px;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
scrollbar-width: none;
  padding: 12px 16px;
  z-index: 1;
}
.dropdown-content2::-webkit-scrollbar {
    display: none;
}
@media screen and (orientation: portrait) {
.dropdown-content2{
    width: 70%;
    font-size: 85%;
}
}
.dropdown-content2 .user {
    max-width: 100%;
    object-fit: contain;
}
.option {
    min-width: 100% !important;
    width: 100%;
    display: block;
    padding: 5%;
    text-align: left;
    border-bottom: 1px solid white;
}
.shows {
    padding-top: 15vh;
    display: inline;
    overflow-wrap: break-word;
    animation: slide-left;
    animation-duration: 0.5s;
}
.login-button {
    position: fixed;
    bottom: 0;
    left: 0;
    display: inline-block;
    width: inherit;
    text-align: center;
    padding: 1%;
    background:  maroon;
    color: white;
    z-index: 99999;
    animation: slide-left;
    animation-duration: 0.5s;
}
.dropdown-content2 .dropdown a {
    display: block;
    outline: none;
    font-size: 80%;
    width: inherit;
    text-align: left !important;
    text-decoration: none;
    color: white;
    background-color: inherit;
    padding: 1.2vh;
}
.dropdown-content2 .dropdown {
    width: 100% !important;
    padding: 1%;
    background-color: inherit;
}
.dropdown-content2 .dropdown-menu {
    position: relative;
    width: 100% !important;
    padding-left: 10%;
    padding-bottom: 10%;
    background-color: inherit;
    animation: fading;
    animation-duration: 1s;
}
.dropdown a {
  text-shadow: -10px 10px 20px 
            rgba(0, 0, 0, 0.5),  
            0.7px 0.7px 0.7px 
            rgba(116, 116, 116, 0.9); 
  color:transparent;
    background-color: rgb(255, 255, 255);
    background-clip: text;
    
}
.user-container {
    width: 100%;
    padding-top: 40%;
    position: relative;
}
.user-tile {
    position: absolute;
    text-shadow: 1.5px 1.5px 0px rgba(117, 117, 117, 0.5) !important;
    font-size: 500%;
    top: 0;
    left: 5%;
}
.dropdown-wrapper {
    padding-top: 10%;
}
.user-email {
    text-align: left;
    margin-left: 5%;
}
.three-line-dim {
  position: absolute;
  color: rgb(122, 122, 122);
  top: 0px;
  left: 0px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: 170%;
}
.enlarge, .maroon-text {
  font-size: 140%;
  color:transparent;
  background-color: rgb(236, 154, 140);
  background-clip: text;
  text-shadow: 0px 0.7px 0px rgba(204, 144, 144, 0.5) !important;
}
.fa-times {
  font-size: 150% !important;
}
@media screen and (orientation: portrait) {
  .shows {
    background: rgba(0,0,0,.7) !important;
  }
}
</style>