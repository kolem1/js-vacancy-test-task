import queryClient from 'query-client';
import { useMutation, useQuery } from 'react-query';
import { apiService } from 'services';
import { CartHistoryProduct, CartProductDto } from 'types';

export function useGet() {
  const get = () => apiService.get('/cart');

  interface CartResponse {
    results: CartProductDto[],
    totalBill: number
  }

  return useQuery<CartResponse>('cart', get);
}

export function useGetHistory() {
  const getHistory = () => apiService.get('/cart/history');

  interface CartHistoryResponse {
    results: CartHistoryProduct[]
  }

  return useQuery<CartHistoryResponse>(['cart', 'history'], getHistory);
}

export function useAdd<T>() {
  const add = (data: T) => apiService.post('/cart', data);

  return useMutation(add, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
}

export function useCount() {
  const count = () => apiService.get('/cart/count');

  interface CountResponse {
    count: number
  }

  return useQuery<CountResponse>(['cart', 'count'], count);
}

export function useRemove() {
  const remove = (id: string) => apiService.delete(`cart/${id}`);

  return useMutation(remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
}

export function useUpdate<T extends { id:string, quantity: number }>() {
  const update = ({ id, ...data }: T) => apiService.put(`cart/${id}`, data);

  return useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });
}
