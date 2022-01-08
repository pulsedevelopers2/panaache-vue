import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios'
// initial state
const initialState = {
    item : null,
    item_loaded: 'false',
    refreshing_prices: false,
    pricing: null,
    added: false
};
// getters
const getters = {
  getField
};

const actions = {
    async getItem({ commit }, { body }) {
      if (body.token || ($cookies.get('cacheToken') != 'null' && $cookies.get('cacheToken'))) {
      commit('item',null)
      commit('item_loaded','loading');
      try {
        let token = body.token;
        let id = body.id;
        let tokenBody = btoa(JSON.stringify({
            token: token,
            cacheToken: $cookies.get('cacheToken')
        }));
        await axios.post(`https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/getItem/${id}`, null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'token': tokenBody
                }
            }).then((response) => {
                if (response.status <= 299) {
                    commit('item',response.data)
                    commit('item_loaded','true');
                } else {
                    throw Error;
                }
            });
      }
      catch (exc) {
        commit('item_loaded','failed')
      }
    }
    },
    async addToCart({ commit }, { body, token }) {
      try {
      let tokenBody = btoa(JSON.stringify({
        token: token,
        cacheToken: $cookies.get('cacheToken')
      }));
      let ecBody = btoa(JSON.stringify(body))
      await axios.post(`https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/addtocart`, { cart: ecBody},  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'token': tokenBody
                }
            }).then((response) => {
              console.log(response)
              commit('added',true)
            });
    }
    catch(error) {
      console.log(error)
      commit('added',false)
    }
    },
    async resetCartAdd({commit}){
      commit('added', false)
    },
    async getPricing({ commit },{ body, token }) {
      if (body.token || ($cookies.get('cacheToken') != 'null' && $cookies.get('cacheToken'))) {
      commit('refreshing_prices',true)
      commit('pricing',null)
      let tokenBody = btoa(JSON.stringify({
        token: token,
        cacheToken: $cookies.get('cacheToken')
      }))
      try {
        await axios.post(`https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/pricing`, body,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'token': tokenBody
                }
            }).then((response) => {
                if (response.status <= 299) {
                    commit('pricing',response.data)
                } else {
                    throw Error;
                }
            });
      } catch (error) {
        commit('pricing','failed')
      }
      commit('refreshing_prices',false)
  }
}
}
const mutations = {
    updateField,
    item(state, item) {
        state.item = item;
      },
      item_loaded(state, item_loaded) {
        state.item_loaded = item_loaded
      },
      refreshing_prices(state,refreshing_prices) {
        state.refreshing_prices = refreshing_prices;
      },
      pricing(state,pricing) {
        state.pricing = pricing;
      },
      added(state, added) {
        state.added = added
      }
  };

  export default {
    namespaced: true,       
    state: initialState,
    getters,
    actions,
    mutations
  };
