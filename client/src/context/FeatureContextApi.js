import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const FeatureContext = createContext();

export const FeatureContextProvider = ({ children }) => {
  const [feature, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatureProduct = async () => {
      try {
        const response = await axios.get('https://e-commerce-web-application-1-dru5.onrender.com/api/v1/feature');
        setFeatured(response.data.features);
      } catch (error) {
        setError('Failed to load featured products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatureProduct();
  }, []);

  const value = useMemo(() => ({ feature, loading, error }), [feature, loading, error]);

  return (
    <FeatureContext.Provider value={value}>
      {children}
    </FeatureContext.Provider>
  );
};

export default FeatureContext;
