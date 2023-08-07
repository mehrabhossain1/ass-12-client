import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import "./CheckoutForm.css";

const CheckoutForm = ({ selectedClass, price }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // TODO: axios secure here
  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(price),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        quantity: selectedClass.length,
        items: selectedClass.map((item) => item._id),
        status: "pending",
        itemNames: selectedClass.map((item) => item.name),
      };
      axios.post("http://localhost:5000/payments", payment).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <>
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
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className='text-error ml-10'>{cardError}</p>}
      {transactionId && (
        <p className='text-green-500 ml-8'>
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
