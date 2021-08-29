<template>
  <!-- Slideshow container -->
  <div class="mainpage row">
    <div>
      <full-page id="fullpage" ref="fullpage" :options="options">
        <div class="section">
          <div class="logo-nav">
            <img src="../assets/logo.png"><br>
            <img src="../assets/fullLogo.png">
          </div>
          <banner />
        </div>
        <div class="section">
          <br>
          <br>
          <h2>Design Gallery</h2>
          <splide class="splider col-xs-12" />
        </div>
        <div class="section">
          <br>
          <h2>Resources</h2>
          <footer-full />
        </div>
      </full-page>
    </div>
  </div>
</template>

<script>
import Login from './login.vue'
import Banner from './banner.vue'
import Categories from './categories.vue'
import { mapState } from 'vuex';
import Splide from './splide.vue'
import footerFull from './footerFull.vue'
export default {
  name: 'Main',
  components: {
    Banner,
    Splide,
    footerFull
    },
  data(){
    return {
      name: null,
      password: null,
      options: {
          rewind : true,
          width  : 800,
          gap    : '1rem',
        }
    }
  },
  computed:{
    ...mapState({
      loggedIn: state => state.login.loggedIn
    })
  }
  }
</script>
<style scoped>
.hover-scale:hover {
  transform: scale(1.2) !important;
}
.mainpage{
  position: relative;
  text-align: center;
}
.logo-nav {
  height: 20vh;
  min-height: 80px;
  text-align: center;
  padding: 2%;
  justify-content: center;
  animation-name: initialLoad;
  animation-duration: 3.5s;
}
@media screen and (orientation: portrait){
  .logo-nav {
    height: 15vh;
  }
  .logo-nav img {
  max-height: 80%;
}
}
.logo-nav img {
  object-fit: contain;
  max-height: 50%;
  max-width: 80%;
}
.fp-tableCell {
  padding: 0 !important;
}
.logo-nav :nth-child(3) {
  animation-name: invisible;
  animation-duration: 4s;
}
.logo-nav :nth-child(1) {
  animation-name: disable;
  animation-duration: 4s;
}
.red {
  font-size: 150%;
}
.verticle-center{
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-body div, .main-body-reverse div{
  height: 50vh;
}
.main-body div img, .main-body-reverse div img {
  width: 100%;  
  height: 100%;
}
.main-body {
  display: flex;
  flex-direction: row;
}
.main-body-reverse{
  display: flex;
  flex-direction: row-reverse;
}
</style>