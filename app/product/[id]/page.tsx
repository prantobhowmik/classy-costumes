import { notFound } from 'next/navigation';
import ProductDetailClient from '../../../components/ProductDetailCient';

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
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  console.log(`Params: ${JSON.stringify(params)}`);

  const product = await fetchProduct(params.id);

  if (!product) {
    return notFound();
  }

  return <ProductDetailClient product={product} />;
};

export default ProductDetail;

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
