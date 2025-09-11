import React from 'react';
import { Zap, Users, Shield } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { HowItWorksStep } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const steps: HowItWorksStep[] = [
  { 
    icon: <Zap size={32} className="text-blue-600" />, 
    title: 'Obtén una Cotización', 
    description: 'Completa un formulario simple para obtener una cotización personalizada en minutos.' 
  },
  { 
    icon: <Users size={32} className="text-blue-600" />, 
    title: 'Compara Planes', 
    description: 'Nuestros expertos te ayudan a comparar planes para encontrar el que mejor se adapte a tus necesidades.' 
  },
  { 
    icon: <Shield size={32} className="text-blue-600" />, 
    title: 'Obtén Cobertura', 
    description: 'Finaliza tu plan y obtén cobertura instantánea. Así de simple.' 
  },
];

const HowItWorks: React.FC = () => {
  return (
    <SectionWrapper id="how-it-works" className="bg-white">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Obtén Cobertura en 3 Sencillos Pasos</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Hemos simplificado el proceso para que asegurarse sea lo más sencillo posible.</p>
      </div>
      <div className="mt-16">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1.1}
          pagination={{ clickable: true }}
          className="pb-12"
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="flex justify-center items-center mb-6 w-20 h-20 bg-blue-100 rounded-full mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;