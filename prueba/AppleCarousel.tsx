"use client";
import React, { useState, useEffect } from 'react';

// --- Tipos y Datos de Ejemplo ---
type Slide = {
  id: number;
  productName: string;
  tagline: string;
  imageUrl: string;
};

const slidesData: Slide[] = [
  {
    id: 1,
    productName: 'iPhone 15 Pro',
    tagline: 'Titanium. So strong. So light. So Pro.',
    imageUrl: 'https://www.apple.com/v/home/be/images/heroes/iphone-15-pro/hero_iphone15pro__i7qfeosjvlq2_large.jpg',
  },
  {
    id: 2,
    productName: 'MacBook Air',
    tagline: 'Designed to go places.',
    imageUrl: 'https://www.apple.com/v/home/be/images/heroes/macbook-air-13-and-15/hero_macbook_air_13_15_m3__e43jeg5p4wia_large.jpg',
  },
  {
    id: 3,
    productName: 'Apple Watch Series 9',
    tagline: 'Smarter. Brighter. Mightier.',
    imageUrl: 'https://www.apple.com/v/home/be/images/heroes/apple-watch-series-9/hero_apple_watch_series_9_order__d0fi9mb84dci_large.jpg',
  },
];

// --- Estilos en un objeto para mayor claridad ---
const styles = {
  wrapper: `relative w-full h-screen overflow-hidden bg-black`,
  slide: `absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out`,
  slideImage: `w-full h-full object-cover`,
  slideContent: `absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white p-4`,
  productName: `text-5xl font-bold mb-2`,
  tagline: `text-2xl`,
  dotsContainer: `absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3`,
  dot: `w-3 h-3 rounded-full cursor-pointer transition-colors duration-300`,
};

// --- Componente del Carrusel ---
const AppleCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
    }, 5000); // Cambia de slide cada 5 segundos
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className={styles.wrapper}>
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.slide} ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.imageUrl} alt={slide.productName} className={styles.slideImage} />
          <div className={styles.slideContent}>
            <h2 className={styles.productName}>{slide.productName}</h2>
            <p className={styles.tagline}>{slide.tagline}</p>
          </div>
        </div>
      ))}
      <div className={styles.dotsContainer}>
        {slidesData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${styles.dot} ${currentSlide === index ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AppleCarousel;