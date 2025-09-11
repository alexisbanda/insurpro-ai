import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { Testimonial } from '../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials: Testimonial[] = [
  {
    quote: "InsurePro hizo que todo el proceso fuera increíblemente simple. Su equipo estaba bien informado y me ayudó a encontrar una póliza perfecta para las necesidades de mi familia. ¡Muy recomendable!",
    name: 'Sarah L.',
    title: 'Cliente de Seguro de Vida',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    quote: "Temía tener que buscar un seguro de auto, pero InsurePro lo convirtió en pan comido. Ahorré dinero y obtuve una mejor cobertura que con mi proveedor anterior. ¡Servicio fantástico!",
    name: 'Michael B.',
    title: 'Cliente de Seguro de Auto',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    quote: "Como propietario de una pequeña empresa, encontrar el seguro adecuado era crucial. Los expertos de InsurePro me guiaron en cada paso y encontraron un plan integral que se ajustaba a mi presupuesto.",
    name: 'Jessica T.',
    title: 'Cliente de Seguro de Negocios',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    quote: "El nivel de detalle y la atención personalizada que recibí fue excepcional. Realmente se tomaron el tiempo para entender mi situación única. No podría estar más feliz.",
    name: 'David R.',
    title: 'Cliente de Seguro de Hogar',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
];

const Testimonials: React.FC = () => {
  return (
    <SectionWrapper id="testimonials" className="bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Lo que Dicen Nuestros Clientes</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Estamos orgullosos de haber ayudado a miles de clientes a encontrar tranquilidad.</p>
      </div>
      <div className="mt-16">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          className="pb-12"
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-full">
              <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col h-full">
                <MessageSquare className="text-blue-200 w-12 h-12 mb-4" />
                <p className="text-gray-600 flex-grow">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 bg-gray-200" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/56/56'; }}/>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Funcionalidad de resumen de IA deshabilitada temporalmente */}
    </SectionWrapper>
  );
};

export default Testimonials;