
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Hero: React.FC = () => (
  <section className="relative bg-gray-50 overflow-hidden">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Seguro Inteligente, <br />
            <span className="text-blue-600">Simplificado para Ti</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0">
            Encuentra la cobertura perfecta para tu vida, hogar y auto. Hacemos que los seguros sean fáciles de entender y rápidos de adquirir.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a href="#quote" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Obtén tu Cotización Gratis
            </a>
            <a href="#solutions" className="w-full sm:w-auto text-blue-600 font-semibold text-lg hover:underline">
              Explorar Soluciones
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square">
            <img
              src="https://images.unsplash.com/photo-1579548122214-72d593c0afc6?q=80&w=2574&auto=format&fit=crop"
              alt="Familia feliz protegida por un seguro"
              className="rounded-3xl shadow-2xl object-cover w-full h-full"
              onError={(e) => { e.currentTarget.src = 'https://picsum.photos/600/600'; }}
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-lg flex items-center space-x-3">
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-800">Cobertura Asegurada</p>
                <p className="text-sm text-gray-500">Más de 10,000 clientes felices</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
