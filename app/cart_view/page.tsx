"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CartViewPage = () => {
  const { cart, removeFromCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const discountedTotal = total - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "DEMO20OFF" && discount < total) {
      alert("Congrats, you got 20% off on your cart!");
      setDiscount(total * 0.2); // 20% off
    } else if (total === 0) {
      alert("Add more products to your cart for discount!");
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    if (!address || !contact) {
      alert("Please provide address and contact details.");
      return;
    }

    const stripe = await stripePromise;

    // Call your backend to create a Checkout Session
    const response = await axios.post("/api/checkout_sessions", {
      amount: discountedTotal * 100, // Amount in cents
      address,
      contact,
    });

    const { sessionId } = response.data;

    // Redirect to Stripe Checkout
    const result = await stripe?.redirectToCheckout({ sessionId });

    if (result?.error) {
      console.error("Error redirecting to checkout:", result.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-32 p-4">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
      </header>

      <div className="border-2 shadow-md rounded-lg p-4 mb-6">
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-2 shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-4 text-green-600 font-semibold">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${discountedTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="border-2 outline-none p-2 rounded-lg mb-2"
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Enter your contact number"
          className="border-2 outline-none p-2 rounded-lg mb-2"
        />
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="border-2 outline-none p-2 rounded-lg flex-grow mr-2"
          />
          <button
            onClick={applyCoupon}
            className="border-2 px-4 py-2 rounded-lg shadow hover:bg-black hover:text-white transition-colors duration-300"
          >
            Apply Coupon
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          disabled={total == 0}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartViewPage;
