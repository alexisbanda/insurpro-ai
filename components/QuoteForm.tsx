import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const insuranceTypes = ['Vida', 'Auto', 'Viajes', 'Internacional'];

const QuoteForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    insuranceType: 'Vida',
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectType = (type: string) => {
    setFormData((prev) => ({ ...prev, insuranceType: type }));
    handleNext();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      handleNext(); // Go to success step
    }, 1500);
  };

  const totalSteps = 2; // Total data-entry steps

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key={1} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h3 className="text-2xl font-bold text-gray-800 text-center">¿Qué seguro necesitas?</h3>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {insuranceTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelectType(type)}
                  className="p-6 border-2 border-gray-300 rounded-lg text-center font-semibold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all"
                >
                  {`Seguro de ${type}`}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key={2} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h3 className="text-2xl font-bold text-gray-800 text-center">Casi listo, necesitamos tus datos</h3>
            <p className="text-center text-gray-500 mt-1">Para el seguro de <span className='font-bold'>{formData.insuranceType}</span></p>
            <div className="space-y-6 mt-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" id="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
            <motion.div key={3} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white text-center p-10 rounded-xl">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-gray-800">¡Gracias, {formData.name}!</h3>
              <p className="text-gray-600 mt-2">Hemos recibido tu solicitud. Un agente se pondrá en contacto contigo en breve a tu correo <span className='font-bold'>{formData.email}</span>.</p>
            </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <SectionWrapper id="quote" className="bg-blue-600 text-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Obtén tu Cotización Gratuita y Sin Compromiso</h2>
          <p className="mt-4 text-lg text-blue-100">
            Solo te tomará 2 minutos. Completa los pasos y uno de nuestros agentes expertos se pondrá en contacto contigo con una cotización personalizada.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          {step <= totalSteps && (
            <div className="flex items-center mb-6">
              {step > 1 && (
                <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-100 mr-4">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className="bg-blue-500 h-2.5 rounded-full"
                  initial={{ width: '0%'}}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 font-semibold ml-4">Paso {step}/{totalSteps}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
            {step === 2 && (
              <div className="mt-8">
                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400">
                  {isSubmitting ? 'Enviando...' : 'Obtener Mi Cotización'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default QuoteForm;