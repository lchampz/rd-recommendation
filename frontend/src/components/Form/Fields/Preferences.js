// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences)

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-sm font-bold">⚡</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Preferências</h3>
        <span className="ml-auto text-sm text-blue-600 font-medium">
          {currentPreferences.length} selecionada{currentPreferences.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3">
        {preferences.map((preference, index) => (
          <div key={index} className="group">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                {preference}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>

      {currentPreferences.length > 0 && (
        <div className="mt-4 p-3 bg-blue-100 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            🎯 Preferências selecionadas: {currentPreferences.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default Preferences;
