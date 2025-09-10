
import React, { useState, useCallback } from 'react';
import { LifeBuoy, Home, Car, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import AIAdvisorModal from './AIAdvisorModal';
import { Solution } from '../types';
import { getInsuranceRecommendation } from '../services/geminiService';

const solutions: Solution[] = [
  { icon: <LifeBuoy size={36} />, title: 'Seguro de Vida', description: 'Garantiza la seguridad financiera de tus seres queridos. Un acto de amor que perdura.' },
  { icon: <Home size={36} />, title: 'Seguro de Hogar', description: 'Tu hogar es tu refugio. Protégelo contra todo riesgo y vive con total tranquilidad.' },
  { icon: <Car size={36} />, title: 'Seguro de Auto', description: 'Conduce con confianza. Te cubrimos en cada kilómetro de tu viaje.' },
  { icon: <Briefcase size={36} />, title: 'Seguro para Empresas', description: 'Blindamos tu negocio para que puedas enfocarte en crecer sin preocupaciones.' },
];

const Solutions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetRecommendation = useCallback(async (situation: string) => {
    return await getInsuranceRecommendation(situation);
  }, []);

  return (
    <SectionWrapper id="solutions" className="bg-white">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Tu Seguro Ideal, a un Clic</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Explora nuestras coberturas diseñadas para ti o deja que nuestra IA encuentre la póliza perfecta para tu momento de vida.
        </p>
      </div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {solutions.map((solution, index) => (
          <div key={index} className="group relative p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden text-center transform hover:-translate-y-2 transition-all duration-400 ease-in-out">
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex justify-center items-center mb-6 w-20 h-20 bg-blue-100 text-blue-600 rounded-full transition-all duration-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                {solution.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{solution.title}</h3>
              <p className="text-gray-600 mb-6 h-24">{solution.description}</p>
              <a href="#" className="font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center">
                Ver más <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-20">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1.5 flex items-center mx-auto"
        >
          <Sparkles className="mr-3" /> Asesoría IA Gratuita
        </button>
      </div>
      <AIAdvisorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGetRecommendation={handleGetRecommendation} />
    </SectionWrapper>
  );
};

export default Solutions;
