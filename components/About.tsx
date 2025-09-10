
import React from 'react';
import SectionWrapper from './SectionWrapper';
import { Award, Briefcase, HeartHandshake } from 'lucide-react';

const About: React.FC = () => (
  <SectionWrapper id="about" className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
      <div className="lg:col-span-1 flex justify-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop"
            alt="Diego Vinueza, Asesor de Seguros"
            className="rounded-2xl shadow-xl w-full h-auto max-w-xs mx-auto object-cover"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/400/500'; }}
          />
          <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg">
            <HeartHandshake size={32} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <p className="text-base font-semibold text-blue-600 tracking-wide uppercase">Sobre Diego Vinueza</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Tu Aliado de Confianza en Canadá</h2>
        <p className="mt-6 text-lg text-gray-600">
          Mi misión es simple: ayudar a la comunidad hispanohablante en Canadá a navegar el complejo mundo de los seguros con claridad y confianza. Como inmigrante, entiendo los desafíos y las incertidumbres que enfrentamos al construir un nuevo futuro. Por eso, me dedico a ser más que un asesor; soy un aliado que se asegura de que tú y tu familia estén protegidos.
        </p>
        <div className="mt-8 space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
              <Award size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Licencias y Certificaciones</h3>
              <p className="mt-1 text-gray-600">Asesor Financiero con licencia en Ontario, Alberta y British Columbia. Experto certificado en seguros de vida y salud.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
              <Briefcase size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Experiencia Comprobada</h3>
              <p className="mt-1 text-gray-600">Más de 10 años de experiencia ayudando a familias y empresas a encontrar la cobertura perfecta al mejor precio del mercado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default About;
