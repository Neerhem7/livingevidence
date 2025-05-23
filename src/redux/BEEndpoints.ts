import { config } from '../config';

const getBaseUrl = () => {
  return config.API_URL;
};

export const BE_Endpoints = {
  BASE_URL_PRISMA_PAPER: `${getBaseUrl()}/api/v1/staging_prisma/prisma/papers`,
  BASE_URL_PRISMA: `${getBaseUrl()}/api/v1/staging_prisma/prisma`,
  BASE_URL_ITABLE: `${getBaseUrl()}/staging_itable/list`,
  //  BASE_URL_ITABLE : 'https://app.lisr.org/backend/staging_itable/list/',
}