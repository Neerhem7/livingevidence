import { config } from "../config";

const getBaseUrl = () => {
  return config.API_URL;
};

export const BE_Endpoints = {
  AUTH_URL: `${getBaseUrl()}/api/v1/auth/login`,
  BASE_URL_PRISMA_PAPER: `${getBaseUrl()}/api/v1/staging_prisma/prisma/papers`,
  BASE_URL_PRISMA: `${getBaseUrl()}/api/v1/staging_prisma/prisma`,
  BASE_URL_ITABLE: `${getBaseUrl()}/staging_itable/list`,
  PRISMA_PAPERS: `${getBaseUrl()}/api/v1/staging_prisma/prisma/papers`,
  USER_PROJECTS: `${getBaseUrl()}/api/v1/staging_website/project_info`,
  OUTCOME_CATEGORIZATION: (outcomeId: string, projectId: string) =>
    `${getBaseUrl()}/api/v1/outcome/outcome_categorization/${outcomeId}/${projectId}/`,
  //  BASE_URL_ITABLE : 'https://app.lisr.org/backend/staging_itable/list/',
};
