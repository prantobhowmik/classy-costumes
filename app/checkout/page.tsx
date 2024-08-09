// app/checkout/page.tsx
"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPage = () => {
  const { cart } = useCart();
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const shippingCharge = 100;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = total + shippingCharge;

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!address) {
      setIsAddressValid(false);
      return;
    }

    setIsProcessing(true);

    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.createPayment({
      amount: grandTotal * 100, // Convert to cents
      currency: "usd",
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          address: {
            line1: address,
          },
        },
      },
      confirm: true,
    });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("Payment successful!");
    }

    setIsProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-32 p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
      </header>

      <div className="border-2 shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <textarea
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setIsAddressValid(true);
          }}
          placeholder="Enter your shipping address"
          className={`border p-2 rounded-lg w-full resize-none ${
            !isAddressValid ? "border-red-500" : ""
          }`}
          rows={4}
        />
        {!isAddressValid && (
          <p className="text-red-500 mt-2">Address is required.</p>
        )}
      </div>

      <div className="border-2 shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Shipping</span>
          <span className="font-semibold">${shippingCharge.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-xl">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <div className="border p-4 rounded-lg mb-4">
          <CardElement />
        </div>
        <button
          type="submit"
          disabled={!address || isProcessing}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
        >
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  );
};

export default StripeWrapper;
