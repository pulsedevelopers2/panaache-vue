<template>
  <div class="main_item" @contextmenu="preventDefault($event)">
    <nav-bar />
    <SideNav />
    <item v-if="item_loaded == 'true' && loggedIn == 'true'" />
    <Loader v-if="item_loaded == 'loading' && loggedIn == 'true'" class="loader" />
    <Footer v-if="item_loaded == 'true' && loggedIn == 'true'" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Item from '../components/item.vue';
import NavBar from '../NavBar';
import SideNav from '../components/SideNav'
import Footer from '../footer'
import Loader from '../components/loader'
export default {
    components: {
        Item,
        NavBar,
        Footer,
        SideNav,
        Loader
    },
    data(){
        return {
            type: null
        }
    },
    computed: {
      ...mapState({
        token: state => state.login.token,
        item_loaded: state => state.item.item_loaded,
        loggedIn: state => state.login.loggedIn
      })
    },
    watch: {
      loggedIn: async function (curr, prev) {
        if (curr == 'true' && this.item_loaded == 'false') {
        await this.refresh()
        }
      }
    },
    async created(){
        let path = window.location.search;
        const url = new URLSearchParams(path);
        this.id = url.get('item');
        let body = {
            id: this.id,
            token: this.token
        }
        await this.getItem({body})
    },
    methods: {
      ...mapActions({
        getItem: 'item/getItem'
      }),
      async refresh() {
        let body = {
            id: this.id,
            token: this.token
        }
        await this.getItem({body})
      },
      preventDefault(e) {
        e.preventDefault();
        
      }
    }
}
</script>
<style scoped>
.main_item {
  min-height: 100vh;
}

</style>