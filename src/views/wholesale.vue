<template>
  <div class="centered">
    <div class="logo-nav" href="/">
      <a href="/">
        <img src="../assets/logo.png"><br>
        <img src="../assets/fullLogo.png">
      </a>
    </div>
    <SideNav />
    <div class="solitaire-intro col-xs-12">
      <div class="intro-box">
        <p class="headers">
          Partner with Panaache and get wholesale supply with exciting rewards
        </p>
        <p class="sub-headers">
          We deal in Jewelz crafted by Expert Designer and Industrial leading machinery that crafts every edge to perfection
        </p>
      </div>
    </div>
    <div class="col-xs-12 supply row">
      <div class="supply-content-image col-xs-12 col-md-6">
        <img src="../assets/ring.png">
      </div>
      <div class="supply-content col-xs-12 col-md-6">
        <p class="headers">
          What we supply
        </p>
        <br>
        <p class="texts">
          All types of Diamond jewelz
          <br>
          Gold and platinum Metal Base jewelz
          <br>
          Solitaire Loose Diamonds
          <br>
          Pure Gold and Platinum Metals
        </p>
        <button class="hover-button">
          <a class="hover-link" href="#">Initiate Partnership</a>
        </button>
      </div>
    </div>
    <div class="features row col-xs-12">
      <div class="row col-xs-12 feature-image feature-details">
        <img src="../assets/bis.png" class="col-xs-4 col-md-2">
        <div class="feature-text col-xs-8 col-md-10">
          <p class="sub-headers">
            BIS certified Gold
          </p>
          <p class="text">
            Our metal are BIS certified with 100% quality assurance and purchase satisfaction. You can be assured of the metal you are buying from panaache
          </p>
        </div>
      </div>
      <div class="row col-xs-12 feature-image feature-details">
        <img src="../assets/gia.png" class="col-xs-4 col-md-2">
        <div class="feature-text col-xs-8 col-md-10">
          <p class="sub-headers">
            GIS certified Diamonds
          </p>
          <p class="text">
            Our Diamond are GIS certified with 100% quality assurance and purchase satisfaction. You can be assured of the Diamond Purchased from Panaache.
          </p>
        </div>
      </div>
      <div class="row col-xs-12 feature-image feature-details">
        <img src="../assets/bis.png" class="col-xs-4 col-md-2">
        <div class="feature-text col-xs-8 col-md-10">
          <p class="sub-headers">
            BIS certified Gold
          </p>
          <p class="text">
            Our metal are BIS certified with 100% quality assurance and purchase satisfaction. You can be assured of the metal you are buying from panaache
          </p>
        </div>
      </div>
      <div class="row col-xs-12 feature-image feature-details">
        <img src="../assets/gia.png" class="col-xs-4 col-md-2">
        <div class="feature-text col-xs-8 col-md-10">
          <p class="sub-headers">
            GIS certified Diamonds
          </p>
          <p class="text">
            Our Diamond are GIS certified with 100% quality assurance and purchase satisfaction. You can be assured of the Diamond Purchased from Panaache.
          </p>
        </div>
      </div>
    </div>
    <h2> Contact Us</h2>
    <br>
    <contact-us class="col-xs-12 centered" />
    <Footer />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SideNav from '../components/SideNav.vue'
import Footer from '../footer.vue'
import ContactUs from '../components/contactus.vue'
export default {
    components: {
        SideNav,
        Footer,
        ContactUs
    },
    computed: {
      ...mapState({
      loggedIn: state => state.login.loggedIn
      })
    },
    async created() {
      await this.cachedVerify();
    },
    methods: {
      ...mapActions({
        cachedVerify: 'login/cachedVerify'
      }),
      preventDefault(e) {
        e.preventDefault();
        
      }
    }
}
</script>
<style scoped>
.solitaire-intro {
    background: rgb(0, 0, 0);
    padding: 15%;
    justify-content: center;
    text-align: center;
    align-items: center;
    background-image: url('../assets/ring.png');
    background-clip: no-clip;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
.main-page {
    width: 100vw;
}
.intro-box {
    backdrop-filter: blur(10px);
    background: rgb(0, 0, 0, 50%);
}
.supply-content {
    text-align: center;
    min-height: 40vh;
    padding: 3%;
}
.supply-content-image img {
    max-height: 100%;
    object-fit: contain;
}
.supply-content-image {
    height: 40vh;
}
.supply {
    padding: 0;
    margin: 1% 0%;
}
.headers {
    font-size: 150%;
}
.sub-headers {
    font-size: 120%;
}
.text {
    font-size: 90%;
}
.features {
    padding: 3%;
    width: 100vw;
}
.feature-details {
    border-radius: 10px;
    height: 10vh;
    margin: auto;
    margin-bottom: 1%;
}
.feature-details img {
    background: rgba(175, 101, 101, 0.3);
    border: 1px solid rgb(175, 101, 101, 0.4);
    height: inherit;
    object-fit: contain;
}
.feature-text {
    border: 1px solid rgb(175, 101, 101,0.4);
    height: inherit;
    text-align: left;
    padding: 1%;
}
.logo-nav {
  height: 20vh;
  min-height: 80px;
  text-align: center;
  text-decoration: none;
  padding: 2%;
  justify-content: center;
}
@media screen and (orientation: portrait){
  .logo-nav {
    height: 15vh;
  }
  .logo-nav a img {
  max-height: 80%;
}
}
.logo-nav a {
    height: inherit;
}
.logo-nav a img {
  object-fit: contain;
  max-height: 50%;
  max-width: 80%;
}
@media screen and (orientation: portrait){
    .feature-text {
        font-size: 70%;
    }
    .feature-details {
        height: 20vh;
    }
}
</style>