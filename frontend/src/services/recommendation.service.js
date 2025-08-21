const getScorePoints = (product, selectedPreferences, selectedFeatures) => {
  let score = 0;
  product.preferences.forEach((preference) =>
    selectedPreferences.includes(preference) ? (score += 1) : 0
  );
  product.features.forEach((feature) =>
    selectedFeatures.includes(feature) ? (score += 1) : 0
  );
  return score;
};
const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products = [{ id: 0, preferences: [], features: [], name: '' }],
  oneProduct = false
) => {
  const { selectedPreferences, selectedFeatures } = formData;

  let recommendation = products.filter((product) => {
    const hasPreference = product.preferences.some((preference) =>
      selectedPreferences.includes(preference)
    );
    const hasFeature = product.features.some((feature) =>
      selectedFeatures.includes(feature)
    );
    return hasPreference || hasFeature;
  });

  recommendation.sort((a, b) => {
    const aScore = getScorePoints(a, selectedPreferences, selectedFeatures);
    const bScore = getScorePoints(b, selectedPreferences, selectedFeatures);
    return bScore - aScore;
  });

  return oneProduct ? [recommendation[0]] : recommendation;
};

export default { getRecommendations };
