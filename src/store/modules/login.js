import { getField, updateField } from 'vuex-map-fields';
import axios from 'axios'
// initial state
const initialState = {
    loggedIn : "false",
    token: null,
    askOtp: 'false',
    existingUser: 'false',
    resentOtp: 'false',
    failedOtp: 'false',
    email: null
};
// getters
const getters = {
  getField
};
const actions = {
    async login({ commit }, { body }) {
        commit('askOtp','false');
        commit('existingUser','false')
        commit('token',null)
        try {
            let stringBody = JSON.stringify(body);
            let encryptedBody = btoa(stringBody);
            await axios.post("http://localhost:8080/login", null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'login': encryptedBody
                }
            }).then((response) => {
                if(response.headers.error) {
                    throw Error;
                } else if (response.status <= 299 && response.headers.token  && response.headers.token !== 'unverified') {
                    commit('loggedIn','true');
                    let descrypted = JSON.parse(atob(response.headers.token));
                    commit('token',descrypted.token);
                    $cookies.set('cacheToken',descrypted.cacheToken,'10d');
                    commit('email',descrypted.email)
                } else {
                    if (response.headers.token) {
                        commit('askOtp','true')
                    } else {
                        commit('loggedIn', 'failed')
                    }
                }
            });
        } catch (error) {
            commit('loggedIn','failed');
        }
    },
    async cachedVerify({ commit }) {
        commit('loggedIn','loading');
        let cacheToken = $cookies.get('cacheToken');
        if (cacheToken && cacheToken != 'null' && cacheToken != null) {
            try {
                let encryptedToken = btoa(JSON.stringify({
                    token: null,
                    cacheToken: cacheToken
                }));
                await axios.post("http://localhost:8080/cachelogin", null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'cache': encryptedToken
                }
            }).then((response) => {
                if (response.status <= 299) {
                    let decrypted = response.headers.token && atob(response.headers.token) || null;
                    let jsonDecrypt = JSON.parse(decrypted); 
                    commit('email',jsonDecrypt.email);
                    commit('loggedIn','true');
                    commit('token',null);
                }
            })
        } catch(e) {
            commit('loggedIn','false');
        }
    } else {
        commit('loggedIn','false');
    }
},
    async reset({ commit }) {
        commit('loggedIn', 'false');
        commit('askOtp','false');
        commit('existingUser','false');
        commit('token',null);
        commit('email',null);
        commit('failedOtp','false');
        commit('resendOtp','false');
        $cookies.set('cacheToken',null);
    },
    async sign({ commit}, { body }) {
        commit('askOtp','false');
        commit('existingUser','false');
        commit('token',null);
        try {
            let stringBody = JSON.stringify(body);
            let encryptedBody = btoa(stringBody);
            await axios.post("http://localhost:8080/signup", null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'signup': encryptedBody
                }
            }).then((response) => {
                console.log(response)
                if( response.headers.signup == 'otpSent'){
                    commit('askOtp','true');
                } else if(response.headers.signup == 'userExist'){
                    commit('existingUser','true');
                }
            });
        }
        catch (error) {
            console.log(error)
            commit('loggedIn','failed');
        }
    },
    async otpVerify({commit},{ body }) {
        commit('failedOtp','false')
        try {
            let stringBody = JSON.stringify(body);
            let encryptedBody = btoa(stringBody);
            await axios.post("http://localhost:8080/verifyOtp", null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'verifyOtp': encryptedBody
                }
            }).then((response) => {
                if (response.headers.error) {
                    commit('failedOtp','true')
                } else if (response.status <= 299 && response.headers.token) {
                    commit('loggedIn','true');
                    let decrypted = response.headers.token && atob(response.headers.token) || null;
                    let jsonDecrypt = JSON.parse(decrypted); 
                    commit('token',jsonDecrypt.token);
                    $cookies.set('cacheToken',jsonDecrypt.cacheToken,'30d');
                    commit('email',jsonDecrypt.email)
                }
            });
        }
        catch (error) {
            commit('loggedIn','false');
            commit('failedOtp','failed')
        }
    },
    async resend({commit},{body}) {
        commit('loggedIn','false')
        commit('resendOtp','sending');
        try {
            let stringBody = JSON.stringify(body);
            let encryptedBody = btoa(stringBody);
            await axios.post("http://localhost:8080/resend", null,  {
                headers : {
                    'Access-Control-Allow-Origin':'*',
                    'resendOtp': encryptedBody
                }
            }).then((response) => {
                if (response.status <= 299) {
                    commit('resendOtp','true');
                }
            });
        }
        catch (error) {
            commit('resendOtp','failed');
        }
    }

}
const mutations = {
    updateField,
    loggedIn(state, loggedIn) {
        state.loggedIn = loggedIn;
      },
      token(state, token) {
        state.token = token;
      },
      askOtp(state, askOtp) {
          state.askOtp = askOtp;
      },
      existingUser(state, existingUser) {
          state.existingUser = existingUser
      },
      resendOtp(state, resendOtp) {
          state.resendOtp = resendOtp
      },
      failedOtp(state, failedOtp) {
          state.failedOtp = failedOtp
      },
      email(state, email) {
          state.email = email
      }
  };

  export default {
    namespaced: true,       
    state: initialState,
    getters,
    actions,
    mutations
  };
