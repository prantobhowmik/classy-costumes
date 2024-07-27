"use client"
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image'; // For optimized image handling
import Sale from "../public/Intro/Sale.jpg"
import newcollection from "../public/Intro/newcollection.jpg"
import topproducts from "../public/Intro/topproducts.jpg"

// Sample slides data
const slides = [
  {
    image: newcollection, // Replace with your image
    title: 'Explore Our New Collection',
    description: 'Discover the latest trends and styles in fashion.',
    ctaText: 'Shop Now',
    ctaLink: '#shop',
  },
  {
    image: Sale, // Replace with your image
    title: 'Exclusive Offers Await',
    description: 'Special discounts on select items. Don’t miss out!',
    ctaText: 'Get Offers',
    ctaLink: '#offers',
  },
  {
    image: topproducts, // Replace with your image
    title: 'Top Picks for You',
    description: 'Check out our top-rated products and bestsellers.',
    ctaText: 'See Top Picks',
    ctaLink: '#top-picks',
  },
];

const HeroCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="relative w-full md:h-[50vh] overflow-hidden">
      <Slider {...settings} className="md:h-[50vh] mt-20 md:mt-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[70vh] flex items-center justify-center bg-gray-800"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="opacity-25"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 md:p-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg md:text-2xl mb-6">{slide.description}</p>
              <a
                href={slide.ctaLink}
                className="border-2  hover:bg-white hover:text-black text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-300"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroCarousel;
