import { apiRequest } from '@/shared/lib';

const testApi = () => {
  return apiRequest<undefined, undefined>({ url: 'https://api.nafal.site/sample', method: 'GET' });
};

export default testApi;
