<template>
  <span>
    <nav-bar />
    <SideNav />
    <div class="mycart-wrapper row" @contextmenu="preventDefault($event)">
      <h3 v-if="cart && cart.length" class="col-xs-12">
        MY CART
      </h3>
      <h3 v-if="(!cart || !cart.length) && cartLoad" class="col-xs-12">
        Cart Empty
      </h3>
      <Loader v-if="cartLoad == 'loading' && loggedIn == 'true'" class="loader" />
      <div v-if="cart && cart.length" class="cart-items col-xs-12 col-md-8 row">
        <div v-for="item in cart" :key="item.id" class="item col-xs-12">
          <a :href="'/item?&item=' + item.item_id" class="item_link row">
            <img :src="item.image_link[0]" class="item_image col-xs-12 col-md-2">
            <span class="item_details col-xs-12 col-md-10 row">
              <h4 class="col-xs-12">{{ item.title }}</h4>
              <span class="col-xs-10">
                <h5>Quality: <span class="pink">{{ item.quality || '--' }}</span>, Color: <span class="pink">{{ item.color || '--' }}</span>, size: <span class="pink">{{ item.size || '--' }}</span>, metal: <span class="pink">{{ item.metal.toLowerCase() != 'default' && item.metal || '--' }}</span></h5>
                <h5>Quantity: <span class="pink">{{ item.quantity || '--' }}</span></h5>
                <h5><b>₹ {{ item.finalPrice }}/-</b></h5>
              </span>
              <span class="col-xs-12 col-md-2">
                <button class="delete" @click="deleteMe($event, item.cart_id)">Delete</button>
              </span>
            </span> 
          </a>
        </div>
      </div>
      <div v-if="cart && cart.length" class="invoices-wrapper col-xs-12 col-md-4 row">
        <span class="total-invoices col-xs-12 row">
          <h3 class="total col-xs-12">
            Quotation
          </h3>
          <div class="col-xs-12 total-details row">
            <h4 class="col-xs-6">
              Number of Items
            </h4>
            <h4 class="col-xs-6">
              : {{ noOfItems }}
            </h4>
            <h4 class="col-xs-6">
              Total Cost
            </h4>
            <h4 class="col-xs-6">
              : {{ total }}/-
            </h4>
            <tr class="divider col-xs-12" />
            <h4 class="col-xs-6">
              Grand Total
            </h4>
            <h4 class="col-xs-6">
              : {{ total }}/-
            </h4>
            <p class="col-xs-12 inclusive">** Price inclusive of GST **</p>
          </div>
        </span>
        <span class="address col-xs-12">
          <h3> Delivery Address</h3>
          <input v-model="name" type="text" class="col-xs-12" placeholder="Name on Invoice" maxlength="32">
          <input v-model="address" type="text" class="col-xs-12" placeholder="Full Address" maxlength="100">
          <input v-model="pin" type="number" class="col-xs-12" placeholder="Pin-Code">
          <div class="dropper col-xs-12">
            <select v-model="curr_place">
              <option disabled="disabled" selected="selected" value="---">
                ---
              </option>
              <option v-for="key in pin_details" :key="key.Name" :value="key.Name">
                {{ key.Name }}
              </option>
            </select>
          </div>
          <input v-model="district" class="col-xs-12" placeholder="District" disabled>
          <input v-model="state" type="text" class="col-xs-12" placeholder="State" disabled>
          <input v-model="phone" type="text" class="col-xs-12" placeholder="Phone">
        </span>
        <button class="checkout col-xs-4" @click="paynow()">
          CHECKOUT
        </button>
      </div>
      <checkout v-if="pay" />
    </div>
  </span>
</template>
<script>
import {mapAction, mapActions, mapState} from 'vuex';
import Checkout from './Checkout.vue'
import NavBar from '../NavBar.vue'
import SideNav from '../components/SideNav'
import Loader from '../components/loader'
export default {
  inject: ['axios'],
    components: {
        NavBar,
        SideNav,
        Checkout
    },
    data() {
      return {
        name: null,
        address: null,
        pin: null,
        city: null,
        district: null,
        state: null,
        phone: null,
        pay: false,
        pin_details: [],
        curr_place: null
      }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.login.loggedIn,
            cart: state => state.cart.cart,
            cartLoad: state => state.cart.cartLoad,
            token: state => state.login.token,
            payment_details: state => state.cart.payment_details
        })
    },
    watch: {
        loggedIn: async function(curr, prev) {
            if (curr == 'true' && prev != 'true') {
                let tt = this.token
                await this.viewMyCart({ tt });
            }
        },
        cart: async function(curr, prev) {
            if (curr) {
                this.refreshCart();
            }
        },
        pin: async function(curr, prev) {
          if (curr > 99999 && curr < 1000000 && prev<curr) {
            this.pincodeDetails(curr)
          } else if (curr >= 1000000) {
            this.pin = this.pin/10 | 0
          }
        },
        curr_place: function(curr) {
          if(curr) {
            console.log(this.pin_details[curr].District)
            this.district = this.pin_details[curr].District;
            this.state = this.pin_details[curr].State
          }
        }
    },
    async created() {
      this.pay = false;
        await this.cachedVerify();
        if (this.loggedIn == 'true') {
            let tt = this.token
            await this.viewMyCart({ tt });
            this.refreshCart()
        }
    },
    methods: {
        ...mapActions({
            viewMyCart: 'cart/viewMyCart',
            cachedVerify: 'login/cachedVerify',
            deleteMyItem: 'cart/deleteMyItem',
            checkout: 'cart/checkout'
        }),
        refreshCart(){
            this.total = this.cart.reduce((prev, curr) => { return prev + curr.finalPrice }, 0);
            this.noOfItems = this.cart.length;
        },
        async deleteMe(e,id) {
            e.preventDefault()
            let token = this.token;
            await this.deleteMyItem({id, token});
            this.refreshCart()
        },
        preventDefault(e) {
          e.preventDefault();
      },
      async pincodeDetails(pin) {
        this.district = "Loading..."
        this.state = "Loading..."
        let result = await this.axios.get('https://api.postalpincode.in/pincode/'+pin).then((response)=>{
          let json = []
          if (response.data[0].PostOffice) {
            json = response.data[0].PostOffice.reduce((prev, curr) => {
              prev[curr.Name] = curr;
              return prev;
            },{})
          }
          this.pin_details = json
          this.curr_place = Object.keys(json)[0]
        })
      },
      async paynow() {
        this.pay = false;
        let token = this.token;
        let cart = this.cart
        let address = {
          name: this.name,
          address: this.address,
          pin: this.pin,
          city: this.city,
          district: this.district,
          state: this.state,
          phone: this.phone
        }
        if (false) {
          alert('Add Complete Delivery Address')
        } else {
          await this.checkout({ token, cart, address });
          console.log('here')
          console.log(this.payment_details)
          if (this.payment_details && this.payment_details != 'failed') {
            this.pay = true
          } 
        }
      }
    }
} 
</script>
<style scoped>
.mycart-wrapper, .mycart-wrapper h3 {
    display: inline-block;
    justify-content: center;
    text-align: center;
    width: 100%;
    padding: 1%;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
}
.mycart-wrapper::-webkit-scrollbar {
    display: none;
}
.mycart-wrapper h3 {
    padding: 1%;
}
.item a {
    color: white;
    text-decoration: none;
    cursor: pointer;
    height: 20vh;
    width: 100%;
}
.item a img {
    max-height: 10vh;
    object-fit: contain;
}
.pink {
    color: rgb(255, 130, 130);
}
.item_details {
    text-align: left;
}
.item {
    border: 1px solid rgb(156, 111, 108);
    background: linear-gradient(45deg, black, rgb(27, 27, 27) 200%);
    padding: 2vh;
}
.total-invoices {
    border: 1px solid rgb(158, 113, 109);

}
.delete {
    border: 1px solid rgb(158, 113, 109);
    display: inline-block;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    padding: 5px;
    width: 100%;
}
.total-invoices {
    justify-content: center;
    text-align: center;
}
.total-details {
    text-align: left;
    padding: 5%;
}
.total {
    border-bottom: 1px solid rgb(158, 113, 109);
}
.dropper {
  padding-left: 0;
  padding-right: 0;
}
.invoices-wrapper .checkout {
    margin-top: 1%;
    padding: 4%;
    margin-bottom: 1%;
}
.divider {
    width: 100%;
    border: 1px solid rgb(158, 113, 109);
}
.total-details h4 {
    min-height: 50px;
}
.checkout {
    border: 1px solid rgb(158, 113, 109);
    display: inline-block;
    text-decoration: none;
    background-color: rgb(158, 113, 109);
    outline: none;
    padding: 5px;
    width: 100%;
}
.inclusive {
    text-align: center;
}
.address {
  padding: 5%;
  border: 1px solid rgb(158, 113, 109);
}
select {
  padding-right: 0.5%;
  padding-left: 0.5%;
}
@media screen and (orientation: portrait){
    h5, h6 {
        font-size: 80%;
    }
    .invoices-wrapper {
        margin-top: 1%;
    }
}
input{
    height: 4vh;
    color: var(--text);
    margin: 10px 0px;
    border: 0px;
    padding: 1%;
    border-bottom: 1px solid rgb(255, 255, 255);
    background: transparent;
}
</style>