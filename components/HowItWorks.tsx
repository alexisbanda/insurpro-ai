
import React from 'react';
import { Zap, Users, Shield } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { HowItWorksStep } from '../types';

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
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="text-center p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-center items-center mb-6 w-20 h-20 bg-blue-100 rounded-full mx-auto">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
