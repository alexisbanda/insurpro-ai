import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LoaderCircle, Bot, MessageSquarePlus } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import { answerFaqQuestion } from '../services/geminiService';

const exampleQuestions = [
  '¿Qué es un deducible y cómo funciona?',
  '¿Cuál es la diferencia entre seguro de vida a término y total?',
  '¿Mi seguro de auto cubre un auto de alquiler?',
  '¿Cómo puedo bajar el costo de mi seguro de hogar?',
];

const AIFaq: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setQuestion(q); // Setea la pregunta en el input
    setLoading(true);
    setAnswer('');
    const result = await answerFaqQuestion(q);
    setAnswer(result);
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskQuestion(question);
  };

  return (
    <SectionWrapper id="faq" className="bg-gradient-to-b from-gray-50 via-blue-50 to-white">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Columna Izquierda: Información y ejemplos */}
        <div className="lg:mt-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight flex items-center gap-4">
            <Sparkles className="text-blue-500 w-10 h-10" />
            <span>Pregúntale a Nuestro Experto IA</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            ¿Tienes dudas sobre seguros? Obtén respuestas claras y al instante. Nuestro asistente está entrenado para resolver tus preguntas, desde las más básicas hasta las más complejas.
          </p>
          <div className="mt-10 space-y-3">
            <h4 className="font-semibold text-gray-700">O prueba con estas preguntas:</h4>
            {exampleQuestions.map((q, i) => (
              <motion.button
                key={i}
                onClick={() => handleAskQuestion(q)}
                className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-blue-100/50 hover:text-blue-700 transition-all"
                whileHover={{ x: 5 }}
              >
                <MessageSquarePlus className="w-5 h-5 flex-shrink-0 text-blue-500" />
                <span>{q}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Formulario y respuesta */}
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-grow px-5 py-4 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="bg-blue-600 text-white px-7 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-blue-300 transform hover:-translate-y-0.5"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <Sparkles />}
              <span className="ml-2">{loading ? 'Analizando...' : 'Preguntar'}</span>
            </button>
          </form>

          <AnimatePresence>
            {(loading || answer) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-blue-600 p-2.5 rounded-full text-white shadow-md">
                    <Bot size={24} />
                  </div>
                  <div className="flex-grow bg-gray-100 p-4 rounded-xl">
                    {loading ? (
                      <div className="flex items-center text-gray-600">
                        <LoaderCircle className="animate-spin mr-3" />
                        <span>Estoy analizando tu pregunta...</span>
                      </div>
                    ) : (
                      <p className="text-gray-800 whitespace-pre-wrap font-medium leading-relaxed">{answer}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AIFaq;