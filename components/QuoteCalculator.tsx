import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import QuoteCard from './QuoteCard';
import { Loader2, AlertTriangle, Calendar, User, DollarSign, Repeat, Package, MapPin } from 'lucide-react';

// Definimos el tipo para los datos del formulario y la cotización
interface FormData {
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  faceAmount: number;
  paymentMode: 'MONTHLY' | 'ANNUAL';
  product_item: number;
  locations: number;
}

interface ApiQuote {
  record_set_data: {
    company: string;
    product: string;
    premium: string;
  };
}

const QuoteCalculator: React.FC = () => {
  const productos = [
    { id: 0, name: '1 Year Term' },
    { id: 1, name: '5 Year Term' },
    { id: 2, name: '10 Year Term' },
    { id: 3, name: '15 Year Term' },
    { id: 4, name: '20 Year Term' },
    { id: 5, name: '25 Year Term' },
    { id: 6, name: '30 Year Term' },
    { id: 7, name: '35 Year Term' },
    { id: 8, name: '40 Year Term' },
    { id: 9, name: 'Level Term to 65' },
    { id: 10, name: 'Level Term to 70' },
    { id: 11, name: 'Level Term to 75' },
    { id: 12, name: 'Special term' },
    { id: 13, name: 'All Products' }
  ];

  const provincias = [
    { id: 0, name: 'British Columbia' },
    { id: 1, name: 'Alberta' },
    { id: 2, name: 'Saskatchewan' },
    { id: 3, name: 'Northwest Territories' },
    { id: 4, name: 'Yukon' },
    { id: 5, name: 'Nunavut' },
    { id: 6, name: 'Manitoba' },
    { id: 7, name: 'Ontario' },
    { id: 8, name: 'Quebec' },
    { id: 9, name: 'Nova Scotia' },
    { id: 10, name: 'New Brunswick' },
    { id: 11, name: 'Prince Edward Island' },
    { id: 12, name: 'Newfoundland Labrador' },
  ];

  const montos = [
    { value: 25000, label: '25,000' },
    { value: 30000, label: '30,000' },
    { value: 35000, label: '35,000' },
    { value: 40000, label: '40,000' },
    { value: 45000, label: '45,000' },
    { value: 50000, label: '50,000' },
    { value: 55000, label: '55,000' },
    { value: 60000, label: '60,000' },
    { value: 65000, label: '65,000' },
    { value: 70000, label: '70,000' },
    { value: 75000, label: '75,000' },
    { value: 80000, label: '80,000' },
    { value: 85000, label: '85,000' },
    { value: 90000, label: '90,000' },
    { value: 95000, label: '95,000' },
    { value: 100000, label: '100,000' },
    { value: 125000, label: '125,000' },
    { value: 150000, label: '150,000' },
    { value: 175000, label: '175,000' },
    { value: 200000, label: '200,000' },
    { value: 225000, label: '225,000' },
    { value: 250000, label: '250,000' },
    { value: 275000, label: '275,000' },
    { value: 300000, label: '300,000' },
    { value: 325000, label: '325,000' },
    { value: 350000, label: '350,000' },
    { value: 375000, label: '375,000' },
    { value: 400000, label: '400,000' },
    { value: 425000, label: '425,000' },
    { value: 450000, label: '450,000' },
    { value: 475000, label: '475,000' },
    { value: 500000, label: '500,000' },
    { value: 550000, label: '550,000' },
    { value: 600000, label: '600,000' },
    { value: 650000, label: '650,000' },
    { value: 700000, label: '700,000' },
    { value: 750000, label: '750,000' },
    { value: 800000, label: '800,000' },
    { value: 850000, label: '850,000' },
    { value: 900000, label: '900,000' },
    { value: 950000, label: '950,000' },
    { value: 1000000, label: '1,000,000' },
    { value: 1250000, label: '1,250,000' },
    { value: 1500000, label: '1,500,000' },
    { value: 1750000, label: '1,750,000' },
    { value: 2000000, label: '2,000,000' },
    { value: 2250000, label: '2,250,000' },
    { value: 2500000, label: '2,500,000' },
    { value: 2750000, label: '2,750,000' },
    { value: 3000000, label: '3,000,000' },
    { value: 3500000, label: '3,500,000' },
    { value: 4000000, label: '4,000,000' },
    { value: 4500000, label: '4,500,000' },
    { value: 5000000, label: '5,000,000' },
    { value: 6000000, label: '6,000,000' },
    { value: 7000000, label: '7,000,000' },
    { value: 8000000, label: '8,000,000' },
    { value: 9000000, label: '9,000,000' },
    { value: 10000000, label: '10,000,000' },
    { value: 11000000, label: '11,000,000' },
    { value: 12000000, label: '12,000,000' },
    { value: 13000000, label: '13,000,000' },
    { value: 14000000, label: '14,000,000' },
    { value: 15000000, label: '15,000,000' },
    { value: 16000000, label: '16,000,000' },
    { value: 17000000, label: '17,000,000' },
    { value: 18000000, label: '18,000,000' },
    { value: 19000000, label: '19,000,000' },
    { value: 20000000, label: '20,000,000' },
    { value: 21000000, label: '21,000,000' },
    { value: 22000000, label: '22,000,000' },
    { value: 23000000, label: '23,000,000' },
    { value: 24000000, label: '24,000,000' },
    { value: 25000000, label: '25,000,000' },
    { value: 26000000, label: '26,000,000' },
    { value: 27000000, label: '27,000,000' },
    { value: 28000000, label: '28,000,000' },
    { value: 29000000, label: '29,000,000' },
    { value: 30000000, label: '30,000,000' }
  ];

  const [formData, setFormData] = useState<FormData>({
    dateOfBirth: '1990-01-01',
    gender: 'MALE',
    faceAmount: 500000,
    paymentMode: 'MONTHLY',
    product_item: 8,
    locations: 7, // Default to Ontario
  });
  const [quotes, setQuotes] = useState<ApiQuote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: (name === 'faceAmount' || name === 'product_item' || name === 'locations') ? Number(value) : value }));
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

      <div className="max-w-6xl mx-auto mt-12">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 items-end p-8 bg-white rounded-2xl shadow-lg">
          
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
              {montos.map(m => <option key={m.value} value={m.value}>${m.label}</option>)}
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
            <label htmlFor="product_item" className="flex items-center text-sm font-medium text-gray-700 mb-1"><Package size={14} className="mr-1"/> Producto</label>
            <select name="product_item" id="product_item" value={formData.product_item} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              {productos.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="lg:col-span-1">
            <label htmlFor="locations" className="flex items-center text-sm font-medium text-gray-700 mb-1"><MapPin size={14} className="mr-1"/> Provincia</label>
            <select name="locations" id="locations" value={formData.locations} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" required>
              {provincias.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
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
