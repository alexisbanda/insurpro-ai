
import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  'Manulife',
  'Sun Life',
  'Canada Life',
  'Intact Insurance',
  'Aviva',
  'Wawanesa'
];

const TrustLogos: React.FC = () => {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-center text-base font-semibold text-gray-600 tracking-wider">
            Trabajamos con las aseguradoras líderes y de mayor confianza en Canadá
          </h2>
          <div className="mt-8 flow-root">
            <div className="-my-4 divide-y divide-gray-200">
              <div className="py-8">
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                  {partners.map((partnerName) => (
                    <div key={partnerName} className="flex items-center justify-center">
                      <p className="text-2xl font-bold text-gray-400 filter grayscale hover:grayscale-0 transition-all duration-300">
                        {partnerName}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustLogos;
