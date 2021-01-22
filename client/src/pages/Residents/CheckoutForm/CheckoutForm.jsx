
import {CardElement, useStripe, useElements, Elements} from '@stripe/react-stripe-js'
import {loadStripe } from '@stripe/stripe-js'


const CheckoutForm = () => {
const stripe = useStripe();
const elements = useElements();
// const stripePromise = loadStripe(
//     "pk_test_51IBDyvF2HDM8CiHYQJfsy5btrP7rN4aZ6jgN1iSx8DYAXcOlbpxVeDpOJ0zZUCFTJwwV6zjBirsx2RHoOQLGJizj00NqqTs3Bx"

// )
const handleSubmit = async event => {
    event.preventDefault()
    if (!stripe || !elements)return
const cardElement = elements.getElement(CardElement)

const {error, paymentMethod} = await stripe.createPaymentMethod({
    type:'card',
    card: cardElement
})
if (error){
    console.log('error',error)
}
else{
    console.log('PaymentMethod', paymentMethod)
    //fetch('http://localhost:4242/create-checkout-session',{
        //method:'POST',
      //  body: JSON.stringify(paymentMethod)
    //})
}
}

    return(
        <div>
                
<form onSubmit={handleSubmit}>
                     <CardElement />
                    <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
                     
        </div>
    )
};

export default CheckoutForm;