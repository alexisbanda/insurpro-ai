
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, Menu, X } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { name: 'Cómo Funciona', href: '#how-it-works' },
  { name: 'Soluciones', href: '#solutions' },
  { name: 'Testimonios', href: '#testimonials' },
  { name: 'FAQ con IA', href: '#faq' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <Shield size={28} />
            <span>Diego Vinueza</span>
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 font-medium flex items-center space-x-2">
              <Phone size={18} />
              <span>(555) 123-4567</span>
            </a>
            <a href="#quote" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Obtener Cotización
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-blue-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  {link.name}
                </a>
              ))}
              <a href="#quote" onClick={() => setIsOpen(false)} className="block w-full text-left bg-blue-600 text-white mt-2 px-4 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300">
                Obtener Cotización
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
