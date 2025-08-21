import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-sm font-bold">🎯</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Tipo de Recomendação</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            onChange={() => onRecommendationTypeChange('SingleProduct')}
            className="text-purple-600"
          />
          <label htmlFor="SingleProduct" className="ml-3 text-gray-700 font-medium cursor-pointer">
            🎯 Produto Único
          </label>
        </div>

        <div className="flex items-center p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-300 transition-colors">
          <Checkbox
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
            className="text-purple-600"
          />
          <label htmlFor="MultipleProducts" className="ml-3 text-gray-700 font-medium cursor-pointer">
            📋 Múltiplos Produtos
          </label>
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-100 rounded-lg">
        <p className="text-sm text-purple-800">
          💡 Escolha se deseja receber uma recomendação específica ou uma lista completa de opções
        </p>
      </div>
    </div>
  );
}

export default RecommendationType;
