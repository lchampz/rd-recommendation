import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleRecommendationsUpdate = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  const handlePreferencesUpdate = (newPreferences) => {
    setSelectedPreferences(newPreferences);
  };

  const handleFeaturesUpdate = (newFeatures) => {
    setSelectedFeatures(newFeatures);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            🚀 Recomendador de Produtos RD Station
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Descubra os produtos perfeitos para impulsionar seu negócio com inteligência artificial e automação
          </p>
        </div>
      </div>

      {/* Container principal */}
      <div className="container mx-auto px-6 py-12">
        {/* Card de introdução */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Como funciona?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Selecione suas preferências e funcionalidades desejadas no formulário ao lado.
              Nosso sistema inteligente analisará suas necessidades e recomendará os produtos
              RD Station que melhor se adequam ao seu negócio, desde CRM até Inteligência Artificial.
            </p>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-fit sticky top-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-lg">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Suas Preferências</h2>
              </div>
              <Form
                onRecommendationsUpdate={handleRecommendationsUpdate}
                onPreferencesUpdate={handlePreferencesUpdate}
                onFeaturesUpdate={handleFeaturesUpdate}
              />
            </div>
          </div>

          {/* Lista de recomendações */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-lg">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Recomendações</h2>
              </div>
              <RecommendationList
                recommendations={recommendations}
                selectedPreferences={selectedPreferences}
                selectedFeatures={selectedFeatures}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Powered by RD Station • Desenvolvido com ❤️ para otimizar sua experiência
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
