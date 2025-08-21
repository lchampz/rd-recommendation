// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData, products, oneProduct = false) => {
    if (!products || products.length === 0) {
      console.warn('Nenhum produto disponível para gerar recomendações');
      setRecommendations([]);
      return [];
    }

    const dataRecommendations = recommendationService.getRecommendations(formData, products, oneProduct);
    setRecommendations(dataRecommendations);
    return dataRecommendations;
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
