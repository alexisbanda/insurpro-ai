import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

// Define the data for each slide
const slidesData = [
  {
    title: 'Seguro de Vida',
    subtitle: 'Protege el futuro de tus seres queridos con una cobertura completa y flexible.',
    imageUrl: '/images/hero-vida.jpg',
  },
  {
    title: 'Seguro de Auto',
    subtitle: 'Conduce con tranquilidad. La mejor cobertura para tu vehículo en las carreteras canadienses.',
    imageUrl: '/images/hero-auto.jpg',
  },
  {
    title: 'Seguro de Viajes',
    subtitle: 'Explora el mundo sin preocupaciones. Asistencia médica y protección para tus aventuras.',
    imageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=1920&auto=format&fit=crop',
  },
  {
    title: 'Seguro Internacional',
    subtitle: 'Cobertura médica global para expatriados y estudiantes internacionales en Canadá.',
    imageUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1920&auto=format&fit=crop',
  },
];

const Hero: React.FC = () => {
  return (
    <>
      <style>
        {`
          .hero-swiper .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-size: cover;
            background-position: center;
            color: white;
          }
          .hero-swiper .slide-content {
            text-align: center;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 40px;
            border-radius: 15px;
            max-width: 800px;
          }
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            color: white;
            --swiper-navigation-size: 30px;
          }
          .hero-swiper .swiper-pagination-bullet {
            background: white;
            width: 12px;
            height: 12px;
            opacity: 0.7;
          }
          .hero-swiper .swiper-pagination-bullet-active {
            opacity: 1;
          }
        `}
      </style>
      <section className="hero-swiper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="h-screen"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide
              key={index}
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <motion.div
                className="slide-content"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                <p className="text-lg sm:text-xl font-semibold text-cyan-300 mb-2">
                  Exclusivo para residentes en Canadá
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <div className="mt-8">
                  <a
                    href="#quote"
                    className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
                  >
                    Cotizar Ahora
                  </a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Hero;