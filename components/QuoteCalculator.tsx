import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import QuoteCard from './QuoteCard';
import { Loader2, AlertTriangle, Calendar, User, DollarSign, Repeat } from 'lucide-react';

// Definimos el tipo para los datos del formulario y la cotización
interface FormData {
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  faceAmount: number;
  paymentMode: 'MONTHLY' | 'ANNUAL';
}

interface ApiQuote {
  record_set_data: {
    company: string;
    product: string;
    premium: string;
  };
}

const QuoteCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    dateOfBirth: '1990-01-01',
    gender: 'MALE',
    faceAmount: 500000,
    paymentMode: 'MONTHLY',
  });
  const [quotes, setQuotes] = useState<ApiQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'faceAmount' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setQuotes([]);

    try {
      const response = await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocurrió un error al buscar cotizaciones.');
      }

      const data: ApiQuote[] = await response.json();
      
      if (data.length === 0) {
        setError('No se encontraron seguros con estas características. Intenta modificar los datos.');
      } else {
        setQuotes(data);
      }

    } catch (err: any) {
      setError(err.message || 'No se pudo conectar con el servicio. Inténtalo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper id="calculator" className="bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Cotiza tu Seguro de Vida al Instante</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Completa tus datos y obtén una comparativa de las mejores aseguradoras en segundos.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end p-8 bg-white rounded-2xl shadow-lg">
          
          <div className="lg:col-span-1">
            <label htmlFor="dateOfBirth" className="flex items-center text-sm font-medium text-gray-700 mb-1"><Calendar size={14} className="mr-1"/> Fecha de Nac.</label>
            <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required />
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="gender" className="flex items-center text-sm font-medium text-gray-700 mb-1"><User size={14} className="mr-1"/> Género</label>
            <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              <option value="MALE">Masculino</option>
              <option value="FEMALE">Femenino</option>
            </select>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="faceAmount" className="flex items-center text-sm font-medium text-gray-700 mb-1"><DollarSign size={14} className="mr-1"/> Cobertura</label>
            <select name="faceAmount" id="faceAmount" value={formData.faceAmount} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              <option value={250000}>$250,000</option>
              <option value={500000}>$500,000</option>
              <option value={750000}>$750,000</option>
              <option value={1000000}>$1,000,000</option>
            </select>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="paymentMode" className="flex items-center text-sm font-medium text-gray-700 mb-1"><Repeat size={14} className="mr-1"/> Frecuencia</label>
            <select name="paymentMode" id="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              <option value="MONTHLY">Mensual</option>
              <option value="ANNUAL">Anual</option>
            </select>
          </div>

          <div className="lg:col-span-1">
            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Cotizar'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12">
        {error && (
          <div className="max-w-4xl mx-auto p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg flex items-center">
            <AlertTriangle className="mr-3" />
            {error}
          </div>
        )}

        {quotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {quotes.map((quote, index) => (
              <QuoteCard key={index} quote={quote.record_set_data} />
            ))}
          </div>
        )}
      </div>

    </SectionWrapper>
  );
};

export default QuoteCalculator;
