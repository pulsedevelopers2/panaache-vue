<template>
  <span>
    <nav-bar />
    <SideNav />
    <div class="solitaire-wrapper row" @contextmenu="preventDefault($event)">
      <span v-if="loggedIn == 'true'">
        <div class="solitaire-intro col-xs-12">
          <div class="intro-box">
            <h3> Introducing buy on Chat feature. Because we know buying Jewelz is not so easy </h3>
            <h5> You can now buy solitaire diamonds by talking to Diamond Experts from your favourite platforms </h5>
          </div>
        </div>
        <div class="features-wrapper col-xs-12">
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Diamond Shapes
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered shapes-wrap">
                <h3 class="col-xs-3">
                  <img src="../assets/square.png" class="shapes">
                </h3>
                <h3 class="col-xs-3">
                  <img src="../assets/square-fat.png" class="shapes">
                </h3>
                <h3 class="col-xs-3">
                  <img src="../assets/heart.png" class="shapes">
                </h3>
                <h3 class="col-xs-3">
                  <img src="../assets/round.png" class="shapes">
                </h3>
                <h3 class="col-xs-3">
                  <img src="../assets/polygon.png" class="shapes">
                </h3>
                <h3 class="col-xs-3">
                  <img src="../assets/oval.png" class="shapes">
                </h3>
                <h3 class="col-xs-3">
                  <img src="../assets/drop.png" class="shapes">
                </h3>
                <span class="centered" /></span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Diamond Sizes
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-12">
                  0.01CT - 1.5CT
                </h3>
                <span class="centered" /></span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Diamond Quality
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-6">
                  VVS
                </h3>
                <h3 class="col-xs-6">
                  VVS-VS
                </h3>
                <h3 class="col-xs-6">
                  VS
                </h3>
                <h3 class="col-xs-6">
                  SI
                </h3>
              </span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Diamond color   
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-6">
                  E-F
                </h3>
                <h3 class="col-xs-6">
                  F-G
                </h3>
                <h3 class="col-xs-6">
                  G-H
                </h3>
                <h3 class="col-xs-6">
                  H-I
                </h3>
              </span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Diamond cut   
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-4">
                  H&A
                </h3>
                <h3 class="col-xs-4">
                  Excellent
                </h3>
                <h3 class="col-xs-4">
                  V.Good
                </h3>
              </span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Certification 
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-4">
                  GIA
                </h3>
                <h3 class="col-xs-4">
                  IGI
                </h3>
                <h3 class="col-xs-4">
                  HRD
                </h3>
              </span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Polish 
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-4">
                  Excellent
                </h3>
                <h3 class="col-xs-4">
                  V.Good
                </h3>
                <h3 class="col-xs-4">
                  Good
                </h3>
              </span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Fluorescence 
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-4">
                  None
                </h3>
                <h3 class="col-xs-4">
                  Faint
                </h3>
                <h3 class="col-xs-4">
                  Medium
                </h3>
              </span>
            </div>
          </div>
          <div class="size-wrapper col-xs-12 col-md-4">
            <h4 class="col-xs-12 header">
              Symmetry 
            </h4>
            <div class="size-text row col-xs-12">
              <span class="centered">
                <h3 class="col-xs-4">
                  Excellent
                </h3>
                <h3 class="col-xs-4">
                  V.Good
                </h3>
                <h3 class="col-xs-4">
                  Good
                </h3>
              </span>
            </div>
          </div>
        </div>
        <h2>Contact Us</h2>
        <br>
        <contact-us class="col-xs-12" />
        <Footer v-if="loggedIn == 'true'" />
      </span></div>
  </span>
</template>
<script>
import NavBar from '../NavBar.vue'
import SideNav from '../components/SideNav.vue'
import ContactUs from '../components/contactus.vue'
import Footer from '../footer.vue'
import { mapState } from 'vuex'
export default {
    components: {
        NavBar,
        SideNav,
        Footer,
        ContactUs
    },
    computed: {
        ...mapState({
            loggedIn: state => state.login.loggedIn
        })
    },
    methods: {
      preventDefault(e) {
        e.preventDefault();
        
      }
    }
}
</script>
<style scoped>
.solitaire-wrapper {
    justify-content: center;
    text-align: center;
}
.solitaire-intro {
    padding: 4%;
}
.shapes-wrap h3{
  max-height: 7vh;
}
.shapes {
  max-height: inherit;
  object-fit: contain;
  opacity: 0.6;
}
.features-wrapper {
    padding: 5%;
}
.size-wrapper {
    min-height: 25vh;
    margin-bottom: 2vh;
}
.size-text {
    min-height: inherit;
    background: linear-gradient(45deg, black, rgb(26, 26, 26) 100%);
    display: inline-block;
    position: relative;
    justify-content: center;
}
.header {
    border-bottom: 1px solid rgb(145, 96, 96);
    padding: 1%;
}
.solitaire-intro {
    height: 30vmax;
    background: url('https://miro.medium.com/max/2898/1*f7qq7QZeyQzYF0RTxzPhkg.jpeg');
    background-clip: no-clip;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
}
.intro-box {
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0.5);
}
@media screen and (orientation: portrait) {
.solitaire-intro .intro-box h3 {
    font-size: 90%;
    position: absolute;
    bottom: 0;
}

.solitaire-intro .intro-box h5 {
    display: none;
}
.size-text span h3 {
  font-size: 4vw;
}
}
.size-text .centered {
    display: inline-block;
    margin: 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>