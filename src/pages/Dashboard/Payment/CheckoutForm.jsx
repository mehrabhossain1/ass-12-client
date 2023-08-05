import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
      console.log(paymentMethod);
    }
  };

  return (
    <>
      {" "}
      <form className='w-2/3 m-10' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className='btn btn-outline btn-circle btn-warning mt-4'
          type='submit'
          disabled={!stripe}
        >
          Pay
        </button>
      </form>
      {cardError && <p className='text-error ml-10'>{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
