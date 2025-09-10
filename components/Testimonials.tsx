
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, LoaderCircle, Sparkles } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { Testimonial } from '../types';
// import { summarizeTestimonials } from '../services/geminiService';

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
];

const Testimonials: React.FC = () => {
  // const [summary, setSummary] = useState('');
  // const [loading, setLoading] = useState(false);

  // const handleSummarize = useCallback(async () => {
  //   setLoading(true);
  //   setSummary('');
  //   const testimonialText = testimonials.map(t => t.quote).join('\n');
  //   const result = await summarizeTestimonials(testimonialText);
  //   setSummary(result);
  //   setLoading(false);
  // }, []);

  return (
    <SectionWrapper id="testimonials" className="bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Lo que Dicen Nuestros Clientes</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Estamos orgullosos de haber ayudado a miles de clientes a encontrar tranquilidad.</p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col h-full">
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
        ))}
      </div>
      {/* Funcionalidad de resumen de IA deshabilitada temporalmente
      <div className="text-center mt-12">
        <button onClick={handleSummarize} disabled={loading} className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 flex items-center mx-auto">
          {loading ? (
            <>
              <LoaderCircle className="animate-spin mr-2" />
              Resumiendo...
            </>
          ) : (
            <>
              <Sparkles className="mr-2" /> Resumir Testimonios
            </>
          )}
        </button>
      </div>
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200"
        >
          <h3 className="font-bold text-lg text-gray-800 mb-2">Temas Clave de los Comentarios de Clientes:</h3>
          <div className="text-gray-700 whitespace-pre-wrap">{summary}</div>
        </motion.div>
      )} */}
    </SectionWrapper>
  );
};


export default Testimonials;
