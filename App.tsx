
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustLogos from './components/TrustLogos';
import HowItWorks from './components/HowItWorks';
import Solutions from './components/Solutions';
import ExpertGuide from './components/ExpertGuide';
import About from './components/About';
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
        <TrustLogos />
        <HowItWorks />
        <Solutions />
        <ExpertGuide />
        <About />
        <QuoteForm />
        <Testimonials />
        <AIFaq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
