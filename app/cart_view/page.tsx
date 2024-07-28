// app/cart/page.tsx
"use client";
import { useCart } from "@/context/CartContext";

const CartViewPage = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
              <li key={item.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
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

      <div className="border-2 shadow-md rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Subtotal</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Shipping</span>
          <span className="">Calculated at checkout</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
          onClick={() => {
            /* Handle checkout */
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartViewPage;
