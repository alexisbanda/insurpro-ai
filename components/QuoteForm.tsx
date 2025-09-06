
import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { CheckCircle } from 'lucide-react';

type Status = '' | 'submitting' | 'success';

const QuoteForm: React.FC = () => {
  const [status, setStatus] = useState<Status>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <SectionWrapper id="quote" className="bg-blue-600 text-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Obtén tu Cotización Gratuita y Sin Compromiso Hoy</h2>
          <p className="mt-4 text-lg text-blue-100">
            Completa el formulario y uno de nuestros agentes expertos se pondrá en contacto contigo con una cotización de seguro personalizada diseñada para satisfacer tus necesidades y presupuesto.
          </p>
        </div>
        <div>
          {status === 'success' ? (
            <div className="bg-white text-center p-10 rounded-xl shadow-2xl">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-gray-800">¡Gracias!</h3>
              <p className="text-gray-600 mt-2">Hemos recibido tu solicitud de cotización. Un agente se pondrá en contacto contigo en breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 text-center">Solicitar una Cotización</h3>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
              </div>
              <div>
                <label htmlFor="insurance-type" className="block text-sm font-medium text-gray-700">Tipo de Seguro</label>
                <select id="insurance-type" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900">
                  <option>Seguro de Vida</option>
                  <option>Seguro de Hogar</option>
                  <option>Seguro de Auto</option>
                  <option>Seguro de Negocios</option>
                </select>
              </div>
              <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400">
                {status === 'submitting' ? 'Enviando...' : 'Obtener Mi Cotización'}
              </button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default QuoteForm;
