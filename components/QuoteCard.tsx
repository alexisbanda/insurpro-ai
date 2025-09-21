import React, { useState } from 'react';
import { ShieldCheck, Zap } from 'lucide-react';
import ContactModal from './ContactModal';

interface QuoteCardProps {
  quote: {
    company: string;
    product: string;
    premium: string;
  };
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const premiumValue = parseFloat(quote.premium) || 0;

  return (
    <>
      <div className="group relative p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{quote.company}</h3>
            <p className="text-sm text-gray-500 mt-1">{quote.product}</p>
          </div>
          <div className="flex justify-center items-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full">
            <ShieldCheck size={24} />
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm text-gray-600">Prima Mensual</p>
          <p className="text-3xl font-bold text-gray-900">${premiumValue.toFixed(2)}</p>
        </div>
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          >
            <Zap className="mr-2" size={16} /> Contratar Ahora
          </button>
        </div>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} quote={quote} />
    </>
  );
};

export default QuoteCard;
