// pages/cancel.js
"use client"
import { useRouter } from "next/navigation";

const Cancel = () => {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto mt-32 p-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Payment Cancelled</h1>
      <p className="text-lg mb-4">Your payment was cancelled. You can <a href="/" className="text-blue-500">return to the homepage</a> or try again.</p>
    </div>
  );
};

export default Cancel;
