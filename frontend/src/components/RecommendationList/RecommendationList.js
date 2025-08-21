import React from 'react';

function RecommendationList({ recommendations, selectedPreferences = [], selectedFeatures = [] }) {
  const isPreferenceSelected = (preference) => {
    return selectedPreferences.includes(preference);
  };

  const isFeatureSelected = (feature) => {
    return selectedFeatures.includes(feature);
  };

  return (
    <div className="space-y-4">
      {!recommendations || recommendations.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Nenhuma recomendação encontrada
          </h3>
          <p className="text-gray-500 leading-relaxed">
            Selecione suas preferências e funcionalidades para receber recomendações personalizadas dos produtos RD Station.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-bold text-green-800">
                    {recommendations.length} produto{recommendations.length !== 1 ? 's' : ''} encontrado{recommendations.length !== 1 ? 's' : ''}
                  </h3>
                  <p className="text-sm text-green-600">
                    Ordenados por relevância para suas necessidades
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {recommendations.length}
                </div>
                <div className="text-xs text-green-500 uppercase tracking-wide">
                  Resultados
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div
                key={recommendation.id || index}
                className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {recommendation.name}
                        </h3>
                        <p className="text-sm text-blue-600 font-medium">
                          {recommendation.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                        Ranking
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 flex items-center">
                      <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center mr-2 text-xs text-blue-600">⚡</span>
                      Preferências atendidas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.preferences.map((pref, prefIndex) => {
                        const isSelected = isPreferenceSelected(pref);
                        return (
                          <span
                            key={prefIndex}
                            className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${isSelected
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transform scale-105'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              }`}
                          >
                            {pref}
                            {isSelected && (
                              <span className="ml-2 text-xs">✓</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 flex items-center">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2 text-xs text-green-600">🔧</span>
                      Funcionalidades incluídas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.features.map((feature, featureIndex) => {
                        const isSelected = isFeatureSelected(feature);
                        return (
                          <span
                            key={featureIndex}
                            className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-200 ${isSelected
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md transform scale-105'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                          >
                            {feature}
                            {isSelected && (
                              <span className="ml-2 text-xs">✓</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendationList;
