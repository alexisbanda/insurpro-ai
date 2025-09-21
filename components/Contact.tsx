
import React, { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { PopupModal } from 'react-calendly';

const Contact: React.FC = () => {
    const [calendlyLink, setCalendlyLink] = useState('');
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

    useEffect(() => {
        const fetchCalendlyLink = async () => {
            try {
                const response = await fetch('/.netlify/functions/get-calendly-link');
                const data = await response.json();
                if (data.link) {
                    setCalendlyLink(data.link);
                }
            } catch (error) {
                console.error('Error fetching Calendly link:', error);
            }
        };

        fetchCalendlyLink();
    }, []);

  return (
    <SectionWrapper id="contact" className="bg-gray-50">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Contáctanos</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Estamos aquí para ayudar. Contáctanos si tienes alguna pregunta o agenda una llamada con nuestros asesores.</p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Teléfono</h3>
          <p className="text-gray-600 mt-2">Habla con nuestro amable equipo.</p>
          <a href="tel:555-123-4567" className="text-blue-600 font-medium mt-2 inline-block hover:underline">(555) 123-4567</a>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Correo Electrónico</h3>
          <p className="text-gray-600 mt-2">Envíanos un correo para una respuesta rápida.</p>
          <a href="mailto:hola@insurepro.com" className="text-blue-600 font-medium mt-2 inline-block hover:underline">hola@insurepro.com</a>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Oficina</h3>
          <p className="text-gray-600 mt-2">Visita nuestra oficina principal.</p>
          <p className="text-blue-600 font-medium mt-2">123 Calle del Seguro, Suite 100</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Agendar Asesoría</h3>
          <p className="text-gray-600 mt-2">Agenda una llamada con un asesor.</p>
          <button
            onClick={() => setIsCalendlyOpen(true)}
            disabled={!calendlyLink}
            className="text-blue-600 font-medium mt-2 inline-block hover:underline disabled:text-gray-400 disabled:no-underline"
          >
            Agendar ahora
          </button>
        </div>
      </div>
      {calendlyLink && (
        <PopupModal
            url={calendlyLink}
            onModalClose={() => setIsCalendlyOpen(false)}
            open={isCalendlyOpen}
            rootElement={document.getElementById('root')!}
        />
      )}
    </SectionWrapper>
  );
};

export default Contact;
