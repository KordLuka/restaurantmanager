import { getJestProjects } from '@nx/jest';

export default {
  projects: getJestProjects(),
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
