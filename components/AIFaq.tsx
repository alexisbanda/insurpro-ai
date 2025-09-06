
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LoaderCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { answerFaqQuestion } from '../services/geminiService';

const AIFaq: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');
    const result = await answerFaqQuestion(question);
    setAnswer(result);
    setLoading(false);
  }, [question]);

  return (
    <SectionWrapper id="faq" className="bg-white">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center justify-center">
          <Sparkles className="text-blue-500 mr-3" /> FAQ con IA
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">¿Tienes una pregunta sobre seguros? ¡Pregúntale lo que sea a nuestro asistente de IA!</p>
      </div>
      <div className="mt-12 max-w-3xl mx-auto">
        <form onSubmit={handleAskQuestion} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ej: ¿Qué es un deducible?"
            className="flex-grow px-5 py-4 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Preguntando...
              </>
            ) : (
              'Preguntar a la IA'
            )}
          </button>
        </form>
        <AnimatePresence>
          {answer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200"
            >
              <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

export default AIFaq;
