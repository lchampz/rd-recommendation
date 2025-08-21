// Form.js

import React, { useEffect } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsUpdate, onPreferencesUpdate, onFeaturesUpdate }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations, recommendations } = useRecommendations();

  useEffect(() => {
    if (onRecommendationsUpdate) {
      onRecommendationsUpdate(recommendations);
    }
  }, [recommendations, onRecommendationsUpdate]);

  // Atualiza as preferências selecionadas no componente pai
  const handlePreferencesChange = (selected) => {
    handleChange('selectedPreferences', selected);
    if (onPreferencesUpdate) {
      onPreferencesUpdate(selected);
    }
  };

  // Atualiza as funcionalidades selecionadas no componente pai
  const handleFeaturesChange = (selected) => {
    handleChange('selectedFeatures', selected);
    if (onFeaturesUpdate) {
      onFeaturesUpdate(selected);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const oneProduct = formData.selectedRecommendationType === 'SingleProduct';
    getRecommendations(formData, products, oneProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Preferences
        preferences={preferences}
        onPreferenceChange={handlePreferencesChange}
      />
      <Features
        features={features}
        onFeatureChange={handleFeaturesChange}
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
