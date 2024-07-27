"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext"; // Ensure the path is correct

export default function Cart() {
  const { cart } = useCart();
  const itemCount = cart.length;

  return (
    <div className="relative inline-block">
      <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
          {itemCount}
        </span>
      )}
    </div>
  );
}
