<template>
  <span class="item_page row">
    <div class="row single_item col-xs-12">
      <!-- Images Display -->
      <div class="col-xs-12 main-image">
        <div class="image-wrapper"><img v-if="pos==0" src="../assets/test1.png"><img v-else src="../assets/test4.png"></div><br>
        <h4 class="main-title">
          {{ item.title }}<br>
          {{ item.description }}
        </h4>
      </div>
      <div class="col-xs-12 col-md-6 sub-images row">
        <div v-for="(it,index) in item.image_link" :key="index" class="item col-xs-1" :class="pos==index?'red':''" @click="curr_image = it;pos=index">
          <img :src="it">
        </div>
      </div>

      <!-- Item Overview -->
      <div class="col-xs-12 details">
        <div class="dropdowns row">
          <div v-if="item.dqualities" class="quality dropper col-xs-12 col-sm-2">
            Clarity<br>
            <select v-model="curr_quality" @change="refreshPrice()">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="quality in item.dqualities" :key="quality" :value="quality">
                {{ quality }}
              </option>
            </select>
          </div>
          <div v-if="item.dcolors" class="color dropper col-xs-12 col-sm-2">
            Color<br>
            <select v-model="curr_color" @change="refreshPrice()">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="color in item.dcolors" :key="color" :value="color">
                {{ color }}
              </option>
            </select>
          </div>
          <div v-if="item.metal && item.metal.length" class="metal dropper col-xs-12 col-sm-2">
            Metal<br>
            <select v-model="curr_metal">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="it in item.metal" :key="it" :value="it">
                {{ it.toUpperCase() }}
              </option>
            </select>
          </div>
          <div v-if="item.gold_details && item.gold_details.length" class="size dropper col-xs-12 col-sm-2">
            Size<br>
            <select v-if="order_sizes" v-model="curr_size">
              <option disabled="disabled" selected="selected">
                select one option
              </option>
              <option v-for="it in item.gold_details" :key="it.size" :value="it.size">
                {{ it.size }}
              </option>
            </select>
          </div>
        </div>
        <span class="order-basis" />
        <br>
        <h2 class="pricing">
          ₹ {{ totalPrice }}/-
        </h2>
        <h8 class="breakup">
          <a href="#breakup" class="white">View Breakup</a>
        </h8>
        <br>
        <h5 class="pricing beatable">Unbeatable price Guranteed! Compare the price anywere </h5>
        <div class="purchase col-xs-12 row">
          <button class="purchase-button col-xs-5 col-lg-2 col-md-4" @click="checkout()">
            B u y
          </button>
          <button class="purchase-button col-xs-5 col-lg-2 col-md-4" @click="updateCart()">
            Add To Cart
          </button>
        </div>
        <!-- <div class="purchase col-xs-12 row">
          <button class="purchase-button col-xs-10 col-lg-2 col-md-4" @click="checkout()">
            T r y<span>&nbsp;&nbsp;</span>A t<span>&nbsp;&nbsp;</span>B o u t i q u e
          </button>
        </div> -->
        <p class="wholesale col-xs-12">** For purchase at wholesale price or retail partnership <a href="/wholesale" class="wholesale-button">click here</a> ** </p>
      </div>
      <!-- <div class="details-wrapper col-xs-12">
        <h4> Description</h4>
        <h6>
          {{ item.description }}
          This is the description of the project that will be displayed in justified format and clean texture giving simple and rich design format.
        </h6>
      </div>
      <div class="intro col-xs-12 row">
        <span class="col-xs-12 col-md-5">
          <img :src="curr_image" class="col-xs-12 col-md-5">
        </span>
        <div class="intro-text col-xs-12 col-md-6">
          <h3>Panaache Jewlz</h3>
          <h6> Make every movement glamoures with Jewlz from house of Panaache. Panaache Jewlz are crafted from world class machinary and expert Craftmens that aim to deliver Perfection. Try a Jewelz from house of Panaache and make every Occasion count.</h6>
        </div>
      </div> -->
    </div>
    <div class="charts col-xs-12">
      <div class="specification-title col-xs-12 row">
        <p class="title col-xs-12">
          Item Details
        </p>
        <tr class="divider col-xs-12" />
        <div class="abc col-xs-12 row">
          <div class="details_block col-xs-12 col-md-12 row">
            <div class="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Gold Weight</b></p>
              <p class="details_value">ds</p>
            </div>
            <div v-if="curr_metal && (curr_metal)" class="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Gold Type</b></p>
              <p class="details_value">{{ curr_metal && (curr_metal) }}</p>
            </div>
            <div class="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Clarity</b></p>
              <p class="details_value">{{ curr_quality }}</p>
            </div>
            <div class="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>No of Diamonds</b></p>
              <p class="details_value">ds</p>
            </div>
            <div class="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Certification</b></p>
              <p class="details_value">ds</p>
            </div>
            <div claSS="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Gold Weight</b></p>
              <p class="details_value">{{ (goldPricingJson && Object.keys(goldPricingJson).length && curr_size) && goldPricingJson && goldPricingJson[curr_size].weight || pricing.gold_wt }} gms</p>
            </div>
            <div claSS="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Gold Type</b></p>
              <p class="details_value">ds</p>
            </div>
            <div claSS="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Clarity</b></p>
              <p class="details_value">ds</p>
            </div>
            <div claSS="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>No of Diamonds</b></p>
              <p class="details_value">ds</p>
            </div>
            <div claSS="details_block_single col-xs-6 col-md-2">
              <p class="heading_details"><b>Certification</b></p>
              <p class="details_value">ds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h4 class="title col-xs-12">
      Price Breakup
    </h4>
    <div id="breakup" class="row col-xs-12 table-wrapper">
      <table v-if="item && pricing" class="chart_table row col-xs-12">
        <tr class="table_heading row">
          <th class="col-xs-2 hidden-xs hide-sm" />
          <th class="col-xs-2"><h6><b>Components</b></h6></th>
          <th class="col-xs-2"><h6><b>Shape</b></h6></th>
          <th class="col-xs-2"><h6><b>Type</b></h6></th>
          <th class="col-xs-2"><h6><b>Weight</b></h6></th>
          <th class="col-xs-2"><h6><b>Price</b></h6></th>
        </tr>
        <tr class="table_data row">
          <td class="col-xs-2 hidden-xs hide-sm" />
          <td class="col-xs-2"><h6>Gold Metal</h6></td>
          <td class="col-xs-2"><h6>-</h6></td>
          <td class="col-xs-2"><h6>{{ curr_metal && (curr_metal) }}</h6></td>
          <td class="col-xs-2"><h6>{{ (goldPricingJson && Object.keys(goldPricingJson).length && curr_size) && goldPricingJson && goldPricingJson[curr_size].weight || pricing.gold_wt }} gms</h6></td>
          <td class="col-xs-2"><h6>{{ Math.round(goldRate*100)/100 }}/-</h6></td>
        </tr>
        <tr class="table_data row">
          <td class="col-xs-2 hidden-xs hide-sm" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
        </tr>
        <tr v-for="diamond in pricing.item_details" :key="diamond.weight" class="table_data row">
          <td class="col-xs-2 hidden-xs hide-sm" />
          <td class="col-xs-2"><h6>Diamond</h6></td>
          <td class="col-xs-2"><h6>Round</h6></td>
          <td class="col-xs-2"><h6>{{ curr_quality + ' ' + curr_color }}</h6></td>
          <td class="col-xs-2"><h6> {{ diamond.weight + ' ct (' + diamond.quantity + ') ' }}</h6></td>
          <td class="col-xs-2"><h6> {{ Math.round(diamond.price) }}/- </h6></td>
        </tr>
        <tr class="table_data row">
          <td class="col-xs-2 hidden-xs hide-sm" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
          <td class="col-xs-2" />
        </tr>
        <tr class="table_data row charges">
          <td colspan="3" style="text-align: right;"><h6>Making Charges</h6></td>
          <td><h6>{{ Math.round(making_charges * 100)/100 }}/-</h6></td>
        </tr>
        <tr class="table_data row">
          <td colspan="3" style="text-align: right;"><h6>GST & Transaction Charges</h6></td>
          <td><h6>{{ Math.round(gst * 100)/100 }}/-</h6></td>
        </tr>
        <tr class="table_data row total">
          <td colspan="3" style="text-align: right;">Total</td>
          <td>{{ totalPrice }}/-</td>
        </tr>
      </table>
    </div>
  </span>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios'
export default {
    data() {
        return {
            curr_image : null,
            curr: '',
            curr_metal: null,
            curr_size: null,
            curr_color: null,
            curr_quality: null,
            cartUpdated: false,
            errorCart: false,
            pos: 0,
            goldPricingJson: null,
            goldRate: null,
            diamondCost: null,
            making_charges: null,
            gst: null,
            totalPrice: null,
            purity: {
              "default": 0.77,
              "ROSE GOLD": 0.78,
              "YELLOW GOLD": 0.77,
              "WHITE GOLD": 0.78
            }
        }
    },
    computed: {
        ...mapState({
            item: state => state.item.item,
            pricing: state => state.item.pricing,
            token: state => state.login.token,
            added: state => state.item.added
        })
    },
    watch : {
      curr_size: function(curr, prev) {
        if (prev != curr && curr && this.pricing) {
          this.updateRateCard();
        }
      },
      curr_metal: function(curr, prev) {
        if (prev != curr && curr && this.pricing) {
          this.updateRateCard()
        }
      }
    },
    async created(){
        this.total_crt = Math.round(this.item.item_details.reduce((total, curr) => {return total + curr.weight},0)*1000)/1000;
        this.curr_image = this.item.image_link[0];
        this.curr_metal = this.item.metal && this.item.metal[0] || null;
        console.log(this.item.gold_details)
        this.curr_size = (this.item.gold_details && this.item.gold_details.length) && this.item.gold_details[0].size || null;
        this.avail_sizes = this.item.gold_details.map(item => {return item.size})
        this.order_sizes = this.item.sizes;
        this.curr_color = this.item.dcolors && this.item.dcolors[0] || null;
        this.curr_quality = this.item.dqualities && this.item.dqualities[0] || null;
        let body = {
            item_id: this.item.id,
            d_quality: this.curr_quality,
            d_color: this.curr_color
          }
          let tok = this.token;
          await this.getPricing({body, tok})
        this.goldPricingJson = (this.pricing && this.pricing.gold_details && this.pricing.gold_details.length) && this.pricing.gold_details.reduce((prev, curr) => {
          prev[curr.size] = curr;
          return prev;
        },{}) || {}
        this.updateRateCard()
    },
    methods: {
        ...mapActions({
            getPricing: 'item/getPricing',
            addToCart: 'item/addToCart',
            resetCartAdd: 'item/resetCartAdd'
        }),
        async refreshPrice(){
          let body = {
            item_id: this.item.id,
            d_quality: this.curr_quality,
            d_color: this.curr_color
          }
          let tok = this.token;
          await this.getPricing({body, tok})
          this.updateRateCard()
        },
        async updateCart(){
          let body = {
            item_id: this.item.id || null,
            quality: this.curr_quality || null,
            color: this.curr_color || null,
            size: this.curr_size || null,
            metal: this.curr_metal || null,
            quantity: 1
          }
          let tempToken = this.token;
          await this.addToCart({ body, tempToken });
          if (this.added) {
            setTimeout(() => { this.resetCartAdd();}, 1000);
            alert('cart update success')
          } else {
            setTimeout(() => { this.resetCartAdd();}, 1000);
            alert('cart update failed !!!')
          }
        },
        async checkout() {
          let body = {
            item_id: this.item.id || null,
            quality: this.curr_quality || null,
            color: this.curr_color || null,
            size: this.curr_size || null,
            metal: this.curr_metal || null,
            quantity: 1
          }
          let tempToken = this.token;
          await this.addToCart({ body, tempToken });
          if (this.added) {
            this.resetCartAdd();
            window.location.href = '/mycart';
          } else {
            this.resetCartAdd();
          }
        },
        async updateRateCard(){
          this.goldRate = (this.goldPricingJson && Object.keys(this.goldPricingJson).length && this.curr_size) && (this.goldPricingJson[this.curr_size].price/0.77 * this.purity[this.curr_metal && this.curr_metal.toUpperCase() || 'default']) || (this.pricing.gold_rate/0.77 * this.purity[this.curr_metal && this.curr_metal.toUpperCase() || 'default']);
          this.diamondCost = this.pricing && this.pricing.diamond_cost || 0;
          this.making_charges = (this.goldPricingJson && Object.keys(this.goldPricingJson).length && this.curr_size) && this.goldPricingJson[this.curr_size].mkCharges || this.pricing.making_charges;
          this.gst = (this.goldRate + this.diamondCost + this.making_charges)*0.03;
          this.certification_charges = this.total_crt >= 0.3 ? 0 : 250;
          this.totalPrice = Math.round((this.goldRate + this.diamondCost + this.making_charges + this.gst + this.certification_charges));
        }
    }
}
</script>
<style scoped>
.single_item {
    width: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
.specification-details {
  justify-content: center;
  font-size: 90%;
  display: flex;
}
.specification-details-wrapper {
  padding: 0;
}
.purchase-button {
  margin-left: 1%;
  margin-right: 1%;
  display: flex;
  align-content: center;
  text-align: center;
  justify-content: center;
}
.table-wrapper {
  justify-content: center;
  display: flex;
  overflow: hidden;
}
.details {
    padding-top: 10px;
    padding-bottom: 10px;
}
.details_block {
  display: block;
  font-size: 70%;
  padding: 0px;
  text-align: center;
}
.details_block_single {
  padding: 2%;
  border: 1px solid rgb(8, 8, 8);
}
.abc {
  text-align: center;
  justify-content: center;
  padding: 0px;
}
.purchase {
    margin: 0px;
    justify-content: center;
    text-align: center;
    display: flex;
    padding: 0% 3% 1% 3%;
}
.table_heading {
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-color: rgb(117, 76, 76);
}
.table_data :nth-child(4), .table_data :nth-child(2), .table_heading :nth-child(2), .table_heading :nth-child(4) {
  text-align: left;
}
.purchase :nth-child(2){
    background-color: transparent;
    padding: 1%;
    border: 3px solid rgb(117, 76, 76);
}
.purchase :nth-child(1){
    background:rgb(117, 76, 76);
    background-size: cover;
    padding: 1%;
    border: 3px solid rgb(117, 76, 76);
}
.order-basis {
    font-size: 150%;
}
.dash {
  text-align: right;
}
.items_data :nth-child(2) {
  text-align: left;
}
select {
    width: 70%;
    background-color: black;
    text-align-last: center;
    color: white;
    margin: 0;
    border: 0px;
    border-bottom: 0.5px solid white;
    text-align: center;
    justify-content: center;
    outline: none;
}
.title, .heading_details {
  justify-content: center;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-decoration-color: rgb(117, 76, 76);
  text-align: center;
}
.main-title{
    width: 100vw;
    position: absolute;
    color: rgb(168, 168, 168);
    bottom: 0;
    display: flex;
    justify-content: center;
    padding: 2%;
    margin: 0;
  text-align: center;
}
.pricing {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 1% 1% 0% 1%;
}
.breakup {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 80%;
  width: 100%;
}
.dropper {
    padding: 0%;
}

.details-wrapper {
  min-width: 100%;
  overflow-wrap: break-word;
  text-align: center !important;
  padding: 2% 10% 5% 10%;
}
.details-wrapper h4, .details-wrapper {
  display: block;
}
.details-wrapper h6 {
  text-align: justify;
  text-align-last: center;
  justify-content: center;
  text-justify: inter-word;
}
.dropdowns {
  display: flex;
  text-align: center !important;
  justify-content: center !important;
    padding: 0;
    margin: 0;
}
.main-image {
    height: 55vh;
    display: block;
    width: 100vw;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
}
.image-wrapper img {
    object-fit: cover;
    max-width: 50%;
    max-height: 50%;
}
.image-wrapper {
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item {
   height: 7vh;
   min-width: 16%;
   background-color: rgb(0, 0, 0);
   overflow-x:auto;
   display: flex;
   align-items: center;
   justify-content: center;
}
.item img {
    max-width: 100%;
    max-height: 60%;
    object-fit: cover;
}
.chart_title {
  text-align: left;
}
.value {
  text-align: right;
}
.sub-images {
    margin: 0px;
    width: 100%;
    margin-bottom: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.charts {
    margin-top: 4vh;
    margin-bottom: 4vh;
}
.beatable {
  color: rgb(168, 168, 168);
}
.specification {
  display: flex;
  justify-content: center;
  font-size: 75%;
  padding: 0;
}
.specification-title {
    font-size: 130%;
}

.table_data td {
  overflow-wrap: break-word;
  word-break:break-all;
}
th, td {
  overflow-wrap: break-word;
  padding: 1% 1% 0% 1%;
}
.intro {
  text-align: center;
  justify-content: center;
  padding: 2%;
  align-items: center;
  background: linear-gradient(90deg, black 0% , rgb(24, 4, 4)40%, black 130%);
  margin-top: 1%;
  margin-bottom: 5%;
}
.intro span img {
  height: 20vh;
  max-width: 60vw;
  object-fit: contain;
}
.intro span {
  display: flex;
  text-align: center;
  justify-content: center;
}
.intro-text {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: justify;
}
.intro-text h6 {
  font-size: 120%;
}
.spacing {
  background-color: black !important;
  color: transparent !important;
  border: 1px solid black !important;
}
@media screen and (orientation: portrait) {
  select {
    width: 100%;
  }
}
</style>  