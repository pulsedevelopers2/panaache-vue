<template>
  <div class="main-body" @contextmenu="preventDefault($event)">
    <side-nav />
    <nav-bar />
    <div class="actual-body">
      <div v-if="loggedIn == 'true'" class="banner row">
        <p class="col-xs-12 path hidden-xs hidden-sm">
          <a href="/" class="white no-hover">Home</a> | {{ type }}
        </p>
        <img src="../assets/ring.png" class="col-xs-8 col-md-6 col-lg-4">
        <p class="banner-title col-md-8 col-xs-12 col-lg-8">
          Assorted collection of fine crafted rings that would melt your heart so that it can be the best.
        </p>
        <i class="down-icon fa fa-angle-double-down hidden-xs hidden-sm" />
      </div>
      <span v-if="loggedIn == 'true'" class="main_items">
        <item-list />
      </span>
      <Footer v-if="loggedIn == 'true'" />
    </div>
  </div>
</template>
<script>
import NavBar from '../NavBar.vue'
import { mapState, mapActions } from 'vuex';
import SideNav from '../components/SideNav'
import ItemList from '../components/itemsList.vue'
import Footer from '../footer.vue'
export default {
    components: {
        NavBar,
        ItemList,
        Footer,
        SideNav
    },
    data(){
        return {
            type: null
        }
    },
    computed: {
      ...mapState({
        token: state => state.login.token,
        loggedIn: state => state.login.loggedIn
      })
    },
    watch:  {
      loggedIn: function(curr, prev) {
        if (curr == 'true') {
          this.refresh();
        }
      }
    },
    async created(){
        let path = window.location.search;
        const url = new URLSearchParams(path);
        this.type = url.get('item');
        if (this.loggedIn == 'true') {
        let body = {
          item: this.type,
          token: this.token
        }
        await this.getItems({body})
      }
    },
    methods: {
      ...mapActions({
        getItems: 'items/getItems'
      }),
      async refresh() {
        let body = {
          item: this.type,
          token: this.token
        }
        await this.getItems({body})
      },
      preventDefault(e) {
        e.preventDefault();
        
      }
    }
}
</script>
<style scoped>
.banner {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  overflow-wrap: break-word;
  width: 100%;
  height: 90vh;
  margin-left: 0;
  margin-bottom: 1vmax;
  margin-right: 0;
  padding: 0;
}
@media screen and (orientation: portrait) {
  .banner {
    height: 30vmax;
  }
}
.banner img {
  max-height: 80%;
  object-fit: contain;
}
.banner p {
  max-height: 80%;
  overflow-wrap: break-word;
  display: -webkit-box;
  overflow: hidden;
   text-overflow: ellipsis;
   -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: 1.5vmax;
}
.banner-title {
  text-align: center;
  justify-content: center;
}
.down-icon {
  position: absolute;
  bottom: 10%;
  justify-content: center;
  color: rgb(133, 133, 133);
  font-size: 200%;
  animation: mover 1s infinite;
}
.path {
  font-size: 0.9em !important;
  position: absolute;
  top: 5%;
}
</style>