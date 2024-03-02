import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';
import { Product } from 'types';

import queryClient from 'query-client';

export function useCreate<T>() {
  const create = (data: T) => apiService.post('/products', data);

  interface CreatResponse {
    product: T;
  }

  return useMutation<CreatResponse, unknown, T>(create);
}

export function useListForUser() {
  const listForUser = () => apiService.get('/products/user');

  return useQuery<Product[]>(['products', 'user'], listForUser);
}

export function useRemove() {
  const remove = (id: string) => apiService.delete(`products/${id}`);

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['products', 'user']);
    },
  });
}

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface ProductListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<ProductListResponse>(['products', params], list);
}
