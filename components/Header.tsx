import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Sparkles, HelpCircle } from 'lucide-react';
import { NavLink } from '../types';

const navLinks: NavLink[] = [
  { name: 'Soluciones', href: '#solutions' },
  { name: 'Cómo Funciona', href: '#how-it-works' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Testimonios', href: '#testimonials' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-transparent'}`;
  const linkColorClasses = scrolled ? 'text-gray-700' : 'text-white';
  const logoClasses = `transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`;

  const NavLinkItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className={`relative font-medium transition-colors duration-300 group ${linkColorClasses}`}>
      {children}
      <span className={`absolute bottom-[-4px] left-0 h-0.5 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 ease-in-out`}></span>
    </a>
  );

  return (
    <>
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 30px 8px rgba(59, 130, 246, 0.7);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s linear infinite;
        }
      `}</style>
      <header className={headerClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.a 
              href="#" 
              className="flex items-center space-x-2 text-2xl font-bold text-blue-600"
              whileHover={{ scale: 1.05 }}
            >
              <Shield size={28} />
              <span className={logoClasses}>InsurePro AI</span>
            </motion.a>
            
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLinkItem key={link.name} href={link.href}>{link.name}</NavLinkItem>
              ))}
              <NavLinkItem href="#faq">
                <span className="flex items-center gap-1.5">
                  <HelpCircle size={18} />
                  <span>FAQ con IA</span>
                </span>
              </NavLinkItem>
            </nav>

            <div className="hidden md:flex items-center">
              <motion.a 
                href="#quote" 
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 animate-pulse-glow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={20} />
                Cotización Inteligente
              </motion.a>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className={`${linkColorClasses} z-10`}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-0 left-0 right-0 pt-20 bg-white shadow-lg"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {[...navLinks, { name: 'FAQ con IA', href: '#faq' }].map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    {link.name}
                  </a>
                ))}
                <a href="#quote" onClick={() => setIsOpen(false)} className="block w-full text-center bg-blue-600 text-white mt-4 px-4 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2">
                  <Sparkles size={20} />
                  Cotización Inteligente
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
