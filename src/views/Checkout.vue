<script>
import { mapActions, mapState } from 'vuex';
export default {
    inject: ['axios'],
    data() {
        return {
            response : null
        }
    },
    computed: {
        ...mapState({
            payment_details: state => state.cart.payment_details,
            token: state => state.login.token
        })
    },
    async created() {console.log('atda')
        console.log(this.payment_details)
            var options = {
                "key": this.payment_details.key, // Enter the Key ID generated from the Dashboard
                "amount": this.payment_details.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": this.payment_details.currency,
                "name": "Panaache Jewelz",
                "description": "checkout",
                "image": "http://www.pulsedevelopers.site/panaache/images/logoFull.png",
                "order_id": this.payment_details.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": (response)=>{
                    this.verify(response);
                },
                "prefill": {
                    "name": this.payment_details.addrDetails.phone,
                    "email": this.payment_details.email,
                    "contact": this.payment_details.addrDetails.phone
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#F37254"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();
    },
    methods: {
        ...mapActions({
            verifyPayment: state => state.verify.verifyPayment
        }),
        async verify(resp) {
            let tokenBody = btoa(JSON.stringify({
                token: this.token,
                cacheToken: $cookies.get('cacheToken')
            }));
            let encrep = btoa(JSON.stringify(resp))
            let result = await this.axios.post('http://localhost:8080/verifyorder',null,{
                headers: {
                    verify: encrep,
                    token: tokenBody
                }
            }).then((response)=>{
            if (response.status <= 299 && response.data == 'success') {
                window.location.href='/myorders'
            }
        })
        }
    }
}
</script>
