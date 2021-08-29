<template>
  <nav-bar />
</template>
<script>
import { mapState } from 'vuex'
import NavBar from '../NavBar.vue'
export default {
    components: {
        NavBar
    },
    computed : {
        ...mapState({
            loggedIn: state => state.login.loggedIn
        })
    },
    watch: {
        loggedIn: function(curr, prev) {
            if (curr == 'true') {
                if(document.referrer && !document.referrer.endsWith('/reset')) {
                    window.history.go(-1)
                } else {
                    window.location.href = '/'
                }
            }
        }
    }
}
</script>