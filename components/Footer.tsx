"use client"
import React, { useEffect, useState } from "react";
import {Link, Spinner} from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function Footer() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/1")
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">

          {/* Navigation Links */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">About Us</Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">Shop</Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">CLASSY COSTUMES</h2>
            <p className="mb-4 pr-3">Your go-to place for amazing products at unbeatable prices. Shop with us and enjoy
              great deals and offers!</p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/classycostumes.bd/" target="_blank" className="text-white hover:text-gray-100 transition duration-300">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </Link>
            </div>
          </div>



          {/* Featured Product */}
          <div className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold text-white mb-4">Featured Product</h3>
            {product ? (
              <div className="flex items-center bg-gray-800 rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-44 h-44 rounded-lg mr-4"
                />
                <div className="text-white">
                  <p className="text-lg font-bold">{product.title?.substring(0,25)}</p>
                  <p className="text-sm mb-4">{product.description}</p>
                  <a href="/product/1" className="bg-indigo-600 text-white md:px-4 p-1 md:py-2 rounded hover:bg-indigo-500 transition duration-300">
                    ${product.price.toFixed(2)} - Shop Now
                  </a>
                </div>
              </div>
            ) : (
                 <Spinner className="w-[50vh] flex items-center justify-center p-10" color="warning"/>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2024 CLASSY COSTUMES. All rights reserved.</p>
          <p>
            <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">Privacy
              Policy</Link> | <Link href="#" className="text-gray-400 hover:text-gray-100 transition duration-300">Terms
            of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
