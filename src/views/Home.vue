<template>
  <div class="homeBody" @contextmenu="preventDefault($event)">
    <side-nav />
    <hello-world />
    <Footer class="footer" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import HelloWorld from '../components/HelloWorld.vue'
import NavBar from '../NavBar.vue'
import Footer from '../footer.vue'
import SideNav from '../components/SideNav'
export default {
    components: {
        HelloWorld,
        Footer,
        SideNav
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
.homeBody {
  justify-content: center;
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
</style>
