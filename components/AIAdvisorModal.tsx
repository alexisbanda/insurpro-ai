
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, LoaderCircle } from 'lucide-react';

interface AIAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetRecommendation: (situation: string) => Promise<string>;
}

const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({ isOpen, onClose, onGetRecommendation }) => {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');

  const handleGetRecommendation = async () => {
    if (!situation.trim()) return;
    setLoading(true);
    setRecommendation('');
    const result = await onGetRecommendation(situation);
    setRecommendation(result);
    setLoading(false);
  };

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
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Sparkles className="text-blue-500 mr-2" /> Asesor de Seguros con IA
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">Describe tu situación y nuestra IA te sugerirá el mejor tipo de seguro. Por ejemplo: "Tengo 35 años, estoy casado con dos hijos y acabo de comprar una casa nueva."</p>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Cuéntanos sobre ti..."
          />
          <button
            onClick={handleGetRecommendation}
            disabled={loading || !situation.trim()}
            className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Pensando...
              </>
            ) : (
              '✨ Obtener Recomendación'
            )}
          </button>
          {recommendation && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">Nuestra Recomendación:</h3>
              <p className="text-gray-700 whitespace-pre-wrap mt-2">{recommendation}</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAdvisorModal;
