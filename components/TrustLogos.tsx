import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'Manulife', domain: 'manulife.ca' },
  { name: 'Sun Life', domain: 'sunlife.ca' },
  { name: 'Canada Life', domain: 'canadalife.com' },
  { name: 'Intact Insurance', domain: 'intact.ca' },
  { name: 'Aviva', domain: 'aviva.ca' },
  { name: 'Wawanesa', domain: 'wawanesa.com' },
  { name: 'Desjardins', domain: 'desjardins.com' },
  { name: 'Co-operators', domain: 'cooperators.ca' },
];

const TrustLogos: React.FC = () => {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
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
          <div className="mt-12 relative w-full overflow-hidden">
            <div className="flex animate-infinite-scroll group-hover:pause-animation">
              {duplicatedPartners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center">
                  <img
                    src={`https://logo.clearbit.com/${partner.domain}`}
                    alt={`${partner.name} logo`}
                    className="h-10 max-w-40 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          animation: infinite-scroll 40s linear infinite;
        }
        .group-hover\:pause-animation:hover .animate-infinite-scroll {
            animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TrustLogos;