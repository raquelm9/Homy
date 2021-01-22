import CheckoutForm from './CheckoutForm'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'


const Checkout = () => {
const stripePromise = loadStripe("pk_test_51IBDyvF2HDM8CiHYQJfsy5btrP7rN4aZ6jgN1iSx8DYAXcOlbpxVeDpOJ0zZUCFTJwwV6zjBirsx2RHoOQLGJizj00NqqTs3Bx")

    return(
        <div>
            <Elements stripe={stripePromise}>
            <CheckoutForm/>
            </Elements>
        </div>
    )
};

export default Checkout