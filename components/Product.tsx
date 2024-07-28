"use client";
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from "@nextui-org/react";

interface ProductProps {
  id: number;
  image: string;
  title: string;
  price: number;
  buttonText: string;
  reviews: number;
  rating: number;
  key?: number;
}

const Product: React.FC<ProductProps> = ({
  id,
  image,
  title,
  price,
  buttonText,
  reviews,
  rating,
  key
}) => {
  const { addToCart } = useCart();

  // Generate star rating
  const starRating = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    if (rating >= starNumber) return <FaStar key={index} className="text-yellow-400 text-xs" />;
    if (rating >= starNumber - 0.5) return <FaStarHalfAlt key={index} className="text-yellow-400 text-xs" />;
    return <FaRegStar key={index} className="text-yellow-400 text-xs" />;
  });

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-200">
      <Link href={`/product/${id}`} passHref>
        <img src={image} alt={title} className="w-52 h-52 object-cover rounded-md" />
      </Link>
      <h3 className="text-sm font-semibold text-gray-700 mt-3 text-center">{title?.substring(0, 25)}</h3>
      <div className="flex items-center mt-2">
        <span className="text-lg text-gray-800 font-semibold">${price}</span>
        <button
          className="ml-4 bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
          onClick={() => addToCart({ id, image, title, price })}
        >
          {buttonText}
        </button>
      </div>
      <div className="flex items-center mt-2">
        <div className="flex space-x-0.5">
          {starRating}
        </div>
        <span className="text-gray-500 text-xs ml-2">{reviews} reviews</span>
      </div>
    </div>
  );
};

export default Product;
