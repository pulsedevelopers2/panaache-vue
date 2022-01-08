import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios'
// initial state
const initialState = {
    items : null,
    loaded: 'loading'
};
// getters
const getters = {
  getField
};

const actions = {
    async getItems({ commit }, { body }) {
      commit('items',null)
      commit('loaded','loading');
      try {
        let token = body.token;
        let item = body.item;
        let tokenBody = btoa({
          token: token,
          cacheToken: $cookies.get('cacheToken')
      })
        await axios.post(`https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/getItems/${item}`, null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'token': tokenBody
                }
            }).then((response) => {
                if (response.status <= 299) {
                    commit('items',response.data)
                    commit('loaded','true');
                }
            });
      }
      catch (exc) {
        commit('loaded','failed')
      }
    }

}
const mutations = {
    updateField,
    items(state, items) {
        state.items = items;
      },
      loaded(state, loaded) {
        state.loaded = loaded
      }
  };

  export default {
    namespaced: true,       
    state: initialState,
    getters,
    actions,
    mutations
  };
