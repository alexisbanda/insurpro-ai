
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { CheckCircle } from 'lucide-react';

const ExpertGuide: React.FC = () => (
  <SectionWrapper id="expert-guide" className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Asesoramiento de Expertos Certificados</h2>
        <p className="mt-6 text-lg text-gray-600">
          Navegar por el mundo de los seguros puede ser complejo. Nuestro equipo de expertos certificados está aquí para brindarte un asesoramiento claro e imparcial para ayudarte a tomar decisiones informadas. Estamos comprometidos a encontrarte la mejor cobertura a las tarifas más competitivas.
        </p>
        <ul className="mt-8 space-y-4">
          <li className="flex items-start">
            <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
            <span>Consultas personalizadas para entender tus necesidades únicas.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
            <span>Análisis de mercado en profundidad para encontrar las mejores pólizas.</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" size={20} />
            <span>Soporte continuo y asistencia en reclamaciones cuando más lo necesites.</span>
          </li>
        </ul>
        <a href="#contact" className="inline-block mt-10 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
          Habla con un Experto
        </a>
      </div>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2574&auto=format&fit=crop"
          alt="Agente de seguros consultando con un cliente"
          className="rounded-2xl shadow-xl w-full h-auto object-cover"
          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/600/400'; }}
        />
      </div>
    </div>
  </SectionWrapper>
);

export default ExpertGuide;
