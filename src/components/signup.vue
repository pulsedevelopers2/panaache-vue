<template>
  <span class="signup">
    <span v-if="!(askOtp=='true')" class="signing">
      <input v-model="name" type="text" class="name input col-xs-12" placeholder="N a m e">
      <input v-model="email" type="text" class="name input col-xs-12" placeholder="E m a i l">
      <input v-model="phone" type="number" class="name input col-xs-12" placeholder="P h o n e">
      <input v-model="password" type="password" class="password input col-xs-12" placeholder="P a s s w o r d">
      <p v-if="mandateReq" class="red">** All fields are Mandatory **</p>
      <p v-if="askOtp=='failed'" class="red"> ** failed sending otp Please retry ** </p>
      <p v-if="existingUser == 'true'" class="red"> ** User Exist please use different email or phone **</p>
      <span class="buttons col-xs-12">
        <input type="submit" class="submit col-xs-4" text="Login" value="S i g n u p" @click="signup()">
      </span>

    </span>
    <span v-if="askOtp=='true' " class="askOtp row">
      <input v-model="emailOtp" type="number" class="input col-xs-12" placeholder="Email OTP">
      <input v-model="mobileOtp" type="number" class="input col-xs-12" placeholder="Mobile OTP">
      <p v-if="failedOtp=='true'" class="red col-xs-12">Wrong otp entered please retry</p>
      <button class="otpSub col-xs-3" @click="verify()">Verify</button>
      <span class="resend col-xs-4" @click="resendMe()">Resend otp</span>
      <span class="resend col-xs-4" @click="cancelMe()">Cancel</span>
    </span>
    <br class="br col-xs-12">
  </span>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Signup',
    data(){
      return {
        name: null,
        email: null,
        phone: null,
        password: null,
        mandateReq: false,
        emailOtp: null,
        mobileOtp: null
      }
    },
    computed: {
      ...mapState({
        askOtp : state => state.login.askOtp,
        existingUser: state => state.login.existingUser,
        failedOtp: state => state.login.failedOtp
      }),
    },
    methods: {
      async signup() {
        if (this.name && this.email && this.password && this.phone){
          this.mandateReq = false;
        let body = {
          name: this.name,
          email: this.email,
          password: this.password,
          phone: this.phone
        }
        await this.sign({ body });
        }else{
          this.mandateReq = true
        }
      },
      async verify() {
        let body = {email: this.email, password: this.password, emailOtp: this.emailOtp, mobileOtp: this.mobileOtp}
        await this.otpVerify({ body });
      },
      async resendMe(){
        let body = {
          email: this.email,
          phone: this.phone,
          password: this.password
        }
        await this.resend({body});
      },
      async cancelMe() {
        await this.reset();
      },
      ...mapActions({
        sign: 'login/sign',
        otpVerify: 'login/otpVerify',
        resend: 'login/resend',
        reset: 'login/reset'
      })
    }
}
</script>
<style scoped>

.resend{
  height: 100%;
  color: rgb(141, 120, 2);
  cursor: pointer;
  padding: 1%;  
  margin: 1%;
}
.askOtp {
  justify-content: center;
  vertical-align: middle;
}
.otpSub {
  border: 0px;
  padding: 2%;
  margin: 1%;
  background-color: #4bb543;
}
.otpInput {
  margin: 1%;
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
.buttons {
  display: flex;
  justify-content: center;
}
</style>