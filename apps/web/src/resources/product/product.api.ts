import { useMutation } from 'react-query';

import { apiService } from 'services';

export function useCreate<T>() {
  const create = (data: T) => apiService.post('/products', data);
  interface CreatResponse {
    product: T;
  }

  return useMutation<CreatResponse, unknown, T>(create);
}
