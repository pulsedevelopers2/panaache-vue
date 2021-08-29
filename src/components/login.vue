<template>
  <div class="login-wrapper">
    <span class="login-box row">
      <span class="login col-xs-12 col-md-12">
        <span v-if="askOtp!='true'" class="wrapper">
          <h2> <b>{{ block.split("").join(" ") }} </b></h2>
          <span v-if="block.toLowerCase()=='login'" class="Login">
            <span class="col-xs-12 row input-wrapper">
              <input v-model="email" type="text" class="name input col-xs-10" placeholder="Email | Phone">
              <input v-model="password" type="password" class="password input col-xs-10" placeholder="Password">
            </span>
            <span class="buttons col-xs-12">
              <input type="submit" class="submit col-xs-4" text="Login" value="L o g i n" @click="log()">
            </span>
            <span class="col-xs-12"><p class="white"> New to Panaache?</p></span>
            <span class="col-xs-12"><p class="white"><span class="blue" @click="initialize('signup')">Create an Account</span> | <a href="/reset" class="forgot-text"> Forgot Password </a></p></span>
          </span>
        </span>
        <span v-if="block=='signup'" class="Login">
          <signup />
          <p class="white">Have an Account ?<span class="blue" @click="initialize('login')"> Login</span></p>
        </span>
        <span v-if="askOtp=='true' && block=='login'" class="askOtp row">
          <h3>Account not yet Verified<br>please Verify</h3>
          <input v-model="emailOtp" type="number" class="input col-xs-12" placeholder="Email OTP">
          <input v-model="mobileOtp" type="number" class="input col-xs-12" placeholder="Mobile OTP">
          <p v-if="failedOtp=='true'" class="red">Wrong otp entered please retry</p>
          <button class="otpSub col-xs-3" @click="verify()">Verify</button>
          <span class="resend col-xs-4" @click="resendMe()">Resend otp</span>
          <span class="resend col-xs-4" @click="cancelMe()">Cancel</span>
        </span>
        <div v-if="loggedIn === 'failed' || resendOtp === 'failed'" class="red-failed">
          Error logging you In ! Plese check your Login Details or contact panaache@gmail.com if issue persist.
        </div>
      </span>
    </span>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Signup from './signup.vue';
export default {
    name: 'Login',
    components: {
        Signup
    },
    data() {
        return {
            email: null,
            password: null,
            emailOtp: null,
            block:'Login',
            mobileOtp: null
        }
    },
    computed: {
        ...mapState({
            loggedIn: state => state.login.loggedIn,
            askOtp: state => state.login.askOtp,
            resendOtp: state => state.login.resendOtp,
            failedOtp: state => state.login.failedOtp
        })
    },
    methods: {
        async verify() {
        let body = {email: this.email, password: this.password, emailOtp: this.emailOtp, mobileOtp: this.mobileOtp}
        await this.otpVerify({ body });
      },
      async resendMe(){
        let body = {
          email: this.email,
          password: this.password,
          phone: this.phone
        }
        await this.resend({body});
      },
      async initialize(block) {
          this.block = block;
          await this.reset();
      },
      async cancelMe() {
        await this.reset();
      },
        ...mapActions({
            login: 'login/login',
            otpVerify: 'login/otpVerify',
            resend: 'login/resend',
            reset: 'login/reset'
        }),
        async log() {
            if(this.email && this.password){
                await this.login({ body: { email: this.email, password: this.password} })
            } else {

            }
        }
    }
}
</script>
<style scoped>
.login-wrapper {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    color: black;
    position: relative;
}
.askOtp {
  justify-content: center;
  vertical-align: middle;
}
.resend{
  height: 100%;
  color: rgb(197, 197, 243);
  cursor: pointer;
  padding: 1%;
  margin: 1%;
}
td {
  width: 50%;
}
.otpSub {
  border: 0px;
  padding: 2%;
  margin: 1%;
  background-color: #4bb543;
}
.buttons {
  display: flex;
  justify-content: center;
}
.otpInput {
  margin: 1%;
}
.blue{
    color: rgb(236, 154, 140);
    cursor: pointer;
}
.login-box {
    background-repeat: no-repeat;
    background-size:cover;
    display: inline-block;
    padding: 3%;
    vertical-align: middle;
    align-items: center;
    transform: translateY(-10%);
    vertical-align: middle;
    width: 40vw;
    box-shadow: 1px 1px 5px 1px inherit;
}
@media screen and (orientation: portrait){
  .login-box {
    width: 100vw;
  }
}
.login-box h2, .login-box h3{
  color: rgb(180, 141, 141);
}
.wrapper h2 {
  margin: 5%;
  font-family: trajan;
}
.login-box td {
  padding: 5%;
}
.input{
    height: 4vh;
    color: var(--text);
    margin: 10px 0px;
    border: 0px;
    padding: 1%;
    text-align: center;
    font-size: 110%;
    color: rgb(204, 204, 204);
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    border-bottom: 1px solid rgb(236, 154, 140);
    background: transparent;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items:center;
  padding-left: 7%;
  padding-right: 7%;
}
.submit {
    height: auto;
    display: flex;
    color:rgb(255, 255, 255);
    background: rgb(117, 76, 76);
    font-size: 15px;
    font-family: trajan;
    margin: 10px 0px;
    border: 0px;
    padding: 2%;
    margin: 5%;
    justify-content: center;
    vertical-align: middle;
}

.Login-image {
    max-width: 15%;
    max-height: 15%;
}
.left {
  border-right: 1px solid white;
}
@media screen and (orientation: portrait) {
  .right h3{
    font-size: 90%;
  }
}
.forgot-text{
  text-decoration: none;
  color:rgb(236, 154, 140);
}
</style>