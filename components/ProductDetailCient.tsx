// ProductDetailClient.tsx
"use client";
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import MenCollection from '@/components/MenCollection';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductDetailClientProps {
  product: Product;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Generate star rating
  const starRating = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    if (product.rating.rate >= starNumber) return <FaStar key={index} className="text-yellow-400 text-xs" />;
    if (product.rating.rate >= starNumber - 0.5) return <FaStarHalfAlt key={index} className="text-yellow-400 text-xs" />;
    return <FaRegStar key={index} className="text-yellow-400 text-xs" />;
  });

  return (
    <div className="container mx-auto mt-32 p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img src={product.image} alt={product.title} className="w-[60vh] h-[85vh] rounded-lg shadow-lg" />
        </div>
        <div className="w-full flex-col justify-center flex items-center lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl mt-2">{product.description}</p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-semibold">${product.price}</span>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex space-x-0.5">
              {starRating}
            </div>
            <span className="text-sm ml-2">{product.rating.count} reviews</span>
          </div>
          <button
            className="mt-6 bg-blue-600 text-white text-lg font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={() => addToCart({ id: product.id, image: product.image, title: product.title, price: product.price })}
          >
            Add to Bag
          </button>
        </div>
      </div>
      <div className="mt-3">
        <MenCollection />
      </div>
    </div>
  );
};

export default ProductDetailClient;
