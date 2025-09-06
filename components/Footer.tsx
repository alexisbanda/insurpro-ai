
import React from 'react';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <Shield size={24}/> <span>InsurePro</span>
          </h3>
          <p className="mt-4 text-gray-400">Tu socio de confianza en protección y tranquilidad.</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Enlaces Rápidos</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#how-it-works" className="text-gray-400 hover:text-white">Cómo Funciona</a></li>
            <li><a href="#solutions" className="text-gray-400 hover:text-white">Soluciones</a></li>
            <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonios</a></li>
            <li><a href="#faq" className="text-gray-400 hover:text-white">FAQ con IA</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Legal</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Términos de Servicio</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Contacto</h4>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li className="flex items-center"><Mail className="mr-2" size={16}/> hola@insurepro.com</li>
            <li className="flex items-center"><Phone className="mr-2" size={16}/> (555) 123-4567</li>
            <li className="flex items-center"><MapPin className="mr-2" size={16}/> 123 Calle del Seguro, Anytown</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} InsurePro. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
