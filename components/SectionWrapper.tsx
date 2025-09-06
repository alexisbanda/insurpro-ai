
import React from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className = '' }) => (
  <motion.section
    id={id}
    className={`py-16 sm:py-24 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </motion.section>
);

export default SectionWrapper;
