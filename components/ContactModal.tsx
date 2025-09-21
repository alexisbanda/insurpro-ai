import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

interface QuoteData {
  company: string;
  product: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: QuoteData;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, quote }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Solicitar Contratación</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            Estás a un paso de asegurar tu futuro con <span className="font-bold">{quote.company} - {quote.product}</span>. Un asesor se pondrá en contacto contigo a la brevedad.
          </p>
          
          <form name="contact" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="company" value={quote.company} />
            <input type="hidden" name="product" value={quote.product} />

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="tel" name="phone" id="phone" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                <Send className="mr-2" size={18} />
                Enviar Solicitud
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
