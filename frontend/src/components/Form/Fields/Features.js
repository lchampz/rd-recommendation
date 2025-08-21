import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures)

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-sm font-bold">🔧</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Funcionalidades</h3>
        <span className="ml-auto text-sm text-green-600 font-medium">
          {currentFeatures.length} selecionada{currentFeatures.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="group">
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {feature}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>

      {currentFeatures.length > 0 && (
        <div className="mt-4 p-3 bg-green-100 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            🎯 Funcionalidades selecionadas: {currentFeatures.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default Features;
