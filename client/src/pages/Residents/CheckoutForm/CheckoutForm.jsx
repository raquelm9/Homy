import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        event.preventDefault()
        if (!stripe || !elements) return
        const cardElement = elements.getElement(CardElement)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })
        if (error) {
            console.log('error', error)
        }
        else {
            console.log('PaymentMethod', paymentMethod)
            fetch('http://localhost:3008/api/shop/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_method_id: paymentMethod.id })
            })
        }
    }
    return (
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