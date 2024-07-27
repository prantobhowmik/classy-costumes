"use client"
import React, { useEffect, useState } from 'react';
import Product from './Product';
import {Spinner} from "@nextui-org/react"; // Adjust the import path as needed

interface ProductData {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: {
    rate: number; // Use rate for the rating
    count: number;
  };
  category: string;
}

const Jewelery: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/jewelery/')
      .then(res => res.json())
      .then((data: ProductData[]) => {
        setProducts(data);
        console.log(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="w-screen p-5 flex items-center justify-center"><Spinner color="warning"/></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-8 border-2">
      <h2 className="text-3xl font-bold mb-8 ">Jewelery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {products.map(product => (
              <Product
                  key={product.id}
                  image={product.image}
            title={product.title}
            price={product.price}
            buttonText="Add to bag"
            reviews={product.rating.count}
            rating={product.rating.rate} // Pass the rating value
           id={product.id}/>
        ))}
      </div>
    </div>
  );
};

export default Jewelery;
