<template>
  <span>
    <nav-bar />
    <SideNav />
    <div class="row containe">
      <h2> My Orders </h2>
      <div v-if="loaded" class="row col-xs-12">
        <div v-for="key in Object.keys(items)" :key="key" class="item col-xs-12">
          <a :href="'/item?&item=' + items[key].item_id" class="col-xs-12 row item_link">
            <img :src="items[key].image_link[0]" class="col-xs-12 col-sm-3">
            <div class="col-xs-12 col-sm-9 row item_details">
              <p class="col-xs-12 row"><span class="rows col-xs-12 title"> <h4>{{ items[key].title }} </h4></span>
                <span class="rows col-xs-6 col-md-2">Quality : {{ items[key].quality }} </span><span class="rows col-xs-6 col-md-2">Color : {{ items[key].color }} </span><span v-if="items[key].metal" class="rows col-xs-6 col-md-2">Metal : {{ items[key].metal }}</span> <span v-if="items[key].size" class="rows col-xs-6 col-md-2">Size : {{ items[key].size }}</span>
                <!-- <p class="col-xs-12 row"><span class="rows col-xs-12 col-md-6"> {{ items[key].tnx_id }}</span>
            </p> -->
                <span class="rows col-xs-12"> Date: {{ items[key].time.split("T")[0] }}</span>
                <span class="rows col-xs-12"> {{ Object.values(items[key].address).join(', ') }}</span>
                <span class="rows col-xs-12"> Quantity : {{ items[key].quantity }}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import NavBar from '../NavBar.vue'
import SideNav from '../components/SideNav'
export default {
    components: {
        NavBar,
        SideNav
    },
    inject: ['axios'],
    data() {
        return  {
            items: {},
            loaded: false
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.login.loggedIn,
            token: state => state.login.token
        })
    },
    watch: {
        loggedIn: async function(curr, prev) {
            if (this.loggedIn == 'true') {
                await this.fetchCart();
            }
        }
    },
    async created() {
        if (this.loggedIn == 'true') {
            this.fetchCart()
        }
    },
    methods: {
        async fetchCart() {
            let tokenBody = btoa(JSON.stringify({
                token: this.token,
                cacheToken: $cookies.get('cacheToken')
            }));
            
            await new Promise(resolve => { this.axios.post("https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/getorders",null,{
                headers: {
                    token: tokenBody
                }
            }).then(async (response) => {
                let items_d = response.data;
                await Promise.all(items_d.map(async item => {
                    await Promise.all(item.order_details.cart.map(async id => {
                        return this.axios.post("https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/getitemdetails/"+id.item_id).then((response) => {
                            let data = response.data;
                            id.image_link = JSON.parse(data.image_link)
                            id.title = data.title
                            id.tnx_id = item.tnx_id
                            id.address = item.order_details.address
                            this.items[item.timestamp.toString()+id.time] = id
                        })
                    }))
                }))
                resolve(true)
            })
            })
            this.loaded = true
        }
    }
}
</script>
<style scoped>
.containe {
    justify-content: center;
    text-align: center;
}
.item {
    text-align: initial;
    border: 1px solid rgb(156, 111, 108);
    background: linear-gradient(45deg, black, rgb(27, 27, 27) 200%);
    padding: 2vh;
}
p {
    color: white;
}
.item_link {
    padding: 0;
}
.item_link img {
    max-height: 20vh;
    object-fit: contain;
}
.rows {
    margin-bottom: 1vh;
    overflow-wrap: break-word;
}
.item_details {
    padding: 0;
}
.item_details p .title {
    padding: 1vw;
}
@media screen and (orientation: portrait) {
.item_details p .title {
    text-align: center;
    }
}
.item_details p {
    padding: 0;
}
</style>