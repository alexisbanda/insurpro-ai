
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { BrainCircuit, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

const ExpertGuide: React.FC = () => (
  <SectionWrapper id="expert-guide" className="bg-gray-50 overflow-hidden">
    <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      
      {/* Columna de Imagen (Ocupa 3 de 5 columnas en LG) */}
      <div className="lg:col-span-3 order-last lg:order-first mt-8 lg:mt-0">
        <div className="relative lg:ml-[-10%]">
          <div className="absolute top-[-2rem] left-[-2rem] w-32 h-32 bg-blue-100 rounded-full opacity-50 z-0"></div>
          <video
            poster="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop"
            src="https://cdn.pixabay.com/video/2025/06/01/282995_large.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl shadow-2xl w-full h-auto object-cover relative z-10"
          />
          <div className="absolute bottom-[-2rem] right-[-2rem] w-48 h-48 bg-indigo-100 rounded-lg opacity-50 z-0 transform rotate-45"></div>
        </div>
      </div>

      {/* Columna de Contenido (Ocupa 2 de 5 columnas en LG) */}
      <div className="lg:col-span-2 z-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Tu Aliado Estratégico en Seguros</h2>
        <p className="mt-6 text-lg text-gray-600">
          Más allá de una póliza, te ofrecemos claridad y confianza. Nuestro equipo experto se dedica a ser tu socio estratégico, asegurando que cada decisión esté informada, sea inteligente y esté perfectamente alineada con tus metas.
        </p>
        <ul className="mt-8 space-y-6">
          <li className="flex items-start">
            <div className="flex-shrink-0 bg-blue-600 text-white rounded-full p-3">
              <BrainCircuit size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-800">Análisis 360° de tus Necesidades</h4>
              <p className="text-gray-600">Entendemos tu mundo para ofrecerte una protección que realmente encaje contigo.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 bg-blue-600 text-white rounded-full p-3">
              <ShieldCheck size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-800">Acceso a Coberturas de Élite</h4>
              <p className="text-gray-600">Investigamos el mercado para darte acceso a las pólizas más competitivas y completas.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 bg-blue-600 text-white rounded-full p-3">
              <HeartHandshake size={24} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-semibold text-gray-800">Soporte Proactivo y Humano</h4>
              <p className="text-gray-600">Estamos contigo en cada paso, especialmente cuando más nos necesitas.</p>
            </div>
          </li>
        </ul>
        <a href="#contact" className="inline-flex items-center mt-12 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Habla con un Experto <ArrowRight className="ml-2" size={20}/>
        </a>
      </div>
    </div>
  </SectionWrapper>
);

export default ExpertGuide;
