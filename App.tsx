
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Solutions from './components/Solutions';
import ExpertGuide from './components/ExpertGuide';
import Testimonials from './components/Testimonials';
import AIFaq from './components/AIFaq';
import QuoteForm from './components/QuoteForm';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 antialiased font-sans">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Solutions />
        <ExpertGuide />
        <Testimonials />
        <AIFaq />
        <QuoteForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
