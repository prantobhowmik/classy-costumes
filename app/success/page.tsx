// pages/success.tsx
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto mt-32 p-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-4">Thank you for your purchase. You will be redirected to the homepage shortly.</p>
      <p className="text-sm">If you are not redirected automatically, <a href="/" className="text-blue-500">click here</a>.</p>
    </div>
  );
};

export default Success;
