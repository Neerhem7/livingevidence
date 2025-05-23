import { config as devConfig } from './env.development';
import { config as prodConfig } from './env.production';
import { config as testConfig } from './env.testing';
import { EnvironmentConfig } from './types';

const getEnvironment = (): 'development' | 'testing' | 'production' => {
  // First check for local environment override
  const localEnv = process.env.REACT_APP_ENV;
  if (localEnv === 'production' || localEnv === 'testing' || localEnv === 'development') {
    return localEnv;
  }

  // Then check if we're in Vercel environment
  if (process.env.VERCEL) {
    // Convert Vercel preview environment to testing
    if (process.env.VERCEL_ENV === 'preview') {
      return 'testing';
    }
    return (process.env.VERCEL_ENV as 'production' | 'development') || 'development';
  }
  
  // Fallback to development
  return 'development';
};

const getVercelUrl = () => {
  // Allow local override of API URL
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  if (process.env.VERCEL) {
    // VERCEL_URL is automatically provided by Vercel
    return `https://${process.env.VERCEL_URL}`;
  }
  return null;
};

const getConfig = (): EnvironmentConfig => {
  const env = getEnvironment();
  const vercelUrl = getVercelUrl();

  let config: EnvironmentConfig;
  
  switch (env) {
    case 'production':
      config = prodConfig;
      break;
    case 'testing':
      config = testConfig;
      break;
    case 'development':
    default:
      config = devConfig;
      break;
  }

  // Only override API_URL with Vercel URL for non-production environments
  if (vercelUrl && env !== 'production') {
    return {
      ...config,
      API_URL: vercelUrl
    };
  }

  return config;
};

// For debugging purposes
const debugConfig = getConfig();
console.log('Current Environment:', debugConfig.ENV);
console.log('API URL:', debugConfig.API_URL);

export const config = debugConfig; 