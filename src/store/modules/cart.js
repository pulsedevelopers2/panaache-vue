import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
// initial state
const initialState = {
    cart: null,
    cartLoad: false,
    deleted: null,
    checkout: null,
    payment_details: null
};
// getters
const getters = {
  getField
};

const actions = {
    async viewMyCart({ commit }, { token }) {
        commit('cartLoad','loading')
        try {
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        axios.post('http://localhost:8080/viewcart',null,{
            headers : {
                'Access-Control-Allow-Origin':'*',
                'token': tokenBody
            }
        }).then(function(response){
            if (response.status <= 299) {
                commit('cart',response.data)
                console.log(response.data)
                commit('cartLoad','loaded')
            } else {
                commit('cartLoad','failed')
            }
        })
    } catch(error) {
        commit('cartLoad','failed')
    }
},
    async deleteMyItem({ commit }, { id, token }) {
        commit('deleted',null)
        try {
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        axios.post(`http://localhost:8080/remove`,{ cart_id: id },{
            headers : {
                'Access-Control-Allow-Origin':'*',
                'token': tokenBody
            }
        }).then(function(response){
            if (response.status <= 299) {
                console.log('here')
                commit('deleted','true')
                commit('cart',response.data)
            } else {
                commit('deleted','failed')
            }
        })
    } catch (error) {
        commit('deleted','failed')
    }
    },
    async checkout({ commit }, {token, cart, address}) {
        commit('checkout',null);
        try {
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        let stringBody = JSON.stringify({
            cart: cart,
            address: address
        });
        let encryptedBody = btoa(stringBody);
        await axios.post("http://localhost:8080/placeorder", { checkout : encryptedBody }, {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'token': tokenBody
            }
        }).then(function(response) {
            if (response.status <= 299 && response.data != 'error') {
                console.log('heredcs')
                commit('payment_details', response.data)
            } else {
                console.log('here')
                console.log(response)
            }
        })
    } catch(error){
        console.log(error);
        console.log('2')
        commit('checkout','failed');
    }
    }
}
const mutations = {
    updateField,
    cart(state, cart) {
        state.cart = cart;
      },
      cartLoad (state, cartLoad) {
          state.cartLoad = cartLoad
      },
      deleted (state, deleted) {
          state.deleted = deleted
      },
      checkout(state, checkout) {
          state.checkout = checkout
      },
      payment_details(state, payment_details) {
          state.payment_details = payment_details
      }
  };

  export default {
    namespaced: true,       
    state: initialState,
    getters,
    actions,
    mutations
  };
