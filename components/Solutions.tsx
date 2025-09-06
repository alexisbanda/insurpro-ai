
import React, { useState, useCallback } from 'react';
import { LifeBuoy, Home, Car, Briefcase, Sparkles } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import AIAdvisorModal from './AIAdvisorModal';
import { Solution } from '../types';
import { getInsuranceRecommendation } from '../services/geminiService';

const solutions: Solution[] = [
  { icon: <LifeBuoy size={40} className="text-white"/>, title: 'Seguro de Vida', description: 'Protege el futuro de tu familia con planes de seguro de vida integrales.' },
  { icon: <Home size={40} className="text-white"/>, title: 'Seguro de Hogar', description: 'Asegura tu hogar y pertenencias contra imprevistos.' },
  { icon: <Car size={40} className="text-white"/>, title: 'Seguro de Auto', description: 'Obtén una cobertura de auto confiable que te mantenga seguro en la carretera.' },
  { icon: <Briefcase size={40} className="text-white"/>, title: 'Seguro de Negocios', description: 'Soluciones de seguro personalizadas para proteger los activos de tu empresa.' },
];

const Solutions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetRecommendation = useCallback(async (situation: string) => {
    return await getInsuranceRecommendation(situation);
  }, []);

  return (
    <SectionWrapper id="solutions" className="bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Soluciones de Seguros para Cada Necesidad</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Ofrecemos una amplia gama de productos de seguros adaptados a tus requisitos específicos.</p>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {solutions.map((solution, index) => (
          <div key={index} className="group relative p-8 bg-white rounded-2xl shadow-lg overflow-hidden text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute inset-0 bg-blue-600 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            <div className="relative z-10">
              <div className="flex justify-center items-center mb-6 w-24 h-24 bg-blue-600 rounded-full mx-auto group-hover:bg-white transition-colors duration-500">
                <div className="transform group-hover:text-blue-600 transition-colors duration-500">
                  {solution.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition-colors duration-500">{solution.title}</h3>
              <p className="mt-2 text-gray-600 group-hover:text-blue-100 transition-colors duration-500">{solution.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto">
          <Sparkles className="mr-2" /> Ayúdame a Elegir
        </button>
      </div>
      <AIAdvisorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGetRecommendation={handleGetRecommendation} />
    </SectionWrapper>
  );
};

export default Solutions;
