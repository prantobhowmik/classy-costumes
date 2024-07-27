import { notFound } from 'next/navigation';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import MenCollection from "@/components/MenCollection";

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

// Fetch the product data based on the id
async function fetchProduct(id: string): Promise<Product | null> {
  console.log(`Fetching product with ID: ${id}`);
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      throw new Error('Empty response');
    }

    const product = JSON.parse(text);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Page component to display product details
export default async function ProductDetail({ params }: { params: { id: string } }) {
  console.log(`Params: ${JSON.stringify(params)}`);

  const product = await fetchProduct(params.id);

  if (!product) {
    return notFound();
  }

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
          <h1 className="text-3xl font-bold ">{product.title}</h1>
          <p className=" text-xl mt-2">{product.description}</p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-semibold ">${product.price}</span>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex space-x-0.5">
              {starRating}
            </div>
            <span className=" text-sm ml-2">{product.rating.count} reviews</span>
          </div>
          <button className="mt-6 bg-blue-600 text-white text-lg font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Add to Bag
          </button>
        </div>
      </div>
      <div className="mt-3">
        <MenCollection/>
      </div>
    </div>
  );
}

// Define static paths for dynamic routes
export async function generateStaticParams() {
  try {
    const res = await fetch('https://fakestoreapi.com/products?limit=10');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      throw new Error('Empty response');
    }

    const products = JSON.parse(text);

    return products.map((product: { id: number }) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
