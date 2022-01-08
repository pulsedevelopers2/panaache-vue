<template>
  <div class="forgot_container row">
    <side-nav />
    <a href="/" class="image-wrapper"><img class="nav-logo" src="../assets/fullLogo.png"></a>
    <br>
    <h3>Password Reset</h3>
    <br>
    <div v-if="unverified" class="forgot_wrapper col-xs-12 col-md-6">
      <input v-model="email" type="text" class="col-xs-12 input" placeholder="Email to reset">
      <div v-if="errorMessage" class="red-failed col-xs-12">
        {{ errorMessage }}
      </div>
      <button class="otpSub col-md-3 col-xs-6" @click="verifyEmail()">
        Confirm
      </button>
    </div>
    <div v-if="!unverified" class="forgot_wrapper col-xs-12 col-md-6">
      <input v-model="otp" type="number" class="col-xs-12 input" placeholder="Otp">
      <input v-model="password" type="text" class="col-xs-12 input" placeholder="New Password">
      <div v-if="errorMessage" class="red-failed col-xs-12">
        {{ errorMessage }}
      </div>
      <button class="otpSub col-md-3 col-xs-6" @click="reset()">
        Reset
      </button>
      <div class="block" @click="verifyEmail()">
        Resend otp
      </div>
    </div>
  </div>
</template>
<script>
import SideNav from '../components/SideNav.vue'
export default {
    components: {
        SideNav
    },
    inject: ['axios'],
    data() {
        return {
            email: null,
            unverified: true,
            otp: null,
            errorMessage: null,
            password: null
        }
    },
    methods: {
        async verifyEmail(){
            if (this.email && this.email!= '') {
                await this.axios.post("https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/forgotpassword", null,  {
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                        'email': this.email
                    }
                }).then((response) => {
                    if (response.status <= 299){
                        if (response.headers.error && response.headers.error == 'NoUserException') {
                            this.errorMessage = "User Doesn't Exist";
                            this.email = null
                        } else if (response.headers.error) {
                            
                                this.errorMessage = "Unknown ErrorOccured Please Retry";
                        } else { 
                            this.errorMessage = null;
                            this.unverified = false;
                        }
                    }
                });
            }
        },
        async reset() {
            if (this.email && this.otp && this.password) {
                let body = {
                    email: this.email,
                    otp: this.otp,
                    password: this.password
                }
                let stringBody = JSON.stringify(body);
                let encryptedBody = btoa(stringBody);
                await this.axios.post("https://k17hmntqvd.execute-api.ap-south-1.amazonaws.com/api/resetpassword",null, {
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                        'body': encryptedBody
                    }
                }).then((response) => {
                    if (response.status <= 299) {
                        if (response.headers.error) {
                            if (response.headers.error == 'IncorrectOtp') {
                                this.errorMessage = "Incorrect Otp"
                            } else {
                                this.errorMessage = "Error Occured Please retry"
                            }
                        } else {
                            this.errorMessage = null
                            window.location.href = '/login'
                        }
                    }
                })
            } else {
                this.errorMessage = "All Above fields are mandatory"
            }
        }
    }
}
</script>
<style scoped>
.forgot_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.forgot_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.input{
    height: 4vh;
    color: var(--text);
    margin: 10px 0px;
    border: 0px;
    padding: 1%;
    border-bottom: 1px solid rgb(255, 255, 255);
    background: transparent;
}
.otpSub {
  border: 0px;
  padding: 2%;
  margin: 1%;
  background-color: #4bb543;
}
img {
    max-height: 8vh;
}
.line {
    border: 0.5px solid rgb(46, 46, 46);
    width: 100%;
}
.red-failed {
    text-align: center;
    padding: 1%;
}
h3 {
    color: #846427;
}

</style>