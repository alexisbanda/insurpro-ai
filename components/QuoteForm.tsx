import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { CheckCircle, ArrowLeft, Sparkles, MessageSquare, User, Mail, Bot, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Estructura de la respuesta de la IA (debe coincidir con la Netlify Function)
interface AIRecommendation {
  identified_insurance_type: string;
  summary: string;
  recommendation_title: string;
  recommendation_details: string;
  missing_info_prompt: string;
  next_step_cta: string;
}

// Definición del flujo del asistente interactivo
const wizardFlow = {
  start: {
    id: 'insuranceType',
    question: 'Hola! Para empezar, ¿qué quieres proteger?',
    icon: <Sparkles size={24} className="text-blue-500" />,
    options: [
      { text: 'Mi auto', value: 'un seguro de auto', next: 'vehicleType' },
      { text: 'Mi familia', value: 'un seguro de vida para mi familia', next: 'lifeStage' },
      { text: 'Mi casa', value: 'un seguro para mi hogar', next: 'propertyType' },
      { text: 'Mi salud', value: 'un seguro de gastos médicos', next: 'healthCoverage' },
    ],
  },
  vehicleType: {
    id: 'vehicleType',
    question: '¿Qué tipo de vehículo conduces?',
    options: [
      { text: 'Sedán / Hatchback', value: 'que es un sedán o hatchback', next: 'vehicleYear' },
      { text: 'SUV', value: 'que es un SUV', next: 'vehicleYear' },
      { text: 'Camioneta / Pick-up', value: 'que es una camioneta o pick-up', next: 'vehicleYear' },
      { text: 'Deportivo o de Lujo', value: 'que es un auto deportivo o de lujo', next: 'vehicleYear' },
    ],
  },
  vehicleYear: {
    id: 'vehicleYear',
    question: '¿De qué año es aproximadamente?',
    options: [
      { text: 'Nuevo (0-2 años)', value: 'casi nuevo (0-2 años)', next: 'vehicleUsage' },
      { text: 'Reciente (3-7 años)', value: 'reciente (3-7 años)', next: 'vehicleUsage' },
      { text: 'Antiguo (+7 años)', value: 'con más de 7 años', next: 'vehicleUsage' },
    ],
  },
  vehicleUsage: {
    id: 'vehicleUsage',
    question: '¿Cuál es su uso principal?',
    options: [
      { text: 'Personal', value: 'para uso personal', next: 'driverHistory' },
      { text: 'Ir al trabajo', value: 'para ir y volver del trabajo', next: 'driverHistory' },
      { text: 'Comercial', value: 'para uso comercial', next: 'driverHistory' },
    ],
  },
  driverHistory: {
    id: 'driverHistory',
    question: '¿Cómo es tu historial de manejo?',
    options: [
      { text: 'Excelente, sin incidentes', value: 'y tengo un historial de manejo excelente.' },
      { text: 'Bueno, con 1-2 incidentes menores', value: 'y tengo un buen historial, con solo un par de incidentes menores.' },
      { text: 'Regular, con varios incidentes', value: 'y tengo un historial con algunos incidentes.' },
    ],
  },
  lifeStage: {
    id: 'lifeStage',
    question: '¿En qué etapa de la vida te encuentras?',
    options: [
      { text: 'Soltero, iniciando mi carrera', value: 'soy soltero y estoy empezando mi carrera', next: 'lifeGoal' },
      { text: 'En pareja y/o con hijos', value: 'estoy en pareja y/o tengo hijos', next: 'lifeGoal' },
      { text: 'Cerca del retiro', value: 'estoy pensando en mi retiro', next: 'lifeGoal' },
    ],
  },
  lifeGoal: {
    id: 'lifeGoal',
    question: '¿Cuál es tu principal objetivo?',
    options: [
      { text: 'Proteger los ingresos de mi familia', value: 'mi objetivo es proteger los ingresos de mi familia si falto.' },
      { text: 'Dejar una herencia o pagar deudas', value: 'quiero asegurarme de dejar una herencia y cubrir deudas.' },
      { text: 'Ahorrar y tener protección', value: 'busco una opción que combine ahorro y protección.' },
    ],
  },
  propertyType: {
    id: 'propertyType',
    question: '¿Qué tipo de propiedad quieres asegurar?',
    options: [
      { text: 'Casa', value: 'quiero asegurar una casa', next: 'propertyOwnership' },
      { text: 'Departamento', value: 'quiero asegurar un departamento', next: 'propertyOwnership' },
    ],
  },
  propertyOwnership: {
    id: 'propertyOwnership',
    question: '¿La propiedad es tuya o la rentas?',
    options: [
      { text: 'Es propia', value: 'la cual es de mi propiedad', next: 'propertyGoal' },
      { text: 'Es rentada', value: 'la cual rento', next: 'propertyGoal' },
    ],
  },
  propertyGoal: {
    id: 'propertyGoal',
    question: '¿Qué es lo más importante para ti?',
    options: [
      { text: 'Proteger la estructura', value: 'y mi prioridad es proteger la estructura del inmueble.' },
      { text: 'Proteger mis pertenencias', value: 'y mi prioridad es proteger mis pertenencias.' },
      { text: 'Ambas, estructura y pertenencias', value: 'y quiero una cobertura completa para la estructura y mis pertenencias.' },
    ],
  },
  healthCoverage: {
    id: 'healthCoverage',
    question: '¿Para quién es el seguro?',
    options: [
      { text: 'Solo para mí', value: 'es solo para mí', next: 'healthNeeds' },
      { text: 'Para mí y mi pareja', value: 'es para mí y mi pareja', next: 'healthNeeds' },
      { text: 'Para toda mi familia', value: 'es para toda mi familia, incluyendo hijos', next: 'healthNeeds' },
    ],
  },
  healthNeeds: {
    id: 'healthNeeds',
    question: '¿Cuál es tu necesidad principal?',
    options: [
      { text: 'Cobertura para emergencias', value: 'y busco una cobertura esencial para emergencias y consultas.' },
      { text: 'Cobertura amplia (hospitalización)', value: 'y necesito una cobertura amplia que incluya hospitalización y especialistas.' },
      { text: 'Cobertura completa con extras', value: 'y quiero una cobertura completa con beneficios adicionales.' },
    ],
  },
};

type WizardStep = keyof typeof wizardFlow;

const QuoteForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [wizardStep, setWizardStep] = useState<WizardStep>('start');
  const [wizardHistory, setWizardHistory] = useState<WizardStep[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isWizardFinished, setIsWizardFinished] = useState(false);
  const [userSituation, setUserSituation] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => prev + 1);
  
  const handlePrev = () => {
    if (step === 2) {
      handleWizardReset();
    }
    setStep((prev) => prev - 1);
  };

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleWizardSelect = (answer: string, nextStep: WizardStep | undefined) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setWizardHistory([...wizardHistory, wizardStep]);

    if (nextStep && wizardFlow[nextStep]) {
      setWizardStep(nextStep);
    } else {
      const finalSituation = "Busco " + newAnswers.join(', ') + '.';
      setUserSituation(finalSituation);
      setIsWizardFinished(true);
    }
  };

  const handleWizardBack = () => {
    if (wizardHistory.length > 0) {
      const lastStep = wizardHistory[wizardHistory.length - 1];
      setWizardHistory(wizardHistory.slice(0, -1));
      setAnswers(answers.slice(0, -1));
      setWizardStep(lastStep);
      setIsWizardFinished(false);
    }
  };
  
  const handleWizardReset = () => {
    setWizardStep('start');
    setWizardHistory([]);
    setAnswers([]);
    setIsWizardFinished(false);
    setUserSituation('');
    setError(null);
  };

  const handleIntelligentQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userSituation.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Simular un poco de retraso para que la animación sea visible
      await new Promise(resolve => setTimeout(resolve, 1500));

      const response = await fetch('/.netlify/functions/get-intelligent-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userSituation }),
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al obtener tu recomendación. Inténtalo de nuevo.');
      }

      const data: AIRecommendation = await response.json();
      setRecommendation(data);
      handleNext();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      handleNext();
    }, 1000);
  };

  const stepTitles: { [key: number]: string } = {
    1: 'Análisis de Necesidades',
    2: 'Datos de Contacto',
  };

  let progressPercentage = 0;
  const totalWizardSteps = 4; // Estimación de pasos en el asistente

  if (step === 1) {
    progressPercentage = (wizardHistory.length / totalWizardSteps) * 50;
    if (isWizardFinished) {
      progressPercentage = 50;
    }
  } else if (step === 2) {
    progressPercentage = 100;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        const currentWizardData = wizardFlow[wizardStep];

        if (isWizardFinished) {
          if (isSubmitting) {
            return (
              <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <Bot size={48} className="text-blue-500 animate-bounce mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800 mt-4">Analizando tus respuestas...</h3>
                <p className="text-gray-500 mt-2">Nuestra IA está procesando tu información para darte la mejor recomendación.</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-8 overflow-hidden">
                  <motion.div
                    className="bg-blue-500 h-1.5 rounded-full"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div key="summary" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="text-center">
                <Bot size={32} className="mx-auto text-blue-500 mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">¡Perfecto! Revisa tu información.</h3>
                <p className="text-gray-500 mt-2 mb-6">Este es el resumen que nuestra IA analizará.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-gray-700 text-left my-4 border border-gray-200">
                <p className="font-medium text-gray-900">Tu necesidad:</p>
                <p className="mt-1">{userSituation}</p>
              </div>
              <button onClick={handleWizardReset} className="flex items-center justify-center text-sm text-gray-500 hover:text-gray-800 transition-colors w-full mb-4">
                <RefreshCcw size={14} className="mr-2" /> Volver a empezar
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <div className="mt-2">
                <button type="submit" disabled={isSubmitting || !userSituation.trim()} className="w-full bg-blue-600 text-white px-6 py-4 rounded-md font-semibold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-400 flex items-center justify-center">
                  <Sparkles className="mr-2" size={20}/> {isSubmitting ? 'Analizando...' : 'Obtener Recomendación IA'}
                </button>
              </div>
            </motion.div>
          )
        }

        return (
          <motion.div key={wizardStep} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="transition-all duration-300">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3">
                {currentWizardData.icon || <Bot size={24} className="text-blue-500" />}
                <h3 className="text-2xl font-bold text-gray-800">{currentWizardData.question}</h3>
              </div>
              <p className="text-gray-500 mt-2">Selecciona una opción para continuar.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentWizardData.options.map((option) => (
                <motion.button
                  key={option.text}
                  onClick={() => handleWizardSelect(option.value, option.next as WizardStep | undefined)}
                  className="w-full text-left p-4 rounded-lg font-semibold transition-all duration-200 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
            {wizardHistory.length > 0 && (
              <div className="mt-6 text-center">
                <button onClick={handleWizardBack} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                  &larr; Volver
                </button>
              </div>
            )}
          </motion.div>
        );
      case 2:
        if (!recommendation) return null;
        return (
          <motion.div key={2} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-900 text-lg">{recommendation.recommendation_title}</h4>
              <p className="text-blue-800 mt-2">{recommendation.recommendation_details}</p>
              <p className="text-sm text-blue-700 mt-3 font-medium"><em>{recommendation.missing_info_prompt}</em></p>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 text-center mt-8">¡Excelente! Estás a un paso.</h3>
            <p className="text-center text-gray-500 mt-1">Completa tus datos para que un experto revise tu caso.</p>
            <div className="space-y-4 mt-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                  <input type="text" id="name" required value={userInfo.name} onChange={handleUserInfoChange} className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                  <input type="email" id="email" required value={userInfo.email} onChange={handleUserInfoChange} className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
            </div>
             <div className="mt-6">
              <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white px-6 py-4 rounded-md font-semibold text-lg hover:bg-green-700 transition-all duration-300 disabled:bg-green-400">
                {isSubmitting ? 'Enviando...' : recommendation.next_step_cta}
              </button>
            </div>
          </motion.div>
        );
      case 3:
        return (
            <motion.div key={3} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-10">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4"/>
              <h3 className="text-2xl font-bold text-gray-800">¡Gracias, {userInfo.name}!</h3>
              <p className="text-gray-600 mt-2">Tu recomendación ha sido guardada. Un agente experto se pondrá en contacto contigo en breve a tu correo <span className='font-bold'>{userInfo.email}</span> para afinar los detalles.</p>
            </motion.div>
        );
      default:
        return null;
    }
  };

  const formSubmitHandler = step === 1 ? handleIntelligentQuote : handleFinalSubmit;

  return (
    <SectionWrapper id="quote" className="bg-gray-50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className='text-left'>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">Tu Cotización Inteligente en Segundos</h2>
          <p className="mt-6 text-lg text-gray-600">
            Olvida los formularios largos. Responde unas pocas preguntas y deja que nuestra IA te dé una recomendación personalizada al instante.
          </p>
          <div className='mt-8 text-gray-700 space-y-4'>
             <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-600 text-white rounded-full p-2">
                    <MessageSquare size={20} />
                </div>
                <div className="ml-4">
                    <h4 className="text-lg font-semibold">1. Responde al asistente</h4>
                    <p className="text-gray-600">Nuestra IA te guiará con preguntas clave.</p>
                </div>
            </div>
             <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-600 text-white rounded-full p-2">
                    <Sparkles size={20} />
                </div>
                <div className="ml-4">
                    <h4 className="text-lg font-semibold">2. Recibe tu recomendación</h4>
                    <p className="text-gray-600">Obtén un punto de partida claro y ajustado a ti.</p>
                </div>
            </div>
             <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-600 text-white rounded-full p-2">
                    <User size={20} />
                </div>
                <div className="ml-4">
                    <h4 className="text-lg font-semibold">3. Conecta con un experto</h4>
                    <p className="text-gray-600">Un asesor humano finalizará tu cotización perfecta.</p>
                </div>
            </div>
          </div>
        </div>
        <div className={`bg-white p-8 rounded-2xl shadow-2xl min-h-[520px] flex flex-col justify-center transition-all duration-500 ${isSubmitting ? 'shadow-blue-500/30 shadow-[-5px_5px_60px_10px,5px_-5px_60px_10px]' : ''}`}>
          {step < 3 && (
            <div className="flex items-center mb-6">
              {step > 1 && (
                <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-100 mr-4 transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <motion.div 
                  className="bg-blue-500 h-2.5 rounded-full"
                  initial={{ width: '0%'}}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-gray-600 font-semibold ml-4 whitespace-nowrap">
                {stepTitles[step]}
              </span>
            </div>
          )}

          <form onSubmit={formSubmitHandler}>
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default QuoteForm;