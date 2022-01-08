import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios';
// initial state
const initialState = {
    cart: null
};
// getters
const getters = {
  getField
};

const actions = {
    async verify({ commit }, { response, token, details }) {
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        let payment_details = btoa(JSON.stringify(details))
        await axios.post('https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/verifypayment',{
            headers: {
                'Access-Control-Allow-Origin':'*',
                'token': tokenBody,
                'payment_details': payment_details
            }
        })
},
}
const mutations = {
    updateField,
    cart(state, cart) {
        state.cart = cart;
      },
  };

  export default {
    namespaced: true,       
    state: initialState,
    getters,
    actions,
    mutations
  };
